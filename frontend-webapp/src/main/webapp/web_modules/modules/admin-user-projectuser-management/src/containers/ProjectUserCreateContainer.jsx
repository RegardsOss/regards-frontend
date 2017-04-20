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
import { AuthenticationRouteParameters } from '@regardsoss/authentication-manager'
import RoleActions from '../model/RoleActions'
import RoleSelectors from '../model/RoleSelectors'
import ProjectUserActions from '../model/ProjectUserActions'
import ProjectUserSelectors from '../model/ProjectUserSelectors'
import AccessGroupActions from '../model/AccessGroupActions'
import AccessGroupSelectors from '../model/AccessGroupSelectors'
import UserGroupActions from '../model/UserGroupActions'
import ProjectUserCreateComponent from '../components/ProjectUserCreateComponent'

export class ProjectUserCreateContainer extends React.Component {
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

  componentWillMount() {
    this.props.fetchRoleList()
    this.props.fetchGroupList()

    if (this.state.isEditing && !this.props.user) {
      this.props.fetchUser(this.props.params.user_id)
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/project-user/list`
  }

  getFormComponent = () => {
    if (this.state.isEditing) {
      const { isFetching } = this.props
      if (isFetching) {
        return (<FormLoadingComponent />)
      }
      if (this.props.user) {
        return (<ProjectUserCreateComponent
          onSubmit={this.handleUpdate}
          onAddGroup={this.handleAddGroup}
          backUrl={this.getBackUrl()}
          currentUser={this.props.user}
          roleList={this.props.roleList}
          groupList={this.props.groupList}
        />)
      }
      return (<FormEntityNotFoundComponent />)
    }
    return (<ProjectUserCreateComponent
      onSubmit={this.handleCreate}
      onAddGroup={this.handleAddGroup}
      backUrl={this.getBackUrl()}
      roleList={this.props.roleList}
      groupList={this.props.groupList}
    />)
  }

  handleUpdate = (values) => {
    const { email, roleName, group } = values
    const updatedUser = {
      ...this.props.user.content,
      email,
      role: { name: roleName },
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
      metaData: [],
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
  roleList: RoleSelectors.getList(state),
  groupList: AccessGroupSelectors.getList(state),
  user: ownProps.params.user_id ? ProjectUserSelectors.getById(state, ownProps.params.user_id) : null,
  isFetching: ProjectUserSelectors.isFetching(state),
})
const mapDispatchToProps = dispatch => ({
  fetchUser: (userId) => dispatch(ProjectUserActions.fetchEntity(userId)),
  createProjectUser: values => dispatch(ProjectUserActions.createEntity(values)),
  updateProjectUser: (id, values) => dispatch(ProjectUserActions.updateEntity(id, values)),
  fetchRoleList: () => dispatch(RoleActions.fetchEntityList()),
  fetchGroupList: () => dispatch(AccessGroupActions.fetchPagedEntityList()),
  assignGroup: (group, user) => dispatch(UserGroupActions.sendSignal('PUT', null, { name: group, email: user })),
  unassignGroup: (group, user) => dispatch(UserGroupActions.sendSignal('DELETE', null, { name: group, email: user })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUserCreateContainer)
