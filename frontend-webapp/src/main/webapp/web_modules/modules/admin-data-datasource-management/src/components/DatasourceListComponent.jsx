/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import { Datasource } from '@regardsoss/model'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { HateoasIconAction, HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import DatasourceActions from '../model/DatasourceActions'

/**
 * React component to list datasources.
 */
export class DatasourceListComponent extends React.Component {

  static propTypes = {
    datasourceList: React.PropTypes.objectOf(Datasource),
    handleDelete: React.PropTypes.func.isRequired,
    handleEdit: React.PropTypes.func.isRequired,
    createUrl: React.PropTypes.string.isRequired,
    backUrl: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const { datasourceList, handleEdit, handleDelete, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
    }
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="datasource.list.title" />}
          subtitle={<FormattedMessage id="datasource.list.subtitle" />}
        />
        <CardText>
          <Table
            selectable={false}
          >
            <TableHeader
              enableSelectAll={false}
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn><FormattedMessage id="datasource.list.table.label" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="datasource.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(datasourceList, (datasource, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{datasource.content.label}</TableRowColumn>
                  <TableRowColumn>
                    <HateoasIconAction
                      entityLinks={datasource.links}
                      hateoasKey={HateoasKeys.UPDATE}
                      onTouchTap={() => handleEdit(datasource.content.id)}
                    >
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </HateoasIconAction>
                    <HateoasIconAction
                      entityLinks={datasource.links}
                      hateoasKey={HateoasKeys.DELETE}
                      onTouchTap={() => handleDelete(datasource.content.id)}
                    >
                      <Delete hoverColor={style.hoverButtonDelete} />
                    </HateoasIconAction>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonUrl={createUrl}
            mainButtonLabel={
              <FormattedMessage
                id="datasource.list.action.add"
              />
            }
            mainHateoasDependency={DatasourceActions.getDependency(RequestVerbEnum.POST)}
            secondaryButtonLabel={<FormattedMessage id="datasource.list.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default DatasourceListComponent

