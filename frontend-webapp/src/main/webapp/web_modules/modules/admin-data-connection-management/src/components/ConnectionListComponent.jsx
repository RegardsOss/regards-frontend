/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import { Connection } from '@regardsoss/model'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import ConnectionTesterIconButton from './ConnectionTesterIconButton'

/**
 * React component to list collections.
 */
export class ConnectionListComponent extends React.Component {

  static propTypes = {
    connectionList: React.PropTypes.objectOf(Connection),
    handleDelete: React.PropTypes.func.isRequired,
    handleEdit: React.PropTypes.func.isRequired,
    handleTestConnection: React.PropTypes.func.isRequired,
    createUrl: React.PropTypes.string.isRequired,
    backUrl: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  printIsActive = (active) => {
    if (active) {
      return (<FormattedMessage id="connection.list.isActive.true" />)
    }
    return (<FormattedMessage id="connection.list.isActive.false" />)
  }

  render() {
    const { connectionList, handleEdit, handleDelete, handleTestConnection, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
    }
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="connection.list.title" />}
          subtitle={<FormattedMessage id="connection.list.subtitle" />}
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
                <TableHeaderColumn><FormattedMessage id="connection.list.table.label" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="connection.list.table.isActive" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="connection.list.table.test" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="connection.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(connectionList, (connection, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{connection.content.label}</TableRowColumn>
                  <TableRowColumn>{this.printIsActive(connection.content.active)}</TableRowColumn>
                  <TableRowColumn><ConnectionTesterIconButton connection={connection} handleTestConnection={handleTestConnection}/></TableRowColumn>
                  <TableRowColumn>
                    <IconButton onTouchTap={() => handleEdit(connection.content.id)}>
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </IconButton>
                    <IconButton onTouchTap={() => handleDelete(connection.content.id)}>
                      <Delete hoverColor={style.hoverButtonDelete} />
                    </IconButton>
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
                id="connection.list.action.add"
              />
            }
            secondaryButtonLabel={<FormattedMessage id="connection.list.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default ConnectionListComponent

