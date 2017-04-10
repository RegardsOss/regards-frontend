/**
 * LICENSE_PLACEHOLDER
 **/
import keys from 'lodash/keys'
import { browserHistory } from 'react-router'
import { FormLoadingComponent } from '@regardsoss/form-utils'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleShape } from '@regardsoss/modules'
import { connect } from '@regardsoss/redux'
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
    isInstance: React.PropTypes.bool,
    fetchModules: React.PropTypes.func,
    updateModule: React.PropTypes.func,
    deleteModule: React.PropTypes.func,
    // Set by mapStateToProps
    isFetching: React.PropTypes.bool,
    modules: React.PropTypes.objectOf(ModuleShape),
  }

  componentWillMount() {
    if (keys(this.props.modules).length === 0) {
      this.props.fetchModules(this.props.params.applicationId)
    }
  }

  getBackUrl = () => {
    if (this.props.isInstance) {
      return '/admin/ui/board'
    }
    const { params: { project } } = this.props
    return `/admin/${project}/ui/board`
  }

  handleEditModule = (module) => {
    if (this.props.isInstance) {
      const url = `/admin/ui/module/${this.props.params.applicationId}/${module.id}/edit`
      browserHistory.push(url)
    } else {
      const url = `/admin/${this.props.params.project}/ui/module/${this.props.params.applicationId}/${module.id}/edit`
      browserHistory.push(url)
    }
  }
  handleCreateModule = () => {
    if (this.props.isInstance) {
      const url = `/admin/ui/module/${this.props.params.applicationId}/create`
      browserHistory.push(url)
    } else {
      const url = `/admin/${this.props.params.project}/ui/module/${this.props.params.applicationId}/create`
      browserHistory.push(url)
    }
  }

  handleDuplicateModule = (module) => {
    if (this.props.isInstance) {
      const url = `/admin/ui/module/${this.props.params.applicationId}/${module.id}/duplicate`
      browserHistory.push(url)
    } else {
      const url = `/admin/${this.props.params.project}/ui/module/${this.props.params.applicationId}/${module.id}/duplicate`
      browserHistory.push(url)
    }
  }

  handleDeleteModule = (module) => {
    this.props.deleteModule(this.props.params.applicationId, module)
  }

  handleModuleActivation = (module) => {
    const moduleToUpdate = Object.assign({}, module)
    moduleToUpdate.conf = JSON.stringify(moduleToUpdate.conf)
    this.props.updateModule(this.props.params.applicationId, Object.assign({}, moduleToUpdate, { active: !module.active }))
  }

  render() {
    if (this.props.isFetching) {
      return (<FormLoadingComponent />)
    }

    return (
      <I18nProvider messageDir="modules/admin-ui-module-management/src/i18n">
        <ModuleListComponent
          modules={this.props.modules}
          onCreate={this.handleCreateModule}
          onEdit={this.handleEditModule}
          onDuplicate={this.handleDuplicateModule}
          onDelete={this.handleDeleteModule}
          onActivation={this.handleModuleActivation}
          backUrl={this.getBackUrl()}
          handleUpdate={this.props.updateModule}
        />
      </I18nProvider>
    )
  }
}

const UnconnectedModulesListContainer = ModulesListContainer
export {
  UnconnectedModulesListContainer,
}

const mapStateToProps = (state, ownProps) => ({
  modules: ownProps.moduleSelectors.getList(state),
  isFetching: ownProps.moduleSelectors.isFetching(state),
})

export default connect(mapStateToProps, null)(ModulesListContainer)
