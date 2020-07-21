/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import get from 'lodash/get'
import { connect } from '@regardsoss/redux'
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { IDBDatasourceParamsEnum } from '@regardsoss/domain/dam'
import { PluginConfParamsUtils } from '@regardsoss/domain/common'
import { modelAttributesActions, modelAttributesSelectors } from '../../clients/ModelAttributesClient'
import { connectionTableAttributesActions, connectionTableAttributesSelectors } from '../../clients/ConnectionTableAttributesClient'
import { connectionTableActions, connectionTableSelectors } from '../../clients/ConnectionTableClient'
import DBDatasourceFormMappingComponent from '../../components/db/DBDatasourceFormMappingComponent'
import DBDatasourceFormMappingEmptyDatabaseComponent from '../../components/db/DBDatasourceFormMappingEmptyDatabaseComponent'
import messages from '../../i18n'

const { findParam, hasParam } = PluginConfParamsUtils

/**
 * Show the datasource form
 */
export class DBDatasourceFormMappingContainer extends React.Component {
  static propTypes = {
    currentDatasource: DataManagementShapes.Datasource,
    isEditing: PropTypes.bool,
    isCreating: PropTypes.bool,
    handleSave: PropTypes.func,
    handleBack: PropTypes.func,
    // from mapStateToProps
    tableList: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string,
      schema: PropTypes.string,
      pKey: PropTypes.string,
    })),
    tableAttributeList: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string,
      javaSqlType: PropTypes.string,
      isPrimaryKey: PropTypes.bool,
    })),
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    currentPluginMetaData: CommonShapes.PluginMetaData,
    // from mapDispatchToProps
    fetchTable: PropTypes.func,
    fetchTableAttributes: PropTypes.func,
    flushTableAttributes: PropTypes.func,
    fetchModelAttributeList: PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    const { isEditing, currentDatasource } = this.props
    const pluginConfConnectionId = get(findParam(currentDatasource, IDBDatasourceParamsEnum.CONNECTION), 'value')
    const modelName = get(findParam(currentDatasource, IDBDatasourceParamsEnum.MODEL), 'value')
    const tasks = [
      this.props.fetchTable(pluginConfConnectionId),
      this.props.fetchModelAttributeList(modelName),
    ]
    // If we edit a datasource and that datasource has a tableName, fetch the list of attributes from that table
    if (isEditing && hasParam(currentDatasource, IDBDatasourceParamsEnum.TABLE)) {
      const tableName = get(findParam(currentDatasource, IDBDatasourceParamsEnum.TABLE), 'value')
      tasks.push(this.props.fetchTableAttributes(pluginConfConnectionId, tableName))
    }
    Promise.all(tasks)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  getForm = () => {
    const {
      currentDatasource, tableList, tableAttributeList, modelAttributeList, handleBack, handleSave, isEditing, isCreating,
    } = this.props
    return (<DBDatasourceFormMappingComponent
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

  handleTableSelected = (tableName) => {
    const { currentDatasource } = this.props
    // Do not fetch table attributes if table is empty
    if (tableName.length > 0) {
      const pluginConfConnectionId = get(findParam(currentDatasource, IDBDatasourceParamsEnum.CONNECTION), 'value')

      this.props.flushTableAttributes()
      this.props.fetchTableAttributes(pluginConfConnectionId, tableName)
    }
  }

  isSingleTable = () => {
    const { currentPluginMetaData } = this.props
    return currentPluginMetaData.content.interfaceNames.includes('fr.cnes.regards.modules.dam.domain.datasources.plugins.IDBDataSourceFromSingleTablePlugin')
  }

  render() {
    const { tableList, handleBack } = this.props
    const { isLoading } = this.state
    const emptyComponent = (<DBDatasourceFormMappingEmptyDatabaseComponent
      handleBack={handleBack}
    />)
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
          isEmpty={tableList.length === 0}
          emptyComponent={emptyComponent}
        >
          {this.getForm}
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

const mapDispatchToProps = (dispatch) => ({
  fetchTable: (connectionId) => dispatch(connectionTableActions.sendSignal('GET', null, {
    connectionId,
  })),
  fetchTableAttributes: (connectionId, tableName) => dispatch(connectionTableAttributesActions.sendSignal('GET', null, {
    connectionId,
    tableName,
  })),
  flushTableAttributes: (connectionId, tableName) => dispatch(connectionTableAttributesActions.flush()),
  fetchModelAttributeList: (modelName) => dispatch(modelAttributesActions.fetchEntityList({ modelName })),
})

export default connect(mapStateToProps, mapDispatchToProps)(DBDatasourceFormMappingContainer)
