/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { FormLoadingComponent } from '@regardsoss/form-utils'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { PluginDefinition } from '@regardsoss/model'
import { connect } from '@regardsoss/redux'
import PluginListComponent from '../components/PluginListComponent'
import PluginsSelector from '../model/PluginsSelector'
import PluginsActions from '../model/PluginsActions'

/**
 * Module container to display list of configured modules for a given application id.
 * @author Sébastien Binda
 */
class PluginListContainer extends React.Component {

  static propTypes = {
    // From react router
    params: PropTypes.shape({
      project: PropTypes.string,
      applicationId: PropTypes.string,
    }),
    // Set by mapDispatchToProps
    fetchPlugins: PropTypes.func,
    updatePlugin: PropTypes.func,
    deletePlugin: PropTypes.func,
    // Set by mapStateToProps
    isFetching: PropTypes.bool,
    plugins: PropTypes.objectOf(PluginDefinition),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillMount() {
    this.props.fetchPlugins()
  }


  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/ui/board`
  }

  handleCreatePlugin = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/ui/plugin/create`
    browserHistory.push(url)
  }

  handleDeletePlugin = (plugin) => {
    this.props.deletePlugin(plugin)
  }

  handleEditPlugin = (plugin) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/ui/plugin/${plugin.id}/edit`
    browserHistory.push(url)
  }

  render() {
    if (!this.props.plugins || this.props.isFetching) {
      return (<FormLoadingComponent />)
    }

    return (
      <I18nProvider messageDir="business-modules/admin-ui-plugin-management/src/i18n">
        <PluginListComponent
          plugins={this.props.plugins}
          onCreate={this.handleCreatePlugin}
          onEdit={this.handleEditPlugin}
          onDelete={this.handleDeletePlugin}
          backUrl={this.getBackUrl()}
          handleUpdate={this.props.updatePlugin}
        />
      </I18nProvider>
    )
  }
}

const UnconnectedPluginListContainer = PluginListContainer
export {
  UnconnectedPluginListContainer,
}

const mapStateToProps = state => ({
  plugins: PluginsSelector.getList(state),
  isFetching: PluginsSelector.isFetching(state),
})
const mapDispatchToProps = dispatch => ({
  fetchPlugins: () => dispatch(PluginsActions.fetchPagedEntityList(0, 100)),
  updatePlugin: plugin => dispatch(PluginsActions.updateEntity(plugin.id, plugin)),
  deletePlugin: plugin => dispatch(PluginsActions.deleteEntity(plugin.id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginListContainer)
