/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Card, CardTitle, CardText } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import Done from 'material-ui/svg-icons/action/done'
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import { AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ActionsMenuCell, NoContentComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes, ShowableAtRender, HelpMessageComponent } from '@regardsoss/components'
import { LoadableContentDisplayDecorator, HateoasKeys, withHateoasDisplayControl } from '@regardsoss/display-control'

const HateoasIconAction = withHateoasDisplayControl(IconButton)
const actionsBreakpoints = [550, 1040, 1040, 1040]
const status = {
  pending: 'PENDING',
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
    allAccounts: PropTypes.objectOf(AdminShapes.Account),
    waitingAccounts: PropTypes.objectOf(AdminShapes.Account),
    onAccept: PropTypes.func.isRequired,
    onRefuse: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    initialFecthing: PropTypes.bool.isRequired,
    isFetchingActions: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    deleteDialogOpened: false,
    refuseDialogOpened: false,
    entityToDeleteOrRefuse: null,
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
      entityToDeleteOrRefuse: null,
    })
  }

  openDeleteDialog = (entity) => {
    this.setState({
      deleteDialogOpened: true,
      entityToDeleteOrRefuse: entity,
    })
  }

  closeRefuseDialog = () => {
    this.setState({
      refuseDialogOpened: false,
      entityToDeleteOrRefuse: null,
    })
  }

  openRefuseDialog = (entity) => {
    this.setState({
      refuseDialogOpened: true,
      entityToDeleteOrRefuse: entity,
    })
  }

  canAcceptAccount = account => [status.pending].includes(account.content.status)

  canRefuseAccount = account => [status.pending].includes(account.content.status)

  selectTab = (selectedTab) => {
    this.setState({ selectedTab })
  }

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
          onClose={this.closeDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  renderRefuseConfirmDialog = () => {
    const name = this.state.entityToDeleteOrRefuse ? this.state.entityToDeleteOrRefuse.content.email : ' '
    const title = this.context.intl.formatMessage({ id: 'account.list.refuse.message' })
    const message = this.context.intl.formatMessage({ id: 'account.list.refuse.message.detail' }, { name })
    return (<ConfirmDialogComponent
      open={this.state.refuseDialogOpened}
      dialogType={ConfirmDialogComponentTypes.REFUSE}
      onConfirm={() => this.props.onRefuse(this.state.entityToDeleteOrRefuse.content.email)}
      onClose={this.closeRefuseDialog}
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
      allAccounts, waitingAccounts, onEdit, onAccept, initialFecthing, isFetchingActions,
    } = this.props
    const { intl } = this.context
    const emptyComponent = (<NoContentComponent
      title={this.context.intl.formatMessage({ id: 'account.list.table.no.content.title' })}
      message={this.context.intl.formatMessage({ id: tabContent.noDataMessageKey })}
    />)

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
        <CardTitle subtitle={this.context.intl.formatMessage({ id: tabContent.tabSubtitleKey })} />
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
                            title={intl.formatMessage({ id: 'account.list.table.action.edit.tooltip' })}
                            onClick={() => onEdit(account.content.id)}
                            disabled={isFetchingActions}
                            entityLinks={account.links}
                            hateoasKey={HateoasKeys.UPDATE}
                            alwaysDisplayforInstanceUser={false}
                          >
                            <Edit hoverColor={style.commonActionHoverColor} />
                          </HateoasIconAction>
                          <HateoasIconAction
                            className="selenium-acceptButton"
                            title={intl.formatMessage({ id: 'account.list.table.action.accept.tooltip' })}
                            onClick={() => onAccept(account.content.email)}
                            disabled={isFetchingActions || !this.canAcceptAccount(account)}
                            entityLinks={account.links}
                            hateoasKey={HateoasKeys.ACCEPT}
                            alwaysDisplayforInstanceUser={false}
                          >
                            <Done hoverColor={style.commonActionHoverColor} />
                          </HateoasIconAction>
                          <HateoasIconAction
                            className="selenium-refuseButton"
                            title={intl.formatMessage({ id: 'account.list.table.action.refuse.tooltip' })}
                            onClick={() => this.openRefuseDialog(account)}
                            disabled={isFetchingActions || !this.canRefuseAccount(account)}
                            entityLinks={account.links}
                            hateoasKey={HateoasKeys.REFUSE}
                            alwaysDisplayforInstanceUser={false}
                          >
                            <RemoveCircle hoverColor={style.deleteActionHoverColor} />
                          </HateoasIconAction>
                          <HateoasIconAction
                            className="selenium-deleteButton"
                            title={intl.formatMessage({ id: 'account.list.table.action.delete.tooltip' })}
                            onClick={() => this.openDeleteDialog(account)}
                            disabled={isFetchingActions}
                            entityLinks={account.links}
                            hateoasKey={HateoasKeys.DELETE}
                            alwaysDisplayforInstanceUser={false}
                          >
                            <Delete hoverColor={style.deleteActionHoverColor} />
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
      </Card>
    )
  }
}

export default AccountListComponent

