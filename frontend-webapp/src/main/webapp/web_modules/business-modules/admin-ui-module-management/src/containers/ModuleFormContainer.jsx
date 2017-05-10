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
import FormShape from '../model/FormShape'
import ModuleFormComponent from '../components/ModuleFormComponent'
import NoContainerAvailables from '../components/NoContainerAvailables'

/**
 * React component to display a edition form for Module entity
 * @author Sébastien binda
 * @author Léo Mieulet
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
    updateModule: React.PropTypes.func,
    createModule: React.PropTypes.func,
    fetchModule: React.PropTypes.func,
    fetchLayout: React.PropTypes.func,
    isInstance: React.PropTypes.bool,
    // Set by mapStateToProps
    isFetching: React.PropTypes.bool,
    module: Module,
    duplicatedModule: Module,
    layout: Layout,
    // eslint-disable-next-line react/no-unused-prop-types
    form: FormShape,
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
    const valuesToSave = Object.assign({}, values)
    if (valuesToSave.conf) {
      valuesToSave.conf = JSON.stringify(values.conf)
    }
    if (this.props.params.module_id) {
      return this.handleUpdate(valuesToSave)
    }
    return this.handleCreate(valuesToSave)
  }

  handleCreate = (values) => {
    const defaultProps = {
      applicationId: this.props.params.applicationId,
      active: false,
      isDefault: false,
      conf: '{}',
    }
    const submitModel = Object.assign({}, defaultProps, values)
    Promise.resolve(this.props.createModule(this.props.params.applicationId, submitModel))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.handleBack()
        }
      })
  }

  handleUpdate = (values) => {
    const defaultProps = {
      applicationId: this.props.params.applicationId,
      active: false,
      isDefault: false,
      conf: '{}',
    }
    const submitModel = Object.assign({}, defaultProps, this.props.module, values)
    Promise.resolve(this.props.updateModule(this.props.params.applicationId, submitModel))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.handleBack()
        }
      })
  }

  handleBack = () => {
    const { params: { project, applicationId } } = this.props
    if (this.props.isInstance) {
      browserHistory.push(`/admin/ui/module/${applicationId}/list`)
    } else {
      browserHistory.push(`/admin/${project}/ui/module/${applicationId}/list`)
    }
  }

  goToLayoutConfiguration = () => {
    const { params: { project, applicationId } } = this.props
    if (this.props.isInstance) {
      browserHistory.push(`/admin/ui/layout/${applicationId}`)
    } else {
      browserHistory.push(`/admin/${project}/layout/${applicationId}`)
    }
  }

  renderComponent() {
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
    if (this.props.layout) {
      availablecontainers = ContainerHelper.getAvailableContainersInLayout(this.props.layout.layout)
    }

    if (availablecontainers.length === 0) {
      return (<NoContainerAvailables
        goToLayoutConfiguration={this.goToLayoutConfiguration}
      />)
    }

    return (
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
    )
  }

  render() {
    return (
      <I18nProvider messageDir="modules/admin-ui-module-management/src/i18n">
        {this.renderComponent()}
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  module: ownProps.params.module_id ? ownProps.moduleSelectors.getContentById(state, ownProps.params.module_id) : null,
  duplicatedModule: ownProps.params.duplicate_module_id ? ownProps.moduleSelectors.getContentById(state, ownProps.params.duplicate_module_id) : null,
  layout: ownProps.params.applicationId ? ownProps.layoutSelectors.getContentById(state, ownProps.params.applicationId) : null,
  isFetching: ownProps.moduleSelectors.isFetching(state),
  form: getFormValues('edit-module-form')(state),
})

const mapDispatchToProps = dispatch => ({
  changeField: (field, value) => dispatch(change('edit-module-form', field, value)),
})

const UnconnectedModuleFormContainer = ModuleFormContainer
export {
  UnconnectedModuleFormContainer,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleFormContainer)
