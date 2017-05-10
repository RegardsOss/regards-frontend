/*
 * LICENSE_PLACEHOLDER
 */
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import ProjectFormComponent from '../../components/project/ProjectFormComponent'
import { projectActions, projectSelectors } from '../../client/ProjectClient'

/**
 * React container to display an editing/creating Project form component
 * @author Sébastien Binda
 */
export class ProjectFormContainer extends React.Component {
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
        license: React.PropTypes.string,
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
  getBackUrl = () => ('/admin/projects/list')

  getProjectConnectionsUrl = project => (`/admin/projects/${project}/connections/guided`)

  getFormComponent = () => {
    if (this.state.isEditing) {
      const { project, isFetching } = this.props
      if (isFetching) {
        return (<FormLoadingComponent />)
      }
      if (project) {
        return (<ProjectFormComponent
          onSubmit={this.handleUpdate}
          backUrl={this.getBackUrl()}
          currentProject={this.props.project}
        />)
      }
      return (<FormEntityNotFoundComponent />)
    }
    return (<ProjectFormComponent
      onSubmit={this.handleCreate}
      backUrl={this.getBackUrl()}
    />)
  }
  handleUpdate = (values) => {
    const updatedProject = Object.assign({}, this.props.project.content, {
      description: values.description,
      icon: values.icon,
      license: values.license,
      isPublic: values.isPublic,
      isAccessible: values.isAccessible,
    })
    Promise.resolve(this.props.updateProject(this.props.project.content.name, updatedProject))
    .then((actionResult) => {
      // We receive here the action
      if (!actionResult.error) {
        const url = this.getBackUrl()
        browserHistory.push(url)
      }
    })
  }

  handleCreate = (values) => {
    Promise.resolve(this.props.createProject({
      name: values.name,
      description: values.description,
      license: values.license,
      icon: values.icon,
      isPublic: values.isPublic,
    }))
    .then((actionResult) => {
      // We receive here the action
      if (!actionResult.error) {
        console.log('RESULT', actionResult)
        const createdProject = actionResult.payload.entities.projects[actionResult.payload.result]
        const url = this.getProjectConnectionsUrl(createdProject.content.name)
        browserHistory.push(url)
      }
    })
  }

  render() {
    return (
      <I18nProvider messageDir="business-modules/admin-project-management/src/i18n">
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  project: ownProps.params.project_name ? projectSelectors.getById(state, ownProps.params.project_name) : null,
  isFetching: projectSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  createProject: values => dispatch(projectActions.createEntity(values)),
  updateProject: (id, values) => dispatch(projectActions.updateEntity(id, values)),
  fetchProject: projectName => dispatch(projectActions.fetchEntity(projectName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFormContainer)
