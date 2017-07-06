/**
 * LICENSE_PLACEHOLDER
 */
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { connectionActions, connectionSelectors } from '../clients/ConnectionClient'
import ConnectionListComponent from '../components/ConnectionListComponent'
import { connectionTestActions } from '../clients/ConnectionTestClient'
/**
 * List connection
 */
export class ConnectionListContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    connectionList: DataManagementShapes.ConnectionList,
    // from mapDispatchToProps
    fetchConnectionList: PropTypes.func,
    testConnection: PropTypes.func,
    deleteConnection: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  componentWillMount() {
    Promise.resolve(this.props.fetchConnectionList())
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/connection/create`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/board?advanced=true`
  }

  handleEdit = (connectionId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/connection/${connectionId}/edit`
    browserHistory.push(url)
  }

  handleDelete =(connectionId) => {
    this.props.deleteConnection(connectionId)
  }

  handleTestConnection = connectionId => this.props.testConnection(connectionId)

  render() {
    const { isLoading } = this.state
    const { connectionList } = this.props
    return (
      <I18nProvider messageDir="business-modules/admin-data-connection-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          <ConnectionListComponent
            connectionList={connectionList}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            handleTestConnection={this.handleTestConnection}
            backUrl={this.getBackUrl()}
            createUrl={this.getCreateUrl()}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  connectionList: connectionSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchConnectionList: () => dispatch(connectionActions.fetchEntityList()),
  deleteConnection: id => dispatch(connectionActions.deleteEntity(id)),
  testConnection: id => dispatch(connectionTestActions.sendSignal('POST', null, { connectionId: id })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionListContainer)
