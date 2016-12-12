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
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapStateToProps
    modelList: React.PropTypes.objectOf(
      React.PropTypes.shape({
        content: React.PropTypes.shape({
          id: React.PropTypes.number,
          name: React.PropTypes.string,
          description: React.PropTypes.string,
          type: React.PropTypes.string,
        }),
      }),
    ),
    // from mapDispatchToProps
    fetchModelList: React.PropTypes.func,
    deleteModel: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchModelList()
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/model/create`
  }
  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/board`
  }

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
    const { modelList } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-model-management/src/i18n">
        <ModelListComponent
          modelList={modelList}
          createUrl={this.getCreateUrl()}
          backUrl={this.getBackUrl()}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          handleOpen={this.handleOpen}
        />
      </I18nProvider>
    )
  }
}
const mapStateToProps = state => ({
  modelList: ModelSelectors.getList(state),
})
const mapDispatchToProps = dispatch => ({
  fetchModelList: () => dispatch(ModelActions.fetchEntityList()),
  deleteModel: id => dispatch(ModelActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer)

