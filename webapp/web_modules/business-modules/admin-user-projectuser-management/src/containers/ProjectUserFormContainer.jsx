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
import concat from 'lodash/concat'
import every from 'lodash/every'
import flow from 'lodash/flow'
import omit from 'lodash/omit'
import some from 'lodash/some'
import fpfilter from 'lodash/fp/filter'
import fpmap from 'lodash/fp/map'
import root from 'window-or-global'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { AccessShapes, AdminShapes, DataManagementShapes } from '@regardsoss/shape'
import { getMetadataArray, packMetadataField } from '@regardsoss/user-metadata-common'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AuthenticationRouteParameters } from '@regardsoss/authentication-utils'
import { roleActions, roleSelectors } from '../clients/RoleClient'
import { projectUserActions, projectUserSelectors } from '../clients/ProjectUserClient'
import { accessGroupActions, accessGroupSelectors } from '../clients/AccessGroupClient'
import { accountPasswordActions, accountPasswordSelectors } from '../clients/AccountPasswordClient'
import { userGroupActions } from '../clients/UserGroupClient'
import ProjectUserFormComponent from '../components/ProjectUserFormComponent'
import messages from '../i18n'
import styles from '../styles'

export class ProjectUserFormContainer extends React.Component {
  static propTypes = {
    // from mapStateToProps
    roleList: AdminShapes.RoleList,
    groupList: DataManagementShapes.AccessGroupList,
    user: AccessShapes.ProjectUser,
    passwordRules: PropTypes.string.isRequired, // fetched password rules description
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      // eslint-disable-next-line camelcase
      user_id: PropTypes.string, // eslint wont fix: expected parameter format
    }),
    // from mapDispatchToProps
    createProjectUser: PropTypes.func,
    updateProjectUser: PropTypes.func,
    fetchUser: PropTypes.func,
    fetchRoleList: PropTypes.func,
    fetchGroupList: PropTypes.func,
    fetchPasswordRules: PropTypes.func.isRequired,
    fetchPasswordValidity: PropTypes.func.isRequired,
    assignGroup: PropTypes.func,
    unassignGroup: PropTypes.func,
  }

  /** Initial state */
  state = {
    isEditing: this.props.params.user_id !== undefined,
    isLoading: true,
  }

  UNSAFE_componentWillMount = () => {
    const tasks = [
      this.props.fetchRoleList(),
      this.props.fetchGroupList(),
      this.props.fetchPasswordRules(),
    ]

    if (this.state.isEditing && !this.props.user) {
      tasks.push(this.props.fetchUser(this.props.params.user_id))
    }

    // whatever the case, initialize metadata
    this.updateMetadata(this.props.user)

    Promise.all(tasks)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    // make sure metadata are living with current user
    // back from user fetching?
    if (this.props.user !== nextProps.user) {
      this.updateMetadata(nextProps.user)
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/project-user/list`
  }

  getFormComponent = () => {
    const { userMetadata } = this.state
    if (this.state.isEditing) {
      return (
        <ProjectUserFormComponent
          passwordRules={this.props.passwordRules}
          currentUser={this.props.user}
          userMetadata={userMetadata}
          fetchPasswordValidity={this.props.fetchPasswordValidity}
          onSubmit={this.handleUpdate}
          onAddGroup={this.handleAddGroup}
          backUrl={this.getBackUrl()}
          roleList={this.props.roleList}
          groupList={this.props.groupList}
        />)
    }

    return (<ProjectUserFormComponent
      passwordRules={this.props.passwordRules}
      userMetadata={userMetadata}
      fetchPasswordValidity={this.props.fetchPasswordValidity}
      onSubmit={this.handleCreate}
      onAddGroup={this.handleAddGroup}
      backUrl={this.getBackUrl()}
      roleList={this.props.roleList}
      groupList={this.props.groupList}
    />)
  }

  handleUpdate = (values) => {
    const { email, roleName, groups } = values
    const { user, groupList } = this.props
    const updatedUser = {
      ...user.content,
      email,
      role: { name: roleName },
      metadata: packMetadataField(user, values),
    }
    const updateUser = this.props.updateProjectUser(this.props.params.user_id, updatedUser)
    // Retrieve new group
    const addUserToGroupTasks = flow(
      fpfilter((currentGroup) => every(groupList[currentGroup].content.users, (userInfo) => userInfo.email !== email)),
      fpmap((currentGroup) => this.props.assignGroup(currentGroup, email)),
    )(groups)
    const removeUserFromGroupTasks = flow(
      fpfilter((currentGroup) => some(currentGroup.content.users, { email })
        && every(groups, (groupName) => groupName !== currentGroup.content.name)),
      fpmap((currentGroup) => this.props.unassignGroup(currentGroup.content.name, email)),
    )(groupList)
    const tasks = concat(updateUser, addUserToGroupTasks, removeUserFromGroupTasks)

    Promise.all(tasks).then((actionResults) => {
      if (tasks.length === 0 || every(actionResults, (actionResultUserToGroup) => !actionResultUserToGroup.error)) {
        const url = this.getBackUrl()
        browserHistory.push(url)
      }
    })
  }

  handleCreate = (values) => {
    const { params, groupList } = this.props
    const projectName = params.project
    const frontendParameter = `${AuthenticationRouteParameters.mailAuthenticationAction.urlKey}=${AuthenticationRouteParameters.mailAuthenticationAction.values.verifyEmail}`

    Promise.resolve(this.props.createProjectUser({
      email: values.email,
      roleName: values.roleName,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      metadata: packMetadataField({}, values),
      // Destination of logged users
      originUrl: '/',
      // the backend will use that URL in the email
      requestLink: `${root.location.protocol}//${root.location.host}/user/${projectName}?${frontendParameter}`,
    }))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          // Retrieve new group
          const addUserToGroupTasks = flow(
            fpfilter((currentGroup) => every(groupList[currentGroup].content.users, (userInfo) => userInfo.email !== values.email)),
            fpmap((currentGroup) => this.props.assignGroup(currentGroup, values.email)),
          )(values.groups)
          Promise.all(addUserToGroupTasks).then((actionResults) => {
            if (addUserToGroupTasks.length === 0 || every(actionResults, (actionResultUserToGroup) => !actionResultUserToGroup.error)) {
              const url = this.getBackUrl()
              browserHistory.push(url)
            }
          })
        }
      })
  }

  /**
   * Updates userMetadata in state  from loaded myUser data. This method always returns a list of metadata,
   * but when user is known, retrieves the current metadata values
   * @param user : myUser values
   */
  updateMetadata = (user) => this.setState({ userMetadata: getMetadataArray(user) })

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
          <LoadableContentDisplayDecorator
            isLoading={isLoading}
          >
            {this.getFormComponent}
          </LoadableContentDisplayDecorator>
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  roleList: roleSelectors.getList(state),
  groupList: accessGroupSelectors.getList(state),
  user: ownProps.params.user_id ? projectUserSelectors.getById(state, ownProps.params.user_id) : null,
  passwordRules: accountPasswordSelectors.getRules(state),
})
const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId) => dispatch(projectUserActions.fetchEntity(userId)),
  createProjectUser: ({ useExistingAccount, ...values }) => dispatch(projectUserActions.createEntity(omit(values, ['useExistingAccount']))),
  updateProjectUser: (id, values) => dispatch(projectUserActions.updateEntity(id, omit(values, ['useExistingAccount']))),
  fetchRoleList: () => dispatch(roleActions.fetchEntityList()),
  fetchGroupList: () => dispatch(accessGroupActions.fetchPagedEntityList()),
  assignGroup: (group, user) => dispatch(userGroupActions.sendSignal('PUT', null, {
    name: group,
    email: user,
  })),
  unassignGroup: (group, user) => dispatch(userGroupActions.sendSignal('DELETE', null, {
    name: group,
    email: user,
  })),
  fetchPasswordValidity: (newPassword) => dispatch(accountPasswordActions.fetchPasswordValidity(newPassword)),
  fetchPasswordRules: () => dispatch(accountPasswordActions.fetchPasswordRules()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUserFormContainer)
