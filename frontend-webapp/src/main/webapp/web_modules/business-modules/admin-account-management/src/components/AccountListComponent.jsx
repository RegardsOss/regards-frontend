/**
 * LICENSE_PLACEHOLDER
 **/
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import size from 'lodash/size'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import Done from 'material-ui/svg-icons/action/done'
import { Account } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ActionsMenuCell, NoContentMessageInfo, ConfirmDialogComponent, ShowableAtRender, HelpMessageComponent } from '@regardsoss/components'
import { LoadableContentDisplayDecorator, HateoasIconAction, HateoasKeys } from '@regardsoss/display-control'

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
    allAccounts: PropTypes.objectOf(Account),
    waitingAccounts: PropTypes.objectOf(Account),
    onAccept: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    initialFecthing: PropTypes.bool.isRequired,
    isFetchingActions: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      deleteDialogOpened: false,
    }
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

  closeDeleteDialog = () => {
    this.setState({
      deleteDialogOpened: false,
      entityToDelete: null,
    })
  }

  openDeleteDialog = (entity) => {
    this.setState({
      deleteDialogOpened: true,
      entityToDelete: entity,
    })
  }

  canAcceptAccount = account => [status.pending].includes(account.content.status)

  selectTab = (selectedTab) => {
    this.setState({ selectedTab })
  }

  renderDeleteConfirmDialog = () => {
    const name = this.state.entityToDelete ? this.state.entityToDelete.content.email : ' '
    const title = this.context.intl.formatMessage({ id: 'account.list.delete.message' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponent.dialogTypes.DELETE}
          onConfirm={() => {
            this.props.onDelete(this.state.entityToDelete.content.id)
          }}
          onClose={this.closeDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  render() {
    const selectedTab = this.state ? this.state.selectedTab : TABS.all
    const tabContent = selectedTab === TABS.waiting ? this.getWaitingAccountsTabContent() : this.getAllAccountsTabContent()
    const style = {
      commonActionHoverColor: this.context.muiTheme.palette.primary1Color,
      deleteActionHoverColor: this.context.muiTheme.palette.accent1Color,
    }
    const { allAccounts, waitingAccounts, onEdit, onAccept, initialFecthing, isFetchingActions } = this.props
    const { intl } = this.context

    return (
      <Card>
        <Tabs onChange={this.onTabChange} value={selectedTab}>
          <Tab
            className="selenium-waitingTab"
            label={this.context.intl.formatMessage({ id: 'account.list.waiting.tab' }, { count: size(waitingAccounts) || '0' })}
            value={TABS.waiting}
          />
          <Tab
            className="selenium-allTab"
            label={this.context.intl.formatMessage({ id: 'account.list.all.tab' }, { count: size(allAccounts) || '0' })}
            value={TABS.all}
          />
        </Tabs>
        <NoContentMessageInfo
          noContent={isEmpty(tabContent.accounts) && !initialFecthing}
          title={this.context.intl.formatMessage({ id: 'account.list.table.no.content.title' })}
          message={this.context.intl.formatMessage({ id: tabContent.noDataMessageKe })}
        >
          <div>
            {this.renderDeleteConfirmDialog()}
            <CardTitle subtitle={this.context.intl.formatMessage({ id: tabContent.tabSubtitleKey })} />
            <CardText>
              <HelpMessageComponent message={this.context.intl.formatMessage({ id: 'account.list.info.why-cant-remove-account-having-project-user' })} />
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
                      <TableRow className={`selenium-${account.content.email}`} key={id}>
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
                            <HateoasIconAction
                              className="selenium-editButton"
                              title={intl.formatMessage({ id: 'account.list.table.action.edit.tooltip' })}
                              onTouchTap={() => onEdit(account.content.id)}
                              disabled={isFetchingActions}
                              entityLinks={account.links}
                              hateoasKey={HateoasKeys.UPDATE}
                              alwaysDisplayforInstanceUser={false}
                              breakpoint={550}
                            >
                              <Edit hoverColor={style.commonActionHoverColor} />
                            </HateoasIconAction>
                            <HateoasIconAction
                              className="selenium-acceptButton"
                              title={intl.formatMessage({ id: 'account.list.table.action.accept.tooltip' })}
                              onTouchTap={() => onAccept(account.content.email)}
                              disabled={isFetchingActions || !this.canAcceptAccount(account)}
                              entityLinks={account.links}
                              hateoasKey={HateoasKeys.ACCEPT}
                              alwaysDisplayforInstanceUser={false}
                              breakpoint={1040}
                            >
                              <Done hoverColor={style.commonActionHoverColor} />
                            </HateoasIconAction>
                            <HateoasIconAction
                              className="selenium-deleteButton"
                              title={intl.formatMessage({ id: 'account.list.table.action.delete.tooltip' })}
                              onTouchTap={() => this.openDeleteDialog(account)}
                              disabled={isFetchingActions}
                              entityLinks={account.links}
                              hateoasKey={HateoasKeys.DELETE}
                              alwaysDisplayforInstanceUser={false}
                              breakpoint={1040}
                            >
                              <Delete hoverColor={style.deleteActionHoverColor} />
                            </HateoasIconAction>
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

