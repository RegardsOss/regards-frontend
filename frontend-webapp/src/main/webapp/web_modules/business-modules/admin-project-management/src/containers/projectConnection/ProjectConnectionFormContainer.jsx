/*
 * LICENSE_PLACEHOLDER
 */
import map from 'lodash/map'
import find from 'lodash/find'
import filter from 'lodash/filter'
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
    params: PropTypes.shape({
      project_name: PropTypes.string,
      microservice_name: PropTypes.string,
      project_connection_id: PropTypes.string,
    }),
    // from mapStateToProps
    project: Project,
    projectIsFetching: PropTypes.bool,
    // Current project connection to edit
    projectConnection: ProjectConnection,
    // All project connection of the current editing project
    projectConnections: PropTypes.objectOf(ProjectConnection),
    projectConnectionsIsFetching: PropTypes.bool,
    // from mapDispatchToProps
    fetchProject: PropTypes.func,
    fetchProjectConnections: PropTypes.func,
    updateProjectConnection: PropTypes.func,
    createProjectConnection: PropTypes.func,
  }

  state = {
    configureOneForAll: false,
    errorMessage: null,
  }

  componentWillMount() {
    // Editing mode, retrieve the connectio to edit if it is not already in the store.
    if (this.props.params.project_connection_id && !this.props.projectConnection) {
      this.props.fetchProjectConnections(this.props.params.project_name)
    }

    // Retrieve project if not already in store.
    if (!this.props.project) {
      this.props.fetchProject(this.props.params.project_name)
    }
  }

  onChangeConfigurationMode = () => {
    this.setState({
      configureOneForAll: !this.state.configureOneForAll,
    })
  }

  onCreate = (projectConnection) => {
    if (this.state.configureOneForAll) {
      this.onCreateAll(projectConnection)
    } else {
      Promise.resolve(this.props.createProjectConnection(projectConnection))
        .then((actionResult) => {
          // We receive here the action
          if (!actionResult.error) {
            this.handleBack()
          } else {
            this.setState({
              errorMessage: this.context.intl.formatMessage({ id: 'project.connection.form.error.server' }),
            })
          }
        })
    }
  }

  /**
   * Create identical connection for each microservice with the given configuration
   * @param projectConnection
   */
  onCreateAll = (projectConnection) => {
    // Create the same connection for all microservices
    const actions = map(STATIC_CONFIGURATION.microservices, (microservice) => {
      // Check if connection already exists
      const prevConnection = find(this.props.projectConnections, { content: { microservice } })
      // If connection already exists add id
      const connection = Object.assign({}, projectConnection, {
        id: prevConnection ? prevConnection.content.id : undefined,
        microservice,
      })
      if (connection.id) {
        // Update connection
        return this.props.updateProjectConnection(connection.id, connection, this.props.project.content.name)
      }
        // Save new connection
      return this.props.createProjectConnection(connection, this.props.project.content.name)
    })
    Promise.all(actions).then(
      (actionsResults) => {
        const errors = filter(actionsResults, { error: true })
        if (!errors || errors.length === 0) {
          this.handleBack()
        } else {
          this.setState({
            errorMessage: this.context.intl.formatMessage({ id: 'project.connection.form.error.server' }),
          })
        }
      },
    )
  }

  onUpdate = (id, projectConnection) => {
    if (this.state.configureOneForAll) {
      this.onCreateAll(projectConnection)
    } else {
      Promise.resolve(this.props.updateProjectConnection(id, projectConnection))
        .then((actionResult) => {
          // We receive here the action
          if (!actionResult.error) {
            this.handleBack()
          } else {
            this.setState({
              errorMessage: this.context.intl.formatMessage({ id: 'project.connection.form.error.server' }),
            })
          }
        })
    }
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
              configureOnForAll={this.state.configureOneForAll}
              errorMessage={this.state.errorMessage}
              onUpdate={this.onUpdate}
              onCreate={this.onCreate}
              onCancel={this.handleBack}
              onChangeConfigurationMode={this.onChangeConfigurationMode}
            />
          </CardText>
        </Card>
      </I18nProvider>
    )
  }

}

const mapStateToProps = (state, ownProps) => ({
  projectConnection: ownProps.params.project_connection_id ? projectConnectionSelectors.getById(state, ownProps.params.project_connection_id) : null,
  projectConnections: projectConnectionSelectors.getList(state),
  projectConnectionsIsFetching: ownProps.params.project_connection_id ? projectConnectionSelectors.isFetching(state) : false,
  project: ownProps.params.project_name ? projectSelectors.getById(state, ownProps.params.project_name) : null,
  projectIsFetching: ownProps.params.project_name ? projectSelectors.isFetching(state) : false,
})

const mapDispatchToProps = dispatch => ({
  fetchProjectConnections: projectName =>
    dispatch(projectConnectionActions.fetchPagedEntityList(0, 0, {
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
