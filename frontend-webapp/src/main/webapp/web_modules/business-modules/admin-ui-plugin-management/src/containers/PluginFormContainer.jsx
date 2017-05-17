/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { connect } from '@regardsoss/redux'
import { PluginDefinition } from '@regardsoss/model'
import PluginsActions from '../model/PluginsActions'
import PluginsSelector from '../model/PluginsSelector'
import PluginFormComponent from '../components/PluginFormComponent'

/**
 * React component to display a edition form for plugin entity
 * @author Sébastien Binda
 */
export class PluginFormContainer extends React.Component {

  static propTypes = {
    // From react router
    params: PropTypes.shape({
      project: PropTypes.string,
      plugin_id: PropTypes.string,
    }),
    // Set by mapDispatchToProps
    updatePlugin: PropTypes.func,
    createPlugin: PropTypes.func,
    fetchPlugin: PropTypes.func,
    // Set by mapStateToProps
    isFetching: PropTypes.bool,
    plugin: PropTypes.shape({
      content: PluginDefinition,
    }),
  }

  componentWillMount() {
    if (this.props.params.plugin_id && !this.props.plugin) {
      this.props.fetchPlugin(this.props.params.plugin_id)
    }
  }

  handleSubmit = (values) => {
    if (this.props.params.plugin_id) {
      return this.handleUpdate(values)
    }
    return this.handleCreate(values)
  }

  handleCreate = (values) => {
    const submitModel = Object.assign({}, values)
    Promise.resolve(this.props.createPlugin(submitModel))
      .then(this.handleBack)
  }

  handleUpdate = (values) => {
    const submitModel = Object.assign({}, this.props.plugin, values)
    Promise.resolve(this.props.updatePlugin(submitModel))
      .then(this.handleBack)
  }

  handleBack = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/ui/plugin/list`)
  }

  render() {
    if (this.props.params.plugin_id && !this.props.plugin && this.props.isFetching) {
      return (<FormLoadingComponent />)
    }

    if (this.props.params.plugin_id && !this.props.plugin) {
      return (<FormEntityNotFoundComponent />)
    }

    return (
      <I18nProvider messageDir="business-modules/admin-ui-plugin-management/src/i18n">
        <PluginFormComponent
          onSubmit={this.handleSubmit}
          onBack={this.handleBack}
          plugin={this.props.plugin}
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  plugin: ownProps.params.plugin_id ? PluginsSelector.getById(state, ownProps.params.plugin_id) : null,
  isFetching: PluginsSelector.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPlugin: pluginId => dispatch(PluginsActions.fetchEntity(pluginId)),
  updatePlugin: plugin => dispatch(PluginsActions.updateEntity(plugin.id, plugin)),
  createPlugin: plugin => dispatch(PluginsActions.createEntity(plugin)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginFormContainer)
