/*
 * LICENSE_PLACEHOLDER
 */
import map from 'lodash/map'
import find from 'lodash/find'
import filter from 'lodash/filter'
import keys from 'lodash/keys'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Project, ProjectConnection } from '@regardsoss/model'
import { LoadingComponent } from '@regardsoss/display-control'
import { FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { projectConnectionActions, projectConnectionSelectors } from '../../client/ProjectConnectionClient'
import { projectActions, projectSelectors } from '../../client/ProjectClient'
import GuidedProjectConfigurationComponent from '../../components/projectConnection/GuidedProjectConfigurationComponent'

/**
 * Connects a {@link GuidedProjectConfigurationComponent} to the redux store.
 *
 * @author Xavier-Alexandre Brochard
 * @author Sébastien Binda
 */
export class GuidedProjectConfigurationContainer extends React.Component {

  static propTypes = {
    // from router
    // eslint-disable-next-line react/no-unused-prop-types
    params: PropTypes.shape({
      project_name: PropTypes.string,
    }),
    // from mapStateToProps
    projectConnections: PropTypes.objectOf(ProjectConnection),
    projectConnectionsIsFetching: PropTypes.bool,
    project: Project,
    projectIsFetching: PropTypes.bool,
    // from mapDispatchToProps
    fetchProject: PropTypes.func.isRequired,
    fetchProjectConnections: PropTypes.func.isRequired,
    updateProjectConnection: PropTypes.func.isRequired,
    saveProjectConnection: PropTypes.func.isRequired,
  }

  state = {
    // Default value for configuration mode. Use the configure one connection for all by default.
    configureOneForAll: true,
    // Error message if the submit of create or update a connection is invalid
    errorMessage: null,
  }

  componentWillMount() {
    if (keys(this.props.fetchProjectConnections).length === 0) {
      this.props.fetchProjectConnections(this.props.params.project_name)
    }
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
      Promise.resolve(this.props.saveProjectConnection(projectConnection))
        .then((actionResult) => {
          // We receive here the action
          if (!actionResult.error) {
            this.handleBack()
          } else {
            this.setState({
              errorMessage: 'project.connection.form.error.server',
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
      return this.props.saveProjectConnection(connection, this.props.project.content.name)
    })
    Promise.all(actions).then(
      (actionsResults) => {
        const errors = filter(actionsResults, { error: true })
        if (!errors || errors.length === 0) {
          this.handleBack()
        } else {
          this.setState({
            errorMessage: 'project.connection.form.error.server',
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
              errorMessage: 'project.connection.form.error.server',
            })
          }
        })
    }
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
}

const mapStateToProps = (state, ownProps) => ({
  project: projectSelectors.getById(state, ownProps.params.project_name),
  projectIsFetching: projectSelectors.isFetching(state),
  projectConnections: projectConnectionSelectors.getList(state),
  projectConnectionsIsFetching: projectConnectionSelectors.isFetching(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchProject: () => dispatch(projectActions.fetchEntity(ownProps.params.project_name)),
  fetchProjectConnections: () => dispatch(projectConnectionActions.fetchPagedEntityList(0, 0, {
    projectName: ownProps.params.project_name,
  })),
  saveProjectConnection: (values, projectName) => dispatch(projectConnectionActions.createEntity(values, {
    projectName,
  })),
  updateProjectConnection: (id, values, projectName) => dispatch(projectConnectionActions.updateEntity(id, values, {
    projectName,
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(GuidedProjectConfigurationContainer)
