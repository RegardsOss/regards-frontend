/**
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
 **/
import map from 'lodash/map'
import get from 'lodash/get'
import NoContentIcon from 'mdi-material-ui/CropFree'
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import {
  TableLayout, TableColumnBuilder, PageableInfiniteTableContainer,
  DateValueRender, TableSelectionModes, NoContentComponent, TableHeaderLine,
  TableFilterSortingAndVisibilityContainer,
  withSortTables, CodeDisplayDialog,
} from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { IngestDomain, CommonDomain } from '@regardsoss/domain'
import { MIME_TYPES } from '@regardsoss/mime-types'
import RequestRetryDialog from './RequestRetryDialog'
import RequestDeleteDialog from './RequestDeleteDialog'
import RequestDeleteOption from './RequestDeleteOption'
import RequestRetryOption from './RequestRetryOption'
import RequestStatusRenderCell from './RequestStatusRenderCell'
import RequestTypeRenderCell from './RequestTypeRenderCell'
import VersionOptionSelectionDialog from './VersionOptionSelectionDialog'
import HeaderActionsBarContainer from '../../containers/HeaderActionsBarContainer'
import AbortAllRequestsDialog from './AbortAllRequestsDialog'
import { DIALOG_TYPES } from '../../domain/dialogTypes'
import clientByPane from '../../domain/ClientByPane'
import messages from '../../i18n'
import styles from '../../styles'

/**
 * Displays the list of OAIS packages
 * @author Théo Lasserre
 */

export const REQUESTS_COLUMN_KEYS = {
  ID: 'providerId',
  TYPE: 'dtype',
  STATE: 'state',
  LASTSUBMITTED: 'creationDate',
  ACTIONS: 'actions',
}

