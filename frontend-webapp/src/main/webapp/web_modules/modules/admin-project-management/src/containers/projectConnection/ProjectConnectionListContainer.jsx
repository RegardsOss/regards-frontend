/*
 * LICENSE_PLACEHOLDER
 */
import keys from 'lodash/keys'
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import { I18nProvider } from '@regardsoss/i18n'
import { Project, ProjectConnection } from '@regardsoss/model'
import { LoadingComponent } from '@regardsoss/display-control'
import { FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { projectActions, projectSelectors } from '../../client/ProjectClient'
import { projectConnectionActions, projectConnectionSelectors } from '../../client/ProjectConnectionClient'
import ProjectConnectionListComponent from '../../components/projectConnection/ProjectConnectionListComponent'

/**
 * Connects a {@link ProjectConnectionListComponent} to the redux store.
 *
 * @author Xavier-Alexandre Brochard
 * @author Sébastien Binda
 */
export class ProjectConnectionListContainer extends React.Component {

  static propTypes = {
    params: React.PropTypes.shape({
      project_name: React.PropTypes.string.isRequired,
    }).isRequired,
    // from mapStateToProps
    project: Project,
    projectIsFetching: React.PropTypes.bool,
    projectConnections: React.PropTypes.objectOf(ProjectConnection),
    projectConnectionsIsFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchProject: React.PropTypes.func.isRequired,
    fetchProjectConnections: React.PropTypes.func,
  }

  componentWillMount() {
    if (keys(this.props.fetchProjectConnections).length === 0) {
      this.props.fetchProjectConnections(this.props.params.project_name)
    }
    if (!this.props.project) {
      this.props.fetchProject(this.props.params.project_name)
    }
  }

  handleClose = () => {
    const url = '/admin'
    browserHistory.push(url)
  }

  handleEdit = (projectConnectionId) => {
    const url = `/admin/projects/${this.props.params.project_name}/connections/${projectConnectionId}/edit`
    browserHistory.push(url)
  }

  handleCreate = (microserviceName) => {
    const url = `/admin/projects/${this.props.params.project_name}/connections/${microserviceName}/create`
    browserHistory.push(url)
  }

  render() {
    const { projectConnections } = this.props

    if (this.props.projectIsFetching || this.props.projectConnectionsIsFetching) {
      return <LoadingComponent />
    }

    if (!this.props.project) {
      return <FormEntityNotFoundComponent />
    }

    return (
      <I18nProvider messageDir="modules/admin-project-management/src/i18n">
        <ProjectConnectionListComponent
          project={this.props.project}
          projectConnections={projectConnections}
          onClose={this.handleClose}
          onEdit={this.handleEdit}
          onCreate={this.handleCreate}
        />
      </I18nProvider>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  project: projectSelectors.getById(state, ownProps.params.project_name),
  projectIsFetching: projectSelectors.isFetching(state),
  projectConnections: projectConnectionSelectors.getList(state),
  projectConnectionsIsFetching: projectConnectionSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchProject: projectName => dispatch(projectActions.fetchEntity(projectName)),
  fetchProjectConnections: projectName => dispatch(projectConnectionActions.fetchPagedEntityList(0, 0, {
    projectName,
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConnectionListContainer)
