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
import some from 'lodash/some'
import find from 'lodash/find'
import flow from 'lodash/flow'
import map from 'lodash/map'
import get from 'lodash/get'
import fpmap from 'lodash/fp/map'
import fpsortBy from 'lodash/fp/sortBy'
import { CardTitle, CardText } from 'material-ui/Card'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
} from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { DataManagementShapes } from '@regardsoss/shape'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { IDBDatasourceParamsEnum } from '@regardsoss/domain/dam'
import { PluginConfParamsUtils } from '@regardsoss/domain/common'
import DBDatasourceFormMappingLineComponent from './DBDatasourceFormMappingLineComponent'
import StaticAttributeListDB from '../../domain/db/StaticAttributeListDB'
import states from '../../domain/db/FormMappingStates'

const { findParam } = PluginConfParamsUtils

export class DBDatasourceFormMappingFromTableComponent extends React.Component {
  static propTypes = {
    currentDatasource: DataManagementShapes.Datasource,
    isEditing: PropTypes.bool,
    table: PropTypes.shape({
      name: PropTypes.string,
      schema: PropTypes.string,
      pKey: PropTypes.string,
    }),
    tableAttributeList: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string,
      javaSqlType: PropTypes.string,
      isPrimaryKey: PropTypes.bool,
    })),
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    change: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Returns
   * - false if we are not editing a datasource
   * - false if the AttributeMapping.nameDS match a TableAttribute name
   * - true otherwise, which means that AttributeMapping.nameDS is a query SQL and not a TableAttribute name
   * @param modelAttribute
   * @returns {boolean}
   */
  getIsEditingSQL = (modelAttribute) => {
    const { currentDatasource, tableAttributeList, isEditing } = this.props
    if (isEditing) {
      const attributesMapping = get(findParam(currentDatasource, IDBDatasourceParamsEnum.MAPPING), 'value', [])
      const currentAttributeMapping = find(attributesMapping, (attributeMapping) => attributeMapping.name === modelAttribute.content.attribute.name)
      if (currentAttributeMapping) {
        return !some(tableAttributeList, (tableAttribute) => currentAttributeMapping.nameDS === tableAttribute.name)
      }
    }
    return false
  }

  render() {
    const {
      modelAttributeList, table, tableAttributeList, change,
    } = this.props

    const mappingLines = flow(
      fpsortBy('content.attribute.optional'),
      fpmap((modelAttribute) => {
        const isEditingSQL = this.getIsEditingSQL(modelAttribute)
        return (
          <DBDatasourceFormMappingLineComponent
            key={modelAttribute.content.id}
            tableAttributeList={tableAttributeList}
            modelAttribute={modelAttribute}
            isEditingSQL={isEditingSQL}
            table={table}
            change={change}
          />
        )
      }),
    )(modelAttributeList)
    return (
      <div>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'datasource.form.mapping.fromTable.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'datasource.form.mapping.fromTable.subtitle' })}
        />
        <CardText>
          <Field
            name={`${states.FROM_TABLE}.table`}
            fullWidth
            component={RenderTextField}
            type="text"
            label={this.context.intl.formatMessage({ id: 'datasource.form.mapping.fromTable.tableName' })}
            disabled
          />
        </CardText>
        <Table
          selectable={false}
        >
          <TableHeader
            enableSelectAll={false}
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn><FormattedMessage id="datasource.form.mapping.table.attributeStatic" /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage id="datasource.form.mapping.table.dbValue" /></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            preScanRows={false}
            showRowHover
          >
            {map(StaticAttributeListDB, (staticAttribute) => {
              const isEditingSQL = this.getIsEditingSQL(staticAttribute)
              return (
                <DBDatasourceFormMappingLineComponent
                  key={staticAttribute.content.attribute.name}
                  tableAttributeList={tableAttributeList}
                  modelAttribute={staticAttribute}
                  isStaticAttribute
                  isEditingSQL={isEditingSQL}
                  table={table}
                  change={change}
                />
              )
            })}
          </TableBody>
        </Table>
        <Table
          selectable={false}
        >
          <TableHeader
            enableSelectAll={false}
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn><FormattedMessage id="datasource.form.mapping.table.attribute" /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage id="datasource.form.mapping.table.dbValue" /></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            preScanRows={false}
            showRowHover
          >
            {mappingLines}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default DBDatasourceFormMappingFromTableComponent
