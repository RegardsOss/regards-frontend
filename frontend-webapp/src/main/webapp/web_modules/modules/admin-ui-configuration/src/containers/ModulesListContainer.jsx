/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import { FormLoadingComponent } from '@regardsoss/form-utils'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { ModuleShape } from '@regardsoss/modules'
import { connect } from '@regardsoss/redux'
import ModulesSelector from '../model/modules/ModulesSelector'
import ModulesActions from '../model/modules/ModulesActions'
import ModulesInstanceActions from '../model/modules/ModulesInstanceActions'
import ModuleListComponent from '../components/ModuleListComponent'

/**
 * Module container to display list of configured modules for a given application id.
 * @author Sébastien binda
 */
class ModulesListContainer extends React.Component {

  static propTypes = {
    // From react router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      applicationId: React.PropTypes.string,
    }),
    // Set by mapDispatchToProps
    fetchModules: React.PropTypes.func,
    fetchInstanceModules: React.PropTypes.func,
    updateModule: React.PropTypes.func,
    updateInstanceModule: React.PropTypes.func,
    deleteModule: React.PropTypes.func,
    deleteInstanceModule: React.PropTypes.func,
    // Set by mapStateToProps
    isInstance: React.PropTypes.bool,
    isFetching: React.PropTypes.bool,
    modules: React.PropTypes.objectOf(ModuleShape),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillMount() {
    if (this.props.isInstance) {
      this.props.fetchInstanceModules(this.props.params.applicationId)
    } else {
      this.props.fetchModules(this.props.params.applicationId)
    }
  }

  handleEditModule = (module) => {
    const url = `/admin/${this.props.params.project}/ui-configuration/applications/${this.props.params.applicationId}/modules/${module.id}/edit`
    browserHistory.push(url)
  }
  handleCreateModule = () => {
    const url = `/admin/${this.props.params.project}/ui-configuration/applications/${this.props.params.applicationId}/modules/create`
    browserHistory.push(url)
  }

  handleDuplicateModule = (module) => {
    const url = `/admin/${this.props.params.project}/ui-configuration/applications/${this.props.params.applicationId}/modules/${module.id}/duplicate`
    browserHistory.push(url)
  }

  openDeleteDialogConfirm = (module) => {

  }

  handleDeleteModule = (module) => {
    if (this.props.isInstance) {
      this.props.deleteInstanceModule(this.props.params.applicationId, module)
    } else {
      this.props.deleteModule(this.props.params.applicationId, module)
    }
  }

  handleModuleActivation = (module) => {
    if (this.props.isInstance) {
      this.props.updateInstanceModule(this.props.params.applicationId, Object.assign({}, module, { active: !module.active }))
    } else {
      this.props.updateModule(this.props.params.applicationId, Object.assign({}, module, { active: !module.active }))
    }
  }

  render() {
    if (!this.props.modules || this.props.isFetching) {
      return (<FormLoadingComponent />)
    }

    const updateAction = this.props.isInstance ? this.props.updateInstanceModule : this.props.updateModule

    return (
      <I18nProvider messageDir="modules/admin-ui-configuration/src/i18n">
        <ModuleListComponent
          modules={this.props.modules}
          onCreate={this.handleCreateModule}
          onEdit={this.handleEditModule}
          onDuplicate={this.handleDuplicateModule}
          onDelete={this.handleDeleteModule}
          onActivation={this.handleModuleActivation}
          handleUpdate={updateAction}
        />
      </I18nProvider>
    )
  }
}

const UnconnectedModulesListContainer = ModulesListContainer
export {
  UnconnectedModulesListContainer,
}

const mapStateToProps = state => ({
  modules: ModulesSelector.getList(state),
  isFetching: ModulesSelector.isFetching(state),
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})
const mapDispatchToProps = dispatch => ({
  fetchModules: applicationId => dispatch(ModulesActions.fetchPagedEntityList(0, 100, { applicationId })),
  fetchInstanceModules: applicationId => dispatch(ModulesInstanceActions.fetchPagedEntityList(0, 100, { applicationId })),
  updateModule: (applicationId, module) => dispatch(ModulesActions.updateEntity(module.id, module, { applicationId })),
  updateInstanceModule: (applicationId, module) => dispatch(ModulesInstanceActions.updateEntity(module.id, module, { applicationId })),
  deleteModule: (applicationId, module) => dispatch(ModulesActions.deleteEntity(module.id, { applicationId })),
  deleteInstanceModule: (applicationId, module) => dispatch(ModulesInstanceActions.deleteEntity(module.id, { applicationId })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModulesListContainer)
