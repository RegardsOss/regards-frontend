import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { ProjectUser, AccessGroup } from '@regardsoss/model'
import { forEach } from 'lodash'
import RoleActions from '../model/RoleActions'
import RoleSelectors from '../model/RoleSelectors'
import ProjectUserActions from '../model/ProjectUserActions'
import ProjectUserSelectors from '../model/ProjectUserSelectors'
import AccessGroupActions from '../model/AccessGroupActions'
import AccessGroupSelectors from '../model/AccessGroupSelectors'
import AccessesActions from '../model/AccessesActions'
import UserGroupActions from '../model/UserGroupActions'
import ProjectUserCreateComponent from '../components/ProjectUserCreateComponent'

export class ProjectUserCreateContainer extends React.Component {
  static propTypes = {
    // from mapStateToProps
    roleList: React.PropTypes.objectOf(
      React.PropTypes.shape({
        content: React.PropTypes.shape({
          id: React.PropTypes.number,
          name: React.PropTypes.string,
        }),
      }),
    ),
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
    Promise.resolve(this.props.updateProjectUser(this.props.params.user_id, updatedUser))
      .then((actionResult) => {
        if (!actionResult.error) {
          Promise.resolve(
            forEach(group, currentGroup => this.props.assignGroup(currentGroup, email)),
          ).then((actionResult2) => {
            if (!actionResult2.error) {
              const url = this.getBackUrl()
              browserHistory.push(url)
            }
          })
        }
      })
  }

  handleCreate = (values) => {
    Promise.resolve(this.props.createProjectUser({
      email: values.email,
      roleName: values.roleName,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.lastName,
      metaData: [],
      permissions: [],
    }))
    .then((actionResult) => {
      // We receive here the action
      if (!actionResult.error) {
        const url = this.getBackUrl()
        browserHistory.push(url)
      }
    })
  }

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
  createProjectUser: values => dispatch(AccessesActions.createEntity(values)),
  updateProjectUser: (id, values) => dispatch(ProjectUserActions.updateEntity(id, values)),
  fetchRoleList: () => dispatch(RoleActions.fetchEntityList()),
  fetchGroupList: () => dispatch(AccessGroupActions.fetchPagedEntityList()),
  assignGroup: (group, user) => dispatch(UserGroupActions.sendSignal('PUT', null, { name: group, email: user })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUserCreateContainer)
