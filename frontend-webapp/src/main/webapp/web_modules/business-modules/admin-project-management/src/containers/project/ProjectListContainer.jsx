/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { AdminShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { AuthenticationClient } from '@regardsoss/authentication-manager'
import NotifyLicenseUpdatedActions from '../../model/NotifyLicenseUpdatedActions'
import { projectActions, projectSelectors } from '../../clients/ProjectClient'
import ProjectListComponent from '../../components/project/ProjectListComponent'

/**
 * React container to manage ManageProjectsComponent.
 *
 * @prop {Array<Project>} projects List of projects to display
 * @prop {Boolean} projectConfigurationIsShown ProjectConfigurationComponent display status
 *
 * @author Sébastien Binda
 */
export class ProjectListContainer extends React.Component {

  static propTypes = {
    projectList: AdminShapes.ProjectList,
    fetchProjectList: PropTypes.func,
    deleteProject: PropTypes.func,
    updateLicense: PropTypes.func,
    onLogout: PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchProjectList()
  }

  getCreateUrl = () => '/admin/projects/create'

  handleEdit = (projectName) => {
    const url = `/admin/projects/${projectName}/edit`
    browserHistory.push(url)
  }

  handleConfigureConnections = (projectName) => {
    const url = `/admin/projects/${projectName}/connections`
    browserHistory.push(url)
  }

  handleDelete = (projectName) => {
    this.props.deleteProject(projectName)
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.props.fetchProjectList()
        }
      })
  }

  handleOpen = (projectName) => {
    this.props.onLogout()
    const url = `/admin/${projectName}`
    browserHistory.push(url)
  }

  handleUpdateLicense = (projectName) => {
    this.props.updateLicense(projectName)
  }


  render() {
    const { projectList } = this.props
    return (
      <I18nProvider messageDir="business-modules/admin-project-management/src/i18n">
        <ProjectListComponent
          projectList={projectList}
          createUrl={this.getCreateUrl()}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          handleConfigureConnections={this.handleConfigureConnections}
          handleOpen={this.handleOpen}
          handleUpdateLicense={this.handleUpdateLicense}
        />
      </I18nProvider>
    )
  }
}
const mapStateToProps = state => ({
  projectList: projectSelectors.getList(state),
})
const mapDispatchToProps = dispatch => ({
  fetchProjectList: () => dispatch(projectActions.fetchPagedEntityList(0, 100)),
  deleteProject: projectName => dispatch(projectActions.deleteEntity(projectName)),
  updateLicense: projectName => dispatch(NotifyLicenseUpdatedActions.sendLicenseUpdatedNotification(projectName)),
  onLogout: () => dispatch(AuthenticationClient.authenticationActions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer)

