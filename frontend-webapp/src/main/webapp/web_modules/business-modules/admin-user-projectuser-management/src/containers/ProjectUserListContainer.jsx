/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { keys } from 'lodash'
import { I18nProvider } from '@regardsoss/i18n'
import { browserHistory } from 'react-router'
import { ProjectUser } from '@regardsoss/model'
import { projectUserActions, projectUserSelectors } from '../client/ProjectUserClient'
import { waitingAccessUsersEntitiesActions, waitingAccessUsersEntitiesSelectors } from '../client/WaitingAccessUsersEntitiesClient'
import { waitingAccessUsersSignalActions } from '../client/WaitingAccessUsersSignalClient'
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
    waitingAccessUsers: React.PropTypes.objectOf(ProjectUser),
    isFetchingContent: React.PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchUsers: React.PropTypes.func.isRequired,
    fetchWaitingAccessUsers: React.PropTypes.func.isRequired,
    denyProjectUser: React.PropTypes.func.isRequired,
    validateProjectUser: React.PropTypes.func.isRequired,
    deleteAccount: React.PropTypes.func.isRequired,
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
      <I18nProvider messageDir="business-modules/admin-user-projectuser-management/src/i18n">
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
  validateProjectUser: userId => dispatch(waitingAccessUsersSignalActions.sendAccept(userId)),
  denyProjectUser: userId => dispatch(waitingAccessUsersSignalActions.sendDeny(userId)),
  deleteAccount: userId => dispatch(projectUserActions.deleteEntity(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUserListContainer)
