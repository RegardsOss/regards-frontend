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
import concat from 'lodash/concat'
import every from 'lodash/every'
import isNil from 'lodash/isNil'
import omit from 'lodash/omit'
import root from 'window-or-global'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import {
  AccessShapes, AdminShapes, CommonShapes, DataManagementShapes,
} from '@regardsoss/shape'
import { getMetadataArray, packMetadataField } from '@regardsoss/user-metadata-common'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AuthenticationRouteParameters } from '@regardsoss/authentication-utils'
import { roleActions, roleSelectors } from '../clients/RoleClient'
import { accessGroupActions, accessGroupSelectors } from '../clients/AccessGroupClient'
import { accountPasswordActions, accountPasswordSelectors } from '../clients/AccountPasswordClient'
import { projectUserSettingsActions, projectUserSettingsSelectors } from '../clients/ProjectUserSettingsClient'
import ProjectUserFormComponent from '../components/ProjectUserFormComponent'
import { projectUserFCUDActions, projectUserFCUDSelectors } from '../clients/ProjectUserFCUDClient'
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
    settings: CommonShapes.SettingsList,
    // from mapDispatchToProps
    createProjectUser: PropTypes.func.isRequired,
    updateProjectUser: PropTypes.func.isRequired,
    fetchUser: PropTypes.func.isRequired,
    fetchSettings: PropTypes.func.isRequired,
    fetchRoleList: PropTypes.func.isRequired,
    fetchGroupList: PropTypes.func.isRequired,
    fetchPasswordRules: PropTypes.func.isRequired,
    fetchPasswordValidity: PropTypes.func.isRequired,
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
      user: ownProps.params.user_id ? projectUserFCUDSelectors.getById(state, ownProps.params.user_id) : null,
      passwordRules: accountPasswordSelectors.getRules(state),
      settings: projectUserSettingsSelectors.getList(state),
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
      fetchUser: (userId) => dispatch(projectUserFCUDActions.fetchEntity(userId)),
      fetchSettings: () => dispatch(projectUserSettingsActions.fetchEntityList()),
      createProjectUser: ({ useExistingAccount, ...values }) => dispatch(projectUserFCUDActions.createEntity(omit(values, ['useExistingAccount']))),
      updateProjectUser: (id, values) => dispatch(projectUserFCUDActions.updateEntity(id, omit(values, ['useExistingAccount']))),
      fetchRoleList: () => dispatch(roleActions.fetchEntityList()),
      fetchGroupList: () => dispatch(accessGroupActions.fetchPagedEntityList()),
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

    if (this.state.isEditing) {
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
      email, roleName, accessGroups, maxQuota, rateLimit,
    } = values
    const { user } = this.props
    const updatedUser = {
      ...user.content,
      email,
      role: { name: roleName },
      metadata: packMetadataField(user, values),
      accessGroups,
      maxQuota: parseInt(maxQuota, 10),
      rateLimit: parseInt(rateLimit, 10),
    }

    const updateUser = this.props.updateProjectUser(this.props.params.user_id, updatedUser)
    const tasks = concat(updateUser)

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
    const { params, createProjectUser } = this.props
    const projectName = params.project
    const frontendParameter = `${AuthenticationRouteParameters.mailAuthenticationAction.urlKey}=${AuthenticationRouteParameters.mailAuthenticationAction.values.verifyEmail}`
    const newUser = {
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
      accessGroups: values.accessGroups,
      maxQuota: parseInt(values.maxQuota, 10),
      rateLimit: parseInt(values.rateLimit, 10),
    }

    return Promise.resolve(createProjectUser(newUser))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
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
