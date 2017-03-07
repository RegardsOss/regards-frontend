/**
 * LICENSE_PLACEHOLDER
 **/
import { some, find, chain } from 'lodash'
import { CardTitle, CardText } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { Datasource, ModelAttribute } from '@regardsoss/model'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import DatasourceFormMappingLineComponent from './DatasourceFormMappingLineComponent'
import states from './FormMappingStates'

export class DatasourceFormMappingFromTableComponent extends React.Component {

  static propTypes = {
    currentDatasource: Datasource,
    isEditing: React.PropTypes.bool,
    table: React.PropTypes.shape({
      name: React.PropTypes.string,
      schema: React.PropTypes.string,
      pKey: React.PropTypes.string,
    }),
    tableAttributeList: React.PropTypes.objectOf(React.PropTypes.shape({
      name: React.PropTypes.string,
      javaSqlType: React.PropTypes.string,
      isPrimaryKey: React.PropTypes.bool,
    })),
    modelAttributeList: React.PropTypes.objectOf(ModelAttribute),
    change: React.PropTypes.func,
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
      return !some(tableAttributeList, tableAttribute => currentAttributeMapping.nameDS === tableAttribute.name)
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
