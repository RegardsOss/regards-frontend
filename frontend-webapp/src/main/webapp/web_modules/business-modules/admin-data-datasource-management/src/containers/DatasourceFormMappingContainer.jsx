/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { Datasource, ModelAttribute, PluginMetaData } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import DatasourceFormMappingComponent from '../components/DatasourceFormMappingComponent'
import { modelAttributesActions, modelAttributesSelectors } from '../client/ModelAttributesClient'
import { connectionTableActions, connectionTableSelectors } from '../client/ConnectionTableClient'
import { connectionTableAttributesActions, connectionTableAttributesSelectors } from '../client/ConnectionTableAttributesClient'


/**
 * Show the datasource form
 */
export class DatasourceFormMappingContainer extends React.Component {

  static propTypes = {
    currentDatasource: Datasource,
    isEditing: PropTypes.bool,
    isCreating: PropTypes.bool,
    handleSave: PropTypes.func,
    handleBack: PropTypes.func,
    // from mapStateToProps
    tableList: PropTypes.shape({
      name: PropTypes.string,
      schema: PropTypes.string,
      pKey: PropTypes.string,
    }),
    tableAttributeList: PropTypes.shape({
      name: PropTypes.string,
      javaSqlType: PropTypes.string,
      isPrimaryKey: PropTypes.bool,
    }),
    modelAttributeList: PropTypes.objectOf(ModelAttribute),
    currentPluginMetaData: PluginMetaData,
    // from mapDispatchToProps
    fetchTable: PropTypes.func,
    fetchTableAttributes: PropTypes.func,
    flushTableAttributes: PropTypes.func,
    fetchModelAttributeList: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }
  componentDidMount() {
    const { isEditing, currentDatasource } = this.props
    const tasks = [
      this.props.fetchTable(currentDatasource.content.pluginConfigurationConnectionId),
      this.props.fetchModelAttributeList(currentDatasource.content.mapping.model),
    ]
    // If we edit a datasource and that datasource has a tableName, fetch the list of attributes from that table
    if (isEditing && currentDatasource.content.tableName) {
      tasks.push(this.props.fetchTableAttributes(currentDatasource.content.pluginConfigurationConnectionId, currentDatasource.content.tableName))
    }
    Promise.all(tasks)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }


  handleTableSelected = (tableName) => {
    const { currentDatasource } = this.props
    // Do not fetch table attributes if table is empty
    if (tableName.length > 0) {
      this.props.flushTableAttributes()
      this.props.fetchTableAttributes(currentDatasource.content.pluginConfigurationConnectionId, tableName)
    }
  }

  isSingleTable = () => {
    const { currentPluginMetaData } = this.props
    return currentPluginMetaData.content.interfaceNames.includes('fr.cnes.regards.modules.datasources.plugins.interfaces.IDataSourceFromSingleTablePlugin')
  }

  render() {
    const { currentDatasource, tableList, tableAttributeList, modelAttributeList, handleBack, handleSave, isEditing, isCreating } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-data-datasource-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (<DatasourceFormMappingComponent
            currentDatasource={currentDatasource}
            tableList={tableList}
            tableAttributeList={tableAttributeList}
            modelAttributeList={modelAttributeList}
            onTableSelected={this.handleTableSelected}
            onSubmit={handleSave}
            handleBack={handleBack}
            isSingleTable={this.isSingleTable()}
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
  tableList: connectionTableSelectors.getResult(state),
  tableAttributeList: connectionTableAttributesSelectors.getResult(state),
  modelAttributeList: modelAttributesSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchTable: connectionId => dispatch(connectionTableActions.sendSignal('GET', null, {
    connectionId,
  })),
  fetchTableAttributes: (connectionId, tableName) => dispatch(connectionTableAttributesActions.sendSignal('GET', null, {
    connectionId,
    tableName,
  })),
  flushTableAttributes: (connectionId, tableName) => dispatch(connectionTableAttributesActions.flush()),
  fetchModelAttributeList: id => dispatch(modelAttributesActions.fetchEntityList({ pModelId: id })),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasourceFormMappingContainer)
