/*
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { AdminShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import ProjectFormComponent from '../../components/project/ProjectFormComponent'
import { projectActions, projectSelectors } from '../../clients/ProjectClient'
import messages from '../../i18n'

/**
 * React container to display an editing/creating Project form component
 * @author Sébastien Binda
 */
export class ProjectFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project_name: PropTypes.string,
    }),
    // from mapStateToProps
    project: AdminShapes.Project,
    isFetching: PropTypes.bool,
    // from mapDispatchToProps
    createProject: PropTypes.func,
    fetchProject: PropTypes.func,
    updateProject: PropTypes.func,
  }

  state = {
    isEditing: this.props.params.project_name !== undefined,
  }

  componentDidMount() {
    if (this.state.isEditing) {
      this.props.fetchProject(this.props.params.project_name)
    }
  }

  getBackUrl = () => ('/admin/projects/list')

  getProjectConnectionsUrl = (project) => (`/admin/projects/${project}/connections/guided`)

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
    const updatedProject = {
      ...(this.props.project.content),
      ...values,
    }
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
    Promise.resolve(this.props.createProject(values))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const createdProject = actionResult.payload.entities.projects[actionResult.payload.result]
          const url = this.getProjectConnectionsUrl(createdProject.content.name)
          browserHistory.push(url)
        }
      })
  }

  render() {
    return (
      <I18nProvider messages={messages}>
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  project: ownProps.params.project_name ? projectSelectors.getById(state, ownProps.params.project_name) : null,
  isFetching: projectSelectors.isFetching(state),
})

const mapDispatchToProps = (dispatch) => ({
  createProject: (values) => dispatch(projectActions.createEntity(values)),
  updateProject: (id, values) => dispatch(projectActions.updateEntity(id, values)),
  fetchProject: (projectName) => dispatch(projectActions.fetchEntity(projectName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFormContainer)
