/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { PluginConfigurationList } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { FormattedMessage } from 'react-intl'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import AddCircle from 'material-ui/svg-icons/content/add-circle'
import Subheader from 'material-ui/Subheader'
import { chain } from 'lodash'
import PluginConfigurationContainer from './PluginConfigurationContainer'
import PluginConfigurationSelectors from '../model/PluginConfigurationSelectors'
import PluginConfigurationActions from '../model/PluginConfigurationActions'
import moduleStyles from '../styles/styles'

const styles = moduleStyles().pluginConfiguration

export class PluginConfigurationListContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      microserviceName: React.PropTypes.string,
      pluginId: React.PropTypes.string,
      pluginConfigurationId: React.PropTypes.string,
    }),
    // from mapStateToProps
    pluginConfigurationList: PluginConfigurationList,
    isPluginConfigurationFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchPluginConfigurationList: React.PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    deletePluginConfiguration: React.PropTypes.func,
  }

  componentDidMount() {
    const { params: { microserviceName, pluginId } } = this.props
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
    const { params: { microserviceName }, pluginConfigurationList, isPluginConfigurationFetching } = this.props

    return (
      <I18nProvider messageDir="modules/admin-microservice-management/src/i18n">
        <Paper>
          <AppBar
            title={`${microserviceName} > Plugins > Kerberos`}
            iconElementLeft={<IconButton onTouchTap={this.handleBackClick}><ArrowBack /></IconButton>}
            iconElementRight={
              <IconButton
                tooltip={<FormattedMessage id="microservice-management.plugin.configuration.list.add" />}
                onTouchTap={this.handleAddClick}
              >
                <AddCircle />
              </IconButton>
            }
          />
          <div style={styles.root}>
            <LoadableContentDisplayDecorator isLoading={isPluginConfigurationFetching}>
              <Subheader>Active</Subheader>
              {chain(pluginConfigurationList)
                .filter(pluginConfiguration => pluginConfiguration.content.active)
                .sortBy(pluginConfiguration => -1 * pluginConfiguration.content.priorityOrder)
                .map(pluginConfiguration => <PluginConfigurationContainer
                  key={pluginConfiguration.content.id}
                  params={this.props.params}
                  pluginConfiguration={pluginConfiguration}
                />)
                .value()}
              <Subheader>Inactive</Subheader>
              {chain(pluginConfigurationList)
                .filter(pluginConfiguration => !pluginConfiguration.content.active)
                .sortBy(pluginConfiguration => -1 * pluginConfiguration.content.priorityOrder)
                .map(pluginConfiguration => <PluginConfigurationContainer
                  key={pluginConfiguration.content.id}
                  params={this.props.params}
                  pluginConfiguration={pluginConfiguration}
                />)
                .value()}
            </LoadableContentDisplayDecorator>
          </div>
        </Paper>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  pluginConfigurationList: PluginConfigurationSelectors.getList(state),
  isPluginConfigurationFetching: PluginConfigurationSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginConfigurationList: (microserviceName, pluginId) => dispatch(PluginConfigurationActions.fetchPagedEntityList(0, 100, [microserviceName, pluginId])),
  deletePluginConfiguration: (pluginConfigurationId, microserviceName, pluginId) => dispatch(PluginConfigurationActions.deleteEntity(pluginConfigurationId, [microserviceName, pluginId])),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginConfigurationListContainer)
