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
 */
class PluginListContainer extends React.Component {

  static propTypes = {
    // From react router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      applicationId: React.PropTypes.string,
    }),
    // Set by mapDispatchToProps
    fetchPlugins: React.PropTypes.func,
    updatePlugin: React.PropTypes.func,
    deletePlugin: React.PropTypes.func,
    // Set by mapStateToProps
    isFetching: React.PropTypes.bool,
    plugins: React.PropTypes.objectOf(PluginDefinition),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillMount() {
    this.props.fetchPlugins()
  }

  handleEditPlugin = (plugin) => {
    const url = `/admin/${this.props.params.project}/ui-plugins/plugins/${plugin.id}/edit`
    browserHistory.push(url)
  }
  handleCreatePlugin = () => {
    const url = `/admin/${this.props.params.project}/ui-plugins/plugins/create`
    browserHistory.push(url)
  }

  openDeleteDialogConfirm = (plugin) => {

  }

  handleDeletePlugin = (plugin) => {
    this.props.deletePlugin(plugin)
  }

  render() {
    if (!this.props.plugins || this.props.isFetching) {
      return (<FormLoadingComponent />)
    }

    return (
      <I18nProvider messageDir="modules/admin-ui-plugins-management/src/i18n">
        <PluginListComponent
          plugins={this.props.plugins}
          onCreate={this.handleCreatePlugin}
          onEdit={this.handleEditPlugin}
          onDelete={this.handleDeletePlugin}
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
  isFetching: PluginsSelector.isFetching(state)
})
const mapDispatchToProps = dispatch => ({
  fetchPlugins: () => dispatch(PluginsActions.fetchPagedEntityList(0, 100)),
  updatePlugin: plugin => dispatch(PluginsActions.updateEntity(plugin.id, plugin)),
  deletePlugin: plugin => dispatch(PluginsActions.deleteEntity(plugin.id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginListContainer)
