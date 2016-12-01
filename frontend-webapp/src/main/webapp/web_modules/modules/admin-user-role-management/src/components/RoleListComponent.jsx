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
    projectList: React.PropTypes.objectOf(
      React.PropTypes.shape({
        content: React.PropTypes.shape({
          id: React.PropTypes.number,
          name: React.PropTypes.string,
          description: React.PropTypes.string,
          isPublic: React.PropTypes.bool,
        }),
      }),
    ),
    handleDelete: React.PropTypes.func.isRequired,
    handleOpen: React.PropTypes.func.isRequired,
    handleEdit: React.PropTypes.func.isRequired,
    createUrl: React.PropTypes.string.isRequired,
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
    const { projectList, handleEdit, handleDelete, handleOpen, createUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="projects.title" />}
          subtitle={<FormattedMessage id="projects.subtitle" />}
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
                <TableHeaderColumn><FormattedMessage id="projects.table.name.label" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="projects.table.description.label" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="projects.table.isPublic.label" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="projects.table.isDeleted.label" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="projects.table.actions.label" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(projectList, (project, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{project.content.name}</TableRowColumn>
                  <TableRowColumn>{project.content.description}</TableRowColumn>
                  <TableRowColumn>{this.getVisibility(project.content.isPublic)}</TableRowColumn>
                  <TableRowColumn>{this.getState(project.content.isDeleted)}</TableRowColumn>
                  <TableRowColumn>
                    <IconButton
                      onTouchTap={() => handleOpen(project.content.name)}
                      tooltip={this.context.intl.formatMessage({ id: 'project.list.action.open' })}
                    >
                      <Input hoverColor={style.hoverButtonView} />
                    </IconButton>

                    <IconButton onTouchTap={() => handleEdit(project.content.name)}>
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </IconButton>

                    <IconButton onTouchTap={() => handleDelete(project.content.name)}>
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
                id="projects.add.button.title"
              />
            }
          />
        </CardActions>
      </Card>
    )
  }
}

export default RoleListComponent

