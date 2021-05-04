/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table'
import Edit from 'mdi-material-ui/Pencil'
import Delete from 'mdi-material-ui/Delete'
import { DataManagementShapes } from '@regardsoss/shape'
import {
  CardActionsComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes, ShowableAtRender, ActionsMenuCell, HateoasIconAction,
} from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { connectionActions } from '../clients/ConnectionClient'
import ConnectionTesterIconButton from './ConnectionTesterIconButton'

const actionsBreakpoints = [940, 995]

/**
 * React component to list collections.
 */
export class ConnectionListComponent extends React.Component {
  static propTypes = {
    connectionList: DataManagementShapes.ConnectionList,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleTestConnection: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static CREATE_DEPENDENCIES = [connectionActions.getDependency(RequestVerbEnum.POST)]

  state = {
    deleteDialogOpened: false,
    entityToDelete: null,
  }

  closeDeleteDialog = () => {
    this.setState({
      deleteDialogOpened: false,
      entityToDelete: null,
    })
  }

  openDeleteDialog = (entity) => {
    this.setState({
      deleteDialogOpened: true,
      entityToDelete: entity,
    })
  }

  printIsActive = (active) => {
    const { intl: { formatMessage } } = this.context

    if (active) {
      return formatMessage({ id: 'connection.list.isActive.true' })
    }
    return formatMessage({ id: 'connection.list.isActive.false' })
  }

  renderDeleteConfirmDialog = () => {
    const { intl: { formatMessage } } = this.context

    const name = this.state.entityToDelete ? this.state.entityToDelete.content.label : ' '
    const title = formatMessage({ id: 'connection.list.delete.title' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={() => {
            this.props.handleDelete(this.state.entityToDelete.content.businessId)
          }}
          onClose={this.closeDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  render() {
    const {
      connectionList, handleEdit, handleTestConnection, createUrl, backUrl,
    } = this.props
    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
    }
    const { intl: { formatMessage } } = this.context

    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'connection.list.title' })}
          subtitle={formatMessage({ id: 'connection.list.subtitle' })}
        />
        <CardText>
          {this.renderDeleteConfirmDialog()}
          <Table
            selectable={false}
          >
            <TableHeader
              enableSelectAll={false}
              adjustForCheckbox={false}
              displaySelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn>{formatMessage({ id: 'connection.list.table.label' })}</TableHeaderColumn>
                <TableHeaderColumn>{formatMessage({ id: 'connection.list.table.isActive' })}</TableHeaderColumn>
                <TableHeaderColumn>{formatMessage({ id: 'connection.list.table.test' })}</TableHeaderColumn>
                <TableHeaderColumn>{formatMessage({ id: 'connection.list.table.actions' })}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(connectionList, (connection, i) => (
                <TableRow key={i}>
                  <TableRowColumn>{connection.content.label}</TableRowColumn>
                  <TableRowColumn>{this.printIsActive(connection.content.active)}</TableRowColumn>
                  <TableRowColumn><ConnectionTesterIconButton connection={connection} handleTestConnection={handleTestConnection} /></TableRowColumn>
                  <TableRowColumn>
                    <ActionsMenuCell
                      breakpoints={actionsBreakpoints}
                    >
                      <HateoasIconAction
                        entityLinks={connection.links}
                        hateoasKey={HateoasKeys.UPDATE}
                        onClick={() => handleEdit(connection.content.businessId)}
                        title={formatMessage({ id: 'connection.list.action.edit' })}
                        className="selenium-editButton"
                      >
                        <Edit hoverColor={style.hoverButtonEdit} />
                      </HateoasIconAction>
                      <HateoasIconAction
                        entityLinks={connection.links}
                        hateoasKey={HateoasKeys.DELETE}
                        onClick={() => this.openDeleteDialog(connection)}
                        title={formatMessage({ id: 'connection.list.action.delete' })}
                        className="selenium-deleteButton"
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
            mainButtonUrl={createUrl}
            mainButtonLabel={
              formatMessage({ id: 'connection.list.action.add' })
            }
            mainHateoasDependencies={ConnectionListComponent.CREATE_DEPENDENCIES}
            secondaryButtonLabel={formatMessage({ id: 'connection.list.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default ConnectionListComponent
