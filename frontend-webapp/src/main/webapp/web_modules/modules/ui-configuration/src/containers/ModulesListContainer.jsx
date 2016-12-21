/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { RequestErrorShape } from '@regardsoss/store-utils'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { ModuleShape } from '@regardsoss/modules'
import connect from '@regardsoss/redux'
import { ApplicationErrorAction } from '@regardsoss/global-sytem-error'
import ModulesSelector from '../model/modules/ModulesSelector'
import ModulesActions from '../model/modules/ModulesActions'
import ModuleListComponent from '../components/ModuleListComponent'
import { EditModuleRoute } from '../router'

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
    throwError: React.PropTypes.func,
    // Set by mapStateToProps
    isFetching: React.PropTypes.bool,
    modules: React.PropTypes.objectOf(ModuleShape),
    error: RequestErrorShape,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillMount() {
    this.props.fetchModules(this.props.params.application_id)
  }

  handleEditModule = (module) => {
    const url = `/admin/${this.props.params.project}/ui-configuration/applications/${this.props.params.application_id}/modules/${module.id}`
    browserHistory.push(url)
  }

  handleDeleteModule = (module) => {

  }

  handleModuleActivation = (module) => {
    this.props.updateModule(module)
  }

  handleError = () => {
    if (this.props.error.hasError === true) {
      return (
        <Snackbar
          open={this.state.snackBarOpen}
          message={this.props.error.message}
          autoHideDuration={4000}
          onRequestClose={this.closeSnackBar}
          onActionTouchTap={this.closeSnackBar}
          action="OK"
        />
      )
    }
    return null
  }

  render() {
    if (!this.props.modules && this.props.isFetching) {
      return (<FormLoadingComponent />)
    }

    if (!this.props.modules) {
      return (<FormEntityNotFoundComponent />)
    }

    if (this.props.error.hasError === true) {
      this.props.throwError(this.props.error.message)
    }

    return (
      <I18nProvider messageDir="modules/ui-configuration/src/i18n">
        <ModuleListComponent
          modules={this.props.modules}
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
  error: ModulesSelector.getError(state),
})
const mapDispatchToProps = dispatch => ({
  fetchModules: applicationId => dispatch(ModulesActions.fetchEntityList([applicationId])),
  updateModule: module => dispatch(ModulesActions.updateEntity(module.id, module)),
  throwError: message => dispatch(ApplicationErrorAction.throwError(message)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModulesListContainer)
