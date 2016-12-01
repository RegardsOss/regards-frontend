import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import { browserHistory } from 'react-router'
import ProjectUserActions from '../model/ProjectUserActions'
import ProjectUserSelectors from '../model/ProjectUserSelectors'
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
    projectUserList: React.PropTypes.objectOf(
      React.PropTypes.shape({
        content: React.PropTypes.shape({
          id: React.PropTypes.number,
          role_id: React.PropTypes.string,
          email: React.PropTypes.string,
          lastupdate: React.PropTypes.string,
          lastconnection: React.PropTypes.string,
          status: React.PropTypes.string,
        }),
      }),
    ),
    // from mapDispatchToProps
    fetchAccountList: React.PropTypes.func,
    deleteAccount: React.PropTypes.func,
  }


  componentWillMount() {
    this.props.fetchAccountList()
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/create`
  }

  handleEdit = (accountId) => {
    const url = `/admin/account/${accountId}/edit`
    browserHistory.push(url)
  }

  handleDelete = (accountId) => {
    this.props.deleteAccount(accountId)
  }

  render() {
    const { projectUserList } = this.props

    return (
      <I18nProvider messageDir="modules/admin-user-projectuser-management/src/i18n">
        <ProjectUserListComponent
          projectUserList={projectUserList}
          createUrl={this.getCreateUrl()}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
        />
      </I18nProvider>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  projectUserList: ProjectUserSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchAccountList: () => dispatch(ProjectUserActions.fetchEntityList()),
  deleteAccount: accountId => dispatch(ProjectUserActions.deleteEntity(accountId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUserListContainer)
