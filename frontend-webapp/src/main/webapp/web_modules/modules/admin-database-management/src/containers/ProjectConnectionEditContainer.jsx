/*
 * LICENSE_PLACEHOLDER
 */
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import ProjectConnection from '@regardsoss/model/src/admin/ProjectConnection'
import ProjectConnectionActions from '../model/ProjectConnectionActions'
import ProjectConnectionSelectors from '../model/ProjectConnectionSelectors'
import ProjectConnectionEditComponent from '../components/ProjectConnectionEditComponent'

/**
 * React container connecting the {@link ProjectConnectionEditComponent} to the redux store.
 *
 * @author Xavier-Alexandre Brochard
 */
export class ProjectConnectionEditContainer extends React.Component {
  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project_connection_id: React.PropTypes.string,
    }),
    // from mapStateToProps
    projectConnection: ProjectConnection.isRequired,
    isFetching: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchProjectConnection: React.PropTypes.func,
    updateProjectConnection: React.PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchProjectConnection(this.props.params.project_connection_id)
  }

  getBackUrl = () => ('/admin/project-connection/list')

  getFormComponent = () => {
    const { projectConnection, isFetching } = this.props
    if (isFetching) {
      return (<FormLoadingComponent />)
    }
    if (projectConnection) {
      return (<ProjectConnectionEditComponent
        projectConnection={this.props.projectConnection}
        onSubmit={this.handleUpdate}
        onCancel={this.handleCancel}
      />)
    }
    return (<FormEntityNotFoundComponent />)
  }

  handleUpdate = (values) => {
    const updatedProjectConnection = Object.assign({}, this.props.projectConnection.content, {
      userName: values.userName,
      password: values.password,
      driverClassName: values.driverClassName,
      url: values.url,
    })
    Promise.resolve(this.props.updateProjectConnection(this.props.projectConnection.content.id, updatedProjectConnection))
    .then((actionResult) => {
      if (!actionResult.error) {
        const url = this.getBackUrl()
        browserHistory.push(url)
      }
    })
  }

  handleCancel = () => {
    const url = this.getBackUrl()
    browserHistory.push(url)
  }

  render() {
    return (
      <I18nProvider messageDir="modules/admin-database-management/src/i18n">
        {this.getFormComponent()}
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  projectConnection: ownProps.params.project_connection_id ? ProjectConnectionSelectors.getById(state, ownProps.params.project_connection_id) : null,
  isFetching: ProjectConnectionSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  updateProjectConnection: (id, values) => dispatch(ProjectConnectionActions.updateEntity(id, values)),
  fetchProjectConnection: id => dispatch(ProjectConnectionActions.fetchEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectConnectionEditContainer)
