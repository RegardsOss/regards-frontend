/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import reduce from 'lodash/reduce'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { AdminDomain } from '@regardsoss/domain'
import { AdminShapes, DataManagementShapes } from '@regardsoss/shape'
import { projectUserActions, projectUserSelectors } from '../clients/ProjectUserClient'
import { accessGroupActions, accessGroupSelectors } from '../clients/AccessGroupClient'
import { projectUserSignalActions, projectUserSignalSelectors } from '../clients/ProjectUserSignalClient'
import ProjectUserListComponent from '../components/list/ProjectUserListComponent'
import messages from '../i18n'
import styles from '../styles'

/** NO group filter */
const NO_GROUP_FILTER = 'all'

/**
 * Show the user list for the current project
 */
export class ProjectUserListContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      users: projectUserSelectors.getList(state),
      groups: accessGroupSelectors.getList(state),
      isFetchingViewData:
        projectUserSelectors.isFetching(state)
        || accessGroupSelectors.isFetching(state),
      isFetchingActions: projectUserSignalSelectors.isFetching(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchGroups: () => dispatch(accessGroupActions.fetchPagedEntityList()),
      fetchUsers: () => dispatch(projectUserActions.fetchPagedEntityList()),
      validateProjectUser: userId => dispatch(projectUserSignalActions.sendAccept(userId)),
      denyProjectUser: userId => dispatch(projectUserSignalActions.sendDeny(userId)),
      active: userId => dispatch(projectUserSignalActions.sendActive(userId)),
      inactive: userId => dispatch(projectUserSignalActions.sendInactive(userId)),
      deleteAccount: userId => dispatch(projectUserActions.deleteEntity(userId)),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // eslint-disable-next-line
    location: PropTypes.object.isRequired, // this object cannot be typed has it doesnt have hasOwnProperty method. used only in onPropertiesUpdated
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    users: AdminShapes.ProjectUserList.isRequired, // used only in onPropertiesUpdated
    groups: DataManagementShapes.AccessGroupList.isRequired,
    isFetchingViewData: PropTypes.bool.isRequired,
    isFetchingActions: PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchGroups: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    denyProjectUser: PropTypes.func.isRequired,
    validateProjectUser: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    active: PropTypes.func.isRequired,
    inactive: PropTypes.func.isRequired,
  }

  /**
   * Filters users list
   * @param {ProjectUserList} users users
   * @param {AccessGroup} group selected group
   * @param {boolean} onlyWaitingUsers should filter only waiting users
   * @return [ProjectUser] filtered users as array
   */
  static filterUserList(users, group, onlyWaitingUsers) {
    return reduce(users, (acc, user) => {
      // 1 - If group is required, user belongs it when
      // A - the group is public (for all users)
      // B - the group contains precisely user mail in group.content.users
      if (group && !group.content.isPublic && !group.content.users.some(({ email }) => email === user.content.email)) {
        return acc
      }
      if (onlyWaitingUsers && user.content.status !== AdminDomain.PROJECT_USER_STATUS_ENUM.WAITING_ACCESS) {
        // filtered as it is not waiting user
        return acc
      }
      return [...acc, user]
    }, [])
  }

  /**
   * Returns waiting users count
   * @param {[ProjectUser]} users
   * @return {number} waiting users count
   */
  static countWaitingUsers(users) {
    return users.reduce((acc, user) => user.content.status === AdminDomain.PROJECT_USER_STATUS_ENUM.WAITING_ACCESS ? acc + 1 : acc, 0)
  }

  /** Initial state */
  state = {
    users: [], // filtered users array
    waitingUsersCount: 0,
    showOnlyWaitingUsers: false,
    selectedGroup: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => {
    // Fetch view data
    const { fetchGroups, fetchUsers } = this.props
    fetchGroups()
    fetchUsers()
    // notify props changed
    this.onPropertiesUpdated({}, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const newState = { ...this.state }

    // 1 - recompute selected groups when it changes or group list was updated
    const newGroup = get(newProps.location, 'query.group', NO_GROUP_FILTER)
    if (!isEqual(get(oldProps, 'query.group'), newGroup)
      || !isEqual(oldProps.groups, newProps.groups)) {
      if (!newGroup || newGroup === NO_GROUP_FILTER) {
        newState.selectedGroup = null
      } else {
        newState.selectedGroup = find(newProps.groups, ({ content: { name } }) => name === newGroup) || null
      }
    }
    // 2 - recompute waiting users only state
    const newShowOnlyWaitingUsers = get(newProps.location, 'query.onlyWaiting') === 'true'
    if (!isEqual(get(oldProps.location, 'query.onlyWaiting') === 'true', newShowOnlyWaitingUsers)) {
      newState.showOnlyWaitingUsers = newShowOnlyWaitingUsers
    }

    // 3 - check state updates: if it was updated or users list changed, apply new filters to user list then update state
    if (!isEqual(this.state, newState) || !isEqual(oldProps.users, newProps.users)) {
      newState.users = ProjectUserListContainer.filterUserList(newProps.users, newState.selectedGroup, newState.showOnlyWaitingUsers)
      newState.waitingUsersCount = ProjectUserListContainer.countWaitingUsers(newState.users)
      this.setState(newState)
    }
  }

  /**
   * User callback: edit project user
   * @param userId user id
   */
  onEdit = (userId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/user/project-user/${userId}/edit`
    browserHistory.push(url)
  }

  /**
   * User callback: deny project user access
   * @param userId user id
   */
  onDeny = (userId) => {
    this.performThenUpdate([this.props.denyProjectUser(userId)])
  }

  /**
   * User callback: delete project user
   * @param userId user id
   */
  onDelete = (userId) => {
    this.performThenUpdate([this.props.deleteAccount(userId)])
  }

  /**
   * User callback: validate project user access
   * @param userId user id
   */
  onValidate = (userId) => {
    this.performThenUpdate([this.props.validateProjectUser(userId)])
  }

  /**
   * User callback: validate all project users in waiting state (and currently visible)
   * @param userId user id
   */
  onValidateAll = () => {
    // validate all waiting users currently visible
    const tasks = this.state.users
      .filter(user => user.content.status === AdminDomain.PROJECT_USER_STATUS_ENUM.WAITING_ACCESS)
      .map(user => this.props.validateProjectUser(user.content.id))
    if (tasks.length) {
      this.performThenUpdate(tasks)
    }
  }

  /**
   * User callback: enable project user access
   * @param userId user id
   */
  onEnable = (userId) => {
    this.performThenUpdate([this.props.active(userId)])
  }

  /**
   * User callback: disable project user access
   * @param userId user id
   */
  onDisable = (userId) => {
    this.performThenUpdate([this.props.inactive(userId)])
  }

  /**
   * User callback: group filter selected
   * @param {string} group selected group or null / undefined for all
   */
  onSelectGroup = (group) => {
    const { pathname } = browserHistory.getCurrentLocation()
    browserHistory.replace(`${pathname}?${this.buildQuery(get(group, 'content.name'), this.state.showOnlyWaitingUsers)}`)
  }

  /**
   * User callback: only waiting users filter was enabled / disabled. Update state and users list
   */
  onToggleOnlyWaitingUsers = () => {
    const { pathname } = browserHistory.getCurrentLocation()
    browserHistory.replace(`${pathname}?${this.buildQuery(this.state.selectedGroup, !this.state.showOnlyWaitingUsers)}`)
  }

  /**
   * @return {string} back URL
   */
  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/board`
  }

  /**
   * @return {string} create user URL
   */
  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/project-user/create`
  }

  /**
   * Builds this component query for values as parameter
   * @param {AccessGroup} selectedGroup (or null)
   * @param {boolean} showOnlyWaitingUsers show only waiting users?
   * @return {string} query for values as parameter*/
  buildQuery = (group, showOnlyWaitingUsers) => `group=${group || NO_GROUP_FILTER}&onlyWaiting=${showOnlyWaitingUsers}`

  /**
   * Waits for all promises as parameter then updates users list
   * @param promises promises
   */
  performThenUpdate = (promises) => {
    const updateUsersState = () => this.props.fetchUsers()
    Promise.all(promises).catch(updateUsersState).then(updateUsersState)
  }

  render() {
    const { groups, isFetchingActions, isFetchingViewData } = this.props
    const {
      users, waitingUsersCount, showOnlyWaitingUsers, selectedGroup,
    } = this.state
    // provide group to component: group name or null / undefined when all
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
          <ProjectUserListComponent
            users={users}
            waitingUsersCount={waitingUsersCount}
            selectedGroup={selectedGroup}
            groups={groups}
            isLoading={isFetchingViewData || isFetchingActions}
            showOnlyWaitingUsers={showOnlyWaitingUsers}

            createUrl={this.getCreateUrl()}
            backUrl={this.getBackUrl()}

            onEdit={this.onEdit}
            onDelete={this.onDelete}
            onValidate={this.onValidate}
            onValidateAll={this.onValidateAll}
            onDeny={this.onDeny}
            onEnable={this.onEnable}
            onDisable={this.onDisable}
            onToggleOnlyWaitingUsers={this.onToggleOnlyWaitingUsers}
            onSelectGroup={this.onSelectGroup}
          />
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}

export default connect(
  ProjectUserListContainer.mapStateToProps,
  ProjectUserListContainer.mapDispatchToProps)(ProjectUserListContainer)
