/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { PluginMetaDataList } from '@regardsoss/model'
import PluginTypeActions from '../../model/plugin/PluginTypeActions'
import PluginTypeSelectors from '../../model/plugin/PluginTypeSelectors'
import PluginMetaDataActions from '../../model/plugin/PluginMetaDataActions'
import PluginMetaDataSelectors from '../../model/plugin/PluginMetaDataSelectors'
import PluginMetaDataListComponent from '../../components/plugin/PluginMetaDataListComponent'

/**
 * Displays the list of plugins for the current microservice (in route) as a {@link GridList} of {@link Card}s sorted by
 * plugin type.
 *
 * @autor Xavier-Alexandre Brochard
 */
export class PluginMetaDataListContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      microserviceName: PropTypes.string,
    }),
    // from mapStateToProps
    pluginTypes: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.string,
    })),
    pluginMetaDataList: PluginMetaDataList,
    // from mapDispatchToProps
    fetchPluginTypeList: PropTypes.func,
    fetchPluginMetaDataList: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const { params: { microserviceName } } = this.props
    const tasks = [
      this.props.fetchPluginTypeList(microserviceName), // Fetch the plugin types
      this.props.fetchPluginMetaDataList(microserviceName),
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
    <PluginMetaDataListComponent
      microserviceName={this.props.params.microserviceName}
      pluginTypes={this.props.pluginTypes}
      pluginMetaDataList={this.props.pluginMetaDataList}
      handleClose={this.handleClose}
      handleProjectConfigurationListClick={this.handleProjectConfigurationListClick}
    />
  )

  /**
   * Navigate back when clicking on close button
   */
  handleClose = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/microservice/board`
    browserHistory.push(url)
  }

  /**
   * Navigate to the project configuration list when clicking on the corresponding button
   *
   * @param {String} pluginId
   */
  handleProjectConfigurationListClick = (pluginId) => {
    const { params: { project, microserviceName } } = this.props
    const url = `/admin/${project}/microservice/${microserviceName}/plugin/${pluginId}/configuration/list`
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
  pluginTypes: PluginTypeSelectors.getList(state),
  pluginMetaDataList: PluginMetaDataSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginTypeList: microserviceName => dispatch(PluginTypeActions.fetchEntityList({ microserviceName })),
  fetchPluginMetaDataList: microserviceName => dispatch(PluginMetaDataActions.fetchEntityList({ microserviceName })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginMetaDataListContainer)
