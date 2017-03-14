/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { getFormValues, change } from 'redux-form'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { connect } from '@regardsoss/redux'
import { Module, Layout } from '@regardsoss/model'
import { ContainerHelper } from '@regardsoss/layout'
import ModulesActions from '../model/modules/ModulesActions'
import ModulesSelector from '../model/modules/ModulesSelector'
import LayoutSelector from '../model/layout/LayoutSelector'
import LayoutActions from '../model/layout/LayoutActions'
import ModuleFormComponent from '../components/ModuleFormComponent'

/**
 * React component to display a edition form for Module entity
 * @author Sébastien binda
 */
class ModuleFormContainer extends React.Component {

  static propTypes = {
    // From react router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      applicationId: React.PropTypes.string,
      module_id: React.PropTypes.string,
      duplicate_module_id: React.PropTypes.string,
    }),
    // Set by mapDispatchToProps
    updateModule: React.PropTypes.func,
    createModule: React.PropTypes.func,
    fetchModule: React.PropTypes.func,
    fetchLayout: React.PropTypes.func,
    // Set by mapStateToProps
    isFetching: React.PropTypes.bool,
    module: Module,
    duplicatedModule: Module,
    layout: Layout,
    // eslint-disable-next-line react/no-unused-prop-types
    form: React.PropTypes.object,
    changeField: React.PropTypes.func,
  }

  componentWillMount() {
    if (this.props.params.module_id && !this.props.module) {
      this.props.fetchModule(this.props.params.applicationId, this.props.params.module_id)
    }

    if (this.props.params.duplicate_module_id && !this.props.module) {
      this.props.fetchModule(this.props.params.applicationId, this.props.params.duplicate_module_id)
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

    if (this.props.params.duplicate_module_id && !this.props.duplicatedModule && this.props.isFetching) {
      return (<FormLoadingComponent />)
    }

    if (this.props.params.module_id && !this.props.module) {
      return (<FormEntityNotFoundComponent />)
    }

    if (this.props.params.duplicate_module_id && !this.props.duplicatedModule) {
      return (<FormEntityNotFoundComponent />)
    }

    let module = null
    if (this.props.params.duplicate_module_id !== undefined) {
      module = Object.assign({}, this.props.duplicatedModule)
      module.id = null
    } else {
      module = this.props.module
    }

    let availablecontainers = []
    if (this.props.layout && this.props.layout.layout) {
      availablecontainers = ContainerHelper.getAvailableContainersInLayout(this.props.layout.layout)
    }

    return (
      <I18nProvider messageDir="modules/admin-ui-configuration/src/i18n">
        <ModuleFormComponent
          project={this.props.params.project}
          applicationId={this.props.params.applicationId}
          onSubmit={this.handleSubmit}
          onBack={this.handleBack}
          module={module}
          duplication={this.props.params.duplicate_module_id !== undefined}
          containers={availablecontainers}
          adminForm={{
            form: this.props.form,
            changeField: this.props.changeField,
          }}
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  module: ownProps.params.module_id ? ModulesSelector.getContentById(state, ownProps.params.module_id) : null,
  duplicatedModule: ownProps.params.duplicate_module_id ? ModulesSelector.getContentById(state, ownProps.params.duplicate_module_id) : null,
  layout: ownProps.params.applicationId ? LayoutSelector.getContentById(state, ownProps.params.applicationId) : null,
  isFetching: ModulesSelector.isFetching(state),
  form: getFormValues('edit-module-form')(state),
})

const mapDispatchToProps = dispatch => ({
  fetchModule: (applicationId, moduleId) => dispatch(ModulesActions.fetchEntity(moduleId, { applicationId })),
  fetchLayout: applicationId => dispatch(LayoutActions.fetchEntity(applicationId)),
  updateModule: (applicationId, module) => dispatch(ModulesActions.updateEntity(module.id, module, { applicationId })),
  createModule: (applicationId, module) => dispatch(ModulesActions.createEntity(module, { applicationId })),
  changeField: (field, value) => dispatch(change('edit-module-form', field, value)),
})

const UnconnectedModuleFormContainer = ModuleFormContainer
export {
  UnconnectedModuleFormContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleFormContainer)
