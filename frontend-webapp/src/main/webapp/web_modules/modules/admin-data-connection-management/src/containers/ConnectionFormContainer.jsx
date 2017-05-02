/**
 * LICENSE_PLACEHOLDER
 */
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Connection, PluginMetaData } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { connectionActions, connectionSelectors } from '../client/ConnectionClient'
import ConnectionFormComponent from '../components/ConnectionFormComponent'
import { pluginMetaDataActions, pluginMetaDataSelectors } from '../client/PluginMetaDataClient'

/**
 * List connection
 */
export class ConnectionFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      connectionId: React.PropTypes.string,
    }),
    // from mapStateToProps
    currentConnection: Connection,
    pluginMetaDataList: React.PropTypes.objectOf(PluginMetaData),
    // from mapDispatchToProps
    fetchConnection: React.PropTypes.func,
    createConnection: React.PropTypes.func,
    updateConnection: React.PropTypes.func,
    fetchPluginMetaDataList: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    const isCreating = props.params.connectionId === undefined
    this.state = {
      isCreating,
      isEditing: props.params.connectionId !== undefined,
      isLoading: true,
    }
  }

  componentDidMount() {
    const tasks = []
    tasks.push(this.props.fetchPluginMetaDataList())
    if (this.state.isEditing) {
      tasks.push(this.props.fetchConnection(this.props.params.connectionId))
    }
    Promise.all(tasks)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/connection/list`
  }


  handleCreate = (values) => {
    const newConnection = {
      label: values.label,
      pluginClassName: values.pluginClassName,
      user: values.user,
      password: values.password,
      dbHost: values.dbHost,
      dbPort: values.dbPort,
      dbName: values.dbName,
      maxPoolSize: values.maxPoolSize,
      minPoolSize: values.minPoolSize,
    }
    Promise.resolve(this.props.createConnection(newConnection))
      .then((actionResult) => {
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  handleUpdate = (values) => {
    const updatedConnection = Object.assign({}, this.props.currentConnection.content, {
      label: values.label,
      pluginClassName: values.pluginClassName,
      user: values.user,
      password: values.password,
      dbHost: values.dbHost,
      dbPort: values.dbPort,
      dbName: values.dbName,
      maxPoolSize: values.maxPoolSize,
      minPoolSize: values.minPoolSize,
    })
    Promise.resolve(this.props.updateConnection(this.props.params.connectionId, updatedConnection))
      .then((actionResult) => {
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  render() {
    const { currentConnection, pluginMetaDataList } = this.props
    const { isEditing, isCreating, isLoading } = this.state
    return (
      <I18nProvider messageDir="modules/admin-data-connection-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (<ConnectionFormComponent
            onSubmit={isEditing ? this.handleUpdate : this.handleCreate}
            currentConnection={currentConnection}
            pluginMetaDataList={pluginMetaDataList}
            backUrl={this.getBackUrl()}
            isEditing={isEditing}
            isCreating={isCreating}
          />)
          }
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentConnection: ownProps.params.connectionId ? connectionSelectors.getById(state, ownProps.params.connectionId) : null,
  pluginMetaDataList: pluginMetaDataSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchConnection: id => dispatch(connectionActions.fetchEntity(id)),
  createConnection: values => dispatch(connectionActions.createEntity(values)),
  updateConnection: (id, values) => dispatch(connectionActions.updateEntity(id, values)),
  fetchPluginMetaDataList: () => dispatch(pluginMetaDataActions.fetchEntityList({
    microserviceName: 'rs-dam',
  }, {
    pluginType: 'fr.cnes.regards.modules.datasources.plugins.interfaces.IDBConnectionPlugin',
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionFormContainer)
