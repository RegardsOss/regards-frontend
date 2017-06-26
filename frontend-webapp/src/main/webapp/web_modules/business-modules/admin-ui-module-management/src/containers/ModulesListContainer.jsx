/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { I18nProvider } from '@regardsoss/i18n'
import { AccessShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import ModuleListComponent from '../components/ModuleListComponent'

/**
 * Module container to display list of configured modules for a given application id.
 * @author Sébastien binda
 * @author Léo Mieulet
 */
class ModulesListContainer extends React.Component {

  static propTypes = {
    // From react router
    params: PropTypes.shape({
      project: PropTypes.string,
      applicationId: PropTypes.string,
    }),
    isInstance: PropTypes.bool,
    fetchModules: PropTypes.func,
    updateModule: PropTypes.func,
    deleteModule: PropTypes.func,
    // Set by mapStateToProps
    modules: AccessShapes.ModuleList,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    Promise.resolve(this.props.fetchModules(this.props.params.applicationId))
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
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
    return (
      <I18nProvider messageDir="business-modules/admin-ui-module-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={this.state.isLoading}
        >
          {() =>
            (<ModuleListComponent
              modules={this.props.modules}
              onCreate={this.handleCreateModule}
              onEdit={this.handleEditModule}
              onDuplicate={this.handleDuplicateModule}
              onDelete={this.handleDeleteModule}
              onActivation={this.handleModuleActivation}
              backUrl={this.getBackUrl()}
              handleUpdate={this.props.updateModule}
            />)
          }
        </LoadableContentDisplayDecorator>
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
})

export default connect(mapStateToProps, null)(ModulesListContainer)
