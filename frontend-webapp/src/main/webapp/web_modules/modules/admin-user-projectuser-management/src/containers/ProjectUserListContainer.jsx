import { connect } from 'react-redux'
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
    waitingAccessUsers: React.PropTypes.objectOf(ProjectUser),
    // from mapDispatchToProps
    fetchProjectUserList: React.PropTypes.func.isRequired,
    deleteAccount: React.PropTypes.func.isRequired,
  }


  componentWillMount() {
    this.props.fetchProjectUserList()
    // we do not fetch waiting users here, the notification component of admin already does it
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/board`
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/project-user/create`
  }

  handleEdit = (accountId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/user/project-user/${accountId}/edit`
    browserHistory.push(url)
  }

  handleDelete = (accountId) => {
    this.props.deleteAccount(accountId)
  }

  render() {
    const { users, waitingAccessUsers } = this.props

    // TODO inject : onValidate, validateAll, isFetching
    return (
      <I18nProvider messageDir="modules/admin-user-projectuser-management/src/i18n">
        <ProjectUserListComponent
          users={users}
          waitingAccessUsers={waitingAccessUsers}
          createUrl={this.getCreateUrl()}
          backUrl={this.getBackUrl()}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}

        />
      </I18nProvider>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  users: ProjectUserSelectors.getList(state),
  waitingAccessUsers: WaitingAccessProjectUserSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchProjectUserList: () => dispatch(ProjectUserActions.fetchPagedEntityList(0, 100)),
  deleteAccount: accountId => dispatch(ProjectUserActions.deleteEntity(accountId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUserListContainer)
