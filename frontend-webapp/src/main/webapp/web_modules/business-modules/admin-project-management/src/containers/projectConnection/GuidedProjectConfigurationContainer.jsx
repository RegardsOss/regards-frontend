/*
 * LICENSE_PLACEHOLDER
 */
import keys from 'lodash/keys'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Project, ProjectConnection } from '@regardsoss/model'
import { LoadingComponent } from '@regardsoss/display-control'
import { FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { projectConnectionActions, projectConnectionSelectors } from '../../client/ProjectConnectionClient'
import { projectActions, projectSelectors } from '../../client/ProjectClient'
import GuidedProjectConfigurationComponent from '../../components/projectConnection/GuidedProjectConfigurationComponent'

/**
 * Connects a {@link GuidedProjectConfigurationComponent} to the redux store.
 *
 * @author Xavier-Alexandre Brochard
 * @author Sébastien Binda
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
    projectConnectionsIsFetching: React.PropTypes.bool,
    project: Project,
    projectIsFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchProject: React.PropTypes.func.isRequired,
    fetchProjectConnections: React.PropTypes.func.isRequired,
    updateProjectConnection: React.PropTypes.func.isRequired,
    saveProjectConnection: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    if (keys(this.props.fetchProjectConnections).length === 0) {
      this.props.fetchProjectConnections(this.props.params.project_name)
    }
    if (!this.props.project) {
      this.props.fetchProject(this.props.params.project_name)
    }
  }

  render() {
    const { projectConnections } = this.props

    if (this.props.projectIsFetching || this.props.projectConnectionsIsFetching) {
      return <LoadingComponent />
    }

    if (!this.props.project) {
      return <FormEntityNotFoundComponent />
    }

    return (
      <I18nProvider messageDir="modules/admin-project-management/src/i18n">
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
  projectIsFetching: projectSelectors.isFetching(state),
  projectConnections: projectConnectionSelectors.getList(state),
  projectConnectionsIsFetching: projectConnectionSelectors.isFetching(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchProject: () => dispatch(projectActions.fetchEntity(ownProps.params.project_name)),
  fetchProjectConnections: () => dispatch(projectConnectionActions.fetchPagedEntityList(0, 0, {
    projectName: ownProps.params.project_name,
  })),
  saveProjectConnection: (values, projectName) => dispatch(projectConnectionActions.createEntity(values, {
    projectName,
  })),
  updateProjectConnection: (id, values, projectName) => dispatch(projectConnectionActions.updateEntity(id, values, {
    projectName,
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(GuidedProjectConfigurationContainer)
