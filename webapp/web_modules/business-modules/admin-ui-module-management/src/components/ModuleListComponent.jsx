/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/
import map from 'lodash/map'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table'
import Edit from 'mdi-material-ui/Pencil'
import Delete from 'mdi-material-ui/Delete'
import Copy from 'mdi-material-ui/ContentCopy'
import Toggle from 'material-ui/Toggle'
import { FormattedMessage } from 'react-intl'
import {
  ActionsMenuCell, CardActionsComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes, ShowableAtRender,
} from '@regardsoss/components'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { withHateoasDisplayControl, HateoasKeys, withResourceDisplayControl } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { moduleActions } from '../clients/ModuleClient'

const HateoasIconAction = withHateoasDisplayControl(IconButton)
const HateoasToggle = withHateoasDisplayControl(Toggle)
const ResourceIconAction = withResourceDisplayControl(IconButton)
const actionsBreakpoints = [460, 945, 945]

/**
 * React component to display a given list of modules
 * @author Sébastien binda
 */
class ModuleListComponent extends React.Component {
  static propTypes = {
    modules: AccessShapes.ModuleArray.isRequired,
    backUrl: PropTypes.string.isRequired,
    onCreate: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    onActivation: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static CREATE_DEPENDENCIES = [moduleActions.getDependency(RequestVerbEnum.POST)]

  state = {
    deleteDialogOpened: false,
  }

  openDeleteDialog = (module) => {
    this.setState({
      deleteDialogOpened: true,
      moduleToDelete: module,
    })
  }

  closeDeleteDialog = () => {
    this.setState({
      deleteDialogOpened: false,
      moduleToDelete: null,
    })
  }

  /**
   * User callback: on delete confirmed
   */
  onDeleteConfirmed = () => {
    const { onDelete } = this.props
    const { moduleToDelete } = this.state
    onDelete(moduleToDelete)
  }

  render() {
    const { modules } = this.props
    const { intl } = this.context
    const name = this.state.moduleToDelete ? this.state.moduleToDelete.name : ' '
    const title = this.context.intl.formatMessage({ id: 'modules.list.delete.message' }, { name })

    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonView: this.context.muiTheme.palette.pickerHeaderColor,
    }
    return (
      <Card>
        <ShowableAtRender
          show={this.state.deleteDialogOpened}
        >
          <ConfirmDialogComponent
            dialogType={ConfirmDialogComponentTypes.DELETE}
            onConfirm={this.onDeleteConfirmed}
            onClose={this.closeDeleteDialog}
            title={title}
          />
        </ShowableAtRender>
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'modules.list.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'modules.list.subtitle' })}
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
                <TableHeaderColumn><FormattedMessage id="modules.list.table.description" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="modules.list.table.name" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="modules.list.table.active" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="modules.list.table.actions" /></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(modules, (module, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{module.content.description}</TableRowColumn>
                  <TableRowColumn>{module.content.type}</TableRowColumn>
                  <TableRowColumn>
                    <HateoasToggle
                      entityLinks={module.links}
                      hateoasKey={HateoasKeys.UPDATE}
                      toggled={module.content.active}
                      onToggle={() => this.props.onActivation(module.content)}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <ActionsMenuCell
                      breakpoints={actionsBreakpoints}
                    >
                      <HateoasIconAction
                        title={intl.formatMessage({ id: 'modules.list.table.action.edit.tooltip' })}
                        entityLinks={module.links}
                        hateoasKey={HateoasKeys.UPDATE}
                        onClick={() => this.props.onEdit(module.content)}
                      >
                        <Edit hoverColor={style.hoverButtonEdit} />
                      </HateoasIconAction>
                      <ResourceIconAction
                        title={intl.formatMessage({ id: 'modules.list.table.action.duplicate.tooltip' })}
                        resourceDependencies={moduleActions.getDependency(RequestVerbEnum.POST)}
                        onClick={() => this.props.onDuplicate(module.content)}
                      >
                        <Copy hoverColor={style.hoverButtonEdit} />
                      </ResourceIconAction>
                      <HateoasIconAction
                        title={intl.formatMessage({ id: 'modules.list.table.action.delete.tooltip' })}
                        entityLinks={module.links}
                        hateoasKey={HateoasKeys.DELETE}
                        onClick={() => this.openDeleteDialog(module.content)}
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
            mainButtonClick={this.props.onCreate}
            mainButtonLabel={
              <FormattedMessage
                id="modules.list.action.add"
              />
            }
            mainHateoasDependencies={ModuleListComponent.CREATE_DEPENDENCIES}
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'layout.cancel' })}
            secondaryButtonUrl={this.props.backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default ModuleListComponent
