/**
 * LICENSE_PLACEHOLDER
 **/
import { chain, map } from 'lodash'
import { CardTitle, CardText } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { ModelAttribute } from '@regardsoss/model'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import DatasourceFormMappingLineComponent from './DatasourceFormMappingLineComponent'
import StaticAttributeList from './StaticAttributeList'
import states from './FormMappingStates'

export class DatasourceFormMappingCustomComponent extends React.Component {

  static propTypes = {
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

  render() {
    const { modelAttributeList, table, tableAttributeList, change } = this.props
    return (
      <div>
        <CardTitle
          title={<FormattedMessage id="datasource.form.mapping.custom.title" />}
          subtitle={<FormattedMessage id="datasource.form.mapping.custom.subtitle" />}
        />
        <CardText>
          <Field
            name={`${states.CUSTOM_FROM}.fromClause`}
            fullWidth
            component={RenderTextField}
            type="text"
            label={this.context.intl.formatMessage({ id: 'datasource.form.mapping.custom.fromClause' })}
            multiLine
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
            {map(StaticAttributeList, staticAttribute => (
              <DatasourceFormMappingLineComponent
                key={staticAttribute.content.attribute.name}
                tableAttributeList={tableAttributeList}
                modelAttribute={staticAttribute}
                isStaticAttribute
                onlyAdvancedConfiguration
                table={table}
                change={change}
              />
              ))}
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
              .map((modelAttribute, id) => (
                <DatasourceFormMappingLineComponent
                  key={modelAttribute.content.id}
                  tableAttributeList={tableAttributeList}
                  modelAttribute={modelAttribute}
                  onlyAdvancedConfiguration
                  table={table}
                  change={change}
                />
              ))
              .value()}
          </TableBody>
        </Table>
      </div>
    )
  }
}


export default DatasourceFormMappingCustomComponent
