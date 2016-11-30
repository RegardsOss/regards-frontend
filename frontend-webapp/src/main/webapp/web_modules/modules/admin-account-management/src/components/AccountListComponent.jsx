import { map } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * React component to list all REGARDS account.
 */
export class AccountListComponent extends React.Component {

  static propTypes = {
    accountList: React.PropTypes.objectOf(
      React.PropTypes.shape({
        content: React.PropTypes.shape({
          id: React.PropTypes.number,
          lastName: React.PropTypes.string,
          email: React.PropTypes.string,
          firstName: React.PropTypes.string,
          status: React.PropTypes.string,
        }),
      }),
    ),
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    createUrl: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const { accountList, onEdit, onDelete, createUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="account.list.title" />}
          subtitle={<FormattedMessage id="account.list.subtitle" />}
        />
        <CardText>
          <Table
            selectable
          >
            <TableHeader
              enableSelectAll={false}
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn><FormattedMessage id="account.list.table.email" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="account.list.table.firstName" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="account.list.table.lastName" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="account.list.table.status" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="account.list.table.action" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(accountList, (account, id) => (
                <TableRow key={id}>
                  <TableRowColumn>
                    {account.content.email}
                  </TableRowColumn>
                  <TableRowColumn>
                    {account.content.firstName}
                  </TableRowColumn>
                  <TableRowColumn>
                    {account.content.lastName}
                  </TableRowColumn>
                  <TableRowColumn>
                    {account.content.status}
                  </TableRowColumn>
                  <TableRowColumn>
                    <IconButton onTouchTap={() => onEdit(account.content.id)}>
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </IconButton>

                    <IconButton onTouchTap={() => onDelete(account.content.id)}>
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
                id="account.list.action.create"
              />
            }
          />
        </CardActions>
      </Card>
    )
  }
}

export default AccountListComponent

