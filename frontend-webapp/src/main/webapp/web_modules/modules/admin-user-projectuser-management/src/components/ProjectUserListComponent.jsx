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
import { ProjectUser } from '@regardsoss/model'
import { CardActionsComponent } from '@regardsoss/components'
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
    onValidate: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    createUrl: React.PropTypes.string.isRequired,
    backUrl: React.PropTypes.string.isRequired,
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

  selectTab = (selectedTab) => {
    this.setState({ selectedTab })
  }

  render() {
    const { users, waitingAccessUsers, onEdit, onValidate, onDelete, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonValidate: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }
    const selectedTab = this.state ? this.state.selectedTab : tabs.all

    // compute users list to use
    const currentUserList = selectedTab === tabs.waiting ? waitingAccessUsers : users

    return (
      <Card >
        <Tabs onChange={this.onTabChange} value={selectedTab}>
          <Tab label={<FormattedMessage id="projectUser.list.waiting.tab" />} value={tabs.waiting} />
          <Tab label={<FormattedMessage id="projectUser.list.all.tab" />} value={tabs.all} />
        </Tabs>
        <CardTitle
          subtitle={
            <FormattedMessage
              id={selectedTab === tabs.all ? 'projectUser.list.all.subtitle' : 'projectUser.list.waiting.subtitle'}
            />}
        />
        <CardText>
          <Table
            selectable={false}
          >
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
              {map(currentUserList, (projectUser, id) => (
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
                    {
                      selectedTab === tabs.all ?
                        <IconButton onTouchTap={() => onEdit(projectUser.content.id)}>
                          <Edit hoverColor={style.hoverButtonEdit} />
                        </IconButton> :
                        <IconButton onTouchTap={() => onValidate(projectUser.content.id)}>
                          <Done hoverColor={style.hoverButtonValidate} />
                        </IconButton>
                    }
                    <IconButton onTouchTap={() => onDelete(projectUser.content.id)}>
                      <Delete hoverColor={style.hoverButtonDelete} />
                    </IconButton>
                  </TableRowColumn> :
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonUrl={createUrl}
            mainButtonLabel={<FormattedMessage id="projectUser.list.all.action.create" />}
            secondaryButtonLabel={<FormattedMessage id="projectUser.list.all.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card >
    )
  }
}

export default ProjectUserListComponent

