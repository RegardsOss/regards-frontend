/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import size from 'lodash/size'
import { Tabs, Tab } from 'material-ui/Tabs'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import EditAccountIcon from 'mdi-material-ui/Pencil'
import DeleteAccountIcon from 'mdi-material-ui/Delete'
import ValidateAccountIcon from 'mdi-material-ui/AccountCheck'
import RefuseAccountIcon from 'mdi-material-ui/AccountRemove'
import EnabledAccountIcon from 'mdi-material-ui/AccountConvert'
import { AdminInstanceDomain } from '@regardsoss/domain'
import { AdminInstanceShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  ActionsMenuCell, NoContentComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes,
  ShowableAtRender, HelpMessageComponent, CardActionsComponent, HateoasIconAction,
} from '@regardsoss/components'
import { LoadableContentDisplayDecorator, HateoasKeys } from '@regardsoss/display-control'

const actionsBreakpoints = [550, 1040, 1040, 1040, 1040]

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
    allAccounts: PropTypes.objectOf(AdminInstanceShapes.Account),
    waitingAccounts: PropTypes.objectOf(AdminInstanceShapes.Account),
    onAccept: PropTypes.func.isRequired,
    onRefuse: PropTypes.func.isRequired,
    onEnable: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    initialFecthing: PropTypes.bool.isRequired,
    isFetchingActions: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static SUBHEADER_STYLES = {
    paddingLeft: 0,
  }

  state = {
    deleteDialogOpened: false,
    refuseDialogOpened: false,
    entityToDeleteOrRefuse: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to initialize the selected tab
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (this.props.initialFecthing && !nextProps.initialFecthing) {
      // first loading: show waiting tab if there are any waiting account
      this.selectTab(!isEmpty(nextProps.waitingAccounts) ? TABS.waiting : TABS.all)
    }
  }

  /**
   * User callback: changed tab
   */
  onTabChange = (value) => {
    this.selectTab(value)
  }

  /**
   * User callback: closed delete dialog
   */
  onCloseDeleteDialog = () => {
    this.setState({
      deleteDialogOpened: false,
      entityToDeleteOrRefuse: null,
    })
  }

  /**
   * User callback: opened delete dialog
   */
  onOpenDeleteDialog = (entity) => {
    this.setState({
      deleteDialogOpened: true,
      entityToDeleteOrRefuse: entity,
    })
  }

  /**
   * User callback: closed refuse dialog
   */
  onCloseRefuseDialog = () => {
    this.setState({
      refuseDialogOpened: false,
      entityToDeleteOrRefuse: null,
    })
  }

  /**
   * User callback: opened refuse dialog
   */
  onOpenRefuseDialog = (entity) => {
    this.setState({
      refuseDialogOpened: true,
      entityToDeleteOrRefuse: entity,
    })
  }

  /**
   * @return waiting accounts tab related content
   */
  getWaitingAccountsTabContent = () => ({
    noDataMessageKey: 'account.list.waiting.no.content.message',
    accounts: this.props.waitingAccounts,
  })

  /**
   * @return waiting accounts tab related content
   */
  getAllAccountsTabContent = () => ({
    noDataMessageKey: 'account.list.all.no.content.message',
    accounts: this.props.allAccounts,
  })

  /**
   * @return {boolean} true if administrator can accept this account
   */
  canAcceptAccount = (account) => AdminInstanceDomain.ACCOUNT_STATUS_ENUM.PENDING === account.content.status

  /**
   * @return {boolean} true if administrator can refuse this account
   */
  canRefuseAccount = (account) => AdminInstanceDomain.ACCOUNT_STATUS_ENUM.PENDING === account.content.status

  /**
   * @return {boolean} true if administrator can enabled this account
   */
  canEnableAccount = (account) => AdminInstanceDomain.ACCOUNT_STATUS_ENUM.INACTIVE === account.content.status

  /**
   * Shows selected tab
   * @param selectedTab tab selected, that should be shown
   */
  selectTab = (selectedTab) => {
    this.setState({ selectedTab })
  }

  /**
   * Renders account deletion confirmation dialog
   */
  renderDeleteConfirmDialog = () => {
    const name = this.state.entityToDeleteOrRefuse ? this.state.entityToDeleteOrRefuse.content.email : ' '
    const title = this.context.intl.formatMessage({ id: 'account.list.delete.message' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={() => this.props.onDelete(this.state.entityToDeleteOrRefuse.content.id)}
          onClose={this.onCloseDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  /**
   * Renders account refusal confirmation dialog
   */
  renderRefuseConfirmDialog = () => {
    const name = this.state.entityToDeleteOrRefuse ? this.state.entityToDeleteOrRefuse.content.email : ' '
    const title = this.context.intl.formatMessage({ id: 'account.list.refuse.message' })
    const message = this.context.intl.formatMessage({ id: 'account.list.refuse.message.detail' }, { name })
    return (<ConfirmDialogComponent
      open={this.state.refuseDialogOpened}
      dialogType={ConfirmDialogComponentTypes.REFUSE}
      onConfirm={() => this.props.onRefuse(this.state.entityToDeleteOrRefuse.content.email)}
      onClose={this.onCloseRefuseDialog}
      title={title}
      message={message}
    />)
  }

  render() {
    const selectedTab = this.state ? this.state.selectedTab : TABS.all
    const tabContent = selectedTab === TABS.waiting ? this.getWaitingAccountsTabContent() : this.getAllAccountsTabContent()
    const style = {
      commonActionHoverColor: this.context.muiTheme.palette.primary1Color,
      deleteActionHoverColor: this.context.muiTheme.palette.accent1Color,
    }
    const {
      allAccounts, waitingAccounts, initialFecthing, isFetchingActions,
      onBack, onEdit, onAccept, onEnable,
    } = this.props
    const { intl: { formatMessage } } = this.context
    const emptyComponent = (<NoContentComponent
      titleKey="account.list.table.no.content.title"
      messageKey={tabContent.noDataMessageKey}
    />)

    return (
      <Card>
        <CardTitle title={formatMessage({ id: 'accounts.title' })} subtitle={formatMessage({ id: 'accounts.subtitle' })} />
        <Tabs onChange={this.onTabChange} value={selectedTab}>
          <Tab
            className="selenium-waitingTab"
            label={formatMessage({ id: 'account.list.waiting.tab' }, { count: size(waitingAccounts) || '0' })}
            value={TABS.waiting}
          />
          <Tab
            className="selenium-allTab"
            label={formatMessage({ id: 'account.list.all.tab' }, { count: size(allAccounts) || '0' })}
            value={TABS.all}
          />
        </Tabs>
        <CardText>
          <LoadableContentDisplayDecorator
            isLoading={initialFecthing}
            isEmpty={isEmpty(tabContent.accounts)}
            emptyComponent={emptyComponent}
          >
            <div>
              {this.renderDeleteConfirmDialog()}
              {this.renderRefuseConfirmDialog()}
              <HelpMessageComponent
                message={this.context.intl.formatMessage({ id: 'account.list.info.why-cant-remove-account-having-project-user' })}
              />
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
                        <ActionsMenuCell
                          breakpoints={actionsBreakpoints}
                        >
                          <HateoasIconAction
                            className="selenium-editButton"
                            title={formatMessage({ id: 'account.list.table.action.edit.tooltip' })}
                            onClick={() => onEdit(account.content.id)}
                            disabled={isFetchingActions}
                            entityLinks={account.links}
                            hateoasKey={HateoasKeys.UPDATE}
                            alwaysDisplayforInstanceUser={false}
                          >
                            <EditAccountIcon hoverColor={style.commonActionHoverColor} />
                          </HateoasIconAction>
                          <HateoasIconAction
                            className="selenium-acceptButton"
                            title={formatMessage({ id: 'account.list.table.action.accept.tooltip' })}
                            onClick={() => onAccept(account.content.email)}
                            disabled={isFetchingActions || !this.canAcceptAccount(account)}
                            entityLinks={account.links}
                            hateoasKey={HateoasKeys.ACCEPT}
                            alwaysDisplayforInstanceUser={false}
                          >
                            <ValidateAccountIcon hoverColor={style.commonActionHoverColor} />
                          </HateoasIconAction>
                          <HateoasIconAction
                            className="selenium-refuseButton"
                            title={formatMessage({ id: 'account.list.table.action.refuse.tooltip' })}
                            onClick={() => this.onOpenRefuseDialog(account)}
                            disabled={isFetchingActions || !this.canRefuseAccount(account)}
                            entityLinks={account.links}
                            hateoasKey={HateoasKeys.REFUSE}
                            alwaysDisplayforInstanceUser={false}
                          >
                            <RefuseAccountIcon hoverColor={style.deleteActionHoverColor} />
                          </HateoasIconAction>
                          <HateoasIconAction
                            className="selenium-enableButton"
                            title={formatMessage({ id: 'account.list.table.action.enable.tooltip' })}
                            onClick={() => onEnable(account.content.email)}
                            disabled={isFetchingActions || !this.canEnableAccount(account)}
                            entityLinks={account.links}
                            hateoasKey={HateoasKeys.ACTIVE}
                            alwaysDisplayforInstanceUser={false}
                          >
                            <EnabledAccountIcon hoverColor={style.commonActionHoverColor} />
                          </HateoasIconAction>
                          <HateoasIconAction
                            className="selenium-deleteButton"
                            title={formatMessage({ id: 'account.list.table.action.delete.tooltip' })}
                            onClick={() => this.onOpenDeleteDialog(account)}
                            disabled={isFetchingActions}
                            entityLinks={account.links}
                            hateoasKey={HateoasKeys.DELETE}
                            alwaysDisplayforInstanceUser={false}
                          >
                            <DeleteAccountIcon hoverColor={style.deleteActionHoverColor} />
                          </HateoasIconAction>
                        </ActionsMenuCell>
                      </TableRowColumn>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </LoadableContentDisplayDecorator>
        </CardText>
        <CardActions>
          <CardActionsComponent
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'account.list.action.cancel' })}
            secondaryButtonClick={onBack}
          />
        </CardActions>
      </Card>
    )
  }
}

export default AccountListComponent
