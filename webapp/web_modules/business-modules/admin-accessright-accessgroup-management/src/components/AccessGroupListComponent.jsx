/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import Edit from 'mdi-material-ui/Pencil'
import ContentCopy from 'mdi-material-ui/ContentCopy'
import Settings from 'mdi-material-ui/VideoInputComponent'
import Delete from 'mdi-material-ui/Delete'
import ShowGroupUsersIcon from 'mdi-material-ui/OpenInNew'

import { HateoasKeys } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { DataManagementShapes } from '@regardsoss/shape'
import {
  CardActionsComponent,
  ConfirmDialogComponent,
  ConfirmDialogComponentTypes,
  ShowableAtRender,
  ActionsMenuCell,
  HateoasIconAction,
  ResourceIconAction,
} from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { accessRightDependencies } from '@regardsoss/admin-accessright-dataaccess-management'
import { accessGroupActions } from '../clients/AccessGroupClient'

const actionsBreakpoints = [360, 510, 900, 1000, 1000]

/**
 * React component to list accessgroups.
 */
export class AccessGroupListComponent extends React.Component {
  static propTypes = {
    accessGroupList: DataManagementShapes.AccessGroupList,
    handleShowGroupUsers: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleEditAccessRights: PropTypes.func.isRequired,
    handleDuplicate: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    groupsCount: PropTypes.object,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static CREATE_DEPENDENCIES = [accessGroupActions.getDependency(RequestVerbEnum.POST)]

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

  renderDeleteConfirmDialog = () => {
    const { intl: { formatMessage } } = this.context

    const name = this.state.entityToDelete ? this.state.entityToDelete.content.name : ' '
    const title = formatMessage({ id: 'group.list.delete.message' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={() => {
            this.props.handleDelete(this.state.entityToDelete.content.name)
          }}
          onClose={this.closeDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  getNumberOfUsers = (group) => {
    const { groupsCount } = this.props
    return find(groupsCount, (groupCount, key) => group.content.name === key) || 0
  }

  render() {
    const {
      accessGroupList, handleShowGroupUsers, handleEdit, handleEditAccessRights, handleDuplicate, createUrl, backUrl,
    } = this.props
    const { intl: { formatMessage } } = this.context

    const style = {
      hoverButtonEdit: this.context.muiTheme.palette.primary1Color,
      hoverButtonDelete: this.context.muiTheme.palette.accent1Color,
      hoverButtonDuplicate: this.context.muiTheme.palette.primary3Color,
    }

    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'group.list.title' })}
          subtitle={formatMessage({ id: 'group.list.subtitle' })}
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
                <TableHeaderColumn>{formatMessage({ id: 'group.list.table.name' })}</TableHeaderColumn>
                <TableHeaderColumn>{formatMessage({ id: 'group.list.table.nbUser' })}</TableHeaderColumn>
                <TableHeaderColumn>{formatMessage({ id: 'group.list.table.actions' })}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              preScanRows={false}
              showRowHover
            >
              {map(accessGroupList, (accessGroup, i) => (
                <TableRow className={`selenium-group-${accessGroup.content.name}`} key={i}>
                  <TableRowColumn>{accessGroup.content.name}</TableRowColumn>
                  <TableRowColumn>
                    { // Show number of users or ALL for public groups
                      accessGroup.content.isPublic
                        ? formatMessage({ id: 'group.list.table.all.users' })
                        : this.getNumberOfUsers(accessGroup)
                    }
                  </TableRowColumn>
                  <TableRowColumn>
                    <ActionsMenuCell breakpoints={actionsBreakpoints}>
                      <IconButton
                        title={formatMessage({ id: 'group.list.table.actions.show.group.users' })}
                        onClick={() => handleShowGroupUsers(accessGroup.content.name)}
                      >
                        <ShowGroupUsersIcon hoverColor={style.hoverButtonEdit} />
                      </IconButton>
                      <HateoasIconAction
                        title={formatMessage({ id: 'group.list.table.actions.edit' })}
                        entityLinks={accessGroup.links}
                        hateoasKey={HateoasKeys.UPDATE}
                        onClick={() => handleEdit(accessGroup.content.name)}
                      >
                        <Edit hoverColor={style.hoverButtonEdit} />
                      </HateoasIconAction>
                      <ResourceIconAction
                        title={formatMessage({ id: 'group.list.table.actions.accessrights' })}
                        resourceDependencies={accessRightDependencies.listAccessGroupAccessRightsDeps}
                        onClick={() => handleEditAccessRights(accessGroup.content.name)}
                      >
                        <Settings hoverColor={style.hoverButtonEdit} />
                      </ResourceIconAction>
                      <HateoasIconAction
                        title={formatMessage({ id: 'group.list.table.actions.duplicate' })}
                        entityLinks={accessGroup.links}
                        hateoasKey={HateoasKeys.UPDATE}
                        onClick={() => handleDuplicate(accessGroup.content.name)}
                      >
                        <ContentCopy hoverColor={style.hoverButtonDuplicate} />
                      </HateoasIconAction>
                      <HateoasIconAction
                        title={formatMessage({ id: 'group.list.table.actions.delete' })}
                        entityLinks={accessGroup.links}
                        hateoasKey={HateoasKeys.DELETE}
                        disableInsteadOfHide
                        disabled={this.getNumberOfUsers(accessGroup) !== 0}
                        onClick={() => this.openDeleteDialog(accessGroup)}
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
              formatMessage({ id: 'group.list.action.add' })
            }
            mainButtonClassName="selenium-createButton"
            mainHateoasDependencies={AccessGroupListComponent.CREATE_DEPENDENCIES}
            secondaryButtonLabel={formatMessage({ id: 'group.list.action.cancel' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}

export default AccessGroupListComponent
