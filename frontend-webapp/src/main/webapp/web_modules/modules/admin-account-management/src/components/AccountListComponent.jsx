import { isEmpty, map, size } from 'lodash'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import Done from 'material-ui/svg-icons/action/done'
import { Account } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ActionsMenuCell, NoContentMessageInfo } from '@regardsoss/components'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'

const status = {
  pending: 'PENDING',
  accepted: 'ACCEPTED',
  active: 'ACTIVE',
  locked: 'LOCKED',
  inactive: 'INACTIVE',
}

/**
 * Tabs Id
 */
export const TABS = {
  waiting: 0,
  all: 1,
}

/**
 * React component to list all REGARDS account.
 */
export class AccountListComponent extends React.Component {

  static propTypes = {
    allAccounts: React.PropTypes.objectOf(Account),
    waitingAccounts: React.PropTypes.objectOf(Account),
    onAccept: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    initialFecthing: React.PropTypes.bool.isRequired,
    isFetchingActions: React.PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.initialFecthing && !nextProps.initialFecthing) {
      // first loading: show waiting tab if there are any waiting account
      this.selectTab(!isEmpty(nextProps.waitingAccounts) ? TABS.waiting : TABS.all)
    }
  }

  onTabChange = (value) => {
    this.selectTab(value)
  }

  getWaitingAccountsTabContent = () => ({
    tabSubtitleKey: 'account.list.waiting.subtitle',
    noDataMessageKey: 'account.list.waiting.no.content.message',
    accounts: this.props.waitingAccounts,
  })

  getAllAccountsTabContent = () => ({
    tabSubtitleKey: 'account.list.all.subtitle',
    noDataMessageKey: 'account.list.all.no.content.message',
    accounts: this.props.allAccounts,
  })

  canAcceptAccount = account => [status.pending].includes(account.content.status)

  selectTab = (selectedTab) => {
    this.setState({ selectedTab })
  }

  render() {
    const selectedTab = this.state ? this.state.selectedTab : TABS.all
    const tabContent = selectedTab === TABS.waiting ? this.getWaitingAccountsTabContent() : this.getAllAccountsTabContent()
    const style = {
      commonActionHoverColor: this.context.muiTheme.palette.primary1Color,
      deleteActionHoverColor: this.context.muiTheme.palette.accent1Color,
    }
    const { allAccounts, waitingAccounts, onEdit, onDelete, onAccept, initialFecthing, isFetchingActions } = this.props
    const { intl } = this.context

    return (
      <Card>
        <Tabs onChange={this.onTabChange} value={selectedTab}>
          <Tab label={<FormattedMessage id="account.list.waiting.tab" values={{ count: size(waitingAccounts) || '0' }} />} value={TABS.waiting} />
          <Tab label={<FormattedMessage id="account.list.all.tab" values={{ count: size(allAccounts) || '0' }} />} value={TABS.all} />
        </Tabs>
        <NoContentMessageInfo
          noContent={isEmpty(tabContent.accounts) && !initialFecthing}
          title={<FormattedMessage id="account.list.table.no.content.title" />}
          message={<FormattedMessage id={tabContent.noDataMessageKey} />}
        >
          <div>
            <CardTitle subtitle={<FormattedMessage id={tabContent.tabSubtitleKey} />} />
            <CardText>
              <LoadableContentDisplayDecorator isLoading={initialFecthing}>
                <Table
                  selectable={false}
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
                    {map(tabContent.accounts, (account, id) => (
                      <TableRow key={id}>
                        <TableRowColumn>
                          {account.content.email}
                        </TableRowColumn>
                        <TableRowColumn>
                          {account.content.firstName || '-'}
                        </TableRowColumn>
                        <TableRowColumn>
                          {account.content.lastName || '-'}
                        </TableRowColumn>
                        <TableRowColumn>
                          <FormattedMessage id={`account.list.table.status.label.${account.content.status}`} />
                        </TableRowColumn>
                        <TableRowColumn>
                          <ActionsMenuCell>
                            <IconButton
                              title={intl.formatMessage({ id: 'account.list.table.action.edit.tooltip' })}
                              onTouchTap={() => onEdit(account.content.id)}
                              disabled={isFetchingActions}
                              breakpoint={550}
                            >
                              <Edit hoverColor={style.commonActionHoverColor} />
                            </IconButton>
                            <IconButton
                              title={intl.formatMessage({ id: 'account.list.table.action.accept.tooltip' })}
                              onTouchTap={() => onAccept(account.content.email)}
                              disabled={isFetchingActions || !this.canAcceptAccount(account)}
                              breakpoint={1040}
                            >
                              <Done hoverColor={style.commonActionHoverColor} />
                            </IconButton>
                            <IconButton
                              title={intl.formatMessage({ id: 'account.list.table.action.delete.tooltip' })}
                              onTouchTap={() => onDelete(account.content.id)}
                              disabled={isFetchingActions}
                              breakpoint={1040}
                            >
                              <Delete hoverColor={style.deleteActionHoverColor} />
                            </IconButton>
                          </ActionsMenuCell>
                        </TableRowColumn>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </LoadableContentDisplayDecorator>
            </CardText>
          </div>
        </NoContentMessageInfo>
      </Card>
    )
  }
}

export default AccountListComponent

