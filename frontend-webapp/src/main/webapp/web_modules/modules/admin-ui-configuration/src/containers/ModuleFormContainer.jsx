/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { connect } from '@regardsoss/redux'
import { ModuleShape } from '@regardsoss/modules'
import { LayoutShape, ContainerHelper } from '@regardsoss/layout'
import ModulesActions from '../model/modules/ModulesActions'
import ModulesSelector from '../model/modules/ModulesSelector'
import LayoutSelector from '../model/layout/LayoutSelector'
import LayoutActions from '../model/layout/LayoutActions'
import ModuleFormComponent from '../components/ModuleFormComponent'


/**
 * React component to display a edition form for Module entity
 */
class ModuleFormContainer extends React.Component {

  static propTypes = {
    // From react router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      applicationId: React.PropTypes.string,
      module_id: React.PropTypes.string,
    }),
    // Set by mapDispatchToProps
    updateModule: React.PropTypes.func,
    createModule: React.PropTypes.func,
    fetchModule: React.PropTypes.func,
    fetchLayout: React.PropTypes.func,
    // Set by mapStateToProps
    isFetching: React.PropTypes.bool,
    module: ModuleShape,
    layout: LayoutShape,
  }

  componentWillMount() {
    if (this.props.params.module_id && !this.props.module) {
      this.props.fetchModule(this.props.params.applicationId, this.props.params.module_id)
    }
    if (!this.props.layout) {
      this.props.fetchLayout(this.props.params.applicationId)
    }
  }

  handleSubmit = (values) => {
    if (this.props.params.module_id) {
      return this.handleUpdate(values)
    }
    return this.handleCreate(values)
  }

  handleCreate = (values) => {
    const submitModel = Object.assign({}, values)
    Promise.resolve(this.props.createModule(this.props.params.applicationId, submitModel))
      .then(this.handleBack)
  }

  handleUpdate = (values) => {
    const submitModel = Object.assign({}, this.props.module, values)
    Promise.resolve(this.props.updateModule(this.props.params.applicationId, submitModel))
      .then(this.handleBack)
  }

  handleBack = () => {
    const { params: { project, applicationId } } = this.props
    browserHistory.push(`/admin/${project}/ui-configuration/applications/${applicationId}/modules/list`)
  }

  render() {
    if (this.props.params.module_id && !this.props.module && this.props.isFetching) {
      return (<FormLoadingComponent />)
    }

    if (this.props.params.module_id && !this.props.module) {
      return (<FormEntityNotFoundComponent />)
    }

    return (
      <ModuleFormComponent
        applicationId={this.props.params.applicationId}
        onSubmit={this.handleSubmit}
        onBack={this.handleBack}
        module={this.props.module}
        containers={ContainerHelper.getAvailableContainersInLayout(this.props.layout)}
      />
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  module: ownProps.params.module_id ? ModulesSelector.getContentById(state, ownProps.params.module_id) : null,
  layout: ownProps.params.applicationId ? LayoutSelector.getContentById(state, ownProps.params.applicationId) : null,
  isFetching: ModulesSelector.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchModule: (applicationId, moduleId) => dispatch(ModulesActions.fetchEntity(moduleId, dispatch, [applicationId])),
  fetchLayout: applicationId => dispatch(LayoutActions.fetchEntity(applicationId, dispatch)),
  updateModule: (applicationId, module) => dispatch(ModulesActions.updateEntity(module.id, module, dispatch, [applicationId])),
  createModule: (applicationId, module) => dispatch(ModulesActions.createEntity(module, dispatch, [applicationId])),

})

const UnconnectedModuleFormContainer = ModuleFormContainer
export {
  UnconnectedModuleFormContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleFormContainer)
