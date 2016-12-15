/*
 * LICENSE_PLACEHOLDER
 */
import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import { browserHistory } from 'react-router'
import ProjectConnectionActions from '../model/ProjectConnectionActions'
import ProjectConnectionSelectors from '../model/ProjectConnectionSelectors'
import ProjectConnectionList from '../components/ProjectConnectionListComponent'

const connectionsList = {
  0: {
    content: {
      id: 0,
      projectName: 'cdpp',
      microservice: 'rs-admin',
      userName: 'Alice',
      password: 'password',
      driverClassName: 'aDriverClassName',
      url: 'http://aUrl',
    },
    links: [],
  },
  1: {
    content: {
      id: 1,
      projectName: 'cdpp',
      microservice: 'rs-cloud',
      userName: 'Bob',
      password: 'azerty',
      driverClassName: 'otherDriverClassName',
      url: 'http://otherUrl',
    },
    links: [],
  },
  2: {
    content: {
      id: 2,
      projectName: 'cdpp',
      microservice: 'rs-dam',
      userName: 'Charlie',
      password: 'qsdfgh',
      driverClassName: 'someDriverClassName',
      url: 'http://someUrl',
    },
    links: [],
  },
}

/**
 * Connects a {@link ProjectConnectionListComponent} to the redux store.
 *
 * @author Xavier-Alexandre Brochard}
 */
export class ProjectConnectionListContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapStateToProps
    projectConnectionList: React.PropTypes.objectOf(
      React.PropTypes.shape({
        content: React.PropTypes.shape({
          id: React.PropTypes.number,
          projectName: React.PropTypes.string,
          microservice: React.PropTypes.string,
          userName: React.PropTypes.string,
          password: React.PropTypes.string,
          driverClassName: React.PropTypes.string,
          url: React.PropTypes.string,
        }),
      }),
    ),
    // from mapDispatchToProps
    //fetchAccountList: React.PropTypes.func,
    //deleteAccount: React.PropTypes.func,
  }

  /*
  componentWillMount() {
    this.props.fetchAccountList()
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
  */

  render() {
    const { projectConnectionList } = this.props

    return (
      <I18nProvider messageDir="modules/admin-database-management/src/i18n">
        <ProjectConnectionList list={connectionsList} />
      </I18nProvider>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  projectConnectionList: ProjectConnectionSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  // fetchAccountList: () => dispatch(ProjectConnectionActions.fetchEntityList()),
  // deleteAccount: accountId => dispatch(ProjectConnectionActions.deleteEntity(accountId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConnectionListContainer)
