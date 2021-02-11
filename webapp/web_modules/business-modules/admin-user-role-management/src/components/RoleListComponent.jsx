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
import { FormattedMessage } from 'react-intl'
import { AdminDomain } from '@regardsoss/domain'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import {
  CardActionsComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes, ShowableAtRender,
} from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AdminShapes } from '@regardsoss/shape'
import { roleActions } from '../clients/RoleClient'
import EditRoleComponent from './EditRoleComponent'
import EditResourceAccessComponent from './EditResourceAccessComponent'
import DeleteRoleComponent from './DeleteRoleComponent'

/**
 * React components to list project.
 */
export class RoleListComponent extends React.Component {
  static propTypes = {
    roleList: AdminShapes.RoleList,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleEditResourceAccess: PropTypes.func.isRequired,
    createUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static CREATE_DEPENDENCIES = [roleActions.getDependency(RequestVerbEnum.POST)]

  state = {
    deleteDialogOpened: false,
  }

  /** User callback on delete confirmed, performs deletion */
  onDeleteConfirmed = () => {
    const { handleDelete } = this.props
    const { entityToDelete } = this.state
    handleDelete(entityToDelete.content.name)
  }

  getBooleanAsString = (value) => {
    if (value) {
      return (<FormattedMessage id="role.list.value.true" />)
    }
    return (<FormattedMessage id="role.list.value.false" />)
  }

  /**
   * Returns role label for role name as parameter
   * @param {string}  name (may be undefined)
   * @return {string} label to use
   */
  getRoleLabel = (name) => {
    const { intl: { formatMessage } } = this.context
    if (name) {
      if (AdminDomain.DEFAULT_ROLES.includes(name)) {
        // format a default role
        return formatMessage({ id: `role.name.${name}` })
      }
      // custom role: return its name
      return name
    }
    return formatMessage({ id: 'role.name.empty' })
  }

  /**
   * Return the parent role label
   * @param {*} parentRole optionnal parent role
   * @returns {string} label to use
   */
  getParentRoleLabel = (parentRole) => this.getRoleLabel(parentRole ? parentRole.name : null)

  /**
   *
   * @param isDeleted
   * @returns {*}
   */
  getState = (isDeleted) => {
    if (isDeleted) {
      return (<FormattedMessage id="projects.table.isDeleted" />)
    }
    return (null)
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
    const name = this.state.entityToDelete ? this.state.entityToDelete.content.email : ' '
    const title = formatMessage({ id: 'role.list.delete.message' }, { name })
    return (
      <ShowableAtRender show={this.state.deleteDialogOpened}>
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={this.onDeleteConfirmed}
          onClose={this.closeDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  render() {
    const {
      roleList, handleEdit, createUrl, handleEditResourceAccess,
    } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context
    return (
      <Card>
        <CardTitle
          title={formatMessage({ id: 'role.list.title' })}
          subtitle={<FormattedMessage id="role.list.subtitle" />}
        />
        <CardText>
          <div style={moduleTheme.roleListCardStyle}>
            <ul>
              <li>
                <span style={moduleTheme.descritiveRoleStyle}><FormattedMessage id="role.list.public.name" /></span>
                <FormattedMessage id="role.list.public.description" />
              </li>
              <li>
                <span style={moduleTheme.descritiveRoleStyle}><FormattedMessage id="role.list.registered.user.name" /></span>
                <FormattedMessage id="role.list.registered.user.description" />
              </li>
              <li>
                <span style={moduleTheme.descritiveRoleStyle}><FormattedMessage id="role.list.exploit.name" /></span>
                <FormattedMessage id="role.list.exploit.description" />
              </li>
              <li>
                <span style={moduleTheme.descritiveRoleStyle}><FormattedMessage id="role.list.admin.name" /></span>
                <FormattedMessage id="role.list.admin.description" />
              </li>
              <li>
                <span style={moduleTheme.descritiveRoleStyle}><FormattedMessage id="role.list.admin.project.name" /></span>
                <FormattedMessage id="role.list.admin.project.description" />
              </li>
            </ul>
          </div>
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
                <TableHeaderColumn><FormattedMessage id="role.list.table.name" /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage id="role.list.table.parentRole" /></TableHeaderColumn>
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
                  <TableRowColumn>{this.getRoleLabel(role.content.name)}</TableRowColumn>
                  <TableRowColumn>{this.getParentRoleLabel(role.content.parentRole) }</TableRowColumn>
                  <TableRowColumn>
                    <EditResourceAccessComponent role={role} onEditResourceAccess={handleEditResourceAccess} />
                    <EditRoleComponent role={role} onEdit={handleEdit} />
                    <DeleteRoleComponent role={role} onDelete={this.openDeleteDialog} />
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
            mainHateoasDependencies={RoleListComponent.CREATE_DEPENDENCIES}
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
