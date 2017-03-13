/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { Project } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { AuthenticateActions } from '@regardsoss/authentication-manager'
import ProjectActions from '../model/ProjectActions'
import NotifyLicenseUpdatedActions from '../model/NotifyLicenseUpdatedActions'
import ProjectSelectors from '../model/ProjectSelectors'
import ProjectListComponent from '../components/ProjectListComponent'

/**
 * React container to manage ManageProjectsComponent.
 *
 * @prop {Array<Project>} projects List of projects to display
 * @prop {Boolean} projectConfigurationIsShown ProjectConfigurationComponent display status
 *
 */
export class ProjectListContainer extends React.Component {

  static propTypes = {
    projectList: React.PropTypes.objectOf(Project),
    fetchProjectList: React.PropTypes.func,
    deleteProject: React.PropTypes.func,
    updateLicense: React.PropTypes.func,
    onLogout: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchProjectList()
  }

  getCreateUrl = () => '/admin/project/create'

  handleEdit = (projectName) => {
    const url = `/admin/project/${projectName}/edit`
    browserHistory.push(url)
  }

  handleDelete = (projectName) => {
    this.props.deleteProject(projectName)
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
      <I18nProvider messageDir="modules/admin-project-management/src/i18n">
        <ProjectListComponent
          projectList={projectList}
          createUrl={this.getCreateUrl()}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          handleOpen={this.handleOpen}
          handleUpdateLicense={this.handleUpdateLicense}
        />
      </I18nProvider>
    )
  }
}
const mapStateToProps = state => ({
  projectList: ProjectSelectors.getList(state),
})
const mapDispatchToProps = dispatch => ({
  fetchProjectList: () => dispatch(ProjectActions.fetchPagedEntityList(0, 100)),
  deleteProject: projectName => dispatch(ProjectActions.deleteEntity(projectName)),
  updateLicense: projectName => dispatch(NotifyLicenseUpdatedActions.sendLicenseUpdatedNotification(projectName)),
  onLogout: () => dispatch(AuthenticateActions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer)

