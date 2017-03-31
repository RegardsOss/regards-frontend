/*
 * LICENSE_PLACEHOLDER
 */
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Project, ProjectConnection } from '@regardsoss/model'
import { projectConnectionActions, projectConnectionSelectors } from '../client/ProjectConnectionClient'
import { projectActions, projectSelectors } from '../client/ProjectClient'
import GuidedProjectConfigurationComponent from '../components/GuidedProjectConfigurationComponent'

/**
 * Connects a {@link GuidedProjectConfigurationComponent} to the redux store.
 *
 * @author Xavier-Alexandre Brochard
 */
export class GuidedProjectConfigurationContainer extends React.Component {

  static propTypes = {
    // from router
    // eslint-disable-next-line react/no-unused-prop-types
    params: React.PropTypes.shape({
      project_name: React.PropTypes.string,
    }),
    // from mapStateToProps
    projectConnections: React.PropTypes.objectOf(ProjectConnection),
    project: Project,
    // from mapDispatchToProps
    fetchProject: React.PropTypes.func.isRequired,
    fetchProjectConnections: React.PropTypes.func.isRequired,
    updateProjectConnection: React.PropTypes.func.isRequired,
    saveProjectConnection: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      projectConnectionsFetching: true,
      projectFetching: true,
    }
  }

  componentWillMount() {
    Promise.resolve(this.props.fetchProjectConnections()).then(actionResult => this.setState({
      projectConnectionsFetching: false,
    }))

    Promise.resolve(this.props.fetchProject()).then(actionResult => this.setState({
      projectFetching: false,
    }))
  }

  handleStepSave = (projectConnection, values, callback) => {
    const updatedProjectConnection = Object.assign({}, projectConnection.content, {
      userName: values.userName,
      password: values.password,
      driverClassName: values.driverClassName,
      url: values.url,
    })
    Promise.resolve(this.props.updateProjectConnection(projectConnection.content.id, updatedProjectConnection))
      .then((actionResult) => {
        if (!actionResult.error) {
          callback()
        }
      })
  }

  render() {
    const { projectConnections } = this.props

    if (this.state.projectConnectionsFetching || this.state.projectFetching) {
      return null
    }
    return (
      <I18nProvider messageDir="modules/admin-database-management/src/i18n">
        <GuidedProjectConfigurationComponent
          project={this.props.project}
          projectConnections={projectConnections}
          onSaveProjectConnection={this.props.saveProjectConnection}
          onUpdateProjectConnection={this.props.updateProjectConnection}
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  project: projectSelectors.getById(state, ownProps.params.project_name),
  projectConnections: projectConnectionSelectors.getList(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchProject: () => dispatch(projectActions.fetchEntity(ownProps.params.project_name)),
  fetchProjectConnections: () => dispatch(projectConnectionActions.fetchPagedEntityList(0, 0, {}, {
    project_name: ownProps.params.project_name,
  })),
  saveProjectConnection: values => dispatch(projectConnectionActions.createEntity(values)),
  updateProjectConnection: (id, values) => dispatch(projectConnectionActions.updateEntity(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GuidedProjectConfigurationContainer)
