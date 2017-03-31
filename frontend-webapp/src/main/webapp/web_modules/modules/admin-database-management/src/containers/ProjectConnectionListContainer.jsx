/*
 * LICENSE_PLACEHOLDER
 */
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import { I18nProvider } from '@regardsoss/i18n'
import ProjectConnectionList from '@regardsoss/model/src/admin/ProjectConnection'
import { projectConnectionActions, projectConnectionSelectors } from '../client/ProjectConnectionClient'
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
  }

  componentWillMount() {
    this.props.fetchProjectConnections()
  }

  handleClose = () => {
    const url = '/admin'
    browserHistory.push(url)
  }

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
          onClose={this.handleClose}
          onEdit={this.handleEdit}
        />
      </I18nProvider>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  projectConnections: projectConnectionSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchProjectConnections: () => dispatch(projectConnectionActions.fetchPagedEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConnectionListContainer)
