import { map } from 'lodash'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from 'material-ui/svg-icons/action/delete'
import { CardActionsComponent } from '@regardsoss/components'
import Camera from 'material-ui/svg-icons/image/camera'
import { themeContextType } from '@regardsoss/theme'
/**
 * React component to list project.
 */
export class ProjectListComponent extends React.Component {

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
    handleView: React.PropTypes.func.isRequired,
    handleEdit: React.PropTypes.func.isRequired,
    createUrl: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }
  getVisibility = (isPublic) => {
    if (isPublic) {
      return (<FormattedMessage id="projects.table.isPrivate" />)
    }
    return (<FormattedMessage id="projects.table.isPublic" />)
  }
  render() {
    const { projectList, handleEdit, handleDelete, handleView, createUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
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
            onRowSelection={handleView}
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
                  <TableRowColumn>
                    <IconButton onTouchTap={() => handleEdit(project.content.id)}>
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </IconButton>

                    <IconButton onTouchTap={() => handleDelete(project.content.id)}>
                      <Delete hoverColor={style.hoverButtonDelete} />
                    </IconButton>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardText>

        <CardActionsComponent
          mainButtonUrl={createUrl}
          mainButtonLabel={
            <FormattedMessage
              id="projects.add.button.title"
            />
          }
        />
      </Card>
    )
  }
}

export default ProjectListComponent

