/*
 * LICENSE_PLACEHOLDER
 */
import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import ProjectConnectionList from '@regardsoss/model/src/admin/ProjectConnection'
import ProjectConnectionActions from '../model/ProjectConnectionActions'
import ProjectConnectionSelectors from '../model/ProjectConnectionSelectors'
import GuidedProjectConfigurationComponent from '../components/GuidedProjectConfigurationComponent'

/**
 * Connects a {@link GuidedProjectConfigurationComponent} to the redux store.
 *
 * @author Xavier-Alexandre Brochard
 */
export class GuidedProjectConfigurationContainer extends React.Component {

  static propTypes = {
    // from mapStateToProps
    projectConnections: ProjectConnectionList.isRequired,
    // from mapDispatchToProps
    fetchProjectConnections: React.PropTypes.func.isRequired,
    updateProjectConnection: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchProjectConnections()
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

    return (
      <I18nProvider messageDir="modules/admin-database-management/src/i18n">
        <GuidedProjectConfigurationComponent
          projectConnections={projectConnections}
          onStepSave={this.handleStepSave}
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
  updateProjectConnection: (id, values) => dispatch(ProjectConnectionActions.updateEntity(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GuidedProjectConfigurationContainer)
