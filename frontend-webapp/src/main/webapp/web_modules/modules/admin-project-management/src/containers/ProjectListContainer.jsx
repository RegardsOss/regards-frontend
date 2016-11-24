import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { injectTheme } from '@regardsoss/theme'
import { I18nProvider } from '@regardsoss/i18n'
import { map } from 'lodash'
import * as actions from '../model/ProjectActions'
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
    theme: React.PropTypes.objectOf(React.PropTypes.string),
  }
  componentWillMount() {
    this.props.fetchProjectList()
  }

  getCreateUrl = () => '/admin/project/create'

  handleView = (selectedRows) => {
    if (selectedRows instanceof String) {
      throw new Error('Only a single row should be selected in the table')
    }
    if (selectedRows instanceof Array && selectedRows.length !== 1) {
      throw new Error('Exactly one row is expected to be selected in the table')
    }

    const project = this.props.projectList[selectedRows[0]]
    const url = `/admin/cdpp/projects/'${project.projectId}`
    browserHistory.push(url)
  }

  handleEdit = () => {
    console.log('Todo')
  }

  handleDelete =(id) => {
    this.props.deleteProject(id)
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
          handleView={this.handleView}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer)

