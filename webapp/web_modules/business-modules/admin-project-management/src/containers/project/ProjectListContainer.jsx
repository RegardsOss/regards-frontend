/**
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
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { AdminShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import NotifyLicenseUpdatedActions from '../../model/NotifyLicenseUpdatedActions'
import { projectActions, projectSelectors } from '../../clients/ProjectClient'
import ProjectListComponent from '../../components/project/ProjectListComponent'
import messages from '../../i18n'

/**
 * React container to manage ManageProjectsComponent.
 *
 * @prop {Array<Project>} projects List of projects to display
 * @prop {Boolean} projectConfigurationIsShown ProjectConfigurationComponent display status
 *
 * @author Sébastien Binda
 */
export class ProjectListContainer extends React.Component {
  static propTypes = {
    projectList: AdminShapes.ProjectList,
    fetchProjectList: PropTypes.func,
    deleteProject: PropTypes.func,
    updateLicense: PropTypes.func,
  }

  static getCreateUrl() {
    return '/admin/projects/create'
  }

  static handleEdit(projectName) {
    const url = `/admin/projects/${projectName}/edit`
    browserHistory.push(url)
  }

  static handleConfigureConnections(projectName) {
    const url = `/admin/projects/${projectName}/connections`
    browserHistory.push(url)
  }

  static handleOpen(projectName) {
    const url = `/admin/${projectName}`
    window.open(url, '_blank')
  }

  UNSAFE_componentWillMount() {
    this.props.fetchProjectList()
  }

  handleDelete = (projectName) => {
    this.props.deleteProject(projectName)
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.props.fetchProjectList()
        }
      })
  }

  handleUpdateLicense = (projectName) => {
    this.props.updateLicense(projectName)
  }

  render() {
    const { projectList } = this.props
    return (
      <I18nProvider messages={messages}>
        <ProjectListComponent
          projectList={projectList}
          createUrl={ProjectListContainer.getCreateUrl()}
          handleDelete={this.handleDelete}
          handleEdit={ProjectListContainer.handleEdit}
          handleConfigureConnections={ProjectListContainer.handleConfigureConnections}
          handleOpen={ProjectListContainer.handleOpen}
          handleUpdateLicense={this.handleUpdateLicense}
        />
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state) => ({
  projectList: projectSelectors.getList(state),
})
const mapDispatchToProps = (dispatch) => ({
  fetchProjectList: () => dispatch(projectActions.fetchPagedEntityList(0, 100)),
  deleteProject: (projectName) => dispatch(projectActions.deleteEntity(projectName)),
  updateLicense: (projectName) => dispatch(NotifyLicenseUpdatedActions.sendLicenseUpdatedNotification(projectName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer)
