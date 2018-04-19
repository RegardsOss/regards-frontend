/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage, FormattedDate } from 'react-intl'
import { LoadableContentDisplayDecorator, withHateoasDisplayControl, HateoasKeys } from '@regardsoss/display-control'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import Done from 'material-ui/svg-icons/action/done'
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import Loop from 'material-ui/svg-icons/av/loop'
import Pause from 'material-ui/svg-icons/av/pause'
import { AdminShapes } from '@regardsoss/shape'
import { ActionsMenuCell, CardActionsComponent, NoContentMessageInfo, ConfirmDialogComponent, ConfirmDialogComponentTypes, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { addDependencies } from '../dependencies'

const HateoasIconAction = withHateoasDisplayControl(IconButton)
const actionsBreakpoints = [530, 1065, 1320, 1320, 1320, 1320]

/**
 * User statuses constants, as returned by the server
 */
const status = {
  accessGranted: 'ACCESS_GRANTED',
  waitingAccess: 'WAITING_ACCESS',
  waitingEmailVerification: 'WAITING_EMAIL_VERIFICATION',
  accesDenied: 'ACCESS_DENIED',
  inactive: 'ACCESS_INACTIVE',
}

/**
 * Tabs Id
 */
export const TABS = {
  waiting: 0,
  all: 1,
}

export const canAcceptUser = user => [status.accesDenied, status.waitingAccess].includes(user.content.status)

export const canDenyUser = user => [status.accessGranted, status.waitingAccess, status.inactive].includes(user.content.status)

/**
 * React component to list all project user and manage them.
 */
export class ProjectUserListComponent extends React.Component {
  static propTypes = {
    users: AdminShapes.ProjectUserList,
    waitingAccessUsers: AdminShapes.ProjectUserList,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onValidate: PropTypes.func.isRequired,
    onDeny: PropTypes.func.isRequired,
    onActive: PropTypes.func.isRequired,
    onInactive: PropTypes.func.isRequired,
    onValidateAll: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
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
      // first loading: show waiting tab if there are any waiting users
      this.selectTab(!isEmpty(nextProps.waitingAccessUsers) ? TABS.waiting : TABS.all)
    }
  }

  onTabChange = (value) => {
    this.selectTab(value)
  }

  getAllUsersTabContent = () => {
    const { users, createUrl, initialFecthing } = this.props
    return {
      tabSubtitleKey: 'projectUser.list.all.subtitle',
      noDataMessageKey: 'projectUser.list.all.no.content.message',
      currentUserList: users,
      // create new user
      mainButtonKey: 'projectUser.list.all.action.create',
      mainButtonClassName: 'selenium-userCreate',
      mainButtonUrl: createUrl,
      mainButtonDisabled: initialFecthing,
    }
  }

  getWaitingUsersTabContent = () => {
    const {
      waitingAccessUsers, isFetchingActions, onValidateAll, initialFecthing,
    } = this.props
    return {
      tabSubtitleKey: 'projectUser.list.waiting.subtitle',
      noDataMessageKey: 'projectUser.list.waiting.no.content.message',
      currentUserList: waitingAccessUsers,
      // validate all users
      mainButtonKey: 'projectUser.list.waiting.accept.all',
      mainButtonAction: () => onValidateAll(),
      mainButtonDisabled: isFetchingActions || initialFecthing,
    }
  }

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

  selectTab = (selectedTab) => {
    this.setState({ selectedTab })
  }

  renderDeleteConfirmDialog = () => {
    const name = this.state.entityToDelete ? this.state.entityToDelete.content.email : ' '
    const title = this.context.intl.formatMessage({ id: 'projectUser.list.delete.message' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
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
    const style = {
      commonActionHoverColor: this.context.muiTheme.palette.primary1Color,
      deleteActionHoverColor: this.context.muiTheme.palette.accent1Color,
    }
    const tabContent = selectedTab === TABS.waiting ? this.getWaitingUsersTabContent() : this.getAllUsersTabContent()
    const {
      users, waitingAccessUsers, initialFecthing, backUrl,
      onValidate, onDeny, onEdit, onActive, onInactive, isFetchingActions,
    } = this.props
    const { intl } = this.context

    return (
      <Card >
        <Tabs onChange={this.onTabChange} value={selectedTab}>
          <Tab
            className="selenium-waitingTab"
            label={this.context.intl.formatMessage({ id: 'projectUser.list.waiting.tab' }, { count: size(waitingAccessUsers) || '0' })}
            value={TABS.waiting}
          />
          <Tab
            className="selenium-allTab"
            label={this.context.intl.formatMessage({ id: 'projectUser.list.all.tab' }, { count: size(users) || '0' })}
            value={TABS.all}
          />
        </Tabs>
        <NoContentMessageInfo
          noContent={isEmpty(tabContent.currentUserList) && !initialFecthing}
          title={this.context.intl.formatMessage({ id: 'projectUser.list.table.no.content.title' })}
          message={this.context.intl.formatMessage({ id: tabContent.noDataMessageKey })}
        >
          <div>
            {this.renderDeleteConfirmDialog()}
            <CardTitle subtitle={<FormattedMessage id={tabContent.tabSubtitleKey} />} />
            <CardText>
              <LoadableContentDisplayDecorator isLoading={initialFecthing}>
                <Table selectable={false}>
                  <TableHeader
                    adjustForCheckbox={false}
                    displaySelectAll={false}
                    enableSelectAll={false}
                  >
                    <TableRow>
                      <TableHeaderColumn><FormattedMessage id="projectUser.list.table.email" /></TableHeaderColumn>
                      <TableHeaderColumn><FormattedMessage id="projectUser.list.table.role" /></TableHeaderColumn>
                      <TableHeaderColumn><FormattedMessage id="projectUser.list.table.status" /></TableHeaderColumn>
                      <TableHeaderColumn><FormattedMessage id="projectUser.list.table.lastupdate" /></TableHeaderColumn>
                      <TableHeaderColumn><FormattedMessage id="projectUser.list.table.action" /></TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={false}
                    preScanRows={false}
                    showRowHover
                  >
                    {map(tabContent.currentUserList, (projectUser, id) => (
                      <TableRow className={`selenium-${projectUser.content.email}`} key={id}>
                        <TableRowColumn title={projectUser.content.email}>
                          {projectUser.content.email}
                        </TableRowColumn>
                        <TableRowColumn title={projectUser.content.role.name}>
                          {projectUser.content.role.name}
                        </TableRowColumn>
                        <TableRowColumn>
                          <FormattedMessage id={`projectUser.list.table.status.label.${projectUser.content.status}`} />
                        </TableRowColumn>
                        <TableRowColumn>
                          <FormattedDate
                            value={projectUser.content.lastUpdate}
                            year="numeric"
                            month="long"
                            day="2-digit"
                            hour="2-digit"
                            minute="2-digit"
                            second="2-digit"
                          />
                        </TableRowColumn>
                        <TableRowColumn>
                          <ActionsMenuCell
                            breakpoints={actionsBreakpoints}
                          >
                            <HateoasIconAction
                              className="selenium-editButton"
                              title={intl.formatMessage({ id: 'projectUser.list.table.action.edit.tooltip' })}
                              onClick={() => onEdit(projectUser.content.id)}
                              disabled={isFetchingActions}
                              entityLinks={projectUser.links}
                              hateoasKey={HateoasKeys.UPDATE}
                            >
                              <Edit hoverColor={style.commonActionHoverColor} />
                            </HateoasIconAction>
                            <HateoasIconAction
                              className="selenium-acceptButton"
                              title={intl.formatMessage({ id: 'projectUser.list.table.action.accept.tooltip' })}
                              onClick={() => onValidate(projectUser.content.id)}
                              disabled={isFetchingActions || !canAcceptUser(projectUser)}
                              entityLinks={projectUser.links}
                              hateoasKey={HateoasKeys.ACCEPT}
                            >
                              <Done hoverColor={style.commonActionHoverColor} />
                            </HateoasIconAction>
                            <HateoasIconAction
                              className="selenium-denyButton"
                              title={intl.formatMessage({ id: 'projectUser.list.table.action.deny.tooltip' })}
                              onClick={() => onDeny(projectUser.content.id)}
                              disabled={isFetchingActions || !canDenyUser(projectUser)}
                              entityLinks={projectUser.links}
                              hateoasKey={HateoasKeys.DENY}
                            >
                              <RemoveCircle hoverColor={style.deleteActionHoverColor} />
                            </HateoasIconAction>
                            <HateoasIconAction
                              className="selenium-activeButton"
                              title={intl.formatMessage({ id: 'projectUser.list.table.action.active.tooltip' })}
                              onClick={() => onActive(projectUser.content.id)}
                              disabled={isFetchingActions}
                              entityLinks={projectUser.links}
                              hateoasKey={HateoasKeys.ACTIVE}
                            >
                              <Loop hoverColor={style.commonActionHoverColor} />
                            </HateoasIconAction>
                            <HateoasIconAction
                              className="selenium-inactiveButton"
                              title={intl.formatMessage({ id: 'projectUser.list.table.action.inactive.tooltip' })}
                              onClick={() => onInactive(projectUser.content.id)}
                              disabled={isFetchingActions}
                              entityLinks={projectUser.links}
                              hateoasKey={HateoasKeys.INACTIVE}
                            >
                              <Pause hoverColor={style.deleteActionHoverColor} />
                            </HateoasIconAction>
                            <HateoasIconAction
                              className="selenium-deleteButton"
                              title={intl.formatMessage({ id: 'projectUser.list.table.action.delete.tooltip' })}
                              onClick={() => this.openDeleteDialog(projectUser)}
                              disabled={isFetchingActions}
                              entityLinks={projectUser.links}
                              hateoasKey={HateoasKeys.DELETE}
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
        <CardActions>
          <CardActionsComponent
            mainButtonUrl={tabContent.mainButtonUrl}
            mainButtonClick={tabContent.mainButtonAction}
            mainButtonClassName={tabContent.mainButtonClassName}
            mainHateoasDependencies={addDependencies}
            isMainButtonDisabled={tabContent.mainButtonDisabled}
            mainButtonLabel={this.context.intl.formatMessage({ id: tabContent.mainButtonKey })}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'projectUser.list.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card >
    )
  }
}

export default ProjectUserListComponent
