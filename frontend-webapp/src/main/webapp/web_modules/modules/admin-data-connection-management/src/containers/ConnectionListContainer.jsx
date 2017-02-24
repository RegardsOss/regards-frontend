/**
 * LICENSE_PLACEHOLDER
 */
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Connection } from '@regardsoss/model'
import ConnectionActions from '../model/ConnectionActions'
import ConnectionSelectors from '../model/ConnectionSelectors'
import ConnectionListComponent from '../components/ConnectionListComponent'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import TestConnectionActions from '../model/TestConnectionActions'
/**
 * List connection
 */
export class ConnectionListContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // from mapStateToProps
    connectionList: React.PropTypes.objectOf(Connection),
    // from mapDispatchToProps
    fetchConnectionList: React.PropTypes.func,
    testConnection: React.PropTypes.func,
    deleteConnection: React.PropTypes.func,
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
    return `/admin/${project}/data/board`
  }

  handleEdit = (connectionId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/connection/${connectionId}/edit`
    browserHistory.push(url)
  }

  handleDelete =(connectionId) => {
    this.props.deleteConnection(connectionId)
  }

  handleTestConnection = (connectionId) => {
    return this.props.testConnection(connectionId)
  }

  render() {
    const { isLoading } = this.state
    const { connectionList } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-connection-management/src/i18n">
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
  connectionList: ConnectionSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchConnectionList: () => dispatch(ConnectionActions.fetchEntityList()),
  deleteConnection: (id) => dispatch(ConnectionActions.deleteEntity(id)),
  testConnection: (id) => dispatch(TestConnectionActions.sendSignal("POST", null, {connectionId: id})),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionListContainer)
