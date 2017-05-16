/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { Datasource, Model, Connection, PluginMetaData } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import DatasourceFormAttributesComponent from '../components/DatasourceFormAttributesComponent'
import { modelSelectors, modelActions } from '../client/ModelClient'
import { connectionActions, connectionSelectors } from './../client/ConnectionClient'

/**
 * Show the datasource form
 */
export class DatasourceFormAttributesContainer extends React.Component {

  static propTypes = {
    currentDatasource: Datasource,
    handleSave: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    currentConnectionId: PropTypes.string.isRequired,
    // from mapStateToProps
    modelList: PropTypes.objectOf(Model),
    pluginMetaDataList: PropTypes.objectOf(PluginMetaData),
    currentConnection: Connection,
    // from mapDispatchToProps
    fetchModelList: PropTypes.func,
    fetchPluginMetaDataList: PropTypes.func,
    fetchConnection: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    const tasks = [
      this.props.fetchModelList(),
      this.props.fetchConnection(this.props.currentConnectionId),
    ]
    Promise.all(tasks)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  render() {
    const { currentDatasource, currentConnection, pluginMetaDataList, modelList, handleSave, backUrl } = this.props
    const { isLoading } = this.state

    return (
      <I18nProvider messageDir="business-modules/admin-data-datasource-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (<DatasourceFormAttributesComponent
            modelList={modelList}
            currentDatasource={currentDatasource}
            currentConnection={currentConnection}
            pluginMetaDataList={pluginMetaDataList}
            onSubmit={handleSave}
            backUrl={backUrl}
          />)
          }
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  modelList: modelSelectors.getList(state),
  currentConnection: connectionSelectors.getById(state, parseInt(ownProps.currentConnectionId, 10)),
})

const mapDispatchToProps = dispatch => ({
  fetchModelList: () => dispatch(modelActions.fetchEntityList({}, { type: 'DATA' })),
  fetchConnection: id => dispatch(connectionActions.fetchEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasourceFormAttributesContainer)
