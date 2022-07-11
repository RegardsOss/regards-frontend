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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  NoContentComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes,
  ShowableAtRender, PageableInfiniteTableContainer,
  TableColumnBuilder, TableLayout, TableHeaderLine, TableHeaderOptionsArea,
  TableHeaderContentBox, TableHeaderLoadingComponent,
  TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import { projectUserActions, projectUserSelectors } from '../../clients/ProjectUserClient'
import NoUserComponent from './NoUserComponent'
import RoleRenderer from './render/RoleRenderer'
import EditProjectUserComponent from './options/EditProjectUserComponent'
import DeleteProjectUserComponent from './options/DeleteProjectUserComponent'
import { ProjectUserAccessRightFiltersComponent } from './filters/ProjectUserAccessRightFiltersComponent'
import HeaderActionsBar from './HeaderActionsBar'
import { getQueryString, getUserRequestParameters } from '../../domain/QueryUtils'

export class ProjectUserAccessRightComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    csvLink: PropTypes.string.isRequired,
    totalElements: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
    onEdit: PropTypes.func,
    onDeleteAccount: PropTypes.func,

    // table sorting, column visiblity & filters management
    // eslint-disable-next-line react/no-unused-prop-types
    requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    columnsVisibility: TableFilterSortingAndVisibilityContainer.COLUMN_VISIBILITY_PROP_TYPE,
    onChangeColumnsVisibility: PropTypes.func,
    getColumnSortingData: PropTypes.func,
    onSort: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static COLUMN_KEYS = {
    EMAIL: 'email',
    LASTNAME: 'lastName',
    FIRSTNAME: 'firstName',
    GROUPS: 'accessGroups',
    ROLE: 'role',
    ACTIONS: 'column.table.options',
  }

  static LOADING_COMPONENT = (
    <NoContentComponent
      titleKey="projectUser.list.table.loading.content.title"
      Icon={SearchIcon}
    />)

  state = {
    deleteDialogOpened: false,
    entityToProcess: null,
    csvLink: '',
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
  * Lifecycle method: component receive props. Used here to detect properties change and update local state
  * @param {*} nextProps next component properties
  */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
  * Properties change detected: update local state
  * @param oldProps previous component properties
  * @param newProps next component properties
  */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      requestParameters,
      csvLink,
    } = newProps
    const oldState = this.state || {}
    let newState = { ...oldState }
    const newRequestParameters = getUserRequestParameters(requestParameters, ProjectUserAccessRightFiltersComponent.DEFAULT_FILTERS_STATE)
    if (!isEqual(newRequestParameters, oldProps.requestParameters)) {
      newState = {
        requestParameters: newRequestParameters,
      }
    }
    if (!isEqual(newRequestParameters, oldProps.requestParameters) || csvLink !== oldProps.csvLink) {
      const queryString = getQueryString(newRequestParameters)
      newState = {
        ...newState,
        csvLink: `${csvLink}${queryString}`,
      }
    }
    if (!isEqual(newState, oldState)) {
      this.setState(newState)
    }
  }

  onToggleDeleteDialog = (entity = null) => {
    this.setState({
      deleteDialogOpened: !this.state.deleteDialogOpened,
      entityToProcess: entity,
    })
  }

  /**
   * Renders account deletion confirmation dialog
   */
  renderDeleteConfirmDialog = () => {
    const { onDeleteAccount } = this.props
    const { entityToProcess } = this.state
    const { intl: { formatMessage } } = this.context
    const name = get(entityToProcess, 'content.email', '')
    const title = formatMessage({ id: 'projectUser.list.delete.message' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={() => onDeleteAccount(entityToProcess.content.id)}
          onClose={this.onToggleDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  render() {
    const {
      onEdit, pageSize, totalElements, isLoading,
      getColumnSortingData, columnsVisibility,
      onSort, onChangeColumnsVisibility,
    } = this.props
    const { csvLink, requestParameters } = this.state
    const filters = omit(requestParameters, 'sort')
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const columns = [ // eslint wont fix: Major API rework required
      // 1 - email
      new TableColumnBuilder(ProjectUserAccessRightComponent.COLUMN_KEYS.EMAIL)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserAccessRightComponent.COLUMN_KEYS.EMAIL}`)
        .label(formatMessage({ id: 'projectUser.list.table.email' }))
        .visible(get(columnsVisibility, ProjectUserAccessRightComponent.COLUMN_KEYS.EMAIL, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserAccessRightComponent.COLUMN_KEYS.EMAIL), onSort)
        .build(),
      // 2 - last name
      new TableColumnBuilder(ProjectUserAccessRightComponent.COLUMN_KEYS.LASTNAME)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserAccessRightComponent.COLUMN_KEYS.LASTNAME}`)
        .label(formatMessage({ id: 'projectUser.list.table.lastname' }))
        .visible(get(columnsVisibility, ProjectUserAccessRightComponent.COLUMN_KEYS.LASTNAME, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserAccessRightComponent.COLUMN_KEYS.LASTNAME), onSort)
        .build(),
      // 3 - first name
      new TableColumnBuilder(ProjectUserAccessRightComponent.COLUMN_KEYS.FIRSTNAME)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserAccessRightComponent.COLUMN_KEYS.FIRSTNAME}`)
        .label(formatMessage({ id: 'projectUser.list.table.firstname' }))
        .visible(get(columnsVisibility, ProjectUserAccessRightComponent.COLUMN_KEYS.FIRSTNAME, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserAccessRightComponent.COLUMN_KEYS.FIRSTNAME), onSort)
        .build(),
      // 3 - groups
      new TableColumnBuilder(ProjectUserAccessRightComponent.COLUMN_KEYS.GROUPS)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserAccessRightComponent.COLUMN_KEYS.GROUPS}`)
        .label(formatMessage({ id: 'projectUser.list.table.groups' }))
        .visible(get(columnsVisibility, ProjectUserAccessRightComponent.COLUMN_KEYS.GROUPS, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserAccessRightComponent.COLUMN_KEYS.GROUPS), onSort)
        .build(),
      // 4 - role
      new TableColumnBuilder(ProjectUserAccessRightComponent.COLUMN_KEYS.ROLE)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserAccessRightComponent.COLUMN_KEYS.ROLE}`)
        .label(formatMessage({ id: 'projectUser.list.table.role' }))
        .visible(get(columnsVisibility, ProjectUserAccessRightComponent.COLUMN_KEYS.ROLE, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserAccessRightComponent.COLUMN_KEYS.ROLE), onSort)
        .rowCellDefinition({
          Constructor: RoleRenderer,
        })
        .build(),
      // 5 - actions
      new TableColumnBuilder(ProjectUserAccessRightComponent.COLUMN_KEYS.ACTIONS)
        .titleHeaderCell()
        .visible(get(columnsVisibility, ProjectUserAccessRightComponent.COLUMN_KEYS.ACTIONS, true))
        .label(formatMessage({ id: 'projectUser.list.table.actions' }))
        .optionsColumn([{
          // Delete
          OptionConstructor: DeleteProjectUserComponent,
          optionProps: { isLoading, onDelete: this.onToggleDeleteDialog },
        }, {
          // Edit
          OptionConstructor: EditProjectUserComponent,
          optionProps: { isLoading, onEdit },
        }])
        .build(),
    ]

    return (
      <TableLayout>
        <TableHeaderLine>
          {/* 1 - accounts count */}
          <TableHeaderContentBox>
            {formatMessage({ id: 'projectUser.list.info.nb.accounts' }, { value: totalElements })}
          </TableHeaderContentBox>
          {/* 2 - loading */}
          <TableHeaderLoadingComponent loading={isLoading} />
          {/* 3 - table options  */}
          <TableHeaderOptionsArea>
            <HeaderActionsBar
              csvLink={csvLink}
              columns={columns}
              onChangeColumnsVisibility={onChangeColumnsVisibility}
            />
          </TableHeaderOptionsArea>
        </TableHeaderLine>
        <PageableInfiniteTableContainer
          name="accounts-list-table"
          pageActions={projectUserActions}
          pageSelectors={projectUserSelectors}
          pageSize={pageSize}
          minRowCount={minRowCount}
          maxRowCount={maxRowCount}
          columns={columns}
          requestParams={requestParameters}
          emptyComponent={!isLoading
            ? <NoUserComponent key="no.content" hasFilter={filters !== ProjectUserAccessRightFiltersComponent.DEFAULT_FILTERS_STATE} />
            : ProjectUserAccessRightComponent.LOADING_COMPONENT}
        />
        {this.renderDeleteConfirmDialog()}
      </TableLayout>
    )
  }
}

export default ProjectUserAccessRightComponent
