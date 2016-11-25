import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import { map } from 'lodash'
import * as actions from '../model/ProjectActions'
import ProjectSelectors from '../model/ProjectSelectors'
import ProjectListComponent from '../components/ProjectListComponent'
import { logout } from '@regardsoss/authentication'

/**
 * React container to manage ManageProjectsComponent.
 *
 * @prop {Array<Project>} projects List of projects to display
 * @prop {Boolean} projectConfigurationIsShown ProjectConfigurationComponent display status
 *
 */
export class ProjectListContainer extends React.Component {

  static propTypes = {
    projectList: React.PropTypes.objectOf(
      React.PropTypes.shape({
        content: React.PropTypes.shape({
          id: React.PropTypes.number,
          name: React.PropTypes.string,
          description: React.PropTypes.string,
          isPublic: React.PropTypes.bool,
        }),
      }),
    ),
    fetchProjectList: React.PropTypes.func,
    deleteProject: React.PropTypes.func,
    createProject: React.PropTypes.func,
    onLogout: React.PropTypes.func,
    theme: React.PropTypes.objectOf(React.PropTypes.string),
  }
  componentWillMount() {
    this.props.fetchProjectList()
  }

  getCreateUrl = () => '/admin/project/create'

  handleEdit = (id) => {
    const url = `/admin/project/${id}/edit`
    browserHistory.push(url)
  }

  handleDelete =(projectName) => {
    this.props.deleteProject(projectName)
  }

  handleOpen =(projectName) => {
    this.props.onLogout()
    const url = `/admin/${projectName}`
    browserHistory.push(url)
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
        />
      </I18nProvider>
    )
  }
}
const mapStateToProps = state => ({
  projectList: ProjectSelectors.getProjectList(state),
})
const mapDispatchToProps = dispatch => ({
  fetchProjectList: () => dispatch(actions.fetchProjectList()),
  deleteProject: id => dispatch(actions.deleteProject(id)),
  createProject: () => dispatch(actions.createProject()),
  onLogout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer)

