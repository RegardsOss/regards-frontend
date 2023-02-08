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
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { AdminDomain } from '@regardsoss/domain'
import {
  NoContentComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes,
  ShowableAtRender, PageableInfiniteTableContainer,
  TableColumnBuilder, TableLayout, TableHeaderLine, TableHeaderOptionsArea,
  TableHeaderContentBox, TableHeaderLoadingComponent,
  TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import { projectUserActions, projectUserSelectors } from '../../clients/ProjectUserClient'
import NoUserComponent from './NoUserComponent'
import EditProjectUserComponent from './options/EditProjectUserComponent'
import DeleteProjectUserComponent from './options/DeleteProjectUserComponent'
import EditQuotaComponent from './options/EditQuotaComponent'
import { ProjectUserQuotaFiltersComponent } from './filters/ProjectUserQuotaFiltersComponent'
import MaxQuotaDialogComponent from './dialog/MaxQuotaDialogComponent'
import QuotaRenderer from './render/QuotaRenderer'
import HeaderActionsBar from './HeaderActionsBar'
import { getUserRequestParameters } from '../../domain/QueryUtils'

export class ProjectUserQuotaComponent extends React.Component {
  static propTypes = {
    totalElements: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
    onEdit: PropTypes.func,
    onDeleteAccount: PropTypes.func,
    uiSettings: UIShapes.UISettings.isRequired,
    onSetMaxQuota: PropTypes.func,
    onDownloadCSV: PropTypes.func,

    // table sorting, column visiblity & filters management
    // eslint-disable-next-line react/no-unused-prop-types
    requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    bodyParameters: TableFilterSortingAndVisibilityContainer.BODY_PARAMETERS_PROP_TYPE,
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
    QUOTA: 'currentQuota',
    LAST_CONNECTION: 'lastUpdate',
    ACTIONS: 'column.table.options',
  }

  static LOADING_COMPONENT = (
    <NoContentComponent
      titleKey="projectUser.list.table.loading.content.title"
      Icon={SearchIcon}
    />)

  state = {
    deleteDialogOpened: false,
    quotaDialogOpened: false,
    entityToProcess: null,
    requestParameters: {},
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
      uiSettings,
    } = newProps

    const oldState = this.state || {}
    let newState = { ...oldState }
    const newRequestParameters = getUserRequestParameters(requestParameters, ProjectUserQuotaFiltersComponent.DEFAULT_FILTERS_STATE)
    if (!isEqual(newRequestParameters, oldProps.requestParameters) || !isEqual(uiSettings, oldProps.uiSettings)) {
      newState = {
        requestParameters: {
          ...newRequestParameters,
          [AdminDomain.FILTER_PARAMS.USE_QUOTA_LIMITATION]: newRequestParameters[AdminDomain.FILTER_PARAMS.USE_QUOTA_LIMITATION] ? uiSettings.quotaWarningCount : null,
        },
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

  onShowEditQuotaDialog = (entity) => {
    this.setState({
      quotaDialogOpened: true,
      entityToProcess: entity,
    })
  }

  /**
   * User callback: close quota edition dialog
   */
  onCloseEditQuotaDialog = () => {
    this.setState({
      quotaDialogOpened: false,
      entityToProcess: null,
    })
  }

  /**
   * User callback: confirm quota edition and close dialog
   * @param {number} maxQuota new user max quota
   */
  onConfirmQuotaEdition = (maxQuota) => {
    const { onSetMaxQuota } = this.props
    const { entityToProcess } = this.state
    onSetMaxQuota(entityToProcess, maxQuota)
    this.onCloseEditQuotaDialog()
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
      onSort, onChangeColumnsVisibility, bodyParameters,
      uiSettings, onDownloadCSV,
    } = this.props
    const { requestParameters } = this.state
    const { quotaDialogOpened, entityToProcess } = this.state
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const columns = [ // eslint wont fix: Major API rework required
      // 1 - email
      new TableColumnBuilder(ProjectUserQuotaComponent.COLUMN_KEYS.EMAIL)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserQuotaComponent.COLUMN_KEYS.EMAIL}`)
        .label(formatMessage({ id: 'projectUser.list.table.email.label' }))
        .visible(get(columnsVisibility, ProjectUserQuotaComponent.COLUMN_KEYS.EMAIL, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserQuotaComponent.COLUMN_KEYS.EMAIL), onSort)
        .build(),
      // 2 - last name
      new TableColumnBuilder(ProjectUserQuotaComponent.COLUMN_KEYS.LASTNAME)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserQuotaComponent.COLUMN_KEYS.LASTNAME}`)
        .label(formatMessage({ id: 'projectUser.list.table.lastName.label' }))
        .visible(get(columnsVisibility, ProjectUserQuotaComponent.COLUMN_KEYS.LASTNAME, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserQuotaComponent.COLUMN_KEYS.LASTNAME), onSort)
        .build(),
      // 3 - first name
      new TableColumnBuilder(ProjectUserQuotaComponent.COLUMN_KEYS.FIRSTNAME)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserQuotaComponent.COLUMN_KEYS.FIRSTNAME}`)
        .label(formatMessage({ id: 'projectUser.list.table.firstName.label' }))
        .visible(get(columnsVisibility, ProjectUserQuotaComponent.COLUMN_KEYS.FIRSTNAME, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserQuotaComponent.COLUMN_KEYS.FIRSTNAME), onSort)
        .build(),
      // 3 - quota
      new TableColumnBuilder(ProjectUserQuotaComponent.COLUMN_KEYS.QUOTA)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserQuotaComponent.COLUMN_KEYS.QUOTA}`)
        .label(formatMessage({ id: 'projectUser.list.table.quota' }))
        .visible(get(columnsVisibility, ProjectUserQuotaComponent.COLUMN_KEYS.QUOTA, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserQuotaComponent.COLUMN_KEYS.QUOTA), onSort)
        .rowCellDefinition({
          Constructor: QuotaRenderer,
          props: {
            uiSettings,
          },
        })
        .build(),
      // 4 - last connection
      new TableColumnBuilder(ProjectUserQuotaComponent.COLUMN_KEYS.LAST_CONNECTION)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserQuotaComponent.COLUMN_KEYS.LAST_CONNECTION}`)
        .label(formatMessage({ id: 'projectUser.list.table.lastConnection' }))
        .visible(get(columnsVisibility, ProjectUserQuotaComponent.COLUMN_KEYS.LAST_CONNECTION, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserQuotaComponent.COLUMN_KEYS.LAST_CONNECTION), onSort)
        .build(),
      // 5 - actions
      new TableColumnBuilder(ProjectUserQuotaComponent.COLUMN_KEYS.ACTIONS)
        .titleHeaderCell()
        .visible(get(columnsVisibility, ProjectUserQuotaComponent.COLUMN_KEYS.ACTIONS, true))
        .label(formatMessage({ id: 'projectUser.list.table.actions' }))
        .optionsColumn([{
          // Delete
          OptionConstructor: DeleteProjectUserComponent,
          optionProps: { isLoading, onDelete: this.onToggleDeleteDialog },
        }, {
          // Edit
          OptionConstructor: EditProjectUserComponent,
          optionProps: { isLoading, onEdit },
        }, {
          // edit quota option
          OptionConstructor: EditQuotaComponent,
          optionProps: { onShowEditQuotaDialog: this.onShowEditQuotaDialog },
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
              bodyParameters={bodyParameters}
              onDownloadCSV={onDownloadCSV}
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
          bodyParams={bodyParameters}
          fetchUsingPostMethod
          emptyComponent={!isLoading
            ? <NoUserComponent key="no.content" hasFilter={bodyParameters !== ProjectUserQuotaFiltersComponent.DEFAULT_FILTERS_STATE} />
            : ProjectUserQuotaComponent.LOADING_COMPONENT}
        />
        <MaxQuotaDialogComponent
          open={quotaDialogOpened}
          user={entityToProcess}
          quotaWarningCount={uiSettings.quotaWarningCount}
          onClose={this.onCloseEditQuotaDialog}
          onConfirm={this.onConfirmQuotaEdition}
        />
        {this.renderDeleteConfirmDialog()}
      </TableLayout>
    )
  }
}

export default ProjectUserQuotaComponent
