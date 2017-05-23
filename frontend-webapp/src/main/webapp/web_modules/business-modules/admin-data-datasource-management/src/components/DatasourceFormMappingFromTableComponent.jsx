/**
 * LICENSE_PLACEHOLDER
 **/
import some from 'lodash/some'
import find from 'lodash/find'
import { chain } from 'lodash'
import map from 'lodash/map'
import { CardTitle, CardText } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { Datasource, ModelAttribute } from '@regardsoss/model'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import DatasourceFormMappingLineComponent from './DatasourceFormMappingLineComponent'
import StaticAttributeList from './StaticAttributeList'
import states from './FormMappingStates'

export class DatasourceFormMappingFromTableComponent extends React.Component {

  static propTypes = {
    currentDatasource: Datasource,
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
    modelAttributeList: PropTypes.objectOf(ModelAttribute),
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
      const currentAttributeMapping = find(currentDatasource.content.mapping.attributesMapping, attributeMapping => attributeMapping.name === modelAttribute.content.attribute.name)
      if (currentAttributeMapping) {
        return !some(tableAttributeList, tableAttribute => currentAttributeMapping.nameDS === tableAttribute.name)
      }
    }
    return false
  }

  render() {
    const { modelAttributeList, table, tableAttributeList, change } = this.props
    return (
      <div>
        <CardTitle
          title={<FormattedMessage id="datasource.form.mapping.fromTable.title" />}
          subtitle={<FormattedMessage id="datasource.form.mapping.fromTable.subtitle" />}
        />
        <CardText>
          <Field
            name={`${states.FROM_TABLE}.table`}
            fullWidth
            component={RenderTextField}
            type="text"
            label={<FormattedMessage id="datasource.form.mapping.fromTable.tableName" />}
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
            {map(StaticAttributeList, (staticAttribute) => {
              const isEditingSQL = this.getIsEditingSQL(staticAttribute)
              return (
                <DatasourceFormMappingLineComponent
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
            {chain(modelAttributeList)
              .sortBy('content.attribute.optional')
              .map((modelAttribute, id) => {
                const isEditingSQL = this.getIsEditingSQL(modelAttribute)
                return (
                  <DatasourceFormMappingLineComponent
                    key={modelAttribute.content.id}
                    tableAttributeList={tableAttributeList}
                    modelAttribute={modelAttribute}
                    isEditingSQL={isEditingSQL}
                    table={table}
                    change={change}
                  />
                )
              })
              .value()}
          </TableBody>
        </Table>
      </div>
    )
  }
}


export default DatasourceFormMappingFromTableComponent
