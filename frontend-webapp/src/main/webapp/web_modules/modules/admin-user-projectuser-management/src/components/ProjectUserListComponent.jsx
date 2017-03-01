/**
 * LICENSE_PLACEHOLDER
 **/
import { isEmpty, map } from 'lodash'
import { Tabs, Tab } from 'material-ui/Tabs'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage, FormattedDate } from 'react-intl'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import Done from 'material-ui/svg-icons/action/done'
import Block from 'material-ui/svg-icons/content/block'
import { ProjectUser } from '@regardsoss/model'
import { CardActionsComponent } from '@regardsoss/components'
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
    usersCount: React.PropTypes.number.isRequired,
    waitingAccessUsers: React.PropTypes.objectOf(ProjectUser),
    waitingAccessUsersCount: React.PropTypes.number.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onValidate: React.PropTypes.func.isRequired,
    onDeny: React.PropTypes.func.isRequired,
    onValidateAll: React.PropTypes.func.isRequired,
    createUrl: React.PropTypes.string.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    isFetchingContent: React.PropTypes.bool.isRequired,
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
    const { waitingAccessUsers, waitingAccessUsersCount, isFetchingActions,
      onValidate, onDeny, onValidateAll, isFetchingContent } = this.props
    return {
      tabSubtitleKey: 'projectUser.list.waiting.subtitle',
      currentUserList: waitingAccessUsers,
      currentUsersCount: waitingAccessUsersCount,
      // validate all users
      mainButtonKey: 'projectUser.list.waiting.validate.all',
      mainButtonAction: () => onValidateAll(),
      mainButtonDisabled: isFetchingActions || isFetchingContent,
      elementActions: [
        {
          // line action : validate access request
          key: 'validate',
          action: onValidate,
          icon: <Done hoverColor={style.commonActionHoverColor} />,
          disabled: isFetchingActions,
        }, {
          // line action : deny access request
          key: 'deny',
          action: onDeny,
          icon: <Block hoverColor={style.deleteActionHoverColor} />,
          disabled: isFetchingActions,
        },
      ],
    }
  }

  getAllUsersTabContent = (style) => {
    const { users, usersCount, onEdit, onDelete, createUrl, isFetchingContent } = this.props
    return {
      tabSubtitleKey: 'projectUser.list.all.subtitle',
      currentUserList: users,
      currentUsersCount: usersCount,
      // create new user
      mainButtonKey: 'projectUser.list.all.action.create',
      mainButtonUrl: createUrl,
      mainButtonDisabled: isFetchingContent,
      elementActions: [
        {
          // line action : edit user
          key: 'edit',
          action: onEdit,
          icon: <Edit hoverColor={style.commonActionHoverColor} />,
        }, {
          // line action : delete user
          key: 'delete',
          action: onDelete,
          icon: <Delete hoverColor={style.deleteActionHoverColor} />,
        },
      ],
    }
  }

  selectTab = (selectedTab) => {
    this.setState({ selectedTab })
  }

  render() {
    const selectedTab = this.state ? this.state.selectedTab : tabs.all
    const style = {
      commonActionHoverColor: this.context.muiTheme.palette.primary1Color,
      deleteActionHoverColor: this.context.muiTheme.palette.accent1Color,
    }
    const tabContent = selectedTab === tabs.waiting ? this.getWaitingUsersTabContent(style) : this.getAllUsersTabContent(style)
    const { isFetchingContent, backUrl } = this.props

    // do render
    return (
      <Card >
        <Tabs onChange={this.onTabChange} value={selectedTab}>
          <Tab label={<FormattedMessage id="projectUser.list.waiting.tab" values={{ count: tabContent.currentUsersCount }} />} value={tabs.waiting} />
          <Tab label={<FormattedMessage id="projectUser.list.all.tab" values={{ count: tabContent.currentUsersCount }} />} value={tabs.all} />
        </Tabs>
        <CardTitle subtitle={<FormattedMessage id={tabContent.tabSubtitleKey} />} />
        <CardText>
          <LoadableContentDisplayDecorator isLoading={isFetchingContent}>
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
                      {projectUser.content.status}
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
                      {tabContent.elementActions.map(({ action, icon, disabled, key }) =>
                        <IconButton
                          key={key}
                          onTouchTap={() => action(projectUser.content.id)}
                          disabled={disabled}
                        >
                          {icon}
                        </IconButton>,
                      )
                      }
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </LoadableContentDisplayDecorator>
        </CardText>
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

