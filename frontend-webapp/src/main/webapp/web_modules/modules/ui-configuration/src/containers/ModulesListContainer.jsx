/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { ModuleShape } from '@regardsoss/modules'
import connect from '@regardsoss/redux'
import ModulesSelector from '../model/modules/ModulesSelector'
import ModulesActions from '../model/modules/ModulesActions'
import ModuleListComponent from '../components/ModuleListComponent'

/**
 * Module container to display list of configured modules for a given application id.
 */
class ModulesListContainer extends React.Component {

  static propTypes = {
    // From react router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      application_id: React.PropTypes.string,
    }),
    // Set by mapDispatchToProps
    fetchModules: React.PropTypes.func,
    updateModule: React.PropTypes.func,
    deleteModule: React.PropTypes.func,
    // Set by mapStateToProps
    isFetching: React.PropTypes.bool,
    modules: React.PropTypes.objectOf(ModuleShape),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillMount() {
    this.props.fetchModules(this.props.params.application_id)
  }

  handleEditModule = (module) => {
    const url = `/admin/${this.props.params.project}/ui-configuration/applications/${this.props.params.application_id}/modules/${module.id}/edit`
    browserHistory.push(url)
  }
  handleCreateModule = () => {
    const url = `/admin/${this.props.params.project}/ui-configuration/applications/${this.props.params.application_id}/modules/create`
    browserHistory.push(url)
  }

  openDeleteDialogConfirm = (module) => {

  }

  handleDeleteModule = (module) => {
    this.props.deleteModule(this.props.params.application_id, module)
  }

  handleModuleActivation = (module) => {
    this.props.updateModule(this.props.params.application_id, Object.assign({}, module, { active: !module.active }))
  }

  render() {
    if (!this.props.modules && this.props.isFetching) {
      return (<FormLoadingComponent />)
    }

    if (!this.props.modules) {
      return (<FormEntityNotFoundComponent />)
    }

    return (
      <I18nProvider messageDir="modules/ui-configuration/src/i18n">
        <ModuleListComponent
          modules={this.props.modules}
          onCreate={this.handleCreateModule}
          onEdit={this.handleEditModule}
          onDelete={this.handleDeleteModule}
          onActivation={this.handleModuleActivation}
          handleUpdate={this.props.updateModule}
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = state => ({
  modules: ModulesSelector.getList(state),
  isFetching: ModulesSelector.isFetching(state),
})
const mapDispatchToProps = dispatch => ({
  fetchModules: applicationId => dispatch(ModulesActions.fetchEntityList(dispatch, [applicationId])),
  updateModule: (applicationId, module) => dispatch(ModulesActions.updateEntity(module.id, module, dispatch, [applicationId])),
  deleteModule: (applicationId, module) => dispatch(ModulesActions.deleteEntity(module.id, dispatch, [applicationId])),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModulesListContainer)
