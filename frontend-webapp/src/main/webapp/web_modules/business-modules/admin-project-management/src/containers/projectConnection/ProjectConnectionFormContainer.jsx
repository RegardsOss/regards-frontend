/*
 * LICENSE_PLACEHOLDER
 */
import { browserHistory } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { I18nProvider } from '@regardsoss/i18n'
import { connect } from '@regardsoss/redux'
import { Project, ProjectConnection } from '@regardsoss/model'
import { LoadingComponent } from '@regardsoss/display-control'
import { FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { projectActions, projectSelectors } from '../../client/ProjectClient'
import { projectConnectionActions, projectConnectionSelectors } from '../../client/ProjectConnectionClient'
import ProjectConnectionFormComponent from '../../components/projectConnection/ProjectConnectionFormComponent'

/**
 * React container to display an editing/creating ProjectConnection form component
 * @author Sébastien Binda
 */
export class ProjectConnectionFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project_name: React.PropTypes.string,
      microservice_name: React.PropTypes.string,
      project_connection_id: React.PropTypes.string,
    }),
    // from mapStateToProps
    project: Project,
    projectIsFetching: React.PropTypes.bool,
    projectConnection: ProjectConnection,
    projectConnectionsIsFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchProject: React.PropTypes.func,
    fetchProjectConnection: React.PropTypes.func,
    updateProjectConnection: React.PropTypes.func,
    createProjectConnection: React.PropTypes.func,
  }

  componentWillMount() {
    // Editing mode, retrieve the connectio to edit if it is not already in the store.
    if (this.props.params.project_connection_id && !this.props.projectConnection) {
      this.props.fetchProjectConnection(this.props.params.project_connection_id, this.props.params.project_name)
    }

    // Retrieve project if not already in store.
    if (!this.props.project) {
      this.props.fetchProject(this.props.params.project_name)
    }
  }

  onCreate = (projectConnection) => {
    Promise.resolve(this.props.createProjectConnection(projectConnection))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.handleBack()
        }
      })
  }

  onUpdate = (id, projectConnection) => {
    Promise.resolve(this.props.updateProjectConnection(id, projectConnection))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.handleBack()
        }
      })
  }

  handleBack = () => {
    browserHistory.push(`/admin/projects/${this.props.params.project_name}/connections`)
  }

  render() {
    const microservice = this.props.projectConnection ?
      this.props.projectConnection.content.microservice : this.props.params.microservice_name

    if (this.props.projectIsFetching || this.props.projectConnectionsIsFetching) {
      return <LoadingComponent />
    }

    if (!this.props.project || (this.props.params.project_connection_id && !this.props.projectConnection)) {
      return <FormEntityNotFoundComponent />
    }

    return (
      <I18nProvider messageDir="business-modules/admin-project-management/src/i18n">
        <Card>
          <CardTitle
            title={<FormattedMessage
              id="database.form.edit.title"
              values={{
                microservice,
                project: this.props.project.content.name,
              }}
            />}
          />
          <CardText>
            <ProjectConnectionFormComponent
              project={this.props.project}
              microservice={microservice}
              projectConnection={this.props.projectConnection}
              onUpdate={this.onUpdate}
              onCreate={this.onCreate}
              onCancel={this.handleBack}
            />
          </CardText>
        </Card>
      </I18nProvider>
    )
  }

}

const mapStateToProps = (state, ownProps) => ({
  projectConnection: ownProps.params.project_connection_id ? projectConnectionSelectors.getById(state, ownProps.params.project_connection_id) : null,
  projectConnectionsIsFetching: ownProps.params.project_connection_id ? projectConnectionSelectors.isFetching(state) : false,
  project: ownProps.params.project_name ? projectSelectors.getById(state, ownProps.params.project_name) : null,
  projectIsFetching: ownProps.params.project_name ? projectSelectors.isFetching(state) : false,
})

const mapDispatchToProps = dispatch => ({
  fetchProjectConnection: (projectConnectionId, projectName) => dispatch(projectConnectionActions.fetchEntity(projectConnectionId, {
    projectName,
  })),
  updateProjectConnection: (id, projectConnection) => dispatch(projectConnectionActions.updateEntity(id, projectConnection, {
    projectName: projectConnection.project.name,
  })),
  createProjectConnection: projectConnection => dispatch(projectConnectionActions.createEntity(projectConnection, {
    projectName: projectConnection.project.name,
  })),
  fetchProject: projectName => dispatch(projectActions.fetchEntity(projectName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConnectionFormContainer)
