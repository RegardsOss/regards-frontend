/*
 * LICENSE_PLACEHOLDER
 */
import { map, noop } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import Settings from 'material-ui/svg-icons/action/settings-input-component'
import Input from 'material-ui/svg-icons/action/input'
import Delete from 'material-ui/svg-icons/action/delete'
import ResetLicences from 'material-ui/svg-icons/action/assignment-late'
import { ActionsMenuCell, CardActionsComponent, ShowableAtRender, ConfirmDialogComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { Project } from '@regardsoss/model'
import moduleStyle from '../../styles/styles'

const styles = moduleStyle()

/**
 * React components to list project.
 *
 * @author Sébastien Binda
 */
export class ProjectListComponent extends React.Component {

  static propTypes = {
    projectList: PropTypes.objectOf(Project),
    handleDelete: PropTypes.func.isRequired,
    handleOpen: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleConfigureConnections: PropTypes.func.isRequired,
    handleUpdateLicense: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    currentDialog: null,
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

  breakPoints = {
    license: 1270,
    database: 1065,
    everything: 1000,
  }

  cancelDialog = () => {
    this.setDialogState()
  }

  render() {
    const { intl } = this.context
    const { projectList, handleEdit, handleOpen, handleConfigureConnections, createUrl } = this.props
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
                <TableHeaderColumn style={styles.tableRow} className="col-md-25">
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
                <TableHeaderColumn style={styles.tableRow} className="col-md-26">
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
                <TableRow className={`selenium-${project.content.name}`} key={i}>
                  <TableRowColumn style={styles.tableRow} className="col-md-13">{project.content.name}</TableRowColumn>
                  <TableRowColumn style={styles.tableRow} className="col-md-25">
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
                  <TableRowColumn style={styles.tableRow} className="col-md-26">
                    <ActionsMenuCell>
                      <IconButton
                        title={intl.formatMessage({ id: 'project.list.action.openbutton' })}
                        onTouchTap={() => handleOpen(project.content.name)}
                        breakpoint={940}
                        className="selenium-openbutton"
                      >
                        <Input hoverColor={style.hoverButtonView} />
                      </IconButton>
                      <IconButton
                        title={intl.formatMessage({ id: 'project.list.action.editbutton' })}
                        onTouchTap={() => handleEdit(project.content.name)}
                        breakpoint={995}
                        className="selenium-editbutton"
                      >
                        <Edit hoverColor={style.hoverButtonEdit} />
                      </IconButton>
                      <IconButton
                        title={intl.formatMessage({ id: 'project.list.action.edit.connections.button' })}
                        onTouchTap={() => handleConfigureConnections(project.content.name)}
                        breakpoint={1065}
                        className="selenium-editconnections"
                      >
                        <Settings hoverColor={style.hoverButtonEdit} />
                      </IconButton>

                      <IconButton
                        title={intl.formatMessage({ id: 'project.list.action.licenseUpdateButton' })}
                        onTouchTap={() => this.onLicenseUpdate(project.content.name)}
                        disabled={!!project.content.license}
                        breakpoint={1270}
                        className="selenium-licenseUpdateButton"
                      >
                        <ResetLicences hoverColor={style.hoverButtonLicenseUpdate} />
                      </IconButton>
                      <IconButton
                        title={intl.formatMessage({ id: 'project.list.action.deletebutton' })}
                        onTouchTap={() => this.onDelete(project.content.name)}
                        breakpoint={1270}
                        className="selenium-deletebutton"
                      >
                        <Delete hoverColor={style.hoverButtonDelete} />
                      </IconButton>
                    </ActionsMenuCell>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonClassName="selenium-addButton"
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

