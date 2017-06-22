/**
 * LICENSE_PLACEHOLDER
 **/
import omit from 'lodash/omit'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { ProjectUser, AccessGroup, Role } from '@regardsoss/model'
import every from 'lodash/every'
import some from 'lodash/some'
import flow from 'lodash/flow'
import concat from 'lodash/concat'
import fpfilter from 'lodash/fp/filter'
import fpmap from 'lodash/fp/map'
import { unregisterField } from 'redux-form'
import root from 'window-or-global'
import { getMetadataArray, packMetadataField } from '@regardsoss/user-metadata-common'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AuthenticationRouteParameters } from '@regardsoss/authentication-manager'
import { roleActions, roleSelectors } from '../clients/RoleClient'
import { projectUserActions, projectUserSelectors } from '../clients/ProjectUserClient'
import { accessGroupActions, accessGroupSelectors } from '../clients/AccessGroupClient'
import { accountPasswordActions, accountPasswordSelectors } from '../clients/AccountPasswordClient'
import { userGroupActions } from '../clients/UserGroupClient'
import ProjectUserFormComponent from '../components/ProjectUserFormComponent'

export class ProjectUserFormContainer extends React.Component {
  static propTypes = {
    // from mapStateToProps
    roleList: PropTypes.objectOf(Role),
    groupList: PropTypes.objectOf(AccessGroup),
    user: ProjectUser,
    passwordRules: PropTypes.string.isRequired, // fetched password rules description
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      user_id: PropTypes.string,
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
    unregisterField: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isEditing: props.params.user_id !== undefined,
      isLoading: true,
    }
  }

  componentWillMount = () => {
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

  componentWillReceiveProps = (nextProps) => {
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
          __unregisterField={this.props.unregisterField}
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
      __unregisterField={this.props.unregisterField}
    />)
  }

  handleUpdate = (values) => {
    const { email, roleName, group } = values
    const { user, groupList } = this.props
    const updatedUser = {
      ...user.content,
      email,
      role: { name: roleName },
      metadata: packMetadataField(user, values),
    }
    Promise.resolve(this.props.updateProjectUser(this.props.params.user_id, updatedUser))
      .then((actionResult) => {
        if (!actionResult.error) {
          // Retrieve new group
          const addUserToGroupTasks = flow(
            fpfilter(currentGroup => every(groupList[currentGroup].content.users, userInfo =>
              userInfo.email !== email,
            )),
            fpmap(currentGroup => this.props.assignGroup(currentGroup, email)),
          )(group)
          const removeUserFromGroupTasks = flow(
            fpfilter(currentGroup => some(currentGroup.content.users, { email })
              && every(group, groupName => groupName !== currentGroup.content.name)),
            fpmap(currentGroup => this.props.unassignGroup(currentGroup.content.name, email)),
          )(groupList)
          const tasks = concat(addUserToGroupTasks, removeUserFromGroupTasks)
          Promise.all(tasks).then((actionResults) => {
            if (tasks.length === 0 || every(actionResults, actionResultUserToGroup => !actionResultUserToGroup.error)) {
              const url = this.getBackUrl()
              browserHistory.push(url)
            }
          })
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
            fpfilter(currentGroup => every(groupList[currentGroup].content.users, userInfo =>
              userInfo.email !== email,
            )),
            fpmap(currentGroup => this.props.assignGroup(currentGroup, email)),
          )(values.group)
          Promise.all(addUserToGroupTasks).then((actionResults) => {
            if (addUserToGroupTasks.length === 0 || every(actionResults, actionResultUserToGroup => !actionResultUserToGroup.error)) {
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
  updateMetadata = user => this.setState({ userMetadata: getMetadataArray(user) })

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-user-projectuser-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.getFormComponent}
        </LoadableContentDisplayDecorator>
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
const mapDispatchToProps = dispatch => ({
  fetchUser: userId => dispatch(projectUserActions.fetchEntity(userId)),
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
  fetchPasswordValidity: newPassword => dispatch(accountPasswordActions.fetchPasswordValidity(newPassword)),
  fetchPasswordRules: () => dispatch(accountPasswordActions.fetchPasswordRules()),
  unregisterField: (form, name) => dispatch(unregisterField(form, name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUserFormContainer)
