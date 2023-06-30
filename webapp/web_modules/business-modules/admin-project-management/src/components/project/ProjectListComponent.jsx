/*
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import map from 'lodash/map'
import noop from 'lodash/noop'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table'

import Edit from 'mdi-material-ui/Pencil'
import Settings from 'mdi-material-ui/VideoInputComponent'
import Open from 'mdi-material-ui/OpenInNew'
import Delete from 'mdi-material-ui/Delete'
import ResetLicences from 'mdi-material-ui/ClipboardAlert'
import {
  ActionsMenuCell, CardActionsComponent, ShowableAtRender, ConfirmDialogComponent, HateoasIconAction,
} from '@regardsoss/components'
import { HateoasKeys } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AdminShapes } from '@regardsoss/shape'
import moduleStyle from '../../styles/styles'

const styles = moduleStyle()
const actionsBreakpoints = [904, 995, 1065, 1270, 1270]

/**
 * React components to list project.
 *
 * @author Sébastien Binda
 */
export class ProjectListComponent extends React.Component {
  static propTypes = {
    projectList: AdminShapes.ProjectList,
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

  breakPoints = {
    license: 1270,
    database: 1065,
    everything: 1000,
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
    const { intl: { formatMessage } } = this.context
    if (isPublic) {
      return formatMessage({ id: 'project.list.value.isPublic' })
    }
    return formatMessage({ id: 'project.list.value.isPrivate' })
  }

  getAccessibility = (isAccessible) => {
    const { intl: { formatMessage } } = this.context
    if (isAccessible) {
      return formatMessage({ id: 'project.list.value.isAccessible' })
    }
    return formatMessage({ id: 'project.list.value.isNotAccessible' })
  }

  getDeletedState = (isDeleted) => {
    const { intl: { formatMessage } } = this.context
    if (isDeleted) {
      return formatMessage({ id: 'project.list.value.isDeleted' })
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
    const { intl: { formatMessage } } = this.context
    const {
      projectList, handleEdit, handleOpen, handleConfigureConnections, createUrl,
    } = this.props
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
            title={this.state.currentDialog ? formatMessage({ id: this.state.currentDialog.titleKey }) : ''}
            message={this.state.currentDialog && this.state.currentDialog.messageKey && formatMessage({ id: this.state.currentDialog.messageKey })}
          />
        </ShowableAtRender>
        <CardTitle
          title={formatMessage({ id: 'project.list.title' })}
          subtitle={formatMessage({ id: 'project.list.subtitle' })}
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
                  {formatMessage({ id: 'project.list.table.name' })}
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.tableRow} className="col-md-25">
                  {formatMessage({ id: 'project.list.table.description' })}
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.tableRow} className="col-md-12">
                  {formatMessage({ id: 'project.list.table.isPublic' })}
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.tableRow} className="col-md-12">
                  {formatMessage({ id: 'project.list.table.isAccessible' })}
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.tableRow} className="col-md-12">
                  {formatMessage({ id: 'project.list.table.isDeleted' })}
                </TableHeaderColumn>
                <TableHeaderColumn style={styles.tableRow} className="col-md-26">
                  {formatMessage({ id: 'project.list.table.actions' })}
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
                    <ActionsMenuCell
                      breakpoints={actionsBreakpoints}
                    >
                      <HateoasIconAction
                        entityLinks={project.links}
                        hateoasKey={HateoasKeys.UPDATE}
                        disableInsteadOfHide
                        alwaysDisplayforInstanceUser={false}
                        title={formatMessage({ id: 'project.list.action.openbutton' })}
                        onClick={() => handleOpen(project.content.name)}
                        className="selenium-openbutton"
                      >
                        <Open hoverColor={style.hoverButtonView} />
                      </HateoasIconAction>
                      <HateoasIconAction
                        entityLinks={project.links}
                        hateoasKey={HateoasKeys.UPDATE}
                        disableInsteadOfHide
                        alwaysDisplayforInstanceUser={false}
                        title={formatMessage({ id: 'project.list.action.editbutton' })}
                        onClick={() => handleEdit(project.content.name)}
                        className="selenium-editbutton"
                      >
                        <Edit hoverColor={style.hoverButtonEdit} />
                      </HateoasIconAction>
                      <HateoasIconAction
                        entityLinks={project.links}
                        hateoasKey={HateoasKeys.UPDATE}
                        disableInsteadOfHide
                        alwaysDisplayforInstanceUser={false}
                        title={formatMessage({ id: 'project.list.action.edit.connections.button' })}
                        onClick={() => handleConfigureConnections(project.content.name)}
                        className="selenium-editconnections"
                      >
                        <Settings hoverColor={style.hoverButtonEdit} />
                      </HateoasIconAction>

                      <HateoasIconAction
                        entityLinks={project.links}
                        hateoasKey={HateoasKeys.UPDATE}
                        disableInsteadOfHide
                        alwaysDisplayforInstanceUser={false}
                        title={formatMessage({ id: 'project.list.action.licenseUpdateButton' })}
                        onClick={() => this.onLicenseUpdate(project.content.name)}
                        disabled={!!project.content.license}
                        className="selenium-licenseUpdateButton"
                      >
                        <ResetLicences hoverColor={style.hoverButtonLicenseUpdate} />
                      </HateoasIconAction>
                      <HateoasIconAction
                        entityLinks={project.links}
                        hateoasKey={HateoasKeys.DELETE}
                        disableInsteadOfHide
                        alwaysDisplayforInstanceUser={false}
                        title={formatMessage({ id: 'project.list.action.deletebutton' })}
                        onClick={() => this.onDelete(project.content.name)}
                        className="selenium-deletebutton"
                      >
                        <Delete hoverColor={style.hoverButtonDelete} />
                      </HateoasIconAction>
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
              formatMessage({ id: 'project.list.action.add' })
            }
          />
        </CardActions>
      </Card>
    )
  }
}

export default ProjectListComponent
