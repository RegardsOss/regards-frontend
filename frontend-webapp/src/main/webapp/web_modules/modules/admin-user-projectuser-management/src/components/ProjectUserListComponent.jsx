/**
 * LICENSE_PLACEHOLDER
 **/
import { isEmpty, map, size } from 'lodash'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage, FormattedDate } from 'react-intl'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import Done from 'material-ui/svg-icons/action/done'
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import { ProjectUser } from '@regardsoss/model'
import { CardActionsComponent, NoContentMessageInfo } from '@regardsoss/components'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

const tabs = {
  waiting: 0,
  all: 1,
}

/**
 * React component to list all REGARDS account.
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

  componentWillMount = () => {
    // on first loading, show waiting access users if there is any loaded waiting user
    this.selectTab(!isEmpty(this.props.waitingAccessUsers) ? tabs.waiting : tabs.all)
  }

  onTabChange = (value) => {
    this.selectTab(value)
  }

  /**
   * Returns content configuration
   */
  getWaitingUsersTabContent = (style) => {
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

  getAllUsersTabContent = (style) => {
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

  isGrantedUser = user => user.content.status === 'ACCESS_GRANTED'

  isDeniedUser = user => user.content.status === 'ACCESS_DENIED'

  render() {
    const selectedTab = this.state ? this.state.selectedTab : tabs.all
    const style = {
      commonActionHoverColor: this.context.muiTheme.palette.primary1Color,
      deleteActionHoverColor: this.context.muiTheme.palette.accent1Color,
    }
    const tabContent = selectedTab === tabs.waiting ? this.getWaitingUsersTabContent(style) : this.getAllUsersTabContent(style)
    const {
      users, waitingAccessUsers, initialFecthing, backUrl,
      onValidate, onDeny, onEdit, onDelete, isFetchingActions,
    } = this.props
    const { intl } = this.context
    //
    // do render
    return (
      <Card >
        <Tabs onChange={this.onTabChange} value={selectedTab}>
          <Tab label={<FormattedMessage id="projectUser.list.waiting.tab" values={{ count: size(waitingAccessUsers) || '0' }} />} value={tabs.waiting} />
          <Tab label={<FormattedMessage id="projectUser.list.all.tab" values={{ count: size(users) || '0' }} />} value={tabs.all} />
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
                          <IconButton
                            title={intl.formatMessage({ id: 'projectUser.list.table.action.edit.tooltip' })}
                            onTouchTap={() => onEdit(projectUser.content.id)}
                            disabled={isFetchingActions}
                          >
                            <Edit hoverColor={style.commonActionHoverColor} />
                          </IconButton>
                          <IconButton
                            title={intl.formatMessage({ id: 'projectUser.list.table.action.acccept.tooltip' })}
                            onTouchTap={() => onValidate(projectUser.content.id)}
                            disabled={isFetchingActions || this.isGrantedUser(projectUser)}
                          >
                            <Done hoverColor={style.commonActionHoverColor} />
                          </IconButton>
                          <IconButton
                            title={intl.formatMessage({ id: 'projectUser.list.table.action.deny.tooltip' })}
                            onTouchTap={() => onDeny(projectUser.content.id)}
                            disabled={isFetchingActions || this.isDeniedUser(projectUser)}
                          >
                            <RemoveCircle hoverColor={style.deleteActionHoverColor} />
                          </IconButton>
                          <IconButton
                            title={intl.formatMessage({ id: 'projectUser.list.table.action.delete.tooltip' })}
                            onTouchTap={() => onDelete(projectUser.content.id)}
                            disabled={isFetchingActions}
                          >
                            <Delete hoverColor={style.deleteActionHoverColor} />
                          </IconButton>
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