export class OAISRequestManagerComponent extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    pageSize: PropTypes.number,
    modeSelectionAllowed: PropTypes.bool.isRequired,
    onDeleteRequests: PropTypes.func.isRequired,
    onRetryRequests: PropTypes.func.isRequired,
    onSelectVersionOption: PropTypes.func.isRequired,
    onAbortRequests: PropTypes.func.isRequired,
    paneType: PropTypes.oneOf(IngestDomain.REQUEST_TYPES).isRequired,

    // table sorting, column visiblity & filters management
    requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    bodyParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    getColumnSortingData: PropTypes.func,
    onSort: PropTypes.func,
    pageMeta: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static EMPTY_COMPONENT = <NoContentComponent
    titleKey="oais.requests.empty.results"
    Icon={NoContentIcon}
  />

  static LOADING_COMPONENT = <NoContentComponent
    titleKey="oais.requests.loading.results"
    Icon={SearchIcon}
  />

  state = {
    [DIALOG_TYPES.ERRORS_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    [DIALOG_TYPES.VERSION_OPTION_SELECTION_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    [DIALOG_TYPES.RETRY_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    [DIALOG_TYPES.DELETE_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    [DIALOG_TYPES.ABORT_DIALOG]: {
      open: false,
      mode: TableSelectionModes.excludeSelected,
      entities: [],
    },
  }

  /**
   * Inner callback: Opens dialog corresopnding to request type
   * @param {string} mode selection mode from TableSelectionModes
   * @param {[*]} entities entities as an array of IngestShapes.RequestEntity (to include or exclude from request)
   * @param {string} dialogRequestType dialog type for the request to handle, from OAISRequestManagerComponent.DIALOG_TYPES
   */
  onOpenActionDialog = (dialogRequestType, entities = [], mode = TableSelectionModes.includeSelected) => this.setState({
    [dialogRequestType]: {
      open: true,
      mode,
      entities,
    },
  })

  /**
   * Callback: On view request error for request as parameter (shows corresponding dialog)
   * @param {[*]} entity to view as an IngestShapes.RequestEntity
   */
  onViewRequestErrors = (entities) => this.onOpenActionDialog(DIALOG_TYPES.ERRORS_DIALOG, [entities])

  /**
   * Callback: On select version option for requests as parameter (shows corresponding dialog)
   * @param {string} mode selection mode from TableSelectionModes
   * @param {[*]} entities entities as an array of IngestShapes.RequestEntity (to include or exclude from request)
   */
  onSelectVersionOption = (entities, mode) => this.onOpenActionDialog(DIALOG_TYPES.VERSION_OPTION_SELECTION_DIALOG, entities, mode)

  /**
   * Callback: On retry requests for selection as parameter (shows corresponding dialog)
   * @param {string} mode selection mode from TableSelectionModes
   * @param {[*]} entities entities as an array of IngestShapes.RequestEntity (to include or exclude from request)
   */
  onRetrySelection = (entities, mode) => this.onOpenActionDialog(DIALOG_TYPES.RETRY_DIALOG, entities, mode)

  /**
   * Callback: On retry request
   * @param {[*]} entity entity  of IngestShapes.RequestEntity (to include or exclude from request)
   */
  onRetryRequest = (entity) => this.onRetrySelection([entity])

  /**
   * Callback: On delete requests for selection as parameter (shows corresponding dialog)
   * @param {string} mode selection mode from TableSelectionModes
   * @param {[*]} entities entities as an array of IngestShapes.RequestEntity (to include or exclude from request)
   */
  onDeleteSelection = (entities, mode) => this.onOpenActionDialog(DIALOG_TYPES.DELETE_DIALOG, entities, mode)

  /**
   * Callback: On delete request
   * @param {*} entity entity of IngestShapes.RequestEntity (to include or exclude from request)
   */
  onDeleteRequest = (entity) => this.onDeleteSelection([entity])

  /** Callback: On delete requests for selection as parameter (shows corresponding dialog). Mode and selection are ignored (always all selected) */
  onAbort = () => this.onOpenActionDialog(DIALOG_TYPES.ABORT_DIALOG, [], TableSelectionModes.excludeSelected)

  /**
   * Inner callback: closes dialog corresponding to request type
   * @param {string} dialogRequestType dialog type for the request to handle, from OAISRequestManagerComponent.DIALOG_TYPES
   */
  onCloseActionDialog = (dialogRequestType) => this.setState({
    [dialogRequestType]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
  })

  /**
   * Inner callback: confirms action dialog. It:
   * - Hides corresponding dialog
   * - Converts payload to send server action
   * @param {string} dialogRequestType dialog type for the request to handle, from OAISRequestManagerComponent.DIALOG_TYPES
   * @return {*} payload for server action
   */
  onConfirmActionDialog = (dialogRequestType) => {
    const { bodyParameters } = this.props
    const { mode, entities } = this.state[dialogRequestType]
    this.onCloseActionDialog(dialogRequestType)
    return {
      ...bodyParameters,
      [IngestDomain.REQUEST_FILTER_PARAMS.REQUEST_IDS]: {
        [CommonDomain.REQUEST_PARAMETERS.VALUES]: map(entities, (e) => get(e, 'content.id', '')),
        [CommonDomain.REQUEST_PARAMETERS.MODE]: mode === TableSelectionModes.includeSelected ? TableSelectionModes.INCLUDE : TableSelectionModes.EXCLUDE,
      },
    }
  }

  onConfirm = (dialogRequestType, newVersioningMode) => {
    const {
      onDeleteRequests, onAbortRequests, paneType, onRetryRequests,
      onSelectVersionOption,
    } = this.props
    const payload = this.onConfirmActionDialog(dialogRequestType)
    switch (dialogRequestType) {
      case DIALOG_TYPES.ABORT_DIALOG:
        onAbortRequests()
        break
      case DIALOG_TYPES.DELETE_DIALOG:
        onDeleteRequests(payload, paneType, null)
        break
      case DIALOG_TYPES.RETRY_DIALOG:
        onRetryRequests(payload)
        break
      case DIALOG_TYPES.VERSION_OPTION_SELECTION_DIALOG:
        onSelectVersionOption({
          ...payload,
          newVersioningMode,
        })
        break
      default:
        console.error('Invalid dialog type', dialogRequestType)
    }
  }

  renderDialog = (dialogRequestType) => {
    const { open, entities, mode } = this.state[dialogRequestType]
    const { intl: { formatMessage } } = this.context
    const { pageMeta } = this.props
    if (open) {
      let component = null
      switch (dialogRequestType) {
        case DIALOG_TYPES.ERRORS_DIALOG:
          component = <CodeDisplayDialog // 1. errors
            displayedContent={get(this.state[DIALOG_TYPES.ERRORS_DIALOG].entities[0], 'content.errors', '')}
            title={formatMessage({ id: 'oais.aips.list.request.dialog.title' })}
            contentType={MIME_TYPES.JSON_MIME_TYPE}
            onClose={() => this.onCloseActionDialog(dialogRequestType)}
          />
          break
        case DIALOG_TYPES.VERSION_OPTION_SELECTION_DIALOG:
          component = <VersionOptionSelectionDialog // 2. version option selection
            selection={this.state[DIALOG_TYPES.VERSION_OPTION_SELECTION_DIALOG]}
            onClose={() => this.onCloseActionDialog(dialogRequestType)}
            onConfirm={(selectedVersionModeOption) => this.onConfirm(dialogRequestType, selectedVersionModeOption)}
            severalEntitiesSelected={CommonDomain.TableSelectionUtils.isSeveralEntitiesSelected(mode, entities, pageMeta)}
          />
          break
        case DIALOG_TYPES.RETRY_DIALOG:
          component = <RequestRetryDialog // 3. retry
            open={open}
            onConfirmRetry={() => this.onConfirm(dialogRequestType)}
            onClose={() => this.onCloseActionDialog(dialogRequestType)}
            severalEntitiesSelected={CommonDomain.TableSelectionUtils.isSeveralEntitiesSelected(mode, entities, pageMeta)}
          />
          break
        case DIALOG_TYPES.DELETE_DIALOG:
          component = <RequestDeleteDialog // 4. delete
            open={open}
            onConfirmDelete={() => this.onConfirm(dialogRequestType)}
            onClose={() => this.onCloseActionDialog(dialogRequestType)}
            severalEntitiesSelected={CommonDomain.TableSelectionUtils.isSeveralEntitiesSelected(mode, entities, pageMeta)}
          />
          break
        case DIALOG_TYPES.ABORT_DIALOG:
          component = <AbortAllRequestsDialog // 5. abort all
            open={open}
            onConfirmAbort={() => this.onConfirm(dialogRequestType)}
            onClose={() => this.onCloseActionDialog(dialogRequestType)}
          />
          break
        default:
      }
      return (component)
    }
    return null
  }

  render() {
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const {
      modeSelectionAllowed, pageSize, isLoading, requestParameters, bodyParameters, getColumnSortingData, onSort,
      paneType,
    } = this.props
    return (
      <div>
        <TableLayout>
          <TableHeaderLine>
            <HeaderActionsBarContainer
              paneType={paneType}
              onSelectVersionOption={this.onSelectVersionOption}
              onDelete={this.onDeleteSelection}
              onRetry={this.onRetrySelection}
              onAbort={this.onAbort}
            />
          </TableHeaderLine>
          <PageableInfiniteTableContainer
            name="request-management-table"
            pageActions={clientByPane[IngestDomain.REQUEST_TYPES_ENUM.REQUEST].actions}
            pageSelectors={clientByPane[IngestDomain.REQUEST_TYPES_ENUM.REQUEST].selectors}
            tableActions={clientByPane[IngestDomain.REQUEST_TYPES_ENUM.REQUEST].tableActions}
            pageSize={pageSize}
            minRowCount={minRowCount}
            maxRowCount={maxRowCount}
            // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
            columns={[ // eslint wont fix: API issue
              new TableColumnBuilder()
                .selectionColumn(true, clientByPane[IngestDomain.REQUEST_TYPES_ENUM.REQUEST].selectors, clientByPane[IngestDomain.REQUEST_TYPES_ENUM.REQUEST].tableActions, clientByPane[IngestDomain.REQUEST_TYPES_ENUM.REQUEST].tableSelectors)
                .build(),
              new TableColumnBuilder(REQUESTS_COLUMN_KEYS.ID).titleHeaderCell().propertyRenderCell('content.providerId')
                .label(formatMessage({ id: 'oais.requests.list.filters.providerId' }))
                .sortableHeaderCell(...getColumnSortingData(REQUESTS_COLUMN_KEYS.ID), onSort)
                .build(),
              new TableColumnBuilder(REQUESTS_COLUMN_KEYS.TYPE).titleHeaderCell()
                .propertyRenderCell('content.dtype', RequestTypeRenderCell)
                .label(formatMessage({ id: 'oais.requests.list.filters.requestType.label' }))
                .sortableHeaderCell(...getColumnSortingData(REQUESTS_COLUMN_KEYS.TYPE), onSort)
                .build(),
              new TableColumnBuilder(REQUESTS_COLUMN_KEYS.STATE).titleHeaderCell()
                .rowCellDefinition({
                  Constructor: RequestStatusRenderCell,
                  props: {
                    modeSelectionAllowed,
                    onViewRequestErrors: this.onViewRequestErrors,
                    onSelectVersionOption: this.onSelectVersionOption,
                  },
                })
                .label(formatMessage({ id: 'oais.list.filters.requestState.label' }))
                .sortableHeaderCell(...getColumnSortingData(REQUESTS_COLUMN_KEYS.STATE), onSort)
                .build(),
              new TableColumnBuilder(REQUESTS_COLUMN_KEYS.LASTSUBMITTED).titleHeaderCell().propertyRenderCell('content.creationDate', DateValueRender)
                .label(formatMessage({ id: 'oais.requests.list.filters.lastSubmission' }))
                .sortableHeaderCell(...getColumnSortingData(REQUESTS_COLUMN_KEYS.LASTSUBMITTED), onSort)
                .build(),
              new TableColumnBuilder(REQUESTS_COLUMN_KEYS.ACTIONS).titleHeaderCell()
                .label(formatMessage({ id: 'oais.requests.list.filters.actions' }))
                .optionsColumn([
                  {
                    OptionConstructor: RequestRetryOption,
                    optionProps: { onRetry: this.onRetryRequest },
                  },
                  {
                    OptionConstructor: RequestDeleteOption,
                    optionProps: { onDelete: this.onDeleteRequest },
                  }])
                .build(),
            ]}
            requestParams={requestParameters}
            bodyParams={bodyParameters}
            emptyComponent={isLoading ? OAISRequestManagerComponent.LOADING_COMPONENT : OAISRequestManagerComponent.EMPTY_COMPONENT}
            fetchUsingPostMethod
          />
        </TableLayout>
        {this.renderDialog(DIALOG_TYPES.ERRORS_DIALOG)}
        {this.renderDialog(DIALOG_TYPES.VERSION_OPTION_SELECTION_DIALOG)}
        {this.renderDialog(DIALOG_TYPES.RETRY_DIALOG)}
        {this.renderDialog(DIALOG_TYPES.DELETE_DIALOG)}
        {this.renderDialog(DIALOG_TYPES.ABORT_DIALOG)}
      </div>
    )
  }
}

export default withSortTables(REQUESTS_COLUMN_KEYS)(withModuleStyle(styles)(withI18n(messages)(OAISRequestManagerComponent)))
