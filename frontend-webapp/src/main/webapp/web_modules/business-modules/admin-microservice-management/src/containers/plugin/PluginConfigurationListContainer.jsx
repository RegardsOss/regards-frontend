/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { PluginMetaData, PluginConfigurationList } from '@regardsoss/model'
import { LoadableContentDisplayDecorator, ResourceIconAction } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { FormattedMessage } from 'react-intl'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import Subheader from 'material-ui/Subheader'
import { chain } from 'lodash'
import PluginConfigurationContainer from './PluginConfigurationContainer'
import PluginConfigurationSelectors from '../../model/plugin/PluginConfigurationSelectors'
import PluginMetaDataSelectors from '../../model/plugin/PluginMetaDataSelectors'
import PluginConfigurationActions from '../../model/plugin/PluginConfigurationActions'
import PluginMetaDataActions from '../../model/plugin/PluginMetaDataActions'
import moduleStyles from '../../styles/styles'

const styles = moduleStyles().pluginConfiguration

/**
 * Container connecting the plugin configuration list to the redux store and handling user interface actions.
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginConfigurationListContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      microserviceName: PropTypes.string,
      pluginId: PropTypes.string,
      pluginConfigurationId: PropTypes.string,
    }),
    // from mapStateToProps
    pluginMetaData: PluginMetaData,
    pluginConfigurationList: PluginConfigurationList,
    isPluginConfigurationFetching: PropTypes.bool,
    // from mapDispatchToProps
    fetchPluginMetaData: PropTypes.func,
    fetchPluginConfigurationList: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    deletePluginConfiguration: PropTypes.func,
  }

  componentDidMount() {
    const { params: { microserviceName, pluginId } } = this.props
    this.props.fetchPluginMetaData(pluginId, microserviceName)
    this.props.fetchPluginConfigurationList(microserviceName, pluginId)
  }

  handleAddClick = () => {
    const { params: { project, microserviceName, pluginId } } = this.props
    const url = `/admin/${project}/microservice/${microserviceName}/plugin/${pluginId}/configuration/create`
    browserHistory.push(url)
  }

  handleBackClick = () => {
    const { params: { project, microserviceName } } = this.props
    const url = `/admin/${project}/microservice/${microserviceName}/plugin/list`
    browserHistory.push(url)
  }

  render() {
    const {
      params: { microserviceName },
      pluginMetaData,
      pluginConfigurationList,
      isPluginConfigurationFetching,
    } = this.props

    return (
      <I18nProvider messageDir="business-modules/admin-microservice-management/src/i18n">
        <Paper>
          <AppBar
            title={`${microserviceName} > Plugins > ${pluginMetaData && pluginMetaData.content.pluginClassName}`}
            iconElementLeft={<IconButton onTouchTap={this.handleBackClick}><ArrowBack /></IconButton>}
            iconElementRight={
              <ResourceIconAction
                resourceDependency={PluginConfigurationActions.getMsDependency(RequestVerbEnum.POST, microserviceName)}
                tooltip={<FormattedMessage id="microservice-management.plugin.configuration.list.add" />}
                onTouchTap={this.handleAddClick}
              >
                <AddCircle />
              </ResourceIconAction>
            }
          />
          <div style={styles.root}>
            <LoadableContentDisplayDecorator isLoading={isPluginConfigurationFetching}>
              <Subheader>Active</Subheader>
              {chain(pluginConfigurationList)
                .filter(pluginConfiguration => pluginConfiguration.content.active)
                .sortBy(pluginConfiguration => -1 * pluginConfiguration.content.priorityOrder)
                .map(pluginConfiguration => (<PluginConfigurationContainer
                  key={pluginConfiguration.content.id}
                  params={this.props.params}
                  pluginConfiguration={pluginConfiguration}
                  pluginMetaData={pluginMetaData}
                />))
                .value()}
              <Subheader>Inactive</Subheader>
              {chain(pluginConfigurationList)
                .filter(pluginConfiguration => !pluginConfiguration.content.active)
                .sortBy(pluginConfiguration => -1 * pluginConfiguration.content.priorityOrder)
                .map(pluginConfiguration => (<PluginConfigurationContainer
                  key={pluginConfiguration.content.id}
                  params={this.props.params}
                  pluginConfiguration={pluginConfiguration}
                  pluginMetaData={pluginMetaData}
                />))
                .value()}
            </LoadableContentDisplayDecorator>
          </div>
        </Paper>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  pluginMetaData: PluginMetaDataSelectors.getById(state, ownProps.params.pluginId),
  pluginConfigurationList: PluginConfigurationSelectors.getListByPluginId(state, ownProps.params.pluginId),
  isPluginConfigurationFetching: PluginConfigurationSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginMetaData: (pluginId, microserviceName) => dispatch(PluginMetaDataActions.fetchEntity(pluginId, { microserviceName })),
  fetchPluginConfigurationList: (microserviceName, pluginId) => dispatch(PluginConfigurationActions.fetchEntityList({
    microserviceName,
    pluginId,
  })),
  deletePluginConfiguration: (pluginConfigurationId, microserviceName, pluginId) => dispatch(PluginConfigurationActions.deleteEntity(pluginConfigurationId, {
    microserviceName,
    pluginId,
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginConfigurationListContainer)
