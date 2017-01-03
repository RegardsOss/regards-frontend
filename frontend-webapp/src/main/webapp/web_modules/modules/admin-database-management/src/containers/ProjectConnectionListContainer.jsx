/*
 * LICENSE_PLACEHOLDER
 */
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { I18nProvider } from '@regardsoss/i18n'
import ProjectConnectionList from '@regardsoss/model/src/admin/ProjectConnection'
import ProjectConnectionActions from '../model/ProjectConnectionActions'
import ProjectConnectionSelectors from '../model/ProjectConnectionSelectors'
import ProjectConnectionListComponent from '../components/ProjectConnectionListComponent'

/**
 * Connects a {@link ProjectConnectionListComponent} to the redux store.
 *
 * @author Xavier-Alexandre Brochard}
 */
export class ProjectConnectionListContainer extends React.Component {

  static propTypes = {
    // from mapStateToProps
    projectConnections: ProjectConnectionList.isRequired,
    // from mapDispatchToProps
    fetchProjectConnections: React.PropTypes.func,
    //deleteAccount: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchProjectConnections()
  }

  /*
  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/board`
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/user/project-user/create`
  }
*/
  handleEdit = (projectConnectionId) => {
    const url = `/admin/project-connection/${projectConnectionId}/edit`
    browserHistory.push(url)
  }

  render() {
    const { projectConnections } = this.props

    return (
      <I18nProvider messageDir="modules/admin-database-management/src/i18n">
        <ProjectConnectionListComponent
          projectConnections={projectConnections}
          onEdit={this.handleEdit}
        />
      </I18nProvider>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  projectConnections: ProjectConnectionSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchProjectConnections: () => dispatch(ProjectConnectionActions.fetchEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConnectionListContainer)
