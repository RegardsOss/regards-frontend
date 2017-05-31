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
import GuidedProjectConfigurationComponent from '../../components/projectConnection/GuidedProjectConfigurationComponent'

/**
 * Container to manage project connection for each microservices.
 * This container is used to render two differents components :
 * - GuidedProjectConfigurationComponent : A stepper to configure one by one each connection to each microservice
 * - ProjectConnectionFormComponent : A simple form to configure one connection to one microservice
 *
 * The two component can handle an option <configureOneForAll> to apply the configuration to all connections at one time.
 * This mode is used to use the same connection for all microservices.
 *
 * @author Xavier-Alexandre Brochard
 * @author Sébastien Binda
 */
export class ProjectConnectionsContainer extends React.Component {

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

  componentDidMount() {
    // Retrieve all connections for the given project
    this.props.fetchProjectConnections(this.props.params.project_name)

    // Retrieve project if not already in store.
    if (!this.props.project) {
      this.props.fetchProject(this.props.params.project_name)
    }

    if (this.props.params.project_connection_id || this.props.params.microservice_name) {
      // Set default mode to configureOneForAll OFF for Simple Form rendering
      this.setState({ configureOneForAll: false })
    } else {
      // Set default mode to configureOneForAll ON for Guided rendering
      this.setState({ configureOneForAll: true })
    }
  }

  /**
   * Callback used to swith mode of option <configureOneForAll>.
   * This option allow to apply a connection configuration to all connections of the project
   */
  onChangeConfigurationMode = () => {
    this.setState({
      configureOneForAll: !this.state.configureOneForAll,
    })
  }

  /**
   * Method to create a new connection.
   * If the <configureOneForAll> is on, the same configuration is applied to all microservices.
   *
   * @param projectConnection
   */
  onCreate = (projectConnection, successCallBack) => {
    if (this.state.configureOneForAll) {
      this.onCreateAll(projectConnection)
    } else {
      Promise.resolve(this.props.createProjectConnection(projectConnection))
        .then((actionResult) => {
          // We receive here the action
          if (!actionResult.error) {
            if (successCallBack) {
              successCallBack()
            } else {
              this.handleBack()
            }
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

  /**
   * Method to update an existing connection.
   * If the <configureOneForAll> is on, the same configuration is applied to all microservices.
   *
   * @param projectConnection
   */
  onUpdate = (id, projectConnection, successCallBack) => {
    if (this.state.configureOneForAll) {
      this.onCreateAll(projectConnection)
    } else {
      Promise.resolve(this.props.updateProjectConnection(id, projectConnection))
        .then((actionResult) => {
          // We receive here the action
          if (!actionResult.error) {
            if (successCallBack) {
              successCallBack()
            } else {
              this.handleBack()
            }
          } else {
            this.setState({
              errorMessage: this.context.intl.formatMessage({ id: 'project.connection.form.error.server' }),
            })
          }
        })
    }
  }

  /**
   * Callback for submit success. Return to the list of connections.
   */
  handleBack = () => {
    browserHistory.push(`/admin/projects/${this.props.params.project_name}/connections`)
  }

  /**
   * Return a form with guided step to configure all microservices
   * @returns {XML}
   */
  renderGuidedForm() {
    const { projectConnections } = this.props

    if (this.props.projectIsFetching || this.props.projectConnectionsIsFetching) {
      return <LoadingComponent />
    }

    if (!this.props.project) {
      return <FormEntityNotFoundComponent />
    }

    return (
      <I18nProvider messageDir="business-modules/admin-project-management/src/i18n">
        <GuidedProjectConfigurationComponent
          project={this.props.project}
          projectConnections={projectConnections}
          configureOneForAll={this.state.configureOneForAll}
          errorMessage={this.state.errorMessage}
          onCreate={this.onCreate}
          onUpdate={this.onUpdate}
          onChangeConfigurationMode={this.onChangeConfigurationMode}
        />
      </I18nProvider>
    )
  }

  /**
   * Render a form to edit a microservices connection
   * @returns {XML}
   */
  renderSimpleForm() {
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
              configureOneForAll={this.state.configureOneForAll}
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

  render() {
    // If create mode : the microservice_name is passed in the router params
    // If edition mode : the project_connection_id to edit is passed in the router params
    if (this.props.params.project_connection_id || this.props.params.microservice_name) {
      return this.renderSimpleForm()
    }
      // Else, guided mode, to edit all connection at a time.
    return this.renderGuidedForm()
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConnectionsContainer)
