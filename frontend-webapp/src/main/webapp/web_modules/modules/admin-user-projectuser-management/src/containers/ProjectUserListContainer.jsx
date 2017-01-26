import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import { browserHistory } from 'react-router'
import { ProjectUser } from '@regardsoss/model'
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
    projectUserList: React.PropTypes.objectOf(ProjectUser),
    // from mapDispatchToProps
    fetchProjectUserList: React.PropTypes.func,
    deleteAccount: React.PropTypes.func,
  }


  componentWillMount() {
    this.props.fetchProjectUserList()
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
    const { projectUserList } = this.props

    return (
      <I18nProvider messageDir="modules/admin-user-projectuser-management/src/i18n">
        <ProjectUserListComponent
          projectUserList={projectUserList}
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
  projectUserList: ProjectUserSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchProjectUserList: () => dispatch(ProjectUserActions.fetchPagedEntityList(0, 100)),
  deleteAccount: accountId => dispatch(ProjectUserActions.deleteEntity(accountId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUserListContainer)
