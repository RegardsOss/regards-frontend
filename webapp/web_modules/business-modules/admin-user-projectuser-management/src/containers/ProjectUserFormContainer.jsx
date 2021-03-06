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
import isNil from 'lodash/isNil'
import fpfilter from 'lodash/fp/filter'
import fpmap from 'lodash/fp/map'
import omit from 'lodash/omit'
import some from 'lodash/some'
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
import { projectUserSettingsActions, projectUserSettingsSelectors } from '../clients/ProjectUserSettingsClient'
import ProjectUserFormComponent from '../components/ProjectUserFormComponent'
import messages from '../i18n'
import styles from '../styles'

export class ProjectUserFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      // eslint-disable-next-line camelcase
      user_id: PropTypes.string, // eslint wont fix: expected parameter format
    }),
    // from mapStateToProps
    roleList: AdminShapes.RoleList,
    groupList: DataManagementShapes.AccessGroupList,
    user: AccessShapes.ProjectUser,
    passwordRules: PropTypes.string.isRequired, // fetched password rules description
    settings: AdminShapes.ProjectUserSettingsWithContent,
    // from mapDispatchToProps
    createProjectUser: PropTypes.func.isRequired,
    updateProjectUser: PropTypes.func.isRequired,
    fetchUser: PropTypes.func.isRequired,
    fetchSettings: PropTypes.func.isRequired,
    fetchRoleList: PropTypes.func.isRequired,
    fetchGroupList: PropTypes.func.isRequired,
    fetchPasswordRules: PropTypes.func.isRequired,
    fetchPasswordValidity: PropTypes.func.isRequired,
    assignGroup: PropTypes.func,
    unassignGroup: PropTypes.func,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {
      roleList: roleSelectors.getList(state),
      groupList: accessGroupSelectors.getList(state),
      user: ownProps.params.user_id ? projectUserSelectors.getById(state, ownProps.params.user_id) : null,
      passwordRules: accountPasswordSelectors.getRules(state),
      settings: projectUserSettingsSelectors.getResult(state),
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
      fetchUser: (userId) => dispatch(projectUserActions.fetchEntity(userId)),
      fetchSettings: () => dispatch(projectUserSettingsActions.getSettings()),
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
    }
  }

  /** Initial state */
  state = {
    isEditing: !isNil(this.props.params.user_id),
    isLoading: true,
  }

  UNSAFE_componentWillMount = () => {
    const tasks = [
      this.props.fetchSettings(),
      this.props.fetchRoleList(),
      this.props.fetchGroupList(),
      this.props.fetchPasswordRules(),
    ]

    if (this.state.isEditing && !this.props.user) {
      tasks.push(this.props.fetchUser(this.props.params.user_id))
    }

    // whatever the case, initialize metadata
    this.onMetadataUpdated(this.props.user)

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
      this.onMetadataUpdated(nextProps.user)
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/project-user/list`
  }

  /**
   * Callback: On submit form
   * @return {Promise} submission promise
   */
  onSubmit = (values) => {
    if (this.state.isEditing) {
      return this.onUpdate(values)
    }
    return this.onCreate(values)
  }

  /**
   * Callback: on update user
   * @param {*} values form values
   * @return {Promise} submission promise
   */
  onUpdate = (values) => {
    const {
      email, roleName, groups, maxQuota, rateLimit,
    } = values
    const { user, groupList } = this.props
    const updatedUser = {
      ...user.content,
      email,
      role: { name: roleName },
      maxQuota,
      rateLimit,
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

    return Promise.all(tasks).then((actionResults) => {
      if (tasks.length === 0 || every(actionResults, (actionResultUserToGroup) => !actionResultUserToGroup.error)) {
        const url = this.getBackUrl()
        browserHistory.push(url)
      }
    })
  }

  /**
   * Callback: on create user
   * @param {*} values form values
   * @return {Promise} submission promise
   */
  onCreate = (values) => {
    const { params, groupList } = this.props
    const projectName = params.project
    const frontendParameter = `${AuthenticationRouteParameters.mailAuthenticationAction.urlKey}=${AuthenticationRouteParameters.mailAuthenticationAction.values.verifyEmail}`

    return Promise.resolve(this.props.createProjectUser({
      email: values.email,
      roleName: values.roleName,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      maxQuota: values.maxQuota,
      rateLimit: values.rateLimit,
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
          return Promise.all(addUserToGroupTasks).then((actionResults) => {
            if (addUserToGroupTasks.length === 0 || every(actionResults, (actionResultUserToGroup) => !actionResultUserToGroup.error)) {
              const url = this.getBackUrl()
              browserHistory.push(url)
            }
          })
        }
        return null
      })
  }

  /**
   * Updates userMetadata in state  from loaded myUser data. This method always returns a list of metadata,
   * but when user is known, retrieves the current metadata values
   * @param user : myUser values
   */
  onMetadataUpdated = (user) => this.setState({ userMetadata: getMetadataArray(user) })

  render() {
    const {
      passwordRules, user, fetchPasswordValidity, settings, roleList, groupList,
    } = this.props
    const { isLoading, isEditing, userMetadata } = this.state
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={styles}>
          <LoadableContentDisplayDecorator
            isLoading={isLoading}
          >
            <ProjectUserFormComponent
              passwordRules={passwordRules}
              userMetadata={userMetadata}
              currentUser={isEditing ? user : null}
              settings={settings}
              fetchPasswordValidity={fetchPasswordValidity}
              onSubmit={this.onSubmit}
              backUrl={this.getBackUrl()}
              roleList={roleList}
              groupList={groupList}
            />
          </LoadableContentDisplayDecorator>
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}

export default connect(ProjectUserFormContainer.mapStateToProps, ProjectUserFormContainer.mapDispatchToProps)(ProjectUserFormContainer)
