import { map, noop } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Input from 'material-ui/svg-icons/action/input'
import Delete from 'material-ui/svg-icons/action/delete'
import ResetLicences from 'material-ui/svg-icons/action/assignment-late'
import { CardActionsComponent, ShowableAtRender, ConfirmDialogComponent } from '@regardsoss/components'
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
    projectList: React.PropTypes.objectOf(Project),
    handleDelete: React.PropTypes.func.isRequired,
    handleOpen: React.PropTypes.func.isRequired,
    handleEdit: React.PropTypes.func.isRequired,
    handleUpdateLicense: React.PropTypes.func.isRequired,
    createUrl: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  componentWillMount() {
    // initialize dialog state (no dialog)
    this.setDialogState(null)
  }


  onLicenseUpdate = (projectName) => {
    const { handleUpdateLicense } = this.props
    this.setDialogState({
      titleKey: 'project.list.dialog.title.update.license',
      messageKey: 'project.list.dialog.message.update.license',
      onConfirm: () => handleUpdateLicense(projectName),
    })
  }

  onDelete = (projectName) => {
    const { handleDelete } = this.props
    this.setDialogState({
      titleKey: 'project.list.dialog.title.delete',
      onConfirm: () => handleDelete(projectName),
    })
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

  getDeletedState = (isDeleted) => {
    if (isDeleted) {
      return (<FormattedMessage id="project.list.value.isDeleted" />)
    }
    return (null)
  }

  setDialogState = (dialogState) => {
    this.setState({
      currentDialog: dialogState,
    })
  }

  cancelDialog = () => {
    this.setDialogState()
  }


  render() {
    const { intl } = this.context
    const { projectList, handleEdit, handleOpen, createUrl } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
      hoverButtonLicenseUpdate: this.context.muiTheme.palette.accent1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
    }

    return (
      <Card>
        <ShowableAtRender
          show={!!this.state.currentDialog}
        >
          <ConfirmDialogComponent
            onConfirm={this.state.currentDialog ? this.state.currentDialog.onConfirm : noop}
            onClose={this.cancelDialog}
            title={this.state.currentDialog ? intl.formatMessage({ id: this.state.currentDialog.titleKey }) : ''}
            message={this.state.currentDialog && this.state.currentDialog.messageKey && intl.formatMessage({ id: this.state.currentDialog.messageKey })}
          />
        </ShowableAtRender>
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
                    {this.getDeletedState(project.content.isDeleted)}
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
                      title={intl.formatMessage({ id: 'project.list.action.licenseUpdateButton' })}
                      onTouchTap={() => this.onLicenseUpdate(project.content.name)}
                      disabled={!!project.content.license}
                    >
                      <ResetLicences hoverColor={style.hoverButtonLicenseUpdate} />
                    </IconButton>
                    <IconButton
                      title={intl.formatMessage({ id: 'project.list.action.deletebutton' })}
                      onTouchTap={() => this.onDelete(project.content.name)}
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

