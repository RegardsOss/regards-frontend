import { map } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Input from 'material-ui/svg-icons/action/input'
import Delete from 'material-ui/svg-icons/action/delete'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * React component to list project.
 */
export class RoleListComponent extends React.Component {

  static propTypes = {
    roleList: React.PropTypes.objectOf(
      React.PropTypes.shape({
        content: React.PropTypes.shape({
          id: React.PropTypes.number,
          name: React.PropTypes.string,
          parent_role_id: React.PropTypes.string,
          is_default: React.PropTypes.bool,
          is_native: React.PropTypes.bool,
        }),
      }),
    ),
    handleDelete: React.PropTypes.func.isRequired,
    handleEdit: React.PropTypes.func.isRequired,
    createUrl: React.PropTypes.string.isRequired,
    backUrl: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  getVisibility = (isPublic) => {
    if (isPublic) {
      return (<FormattedMessage id="projects.table.isPublic" />)
    }
    return (<FormattedMessage id="projects.table.isPrivate" />)
  }

  getState = (isDeleted) => {
    if (isDeleted) {
      return (<FormattedMessage id="projects.table.isDeleted" />)
    }
    return (null)
  }

  render() {
    const { roleList, handleEdit, handleDelete, createUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="role.list.title" />}
          subtitle={<FormattedMessage id="role.list.subtitle" />}
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
                <TableHeaderColumn><FormattedMessage id="role.list.table.name" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="role.list.table.parent_role" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="role.list.table.is_default" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="role.list.table.is_native" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="role.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(roleList, (role, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{role.content.name}</TableRowColumn>
                  <TableRowColumn>{role.content.parent_role_id}</TableRowColumn>
                  <TableRowColumn>{role.content.is_default}</TableRowColumn>
                  <TableRowColumn>{role.content.is_native}</TableRowColumn>
                  <TableRowColumn>
                    <IconButton onTouchTap={() => handleEdit(role.content.id)}>
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </IconButton>

                    <IconButton onTouchTap={() => handleDelete(role.content.id)}>
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
                id="role.list.action.add"
              />
            }
            secondaryButtonLabel={
              <FormattedMessage
                id="role.list.action.cancel"
              />
            }
            secondaryButtonUrl={this.props.backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default RoleListComponent

