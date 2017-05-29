/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { PluginMetaData, PluginConfigurationList } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import PluginConfigurationSelectors from '../../model/plugin/PluginConfigurationSelectors'
import PluginMetaDataSelectors from '../../model/plugin/PluginMetaDataSelectors'
import PluginConfigurationActions from '../../model/plugin/PluginConfigurationActions'
import PluginMetaDataActions from '../../model/plugin/PluginMetaDataActions'
import PluginConfigurationListComponent from '../../components/plugin/PluginConfigurationListComponent'

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
    // from mapDispatchToProps
    fetchPluginMetaData: PropTypes.func,
    fetchPluginConfigurationList: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    deletePluginConfiguration: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const { params: { microserviceName, pluginId } } = this.props
    const tasks = [
      this.props.fetchPluginMetaData(pluginId, microserviceName),
      this.props.fetchPluginConfigurationList(microserviceName, pluginId),
    ]
    return Promise.all(tasks)
      .then((actionResults) => {
        this.setState({
          isLoading: false,
        })
        return actionResults
      })
  }

  getView = () => (
    <PluginConfigurationListComponent
      params={this.props.params}
      pluginMetaData={this.props.pluginMetaData}
      pluginConfigurationList={this.props.pluginConfigurationList}
      handleBackClick={this.handleBackClick}
      handleAddClick={this.handleAddClick}
    />
  )

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
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-microservice-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.getView}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  pluginMetaData: PluginMetaDataSelectors.getById(state, ownProps.params.pluginId),
  pluginConfigurationList: PluginConfigurationSelectors.getListByPluginId(state, ownProps.params.pluginId),
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
