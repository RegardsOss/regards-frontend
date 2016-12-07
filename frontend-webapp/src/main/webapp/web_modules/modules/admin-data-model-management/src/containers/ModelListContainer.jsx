import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import { logout } from '@regardsoss/authentication'
import ModelActions from '../model/ModelActions'
import ModelSelectors from '../model/ModelSelectors'
import ModelListComponent from '../components/ModelListComponent'

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
  }

  componentWillMount() {
    this.props.fetchProjectList()
  }

  getCreateUrl = () => '/admin/project/create'

  handleEdit = (projectName) => {
    const url = `/admin/project/${projectName}/edit`
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
      <I18nProvider messageDir="modules/admin-data-model-management/src/i18n">
        <ModelListComponent
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
  projectList: ModelSelectors.getList(state),
})
const mapDispatchToProps = dispatch => ({
  fetchProjectList: () => dispatch(ModelActions.fetchEntityList()),
  deleteProject: id => dispatch(ModelActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer)

