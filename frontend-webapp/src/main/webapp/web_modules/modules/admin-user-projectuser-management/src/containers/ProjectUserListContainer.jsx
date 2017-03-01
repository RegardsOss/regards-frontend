import { connect } from 'react-redux'
import { keys } from 'lodash'
import { I18nProvider } from '@regardsoss/i18n'
import { browserHistory } from 'react-router'
import { ProjectUser } from '@regardsoss/model'
import ProjectUserActions from '../model/ProjectUserActions'
import ProjectUserSelectors from '../model/ProjectUserSelectors'
import WaitingAccessProjectUserActions from '../model/WaitingAccessProjectUserActions'
import WaitingAccessProjectUserSelectors from '../model/WaitingAccessProjectUserSelectors'
import ProjectUserListComponent from '../components/ProjectUserListComponent'
/**
 * Show the user list for the current project
 */
export class ProjectUserListContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapStateToProps
    users: React.PropTypes.objectOf(ProjectUser),
    usersCount: React.PropTypes.number.isRequired,
    waitingAccessUsers: React.PropTypes.objectOf(ProjectUser),
    waitingAccessUsersCount: React.PropTypes.number.isRequired,
    isFetchingContent: React.PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchUsers: React.PropTypes.func.isRequired,
    fetchWaitingAccessUsers: React.PropTypes.func.isRequired,
    denyProjectUser: React.PropTypes.func.isRequired,
    validateProjectUser: React.PropTypes.func.isRequired,
    deleteAccount: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchUsers()
    this.props.fetchWaitingAccessUsers()
    this.setFetching(false)
  }

  onDeny = (userId) => {
    this.performAll([this.props.denyProjectUser(userId)])
  }


  onDelete = (userId) => {
    this.props.deleteAccount(userId)
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

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/board`
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/project-user/create`
  }

  setFetching = isFetchingActions => this.setState({ isFetchingActions })

  /**
   * Marks fetching true, performs all promises as parameter, update waiting users state then marks fetching false
   * @param promises promises
   */
  performAll = (promises) => {
    this.setFetching(true)
    const onDone = () => { this.setFetching(false) }
    Promise.all(promises).then(() =>
      Promise.resolve(this.props.fetchWaitingAccessUsers).then(onDone).catch(onDone)).catch(onDone)
  }

  render() {
    const { users, usersCount, waitingAccessUsers, waitingAccessUsersCount, isFetchingContent } = this.props
    const { isFetchingActions } = this.state
    return (
      <I18nProvider messageDir="modules/admin-user-projectuser-management/src/i18n">
        <ProjectUserListComponent
          users={users}
          usersCount={usersCount}
          waitingAccessUsers={waitingAccessUsers}
          waitingAccessUsersCount={waitingAccessUsersCount}
          isFetchingContent={isFetchingContent}
          isFetchingActions={isFetchingActions}
          createUrl={this.getCreateUrl()}
          backUrl={this.getBackUrl()}
          onEdit={this.onEdit}
          onDelete={this.onDelete}
          onValidate={this.onValidate}
          onValidateAll={this.onValidateAll}
          onDeny={this.onDeny}
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const usersMeta = ProjectUserSelectors.getMetaData(state)
  const waitingAccessUsersMeta = WaitingAccessProjectUserSelectors.getMetaData(state)
  return {
    users: ProjectUserSelectors.getList(state),
    usersCount: usersMeta ? usersMeta.totalElements : 0,
    waitingAccessUsers: WaitingAccessProjectUserSelectors.getList(state),
    waitingAccessUsersCount: waitingAccessUsersMeta ? waitingAccessUsersMeta.totalElements : 0,
    isFetchingContent: ProjectUserSelectors.isFetching(state) || WaitingAccessProjectUserSelectors.isFetching(state),
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(ProjectUserActions.fetchPagedEntityList(0, 100)),
  fetchWaitingAccessUsers: () => dispatch(WaitingAccessProjectUserActions.fetchWaitingUsersEntityList(0, 100)),
  validateProjectUser: userId => dispatch((WaitingAccess) => { console.info('I ACCEPTED YOU !!!', userId) }),
  denyProjectUser: userId => dispatch(() => { console.info('I DENIED YOU !!!', userId) }),
  deleteAccount: userId => dispatch(ProjectUserActions.deleteEntity(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUserListContainer)
