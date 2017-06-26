/**
 * LICENSE_PLACEHOLDER
 **/
import { CommonShapes } from '@regardsoss/shape'
import { ResourceIconAction } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import Subheader from 'material-ui/Subheader'
import flow from 'lodash/flow'
import fpfilter from 'lodash/fp/filter'
import fpsortBy from 'lodash/fp/sortBy'
import fpmap from 'lodash/fp/map'
import PluginConfigurationContainer from './../../containers/plugin/PluginConfigurationContainer'
import PluginConfigurationActions from '../../model/plugin/PluginConfigurationActions'
import moduleStyles from '../../styles/styles'

/**
 * Container connecting the plugin configuration list to the redux store and handling user interface actions.
 *
 * @author Xavier-Alexandre Brochard
 * @author Léo Mieulet
 */
export default class PluginConfigurationListComponent extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
      microserviceName: PropTypes.string,
      pluginId: PropTypes.string,
      pluginConfigurationId: PropTypes.string,
    }),
    pluginMetaData: CommonShapes.PluginMetaData,
    pluginConfigurationList: CommonShapes.PluginConfigurationList,
    handleBackClick: PropTypes.func,
    handleAddClick: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props, context) {
    super(props)
    this.styles = moduleStyles(context.muiTheme).plugins
  }

  render() {
    const {
      params: { microserviceName },
      pluginMetaData,
      pluginConfigurationList,
    } = this.props

    const activeConfs = flow(
      fpfilter(pluginConfiguration => pluginConfiguration.content.active),
      fpsortBy(pluginConfiguration => -1 * pluginConfiguration.content.priorityOrder),
      fpmap(pluginConfiguration => (<PluginConfigurationContainer
        key={pluginConfiguration.content.id}
        params={this.props.params}
        pluginConfiguration={pluginConfiguration}
        pluginMetaData={pluginMetaData}
      />)))(pluginConfigurationList)

    const inactiveConfs = flow(
      fpfilter(pluginConfiguration => !pluginConfiguration.content.active),
      fpsortBy(pluginConfiguration => -1 * pluginConfiguration.content.priorityOrder),
      fpmap(pluginConfiguration => (<PluginConfigurationContainer
        key={pluginConfiguration.content.id}
        params={this.props.params}
        pluginConfiguration={pluginConfiguration}
        pluginMetaData={pluginMetaData}
      />)))(pluginConfigurationList)

    return (
      <I18nProvider messageDir="business-modules/admin-microservice-management/src/i18n">
        <Paper>
          <AppBar
            title={`${microserviceName} > Plugins > ${pluginMetaData && pluginMetaData.content.pluginId}`}
            iconElementLeft={<IconButton onTouchTap={this.props.handleBackClick}><ArrowBack /></IconButton>}
            iconElementRight={
              <ResourceIconAction
                resourceDependency={PluginConfigurationActions.getMsDependency(RequestVerbEnum.POST, microserviceName)}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.list.add' })}
                onTouchTap={this.props.handleAddClick}
              >
                <AddCircle />
              </ResourceIconAction>
            }
          />
          <div style={this.styles.root}>
            <Subheader>Active</Subheader>
            {activeConfs}
            <Subheader>Inactive</Subheader>
            {inactiveConfs}
          </div>
        </Paper>
      </I18nProvider>
    )
  }
}
