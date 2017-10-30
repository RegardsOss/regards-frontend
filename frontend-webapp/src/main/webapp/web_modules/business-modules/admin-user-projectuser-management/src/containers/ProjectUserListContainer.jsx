/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import keys from 'lodash/keys'
import { I18nProvider } from '@regardsoss/i18n'
import { browserHistory } from 'react-router'
import { AdminShapes } from '@regardsoss/shape'
import { projectUserActions, projectUserSelectors } from '../clients/ProjectUserClient'
import { waitingAccessUsersEntitiesActions, waitingAccessUsersEntitiesSelectors } from '../clients/WaitingAccessUsersEntitiesClient'
import { ProjectUserSignalActions } from '../clients/ProjectUserSignalClient'
import ProjectUserListComponent from '../components/ProjectUserListComponent'
import messages from '../i18n'

/**
 * Show the user list for the current project
 */
export class ProjectUserListContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    users: AdminShapes.ProjectUserList,
    waitingAccessUsers: AdminShapes.ProjectUserList,
    isFetchingContent: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchUsers: PropTypes.func.isRequired,
    fetchWaitingAccessUsers: PropTypes.func.isRequired,
    denyProjectUser: PropTypes.func.isRequired,
    validateProjectUser: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    active: PropTypes.func.isRequired,
    inactive: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    this.props.fetchUsers()
    this.props.fetchWaitingAccessUsers()
    this.setState({ initialFecthing: true, isFetchingActions: false })
  }

  componentWillReceiveProps = (nextProps) => {
    // mark initial fetching done (ignore next ones)
    if (this.props.isFetchingContent && !nextProps.isFetchingContent) {
      this.setInitialFetching(false)
    }
  }

  onDeny = (userId) => {
    this.performAll([this.props.denyProjectUser(userId)])
  }

  onDelete = (userId) => {
    this.performAll([this.props.deleteAccount(userId)])
  }

  onEdit = (userId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/user/project-user/${userId}/edit`
    browserHistory.push(url)
  }

  onValidate = (userId) => {
    this.performAll([this.props.validateProjectUser(userId)])
  }

  onValidateAll = () => {
    // validate all visible requests
    const tasks = keys(this.props.waitingAccessUsers).map(userId => this.props.validateProjectUser(userId))
    this.performAll(tasks)
  }

  onActive = (userId) => {
    this.performAll([this.props.active(userId)])
  }

  onInactive = (userId) => {
    this.performAll([this.props.inactive(userId)])
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/board`
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/project-user/create`
  }

  setInitialFetching = initialFecthing => this.updateState({ initialFecthing })

  setFetchingActions = isFetchingActions => this.updateState({ isFetchingActions })

  updateState = newValues => this.setState({ ...this.state, ...newValues })

  /**
   * Marks fetching true, performs all promises as parameter, update waiting users state then marks fetching false
   * @param promises promises
   */
  performAll = (promises) => {
    this.setFetchingActions(true)
    const onDone = () => { this.setFetchingActions(false) }
    Promise.all(promises).then(() =>
      Promise.all([this.props.fetchWaitingAccessUsers(), this.props.fetchUsers()]).then(onDone).catch(onDone)).catch(onDone)
  }

  render() {
    const { users, waitingAccessUsers } = this.props
    const { isFetchingActions, initialFecthing } = this.state
    return (
      <I18nProvider messages={messages}>
        <ProjectUserListComponent
          users={users}
          waitingAccessUsers={waitingAccessUsers}
          initialFecthing={initialFecthing}
          isFetchingActions={isFetchingActions}
          createUrl={this.getCreateUrl()}
          backUrl={this.getBackUrl()}
          onEdit={this.onEdit}
          onDelete={this.onDelete}
          onValidate={this.onValidate}
          onValidateAll={this.onValidateAll}
          onDeny={this.onDeny}
          onActive={this.onActive}
          onInactive={this.onInactive}
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  users: projectUserSelectors.getList(state) || {},
  waitingAccessUsers: waitingAccessUsersEntitiesSelectors.getList(state) || {},
  isFetchingContent: projectUserSelectors.isFetching(state) || waitingAccessUsersEntitiesSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(projectUserActions.fetchPagedEntityList()),
  fetchWaitingAccessUsers: () => dispatch(waitingAccessUsersEntitiesActions.fetchWaitingUsersEntityList()),
  validateProjectUser: userId => dispatch(ProjectUserSignalActions.sendAccept(userId)),
  denyProjectUser: userId => dispatch(ProjectUserSignalActions.sendDeny(userId)),
  active: userId => dispatch(ProjectUserSignalActions.sendActive(userId)),
  inactive: userId => dispatch(ProjectUserSignalActions.sendInactive(userId)),
  deleteAccount: userId => dispatch(projectUserActions.deleteEntity(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUserListContainer)
