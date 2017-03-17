/**
 * LICENSE_PLACEHOLDER
 **/
import { isEmpty, map, size } from 'lodash'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage, FormattedDate } from 'react-intl'
import IconButton from 'material-ui/IconButton'
import { HateoasIconAction, HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import Done from 'material-ui/svg-icons/action/done'
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import { ProjectUser } from '@regardsoss/model'
import { CardActionsComponent, NoContentMessageInfo } from '@regardsoss/components'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import ProjectUserActions from '../model/ProjectUserActions'

/**
 * User statuses constants, as returned by the server
 */
const status = {
  accessGranted: 'ACCESS_GRANTED',
  waitingAccess: 'WAITING_ACCESS',
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
    users: React.PropTypes.objectOf(ProjectUser),
    waitingAccessUsers: React.PropTypes.objectOf(ProjectUser),
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onValidate: React.PropTypes.func.isRequired,
    onDeny: React.PropTypes.func.isRequired,
    onValidateAll: React.PropTypes.func.isRequired,
    createUrl: React.PropTypes.string.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    initialFecthing: React.PropTypes.bool.isRequired,
    isFetchingActions: React.PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
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

  getWaitingUsersTabContent = () => {
    const { waitingAccessUsers, isFetchingActions, onValidateAll, initialFecthing } = this.props
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

  getAllUsersTabContent = () => {
    const { users, createUrl, initialFecthing } = this.props
    return {
      tabSubtitleKey: 'projectUser.list.all.subtitle',
      noDataMessageKey: 'projectUser.list.all.no.content.message',
      currentUserList: users,
      // create new user
      mainButtonKey: 'projectUser.list.all.action.create',
      mainButtonUrl: createUrl,
      mainButtonDisabled: initialFecthing,
    }
  }

  selectTab = (selectedTab) => {
    this.setState({ selectedTab })
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
      onValidate, onDeny, onEdit, onDelete, isFetchingActions,
    } = this.props
    const { intl } = this.context

    return (
      <Card >
        <Tabs onChange={this.onTabChange} value={selectedTab}>
          <Tab label={<FormattedMessage id="projectUser.list.waiting.tab" values={{ count: size(waitingAccessUsers) || '0' }} />} value={TABS.waiting} />
          <Tab label={<FormattedMessage id="projectUser.list.all.tab" values={{ count: size(users) || '0' }} />} value={TABS.all} />
        </Tabs>
        <NoContentMessageInfo
          noContent={isEmpty(tabContent.currentUserList) && !initialFecthing}
          title={<FormattedMessage id="projectUser.list.table.no.content.title" />}
          message={<FormattedMessage id={tabContent.noDataMessageKey} />}
        >
          <div>
            <CardTitle subtitle={<FormattedMessage id={tabContent.tabSubtitleKey} />} />
            <CardText>
              <LoadableContentDisplayDecorator isLoading={initialFecthing}>
                <Table selectable={false} >
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
                      <TableRow key={id}>
                        <TableRowColumn>
                          {projectUser.content.email}
                        </TableRowColumn>
                        <TableRowColumn>
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
                          <HateoasIconAction
                            title={intl.formatMessage({ id: 'projectUser.list.table.action.edit.tooltip' })}
                            onTouchTap={() => onEdit(projectUser.content.id)}
                            disabled={isFetchingActions}
                            entityLinks={projectUser.links}
                            hateoasKey={HateoasKeys.UPDATE}
                          >
                            <Edit hoverColor={style.commonActionHoverColor} />
                          </HateoasIconAction>
                          <IconButton
                            title={intl.formatMessage({ id: 'projectUser.list.table.action.accept.tooltip' })}
                            onTouchTap={() => onValidate(projectUser.content.id)}
                            disabled={isFetchingActions || !canAcceptUser(projectUser)}
                          >
                            <Done hoverColor={style.commonActionHoverColor} />
                          </IconButton>
                          <IconButton
                            title={intl.formatMessage({ id: 'projectUser.list.table.action.deny.tooltip' })}
                            onTouchTap={() => onDeny(projectUser.content.id)}
                            disabled={isFetchingActions || !canDenyUser(projectUser)}
                          >
                            <RemoveCircle hoverColor={style.deleteActionHoverColor} />
                          </IconButton>
                          <HateoasIconAction
                            title={intl.formatMessage({ id: 'projectUser.list.table.action.delete.tooltip' })}
                            onTouchTap={() => onDelete(projectUser.content.id)}
                            disabled={isFetchingActions}
                            entityLinks={projectUser.links}
                            hateoasKey={HateoasKeys.DELETE}
                          >
                            <Delete hoverColor={style.deleteActionHoverColor} />
                          </HateoasIconAction>
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
            mainButtonTouchTap={tabContent.mainButtonAction}
            mainHateoasDependency={ProjectUserActions.getDependency(RequestVerbEnum.POST)}
            isMainButtonDisabled={tabContent.mainButtonDisabled}
            mainButtonLabel={<FormattedMessage id={tabContent.mainButtonKey} />}
            secondaryButtonLabel={<FormattedMessage id="projectUser.list.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card >
    )
  }
}

export default ProjectUserListComponent

