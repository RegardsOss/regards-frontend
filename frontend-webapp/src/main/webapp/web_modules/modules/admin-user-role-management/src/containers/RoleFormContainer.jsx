import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import ProjectActions from '../model/ProjectActions'
import RoleFormComponent from '../components/RoleFormComponent'
import ProjectSelectors from '../model/ProjectSelectors'

export class RoleFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project_name: React.PropTypes.string,
    }),
    // from mapStateToProps
    project: React.PropTypes.shape({
      content: React.PropTypes.shape({
        id: React.PropTypes.number,
        name: React.PropTypes.string,
        description: React.PropTypes.string,
        icon: React.PropTypes.string,
        isPublic: React.PropTypes.bool,
      }),
    }),
    isFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    createProject: React.PropTypes.func,
    fetchProject: React.PropTypes.func,
    updateProject: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isEditing: props.params.project_name !== undefined,
    }
  }

  componentDidMount() {
    if (this.state.isEditing) {
      this.props.fetchProject(this.props.params.project_name)
    }
  }
  getBackUrl = () => ('/admin/project/list')

  getFormComponent = () => {
    if (this.state.isEditing) {
      const { project, isFetching } = this.props
      if (isFetching) {
        return (<span>Loading</span>)
      }
      if (project) {
        return (<RoleFormComponent
          onSubmit={this.handleUpdate}
          backUrl={this.getBackUrl()}
          currentProject={this.props.project}
        />)
      }
      return (<span>Something went wrong</span>)
    }
    return (<RoleFormComponent
      onSubmit={this.handleCreate}
      backUrl={this.getBackUrl()}
    />)
  }
  handleUpdate = (values) => {
    const updatedProject = Object.assign({}, this.props.project.content, {
      description: values.description,
      icon: values.icon,
      isPublic: values.isPublic,
    })
    Promise.resolve(this.props.updateProject(this.props.project.content.name, updatedProject))
    .then(() => {
      const url = this.getBackUrl()
      browserHistory.push(url)
    })
  }

  handleCreate = (values) => {
    Promise.resolve(this.props.createProject({
      name: values.name,
      description: values.description,
      icon: values.icon,
      isPublic: values.isPublic,
    }))
    .then(() => {
      const url = this.getBackUrl()
      browserHistory.push(url)
    })
  }
  render() {
    return (
      <I18nProvider messageDir="modules/admin-project-management/src/i18n">
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  project: ownProps.params.project_name ? ProjectSelectors.getById(state, ownProps.params.project_name) : null,
  isFetching: ProjectSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  createProject: values => dispatch(ProjectActions.createEntity(values)),
  updateProject: (id, values) => dispatch(ProjectActions.updateEntity(id, values)),
  fetchProject: projectName => dispatch(ProjectActions.fetchEntity(projectName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoleFormContainer)
