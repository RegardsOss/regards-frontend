/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { connect } from '@regardsoss/redux'
import { PluginDefinition } from '@regardsoss/model'
import PluginsActions from '../model/PluginsActions'
import PluginsSelector from '../model/PluginsSelector'
import PluginFormComponent from '../components/PluginFormComponent'


/**
 * React component to display a edition form for plugin entity
 */
class PluginFormContainer extends React.Component {

  static propTypes = {
    // From react router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      plugin_id: React.PropTypes.string,
    }),
    // Set by mapDispatchToProps
    updatePlugin: React.PropTypes.func,
    createPlugin: React.PropTypes.func,
    fetchPlugin: React.PropTypes.func,
    // Set by mapStateToProps
    isFetching: React.PropTypes.bool,
    plugin: React.PropTypes.shape({
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
    browserHistory.push(`/admin/${project}/ui-plugins/plugins`)
  }

  render() {
    if (this.props.params.plugin_id && !this.props.plugin && this.props.isFetching) {
      return (<FormLoadingComponent />)
    }

    if (this.props.params.plugin_id && !this.props.plugin) {
      return (<FormEntityNotFoundComponent />)
    }


    return (
      <PluginFormComponent
        onSubmit={this.handleSubmit}
        onBack={this.handleBack}
        plugin={this.props.plugin}
      />
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

const UnconnectedPluginFormContainer = PluginFormContainer
export {
  UnconnectedPluginFormContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(PluginFormContainer)
