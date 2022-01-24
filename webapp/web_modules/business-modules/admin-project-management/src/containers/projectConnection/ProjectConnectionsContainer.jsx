/*
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import map from 'lodash/map'
import find from 'lodash/find'
import filter from 'lodash/filter'
import { browserHistory } from 'react-router'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { i18nContextType } from '@regardsoss/i18n'
import { connect } from '@regardsoss/redux'
import { AdminShapes } from '@regardsoss/shape'
import { LoadingComponent } from '@regardsoss/display-control'
import { FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { projectActions, projectSelectors } from '../../clients/ProjectClient'
import { projectConnectionActions, projectConnectionSelectors } from '../../clients/ProjectConnectionClient'
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
    project: AdminShapes.Project,
    // Current project connection to edit
    projectConnection: AdminShapes.ProjectConnection,
    // All project connection of the current editing project
    projectConnections: AdminShapes.ProjectConnectionList,
    // from mapDispatchToProps
    fetchProject: PropTypes.func.isRequired,
    fetchProjectConnections: PropTypes.func.isRequired,
    updateProjectConnection: PropTypes.func.isRequired,
    createProjectConnection: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    // Set default mode to configureOneForAll OFF for Simple Form rendering
    // Set default mode to configureOneForAll ON for Guided rendering
    configureOneForAll: !(this.props.params.project_connection_id || this.props.params.microservice_name),
    errorMessage: null,
    projectConnectionsIsFetching: true,
    projectIsFetching: true,
  }

  UNSAFE_componentWillMount() {
    // Retrieve all connections for the given project
    Promise.resolve(this.props.fetchProjectConnections(this.props.params.project_name)).then(() => this.setState({ projectConnectionsIsFetching: false }))

    // Retrieve project if not already in store.
    if (!this.props.project) {
      Promise.resolve(this.props.fetchProject(this.props.params.project_name)).then(() => this.setState({ projectIsFetching: false }))
    } else {
      this.setState({ projectIsFetching: false })
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
  onCreate = (values, successCallBack) => {
    const projectConnection = {
      driverClassName: values.driverClassName,
      url: `jdbc:postgresql://${values.address}:${values.port}/${values.db_name}`,
      userName: values.userName,
      password: values.password,
      microservice: values.microservice,
      project: values.project,
    }

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
    const actions = map(STATIC_CONF.MSERVICES, (microservice) => {
      // Check if connection already exists
      const prevConnection = find(this.props.projectConnections, { content: { microservice } })
      // If connection already exists add id
      const connection = {
        ...projectConnection,
        id: prevConnection ? prevConnection.content.id : undefined,
        microservice,
      }
      if (connection.id) {
        // Update connection
        return this.props.updateProjectConnection(connection.id, connection, this.props.project.content.name)
      }
      // Save new connection
      return this.props.createProjectConnection(connection, this.props.project.content.name)
    })
    Promise.all(actions).then((actionsResults) => {
      const errors = filter(actionsResults, { error: true })
      if (!errors || errors.length === 0) {
        this.handleBack()
      } else {
        this.setState({
          errorMessage: this.context.intl.formatMessage({ id: 'project.connection.form.error.server' }),
        })
      }
    })
  }

  /**
   * Method to update an existing connection.
   * If the <configureOneForAll> is on, the same configuration is applied to all microservices.
   *
   * @param projectConnection
   */
  onUpdate = (id, values, successCallBack) => {
    const projectConnection = {
      id: values.id,
      driverClassName: values.driverClassName,
      url: `jdbc:postgresql://${values.address}:${values.port}/${values.db_name}`,
      userName: values.userName,
      password: values.password,
      microservice: values.microservice,
      project: values.project,
    }

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
    const { projectIsFetching, projectConnectionsIsFetching } = this.state

    if (projectIsFetching || projectConnectionsIsFetching) {
      return <LoadingComponent />
    }

    if (!this.props.project) {
      return <FormEntityNotFoundComponent />
    }

    return (
      <GuidedProjectConfigurationComponent
        project={this.props.project}
        projectConnections={projectConnections}
        configureOneForAll={this.state.configureOneForAll}
        errorMessage={this.state.errorMessage}
        onCreate={this.onCreate}
        onUpdate={this.onUpdate}
        onChangeConfigurationMode={this.onChangeConfigurationMode}
      />
    )
  }

  /**
   * Render a form to edit a microservices connection
   * @returns {XML}
   */
  renderSimpleForm() {
    const microservice = this.props.projectConnection
      ? this.props.projectConnection.content.microservice : this.props.params.microservice_name

    const { projectIsFetching, projectConnectionsIsFetching } = this.state

    if (projectIsFetching || projectConnectionsIsFetching) {
      return <LoadingComponent />
    }

    if (!this.props.project || (this.props.params.project_connection_id && !this.props.projectConnection)) {
      return <FormEntityNotFoundComponent />
    }

    return (
      <Card>
        <CardTitle
          title={
            this.context.intl.formatMessage({ id: 'database.form.edit.title' }, {
              microservice,
              project: this.props.project.content.name,
            })
}
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
  project: ownProps.params.project_name ? projectSelectors.getById(state, ownProps.params.project_name) : null,
})

const mapDispatchToProps = (dispatch) => ({
  fetchProjectConnections: (projectName) => dispatch(projectConnectionActions.fetchPagedEntityList(0, 0, {
    projectName,
  })),
  updateProjectConnection: (id, projectConnection) => dispatch(projectConnectionActions.updateEntity(id, projectConnection, {
    projectName: projectConnection.project.name,
  })),
  createProjectConnection: (projectConnection) => dispatch(projectConnectionActions.createEntity(projectConnection, {
    projectName: projectConnection.project.name,
  })),
  fetchProject: (projectName) => dispatch(projectActions.fetchEntity(projectName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConnectionsContainer)
