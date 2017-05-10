/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { ProjectUser, AccessGroup, Role } from '@regardsoss/model'
import { every, some, chain, concat } from 'lodash'
import root from 'window-or-global'
import { getMetadataArray, packMetaDataField } from '@regardsoss/user-metadata-common'
import { AuthenticationRouteParameters } from '@regardsoss/authentication-manager'
import { roleActions, roleSelectors } from '../client/RoleClient'
import { projectUserActions, projectUserSelectors } from '../client/ProjectUserClient'
import { accessGroupActions, accessGroupSelectors } from '../client/AccessGroupClient'
import { userGroupActions } from '../client/UserGroupClient'
import ProjectUserFormComponent from '../components/ProjectUserFormComponent'

export class ProjectUserFormContainer extends React.Component {
  static propTypes = {
    // from mapStateToProps
    roleList: React.PropTypes.objectOf(Role),
    groupList: React.PropTypes.objectOf(AccessGroup),
    user: ProjectUser,
    isFetching: React.PropTypes.bool,
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      user_id: React.PropTypes.string,
    }),
    // from mapDispatchToProps
    createProjectUser: React.PropTypes.func,
    updateProjectUser: React.PropTypes.func,
    fetchUser: React.PropTypes.func,
    fetchRoleList: React.PropTypes.func,
    fetchGroupList: React.PropTypes.func,
    assignGroup: React.PropTypes.func,
    unassignGroup: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isEditing: props.params.user_id !== undefined,
    }
  }

  componentWillMount = () => {
    this.props.fetchRoleList()
    this.props.fetchGroupList()

    if (this.state.isEditing && !this.props.user) {
      this.props.fetchUser(this.props.params.user_id)
    }

    // whatever the case, initialize metadata
    this.updateMetadata(this.props.user)
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
      const { isFetching } = this.props
      if (isFetching) {
        return (<FormLoadingComponent />)
      }
      if (this.props.user) {
        return (
          <ProjectUserFormComponent
            currentUser={this.props.user}
            userMetadata={userMetadata}
            onSubmit={this.handleUpdate}
            onAddGroup={this.handleAddGroup}
            backUrl={this.getBackUrl()}
            roleList={this.props.roleList}
            groupList={this.props.groupList}
          />)
      }
      return (<FormEntityNotFoundComponent />)
    }
    return (<ProjectUserFormComponent
      userMetadata={userMetadata}
      onSubmit={this.handleCreate}
      onAddGroup={this.handleAddGroup}
      backUrl={this.getBackUrl()}
      roleList={this.props.roleList}
      groupList={this.props.groupList}
    />)
  }

  handleUpdate = (values) => {
    const { email, roleName, group } = values
    const { user } = this.props
    const updatedUser = {
      ...user.content,
      email,
      role: { name: roleName },
      metaData: packMetaDataField(user, values),
    }
    const { groupList } = this.props
    Promise.resolve(this.props.updateProjectUser(this.props.params.user_id, updatedUser))
      .then((actionResult) => {
        if (!actionResult.error) {
          // Retrieve new group
          const addUserToGroupTasks = chain(group)
            .filter(currentGroup => every(groupList[currentGroup].content.users, userInfo =>
              userInfo.email !== email,
            ))
            .map(currentGroup => this.props.assignGroup(currentGroup, email))
            .value()
          const removeUserFromGroupTasks = chain(groupList)
            .filter(currentGroup => some(currentGroup.content.users, userInfo => userInfo.email === email)
              && every(group, groupName => groupName !== currentGroup.content.name))
            .map(currentGroup => this.props.unassignGroup(currentGroup.content.name, email))
            .value()
          const tasks = concat(addUserToGroupTasks, removeUserFromGroupTasks)
          Promise.all(tasks).then((actionResults) => {
            if (every(actionResults, TeskactionResult => TeskactionResult.error)) {
              const url = this.getBackUrl()
              browserHistory.push(url)
            }
          })
        }
      })
  }

  handleCreate = (values) => {
    const { params } = this.props
    const projectName = params.project
    const frontendParameter = `${AuthenticationRouteParameters.mailAuthenticationAction.urlKey}=${AuthenticationRouteParameters.mailAuthenticationAction.values.validateAccount}`

    Promise.resolve(this.props.createProjectUser({
      email: values.email,
      roleName: values.roleName,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      metaData: packMetaDataField({}, values),
      // Destination of logged users
      originUrl: '/',
      // the backend will use that URL in the email
      requestLink: `${root.location.protocol}//${root.location.host}/user/${projectName}?${frontendParameter}`,
    }))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  /**
   * Updates userMetadata in state  from loaded myUser data. This method always returns a list of metadata,
   * but when user is known, retrieves the current metadata values
   * @param user : myUser values
   */
  updateMetadata = user => this.setState({ userMetadata: getMetadataArray(user) })

  // TODO ajouter le composant de waiting des données pour que le fetch des groupes ait le temps de se faire
  render() {
    return (
      <I18nProvider messageDir="modules/admin-user-projectuser-management/src/i18n">
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  roleList: roleSelectors.getList(state),
  groupList: accessGroupSelectors.getList(state),
  user: ownProps.params.user_id ? projectUserSelectors.getById(state, ownProps.params.user_id) : null,
  isFetching: projectUserSelectors.isFetching(state),
})
const mapDispatchToProps = dispatch => ({
  fetchUser: userId => dispatch(projectUserActions.fetchEntity(userId)),
  createProjectUser: values => dispatch(projectUserActions.createEntity(values)),
  updateProjectUser: (id, values) => dispatch(projectUserActions.updateEntity(id, values)),
  fetchRoleList: () => dispatch(roleActions.fetchEntityList()),
  fetchGroupList: () => dispatch(accessGroupActions.fetchPagedEntityList()),
  assignGroup: (group, user) => dispatch(userGroupActions.sendSignal('PUT', null, { name: group, email: user })),
  unassignGroup: (group, user) => dispatch(userGroupActions.sendSignal('DELETE', null, { name: group, email: user })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUserFormContainer)
