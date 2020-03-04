/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import ValidateAllIcon from 'mdi-material-ui/PlaylistCheck'
import { AdminShapes, DataManagementShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import {
  MainActionButtonComponent, SecondaryActionButtonComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes,
  ShowableAtRender, InfiniteTableContainer, TableColumnBuilder, TableLayout, TableHeaderLine, TableHeaderText,
  TableHeaderContentBox, TableHeaderLoadingComponent, StringValueRender, DateValueRender, TableHeaderCheckbox,
} from '@regardsoss/components'
import dependencies from '../../dependencies'
import { projectUserSignalActions } from '../../clients/ProjectUserSignalClient'
import AccessGroupFilterComponent from './AccessGroupFilterComponent'
import EditProjectUserComponent from './options/EditProjectUserComponent'
import DeleteProjectUserComponent from './options/DeleteProjectUserComponent'
import NoUserComponent from './NoUserComponent'
import ProjectUserStatusRenderCell from './ProjectUserStatusRenderCell'
import AllowAccessComponent from './options/AllowAccessComponent'
import DenyAccessComponent from './options/DenyAccessComponent'
import RoleRenderer from './RoleRenderer'


const MainActionButtonWithResourceDisplayControl = withResourceDisplayControl(MainActionButtonComponent)
const SecondaryActionButtonWithResourceDisplayControl = withResourceDisplayControl(SecondaryActionButtonComponent)

/**
 * React component to list all project user and manage them.
 */
export class ProjectUserListComponent extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(AdminShapes.ProjectUser).isRequired,
    waitingUsersCount: PropTypes.number.isRequired,
    selectedGroup: DataManagementShapes.AccessGroup,
    groups: DataManagementShapes.AccessGroupList.isRequired,
    isLoading: PropTypes.bool.isRequired,
    showOnlyWaitingUsers: PropTypes.bool.isRequired,

    // control URLs and callbacks
    createUrl: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onValidate: PropTypes.func.isRequired,
    onValidateAll: PropTypes.func.isRequired,
    onDeny: PropTypes.func.isRequired,
    onEnable: PropTypes.func.isRequired,
    onDisable: PropTypes.func.isRequired,
    onSelectGroup: PropTypes.func.isRequired,
    onToggleOnlyWaitingUsers: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Dependencies for validate all option (here, validate dependencies) */
  static VALIDATE_ALL_DEPENDENCIES = [
    projectUserSignalActions.getAcceptDependency(),
  ]

  state = {
    deleteDialogOpened: false,
  }

  /** User callback: close delete dialog */
  onCloseDeleteDialog = () => {
    this.setState({
      deleteDialogOpened: false,
      entityToDelete: null,
    })
  }

  /** User callback: delete was confirmed, propagate event  and close delete dialog */
  onConfirmDelete = () => {
    this.props.onDelete(this.state.entityToDelete.content.id)
    this.onCloseDeleteDialog()
  }

  /**
   * User callback: open deleted dialog
   * @param {ProjectUser} entity entity to delete
   */
  onOpenDeleteDialog = (entity) => {
    this.setState({
      deleteDialogOpened: true,
      entityToDelete: entity,
    })
  }

  /** @return [*]  built table columns */
  buildColumns = () => {
    const {
      isLoading, onEdit, onValidate, onDeny, onEnable, onDisable,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return [
      // 1 - Email column
      new TableColumnBuilder('email').label(formatMessage({ id: 'projectUser.list.table.email' })).titleHeaderCell()
        .propertyRenderCell('content.email', StringValueRender)
        .build(),
      // 2 - Role column
      new TableColumnBuilder('role').titleHeaderCell()
        .label(formatMessage({ id: 'projectUser.list.table.role' }))
        .rowCellDefinition({
          Constructor: RoleRenderer,
        })
        .build(),
      // 3 - status column
      new TableColumnBuilder('status').label(formatMessage({ id: 'projectUser.list.table.status' })).titleHeaderCell()
        .propertyRenderCell('content.status', ProjectUserStatusRenderCell)
        .build(),
      // 4 - last update column
      new TableColumnBuilder('last.update').label(formatMessage({ id: 'projectUser.list.table.lastupdate' })).titleHeaderCell()
        .propertyRenderCell('content.lastUpdate', DateValueRender)
        .build(),
      // Options column
      new TableColumnBuilder().optionsColumn([{
        // Allow access options
        OptionConstructor: AllowAccessComponent,
        optionProps: {
          isLoading,
          onValidate,
          onEnable,
        },
      }, { // Deny access options
        OptionConstructor: DenyAccessComponent,
        optionProps: {
          isLoading,
          onDeny,
          onDisable,
        },
      }, {
        // Edit
        OptionConstructor: EditProjectUserComponent,
        optionProps: { isLoading, onEdit },
      }, {
        // Delete
        OptionConstructor: DeleteProjectUserComponent,
        optionProps: { isLoading, onDelete: this.onOpenDeleteDialog },
      }]).build(),
    ]
  }

  /**
   * @return {React.ReactElement} rendered delete dialog
   */
  renderDeleteConfirmDialog = () => {
    const name = get(this.state.entityToDelete, 'content.email', ' ')
    const title = this.context.intl.formatMessage({ id: 'projectUser.list.delete.message' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={this.onConfirmDelete}
          onClose={this.onCloseDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  render() {
    const {
      users, waitingUsersCount, selectedGroup, groups, isLoading, showOnlyWaitingUsers,
      createUrl, backUrl, onValidateAll, onSelectGroup, onToggleOnlyWaitingUsers,
    } = this.props
    const { intl: { formatMessage }, muiTheme, moduleTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    return (
      <Card>
        {/* A. Dialog */}
        {this.renderDeleteConfirmDialog()}
        {/* B. Card title */}
        <CardTitle title={formatMessage({ id: 'projectUser.list.card.title' })} subtitle={formatMessage({ id: 'projectUser.list.card.subtitle' })} />
        {/* C. Users table */}
        <TableLayout>
          {/* C2. Count and filter options */}
          <TableHeaderLine>
            {/* left position: count text */}
            <TableHeaderContentBox>
              <TableHeaderText text={formatMessage({ id: 'projectUser.list.users.count' }, { count: users.length, waitingUsersCount })} />
            </TableHeaderContentBox>
            {/* center position: show only waiting users  */}
            <TableHeaderContentBox>
              <TableHeaderLoadingComponent loading={isLoading} />
            </TableHeaderContentBox>
            {/* right position: access group filters  */}
            <TableHeaderContentBox>
              <TableHeaderCheckbox
                checked={showOnlyWaitingUsers}
                label={formatMessage({ id: 'projectUser.list.only.waiting.users' })}
                disabled={isLoading}
                onCheck={onToggleOnlyWaitingUsers}
              />
              <AccessGroupFilterComponent
                groups={groups}
                selectedGroup={selectedGroup}
                isLoading={isLoading}
                onSelectGroup={onSelectGroup}
              />
            </TableHeaderContentBox>
          </TableHeaderLine>
          {/* C2. Table */}
          <InfiniteTableContainer
            columns={this.buildColumns()}
            entities={users}
            emptyComponent={<NoUserComponent key="no.content" hasFilter={!!selectedGroup || showOnlyWaitingUsers} />}
            minRowCount={minRowCount}
            maxRowCount={maxRowCount}
          />
        </TableLayout>
        {/* D. view options */}
        <CardActions style={moduleTheme.usersList.actionsStyles}>
          {/* Validate all option on left */}
          <SecondaryActionButtonWithResourceDisplayControl
            label={formatMessage({ id: 'projectUser.list.accept.all' })}
            title={formatMessage({ id: 'projectUser.list.accept.all.tooltip' })}
            disabled={isLoading || !waitingUsersCount}
            icon={<ValidateAllIcon />}
            resourceDependencies={ProjectUserListComponent.VALIDATE_ALL_DEPENDENCIES}
            onClick={onValidateAll}
            hideDisabled={false}
          />
          {/* Cancel and New user on right */}
          <div>
            <SecondaryActionButtonComponent
              label={formatMessage({ id: 'projectUser.list.action.cancel' })}
              url={backUrl}
            />
            <MainActionButtonWithResourceDisplayControl
              label={formatMessage({ id: 'projectUser.list.all.action.create' })}
              url={createUrl}
              disabled={isLoading}
              // Add endpoints rights
              resourceDependencies={dependencies.addDependencies}
              hideDisabled={false}
              className="selenium-userCreate"
            />
          </div>
        </CardActions>
      </Card>
    )
  }
}

export default ProjectUserListComponent
