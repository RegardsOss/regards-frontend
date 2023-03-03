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
import map from 'lodash/map'
import NoContentIcon from 'mdi-material-ui/CropFree'
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import {
  TableLayout, TableColumnBuilder, PageableInfiniteTableContainer,
  DateValueRender, NoContentComponent, TableHeaderLine, TableSelectionModes, InformationDialogComponent,
  TableHeaderLoadingComponent, TableFilterSortingAndVisibilityContainer,
  withSortTables, CodeDisplayDialog,
} from '@regardsoss/components'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { MIME_TYPES } from '@regardsoss/mime-types'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { FemDomain } from '@regardsoss/domain'
import DeleteDialog from './options/DeleteDialog'
import clientByPane from '../domain/ClientByPane'
import RetryDialog from './options/RetryDialog'
import RequestDeleteOption from './options/RequestDeleteOption'
import RequestRetryOption from './options/RequestRetryOption'
import StatusRender from './render/StatusRender'
import HeaderActionsBarContainer from '../containers/HeaderActionsBarContainer'
import { DIALOG_TYPES } from '../domain/dialogTypes'
import messages from '../i18n'
import styles from '../styles'

/**
  * Displays the list of request
  * @author Théo Lasserre
  */

export const REQUESTS_COLUMN_KEYS = {
  PROVIDER_ID: 'providerId',
  REGISTRATION_DATE: 'registrationDate',
  STATE: 'state',
  ACTIONS: 'actions',
}
export class RequestManagerComponent extends React.Component {
  static propTypes = {
    onDeleteRequests: PropTypes.func.isRequired,
    onRetryRequests: PropTypes.func.isRequired,
    paneType: PropTypes.oneOf(FemDomain.REQUEST_TYPES).isRequired,
    isFetching: PropTypes.bool.isRequired,
    pageSize: PropTypes.number,

    // table sorting, column visiblity & filters management
    requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    bodyParameters: TableFilterSortingAndVisibilityContainer.BODY_PARAMETERS_PROP_TYPE,
    getColumnSortingData: PropTypes.func,
    onSort: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static EMPTY_COMPONENT = <NoContentComponent
    titleKey="feature.requests.empty.results"
    Icon={NoContentIcon}
  />

  static LOADING_COMPONENT = <NoContentComponent
    titleKey="feature.requests.loading.results"
    Icon={SearchIcon}
  />

  static SELECTION_MODE = {
    INCLUDE: 'INCLUDE',
    EXCLUDE: 'EXCLUDE',
  }

  state = {
    [DIALOG_TYPES.RETRY_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [], // included or excluded depending on mode
    },
    [DIALOG_TYPES.DELETE_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [], // included or excluded depending on mode
    },
    [DIALOG_TYPES.CONFIRM_DELETE_DIALOG]: {
      open: false,
      payload: null,
      isLoading: true, // response time can be a little long for a group deletion. We display a loading until we receive payload
    },
    [DIALOG_TYPES.CONFIRM_RETRY_DIALOG]: {
      open: false,
      payload: null,
      isLoading: true, // response time can be a little long for a group retry. We display a loading until we receive payload
    },
    [DIALOG_TYPES.ERRORS_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [], // included or excluded depending on mode
    },
  }

  /**
   * Inner callback: Opens dialog corresopnding to request type
   * @param {string} dialogRequestType dialog type for the request to handle, from DIALOG_TYPES
   * @param {[*]} entities entities as an array of IngestShapes.RequestEntity (to include or exclude from request)
   */
  onOpenActionDialog = (dialogRequestType, mode = TableSelectionModes.includeSelected, entities = null) => this.setState({
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
  onViewRequestErrors = (entity) => this.onOpenActionDialog(DIALOG_TYPES.ERRORS_DIALOG, TableSelectionModes.includeSelected, [entity])

  /**
   * Callback: On retry requests for selection as parameter (shows corresponding dialog)
   * @param {[*]} entities entities as an array of IngestShapes.RequestEntity (to include or exclude from request)
   */
  onRetrySelection = (entities, mode) => this.onOpenActionDialog(DIALOG_TYPES.RETRY_DIALOG, mode, entities)

  /**
   * Callback: On retry requests for selection as parameter (shows corresponding dialog)
   * @param {*} entity entity of IngestShapes.RequestEntity (to include or exclude from request)
   */
  onRetryRequest = (entity) => this.onRetrySelection([entity])

  /**
   * Callback: On delete requests for selection as parameter (shows corresponding dialog)
   * @param {[*]} entities entities as an array of IngestShapes.RequestEntity (to include or exclude from request)
   */
  onDeleteSelection = (entities, mode) => this.onOpenActionDialog(DIALOG_TYPES.DELETE_DIALOG, mode, entities)

  /**
   * Callback: On delete selected request
   * @param {*} entity entity of IngestShapes.RequestEntity (to include or exclude from request)
   */
  onDeleteRequest = (entity) => this.onDeleteSelection([entity])

  /**
   * Inner callback: closes dialog corresponding to request type
   * @param {string} dialogRequestType dialog type for the request to handle, from DIALOG_TYPES
   */
  onCloseActionDialog = (dialogRequestType) => this.setState({
    [dialogRequestType]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
      isLoading: true, // used only by confirm retry & confirm delete dialogs
    },
  })

  /**
   * Inner callback: confirms action dialog. It:
   * - Hides corresponding dialog
   * - Converts payload to send server action
   * @param {string} dialogRequestType dialog type for the request to handle, from DIALOG_TYPES
   * @return {*} payload for server action
   */
  onConfirmActionDialog = (dialogRequestType) => {
    const { bodyParameters } = this.props
    const { mode, entities } = this.state[dialogRequestType]
    this.onCloseActionDialog(dialogRequestType)
    const requestIds = map(entities, (e) => get(e, 'content.id', ''))
    const filterMode = mode === TableSelectionModes.includeSelected ? TableSelectionModes.INCLUDE : TableSelectionModes.EXCLUDE
    return {
      ...bodyParameters,
      ...FemDomain.RequestFilters.builder().withRequestIds(requestIds, filterMode).build(),
    }
  }

  /** User callback: retry or delete confirmed */
  onConfirm = (dialogType) => {
    const {
      onRetryRequests, onDeleteRequests, paneType,
    } = this.props
    const payload = this.onConfirmActionDialog(dialogType)
    let confirmDialogType
    let functionToCall
    switch (dialogType) {
      case DIALOG_TYPES.RETRY_DIALOG:
        confirmDialogType = DIALOG_TYPES.CONFIRM_RETRY_DIALOG
        functionToCall = onRetryRequests
        break
      case DIALOG_TYPES.DELETE_DIALOG:
      default:
        confirmDialogType = DIALOG_TYPES.CONFIRM_DELETE_DIALOG
        functionToCall = onDeleteRequests
    }
    this.onOpenActionDialog(confirmDialogType)
    functionToCall(payload, paneType, () => { }).then((actionResult) => {
      if (!actionResult.error) {
        this.setState({
          [confirmDialogType]: {
            open: true,
            isLoading: false,
            payload: actionResult.payload,
          },
        })
      }
    })
  }

  renderConfirmDialog = (dialogType) => {
    const { intl: { formatMessage } } = this.context
    const { open, isLoading, payload } = this.state[dialogType]
    if (open) {
      const totalHandled = payload && payload.totalHandled ? payload.totalHandled : 0
      const totalRequested = payload && payload.totalRequested ? payload.totalRequested : 0
      return (
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          <InformationDialogComponent
            title={formatMessage({ id: `feature.requests.${dialogType}.title` })}
            message={totalHandled === totalRequested
              ? formatMessage({ id: `feature.requests.${dialogType}.message.ok` })
              : formatMessage({ id: `feature.requests.${dialogType}.message.not-ok` }, { totalHandled })}
            onClose={() => this.onCloseActionDialog(dialogType)}
          />
        </LoadableContentDisplayDecorator>
      )
    }
    return null
  }

  renderDialog = (dialogType) => {
    const { intl: { formatMessage } } = this.context
    const { open } = this.state[dialogType]
    if (open) {
      let component = null
      switch (dialogType) {
        case DIALOG_TYPES.DELETE_DIALOG:
          component = <DeleteDialog
            onConfirmDelete={() => this.onConfirm(DIALOG_TYPES.DELETE_DIALOG)}
            onClose={() => this.onCloseActionDialog(dialogType)}
          />
          break
        case DIALOG_TYPES.RETRY_DIALOG:
          component = <RetryDialog
            onConfirmRetry={() => this.onConfirm(DIALOG_TYPES.RETRY_DIALOG)}
            onClose={() => this.onCloseActionDialog(dialogType)}
          />
          break
        case DIALOG_TYPES.ERRORS_DIALOG:
          component = <CodeDisplayDialog
            displayedContent={get(this.state[DIALOG_TYPES.ERRORS_DIALOG].entities[0], 'content.errors', '')}
            title={formatMessage({ id: 'feature.request.error.title' })}
            contentType={MIME_TYPES.JSON_MIME_TYPE}
            onClose={() => this.onCloseActionDialog(dialogType)}
          />
          break
        default:
      }
      return (component)
    }
    return null
  }

  render() {
    const { intl: { formatMessage }, muiTheme, moduleTheme: { tableStyle: { loadingStyle } } } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const {
      pageSize, getColumnSortingData, paneType, onSort, requestParameters,
      isFetching, bodyParameters,
    } = this.props
    return (
      <div>
        <TableLayout>
          <TableHeaderLine>
            <HeaderActionsBarContainer
              paneType={paneType}
              onRetry={this.onRetrySelection}
              onDelete={this.onDeleteSelection}
            />
          </TableHeaderLine>
          <div style={loadingStyle}>
            <TableHeaderLoadingComponent loading={isFetching} />
          </div>
          <PageableInfiniteTableContainer
            name="request-management-table"
            pageActions={clientByPane[paneType].actions}
            pageSelectors={clientByPane[paneType].selectors}
            tableActions={clientByPane[paneType].tableActions}
            pageSize={pageSize}
            minRowCount={minRowCount}
            maxRowCount={maxRowCount}
            // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
            columns={[ // eslint wont fix: API issue
              new TableColumnBuilder()
                .selectionColumn(true, clientByPane[paneType].selectors, clientByPane[paneType].tableActions, clientByPane[paneType].tableSelectors)
                .build(),
              new TableColumnBuilder(REQUESTS_COLUMN_KEYS.PROVIDER_ID).titleHeaderCell()
                .propertyRenderCell('content.providerId')
                .label(formatMessage({ id: 'feature.requests.list.filters.providerId' }))
                .build(),
              new TableColumnBuilder(REQUESTS_COLUMN_KEYS.REGISTRATION_DATE).titleHeaderCell()
                .propertyRenderCell('content.registrationDate', DateValueRender)
                .label(formatMessage({ id: 'feature.requests.list.filters.lastSubmission' }))
                .sortableHeaderCell(...getColumnSortingData(REQUESTS_COLUMN_KEYS.REGISTRATION_DATE), onSort)
                .build(),
              new TableColumnBuilder(REQUESTS_COLUMN_KEYS.STATE)
                .label(formatMessage({ id: 'feature.list.filters.state.label' }))
                .sortableHeaderCell(...getColumnSortingData(REQUESTS_COLUMN_KEYS.STATE), onSort)
                .rowCellDefinition({ Constructor: StatusRender, props: { onViewRequestErrors: this.onViewRequestErrors } })
                .build(),
              new TableColumnBuilder(REQUESTS_COLUMN_KEYS.ACTIONS).titleHeaderCell()
                .label(formatMessage({ id: 'feature.requests.list.filters.actions' }))
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
            fetchUsingPostMethod
            pathParams={{ type: paneType }}
            emptyComponent={isFetching ? RequestManagerComponent.LOADING_COMPONENT : RequestManagerComponent.EMPTY_COMPONENT}
          />
        </TableLayout>
        {this.renderDialog(DIALOG_TYPES.DELETE_DIALOG)}
        {this.renderDialog(DIALOG_TYPES.RETRY_DIALOG)}
        {this.renderDialog(DIALOG_TYPES.ERRORS_DIALOG)}
        {this.renderConfirmDialog(DIALOG_TYPES.CONFIRM_DELETE_DIALOG)}
        {this.renderConfirmDialog(DIALOG_TYPES.CONFIRM_RETRY_DIALOG)}
      </div>
    )
  }
}

export default withSortTables(REQUESTS_COLUMN_KEYS)(withModuleStyle(styles)(withI18n(messages)(RequestManagerComponent)))
