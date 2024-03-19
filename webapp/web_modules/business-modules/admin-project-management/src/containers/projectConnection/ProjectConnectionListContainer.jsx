/*
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import { I18nProvider } from '@regardsoss/i18n'
import { AdminShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { projectActions, projectSelectors } from '../../clients/ProjectClient'
import { projectConnectionActions, projectConnectionSelectors } from '../../clients/ProjectConnectionClient'
import { projectConnectionTestActions } from '../../clients/ProjectConnectionTestClient'
import ProjectConnectionListComponent from '../../components/projectConnection/ProjectConnectionListComponent'
import messages from '../../i18n'

/**
 * Connects a {@link ProjectConnectionListComponent} to the redux store.
 *
 * @author Xavier-Alexandre Brochard
 * @author Sébastien Binda
 */
export class ProjectConnectionListContainer extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project_name: PropTypes.string.isRequired,
    }).isRequired,
    // from mapStateToProps
    project: AdminShapes.Project,
    projectConnections: AdminShapes.ProjectConnectionList,
    // from mapDispatchToProps
    fetchProject: PropTypes.func.isRequired,
    fetchProjectConnections: PropTypes.func,
    fetchProjectConnection: PropTypes.func,
    testProjectConnection: PropTypes.func,
    updateProjectConnection: PropTypes.func,
  }

  static backUrl = '/admin/projects/list'

  static refreshTimerMS = 3000

  state = {
    isLoading: true,
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchProject(this.props.params.project_name),
      this.props.fetchProjectConnections(this.props.params.project_name),
    ]).then(() => {
      this.setState({
        isLoading: false,
      })
    })
    this.startTimer()
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  getComponent = () => {
    if (this.props.project) {
      const { projectConnections } = this.props
      return (<ProjectConnectionListComponent
        key={`project-connections-${this.props.project}`}
        project={this.props.project}
        projectConnections={projectConnections}
        onEdit={this.handleEdit}
        onCreate={this.handleCreate}
        onReCreateConnection={this.handleReCreateConnection}
        onTestConnection={this.handleTestConnection}
        refreshConnection={this.handleRefreshConnection}
        backUrl={ProjectConnectionListContainer.backUrl}
      />)
    }
    return null
  }

  handleEdit = (projectConnectionId) => {
    const url = `/admin/projects/${this.props.params.project_name}/connections/${projectConnectionId}/edit`
    browserHistory.push(url)
  }

  handleCreate = (microserviceName) => {
    const url = `/admin/projects/${this.props.params.project_name}/connections/${microserviceName}/create`
    browserHistory.push(url)
  }

  handleTestConnection = (projectConnection) => {
    if (!projectConnection || !projectConnection.content || !projectConnection.content.project
      || !projectConnection.content.id || !projectConnection.content.project.name) {
      throw new Error('Invalid connection to test')
    }
    const { project } = projectConnection.content
    return this.props.testProjectConnection(projectConnection.content.microservice, project.name)
  }

  handleRefreshConnection = (connectionId) => {
    this.props.fetchProjectConnection(this.props.project.content.name, connectionId)
  }

  /**
   * Used when you want to test again a DISABLED or ERROR connection
   * @param projectConnection
   */
  handleReCreateConnection = (projectConnection) => {
    // We just send the same entity, the server will retest that connection
    this.props.updateProjectConnection(projectConnection.content.id, projectConnection.content)
  }

  startTimer = () => {
    // A - refresh list
    this.refresh()
    // B - restart timer
    this.refreshTimer = setTimeout(() => this.startTimer(), ProjectConnectionListContainer.refreshTimerMS)
  }

  stopTimer = () => {
    clearTimeout(this.refreshTimer)
  }

  refresh = () => {
    this.props.fetchProjectConnections(this.props.params.project_name)
  }

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
          isContentError={!this.props.project}
        >
          {this.getComponent}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  project: projectSelectors.getById(state, ownProps.params.project_name),
  projectConnections: projectConnectionSelectors.getList(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchProject: (projectName) => dispatch(projectActions.fetchEntity(projectName)),
  fetchProjectConnections: (projectName) => dispatch(projectConnectionActions.fetchPagedEntityList(0, 0, {
    projectName,
  })),
  fetchProjectConnection: (projectName, connectionId) => dispatch(projectConnectionActions.fetchSilentEntity(connectionId, { projectName })),
  testProjectConnection: (microservice, projectName) => dispatch(projectConnectionTestActions.test(microservice, projectName)),
  updateProjectConnection: (id, projectConnection) => dispatch(projectConnectionActions.updateEntity(id, projectConnection, {
    projectName: projectConnection.project.name,
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConnectionListContainer)
