/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import connect from '@regardsoss/redux'
import { ModuleShape } from '@regardsoss/modules'
import ModulesActions from '../model/modules/ModulesActions'
import ModulesSelector from '../model/modules/ModulesSelector'
import ModuleFormComponent from '../components/ModuleFormComponent'

/**
 * React component to display a edition form for Module entity
 */
class ModuleContainer extends React.Component {

  static propTypes = {
    // From react router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      application_id: React.PropTypes.string,
      module_id: React.PropTypes.string,
    }),
    // Set by mapDispatchToProps
    updateModule: React.PropTypes.func,
    createModule: React.PropTypes.func,
    fetchModule: React.PropTypes.func,
    // Set by mapStateToProps
    isFetching: React.PropTypes.bool,
    module: ModuleShape,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillMount() {
    if (this.props.params.module_id) {
      this.props.fetchModule(this.props.params.application_id, this.props.params.module_id)
    }
  }

  handleSubmit = (values) => {
    if (this.props.params.module_id) {
      return this.handleUpdate(values)
    }
    return this.handleCreate(values)
  }

  handleCreate = (values) => {
    const submitModel = Object.assign({}, ...values)
    Promise.resolve(this.props.createModule(submitModel))
      .then(() => {
        const url = this.getBackUrl()
        browserHistory.push(url)
      })
  }

  handleUpdate = (values) => {
    const submitModel = Object.assign({}, this.props.model, ...values)
    Promise.resolve(this.props.updateModule(this.props.params.application_id, submitModel))
      .then(this.handleBack)
  }

  handleBack = () => {
    const { params: { project, application_id } } = this.props
    browserHistory.push(`/admin/${project}/ui-configuration/applications/${application_id}/modules/list`)
  }

  render() {
    if (this.props.params.module_id && !this.props.module && this.props.isFetching) {
      return (<FormLoadingComponent />)
    }

    if (this.props.params.module_id && !this.props.module) {
      return (<FormEntityNotFoundComponent />)
    }

    return (
      <I18nProvider messageDir="modules/ui-configuration/src/i18n">
        <ModuleFormComponent
          applicationId={this.props.params.application_id}
          onSubmit={this.handleSubmit}
          onBack={this.handleBack}
          module={this.props.module}
        />
      </I18nProvider>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  module: ownProps.params.module_id ? ModulesSelector.getContentById(state, ownProps.params.module_id) : null,
  isFetching: ModulesSelector.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchModule: (applicationId, moduleId) => dispatch(ModulesActions.fetchEntity(moduleId, dispatch, [applicationId])),
  updateModule: (applicationId, module) => dispatch(ModulesActions.updateEntity(module.id, module, dispatch, [applicationId])),
  createModule: (applicationId, module) => dispatch(ModulesActions.createEntity(module.id, module, dispatch, [applicationId])),

})

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
