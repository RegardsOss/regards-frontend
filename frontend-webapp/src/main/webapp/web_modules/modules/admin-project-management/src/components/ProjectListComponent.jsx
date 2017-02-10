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
import { Project } from '@regardsoss/model'
import moduleStyle from '../styles/styles'

const styles = moduleStyle()
/**
 * React components to list project.
 */
export class ProjectListComponent extends React.Component {

  static propTypes = {
    projectList: React.PropTypes.objectOf({ Project }),
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
      return (<FormattedMessage id="project.list.value.isPublic" />)
    }
    return (<FormattedMessage id="project.list.value.isPrivate" />)
  }

  getAccessibility = (isAccessible) => {
    if (isAccessible) {
      return (<FormattedMessage id="project.list.value.isAccessible" />)
    }
    return (<FormattedMessage id="project.list.value.isNotAccessible" />)
  }

  getState = (isDeleted) => {
    if (isDeleted) {
      return (<FormattedMessage id="project.list.value.isDeleted" />)
    }
    return (null)
  }

  render() {
    const { intl } = this.context
    const { projectList, handleEdit, handleDelete, handleOpen, createUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="project.list.title" />}
          subtitle={<FormattedMessage id="project.list.subtitle" />}
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
                <TableHeaderColumn style={styles.tableRow} className="col-md-13">
                  <FormattedMessage id="project.list.table.name" />
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.tableRow} className="col-md-33">
                  <FormattedMessage id="project.list.table.description" />
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.tableRow} className="col-md-12">
                  <FormattedMessage id="project.list.table.isPublic" />
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.tableRow} className="col-md-12">
                  <FormattedMessage id="project.list.table.isAccessible" />
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.tableRow} className="col-md-12">
                  <FormattedMessage id="project.list.table.isDeleted" />
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.tableRow} className="col-md-18">
                  <FormattedMessage id="project.list.table.actions" />
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(projectList, (project, i) => (
                <TableRow key={i}>
                  <TableRowColumn style={styles.tableRow} className="col-md-13">{project.content.name}</TableRowColumn>
                  <TableRowColumn style={styles.tableRow} className="col-md-33">
                    <abbr style={styles.abbr} title={project.content.description}>
                      {project.content.description}
                    </abbr>
                  </TableRowColumn>
                  <TableRowColumn style={styles.tableRow} className="col-md-12">
                    {this.getVisibility(project.content.isPublic)}
                  </TableRowColumn>
                  <TableRowColumn style={styles.tableRow} className="col-md-12">
                    {this.getAccessibility(project.content.isAccessible)}
                  </TableRowColumn>
                  <TableRowColumn style={styles.tableRow} className="col-md-12">
                    {this.getState(project.content.isDeleted)}
                  </TableRowColumn>
                  <TableRowColumn style={styles.tableRow} className="col-md-18">
                    <IconButton
                      title={intl.formatMessage({ id: 'project.list.action.openbutton' })}
                      onTouchTap={() => handleOpen(project.content.name)}
                    >
                      <Input hoverColor={style.hoverButtonView} />
                    </IconButton>

                    <IconButton
                      title={intl.formatMessage({ id: 'project.list.action.editbutton' })}
                      onTouchTap={() => handleEdit(project.content.name)}
                    >
                      <Edit hoverColor={style.hoverButtonEdit} />
                    </IconButton>

                    <IconButton
                      title={intl.formatMessage({ id: 'project.list.action.deletebutton' })}
                      onTouchTap={() => handleDelete(project.content.name)}
                    >
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
                id="project.list.action.add"
              />
            }
          />
        </CardActions>
      </Card>
    )
  }
}

export default ProjectListComponent

