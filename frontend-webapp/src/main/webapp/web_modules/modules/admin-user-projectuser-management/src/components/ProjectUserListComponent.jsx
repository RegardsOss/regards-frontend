import { map } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import { ProjectUser } from '@regardsoss/model'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType, FormattedDateComponent } from '@regardsoss/i18n'

/**
 * React component to list all REGARDS account.
 */
export class ProjectUserListComponent extends React.Component {

  static propTypes = {
    projectUserList: React.PropTypes.objectOf(ProjectUser),
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    createUrl: React.PropTypes.string.isRequired,
    backUrl: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    const { projectUserList, onEdit, onDelete, createUrl, backUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="projectUser.list.title" />}
          subtitle={<FormattedMessage id="projectUser.list.subtitle" />}
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
              {map(projectUserList, (projectUser, id) => (
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
                    <FormattedDateComponent value={projectUser.content.lastUpdate} />
                  </TableRowColumn>
                  <TableRowColumn>
                    <IconButton onTouchTap={() => onEdit(projectUser.content.id)}>
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </IconButton>

                    <IconButton onTouchTap={() => onDelete(projectUser.content.id)}>
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
                id="projectUser.list.action.create"
              />
            }
            secondaryButtonLabel={<FormattedMessage id="projectUser.list.action.cancel" />}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default ProjectUserListComponent

