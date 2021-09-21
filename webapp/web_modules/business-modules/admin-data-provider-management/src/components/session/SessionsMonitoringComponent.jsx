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
import get from 'lodash/get'
import noop from 'lodash/noop'
import identity from 'lodash/identity'
import FlatButton from 'material-ui/FlatButton'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import PageView from 'mdi-material-ui/CardSearch'
import NoSessionIcon from 'mdi-material-ui/CropFree'
import RaisedButton from 'material-ui/RaisedButton'
import { CommonDomain, AccessDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  PageableInfiniteTableContainer, TableColumnBuilder, TableLayout, NoContentComponent, CardActionsComponent, Breadcrumb,
  PositionedDialog, ConfirmDialogComponent, ConfirmDialogComponentTypes,
} from '@regardsoss/components'
import { sessionsActions, sessionsSelectors } from '../../clients/session/SessionsClient'
import { SessionsMonitoringSourceRenderer } from './render/SessionsMonitoringSourceRenderer'
import { SessionsMonitoringSessionRenderer } from './render/SessionsMonitoringSessionRenderer'
import { SessionsMonitoringCreationDateRenderer } from './render/SessionsMonitoringCreationDateRenderer'
import { SessionsMonitoringStateRenderer } from './render/SessionsMonitoringStateRenderer'
import SessionsMonitoringProductsGeneratedRenderer from './render/SessionsMonitoringProductsGeneratedRenderer'
import SessionsMonitoringProductsStoredRenderer from './render/SessionsMonitoringProductsStoredRenderer'
import { SessionsMonitoringIndexedRenderer } from './render/SessionsMonitoringIndexedRenderer'
import { SessionsMonitoringFiltersComponent } from './SessionsMonitoringFiltersComponent'
import { SessionsMonitoringLastModificationRenderer } from './render/SessionsMonitoringLastModificationRenderer'
import ProductsComponent from '../product/ProductsComponent'
import SessionDeleteDialogComponent from './SessionDeleteDialogComponent'
import SessionsMonitoringVersionRenderer from './render/SessionsMonitoringVersionRenderer'

export class SessionsMonitoringComponent extends React.Component {
  static propTypes = {
    availableDependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    columnsSorting: PropTypes.arrayOf(PropTypes.shape({
      columnKey: PropTypes.string,
      order: PropTypes.oneOf(CommonDomain.SORT_ORDERS),
    })).isRequired,
    requestParameters: PropTypes.objectOf(PropTypes.array).isRequired,
    onBack: PropTypes.func.isRequired,
    onAcknowledge: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    initialFilters: PropTypes.shape({
      source: PropTypes.string,
      session: PropTypes.string,
      lastSessionOnly: PropTypes.bool.isRequired,
      errorsOnly: PropTypes.bool.isRequired,
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date),
    }).isRequired,
    onApplyFilters: PropTypes.func.isRequired, // () => ()
    onClearFilters: PropTypes.func.isRequired, // () => ()
    filtersEdited: PropTypes.bool.isRequired,
    canEmptyFilters: PropTypes.bool.isRequired,
    onToggleErrorsOnly: PropTypes.func.isRequired,
    onToggleLastSession: PropTypes.func.isRequired,
    onChangeFrom: PropTypes.func.isRequired,
    onChangeTo: PropTypes.func.isRequired,
    onChangeSource: PropTypes.func.isRequired,
    onChangeSession: PropTypes.func.isRequired,
    onChangeColumnsVisibility: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onGoToDatasources: PropTypes.func.isRequired,
    // columns visibility, like (string: columnKey):(boolean: column visible)
    columnsVisibility: PropTypes.objectOf(PropTypes.bool).isRequired,

    // Sessions action menu items
    onDeleteSession: PropTypes.func.isRequired,
    onRelaunchProducts: PropTypes.func.isRequired,
    onViewProductsOAIS: PropTypes.func.isRequired,
    onViewRequestsOAIS: PropTypes.func.isRequired,
    onRelaunchProductsOAIS: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static EMPTY_COMPONENT = <NoContentComponent
    titleKey="acquisition-sessions.empty-response"
    Icon={NoSessionIcon}
  />

  static PAGE_SIZE = 100

  static SORTABLE_COLUMNS = {
    SOURCE: 'column.source',
    NAME: 'column.name',
    STATE: 'column.state',
    LAST_UPDATE: 'column.lastUpdateDate',
  }

  static UNSORTABLE_COLUMNS = {
    CREATION_DATE: 'column.creationDate',
    PRODUCTS: 'column.products',
    SIP: 'column.sip',
    AIP_GENERATED: 'column.aip-generated',
    VERSION: 'column.version',
    AIP_STORED: 'column.aip-stored',
    INDEXED: 'column.indexed',
  }

  static ACQUISITION_REFRESH_BUTTON_STYLE = {
    margin: 5,
  }

  static getColumnSortingData(columnsSorting, columnKey) {
    const foundColumnIndex = columnsSorting.findIndex(({ columnKey: localColumnKey }) => localColumnKey === columnKey)
    return foundColumnIndex === -1 ? [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null] : [columnsSorting[foundColumnIndex].order, foundColumnIndex]
  }

  state = {
    sessionToAcknowledge: null,
    sessionToDelete: null,
    sessionToDisplayProducts: {
      session: null,
      isError: true,
      isIncomplete: false,
    },
  }

  renderBreadCrump = () => {
    const { intl: { formatMessage } } = this.context
    // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
    const elements = [formatMessage({ id: 'acquisition-sessions.title' })] // eslint should fix: wrong design
    return (
      <Breadcrumb
        rootIcon={<PageView />}
        elements={elements}
        labelGenerator={identity}
        onAction={noop}
      />
    )
  }

  /**
  * Show acknowledge confirm dialog
  * @param sessionToAcknowledge : session to acknowledge
  */
  onShowAcknowledge = (sessionToAcknowledge) => {
    this.setState({ sessionToAcknowledge })
  }

  /**
  * Close acknowledge confirm dialog
  */
  onCloseAcknowledge = () => {
    this.setState({ sessionToAcknowledge: null })
  }

  /**
  * Show acknowledge confirm dialog
  * @param sessionToAcknowledge : session to acknowledge
  */
  onShowDeleteConfirm = (sessionToDelete) => {
    this.setState({ sessionToDelete })
  }

  onCloseDeleteConfirm = () => {
    this.setState({ sessionToDelete: null })
  }

  onConfirmDelete = () => {
    const { sessionToDelete } = this.state
    const { onDeleteSession } = this.props
    if (get(sessionToDelete, 'content.id')) {
      onDeleteSession(sessionToDelete.content.id, false)
    }
    this.onCloseDeleteConfirm()
  }

  onConfirmDeleteForce = () => {
    const { sessionToDelete } = this.state
    const { onDeleteSession } = this.props
    if (get(sessionToDelete, 'content.id')) {
      onDeleteSession(sessionToDelete.content.id, true)
    }
    this.onCloseDeleteConfirm()
  }

  /**
  * Confirm dialog call action to update state
  */
  onConfirmAcknowledge = () => {
    const { sessionToAcknowledge } = this.state
    const { onAcknowledge } = this.props
    if (get(sessionToAcknowledge, 'content.id')) {
      onAcknowledge(sessionToAcknowledge.content.id)
    }
    this.onCloseAcknowledge()
  }

  onSwitchProductsDialog = (entity = null, isError = true, isInvalid = false, isIncomplet = false) => {
    this.setState({
      sessionToDisplayProducts: {
        session: entity, isError, isInvalid, isIncomplet,
      },
    })
  }

  onCloseDialog = () => {
    this.setState({
      sessionToDisplayProducts: {
        session: null,
        isError: true,
        isIncomplete: false,
      },
    })
  }

  renderShowProductsDialog() {
    const { intl: { formatMessage } } = this.context
    const {
      sessionToDisplayProducts: {
        session, isError, isInvalid, isIncomplet,
      },
    } = this.state
    const sipStates = isError ? ProductsComponent.ERROR_SIP_STATES : []
    const productStates = isIncomplet ? ProductsComponent.INCOMPLETE_STATES : []
    if (isInvalid) {
      productStates.push(ProductsComponent.PRODUCT_INVALID_STATES)
    }
    const values = {
      source: get(session, 'content.source'),
      session: get(session, 'content.name'),
    }
    const title = isError ? formatMessage({ id: 'acquisition-sessions.menus.products.list.title.error' }, values) : formatMessage({ id: 'acquisition-sessions.menus.products.list.title.incomplete' }, values)
    const helpMessage = isError ? formatMessage({ id: 'acquisition-sessions.menus.products.list.help.error' }) : formatMessage({ id: 'acquisition-sessions.menus.products.list.help.incomplete' })
    return (
      <PositionedDialog
        title={title}
        open={!!session}
        actions={<>
          <FlatButton
            key="close"
            label="close"
            onClick={this.onCloseDialog}
          />
        </>}
        dialogHeightPercent={75}
        dialogWidthPercent={75}
      >
        <ProductsComponent
          session={session}
          sipStates={sipStates}
          productStates={productStates}
          title={title}
          helpMessage={helpMessage}
        />
      </PositionedDialog>
    )
  }

  renderDeleteDialog() {
    const { intl: { formatMessage } } = this.context
    const { sessionToDelete } = this.state
    const titleParameters = {
      source: get(sessionToDelete, 'content.source', 'undefined'),
      name: get(sessionToDelete, 'content.name', 'undefined'),
    }
    const title = formatMessage({ id: 'acquisition-sessions.menus.session.delete.dialog.title' }, titleParameters)
    const message = formatMessage({ id: 'acquisition-sessions.menus.session.delete.dialog.message' })
    const allowForceOption = get(sessionToDelete, 'content.state', 'undefined') === AccessDomain.SESSION_STATUS_ENUM.DELETED
    return (<SessionDeleteDialogComponent
      title={title}
      message={message}
      allowForceOption={allowForceOption}
      onDelete={this.onConfirmDelete}
      onForceDelete={this.onConfirmDeleteForce}
      onClose={this.onCloseDeleteConfirm}
      open={!!sessionToDelete}
    />)
  }

  render() {
    const { intl: { formatMessage }, muiTheme: { sessionsMonitoring: { rowHeight }, components: { infiniteTable: { admin: { minRowCount } } } } } = this.context
    const {
      availableDependencies, columnsSorting, initialFilters, filtersEdited,
      requestParameters, columnsVisibility, canEmptyFilters,
      onBack, onSort, onApplyFilters, onClearFilters,
      onToggleErrorsOnly, onToggleLastSession, onChangeFrom, onChangeTo,
      onChangeSource, onChangeSession, onChangeColumnsVisibility, onDeleteSession,
      onViewProductsOAIS, onRelaunchProductsOAIS, onViewRequestsOAIS, onRelaunchProducts,
      onGoToDatasources,
    } = this.props
    const { sessionToAcknowledge } = this.state
    // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
    const columns = [ // eslint wont fix: Major API rework required here
      new TableColumnBuilder(SessionsMonitoringComponent.SORTABLE_COLUMNS.SOURCE)
        .visible(get(columnsVisibility, SessionsMonitoringComponent.SORTABLE_COLUMNS.SOURCE, true))
        .sortableHeaderCell(...SessionsMonitoringComponent.getColumnSortingData(columnsSorting, SessionsMonitoringComponent.SORTABLE_COLUMNS.SOURCE), onSort)
        .rowCellDefinition({ Constructor: SessionsMonitoringSourceRenderer })
        .label(formatMessage({ id: 'acquisition-sessions.table.source' }))
        .build(),
      new TableColumnBuilder(SessionsMonitoringComponent.SORTABLE_COLUMNS.NAME)
        .visible(get(columnsVisibility, SessionsMonitoringComponent.SORTABLE_COLUMNS.NAME, true))
        .sortableHeaderCell(...SessionsMonitoringComponent.getColumnSortingData(columnsSorting, SessionsMonitoringComponent.SORTABLE_COLUMNS.NAME), onSort)
        .rowCellDefinition({
          Constructor: SessionsMonitoringSessionRenderer,
          props: {
            availableDependencies,
            onDeleteSession,
            onShowAcknowledge: this.onShowAcknowledge,
            onShowDeleteConfirm: this.onShowDeleteConfirm,
          },
        })
        .label(formatMessage({ id: 'acquisition-sessions.table.name' }))
        .build(),
      new TableColumnBuilder(SessionsMonitoringComponent.SORTABLE_COLUMNS.LAST_UPDATE)
        .visible(get(columnsVisibility, SessionsMonitoringComponent.SORTABLE_COLUMNS.LAST_UPDATE, true))
        .optionsSizing(3)
        .titleHeaderCell()
        .sortableHeaderCell(...SessionsMonitoringComponent.getColumnSortingData(columnsSorting, SessionsMonitoringComponent.SORTABLE_COLUMNS.LAST_UPDATE), onSort)
        .rowCellDefinition({ Constructor: SessionsMonitoringLastModificationRenderer })
        .label(formatMessage({ id: 'acquisition-sessions.table.last-modification' }))
        .build(),
      new TableColumnBuilder(SessionsMonitoringComponent.SORTABLE_COLUMNS.STATE)
        .visible(get(columnsVisibility, SessionsMonitoringComponent.SORTABLE_COLUMNS.STATE, false))
        .optionsSizing(2)
        .sortableHeaderCell(...SessionsMonitoringComponent.getColumnSortingData(columnsSorting, SessionsMonitoringComponent.SORTABLE_COLUMNS.STATE), onSort)
        .rowCellDefinition({ Constructor: SessionsMonitoringStateRenderer })
        .label(formatMessage({ id: 'acquisition-sessions.table.state' }))
        .build(),
      new TableColumnBuilder(SessionsMonitoringComponent.UNSORTABLE_COLUMNS.PRODUCTS)
        .visible(get(columnsVisibility, SessionsMonitoringComponent.UNSORTABLE_COLUMNS.PRODUCTS, true))
        .titleHeaderCell(formatMessage({ id: 'acquisition-sessions.table.sip-generated.tooltip' }))
        .rowCellDefinition({
          Constructor: SessionsMonitoringProductsGeneratedRenderer,
          props: {
            availableDependencies,
            onRelaunchProducts,
            onShowProducts: this.onSwitchProductsDialog,
          },
        })
        .label(formatMessage({ id: 'acquisition-sessions.table.sip-generated' }))
        .build(),
      new TableColumnBuilder(SessionsMonitoringComponent.UNSORTABLE_COLUMNS.AIP_STORED)
        .visible(get(columnsVisibility, SessionsMonitoringComponent.UNSORTABLE_COLUMNS.AIP_STORED, true))
        .titleHeaderCell(formatMessage({ id: 'acquisition-sessions.table.version.tooltip' }))
        .rowCellDefinition({
          Constructor: SessionsMonitoringVersionRenderer,
          props: {
            availableDependencies,
            onViewRequestsOAIS,
          },
        })
        .label(formatMessage({ id: 'acquisition-sessions.table.version' }))
        .build(),
      new TableColumnBuilder(SessionsMonitoringComponent.UNSORTABLE_COLUMNS.VERSION)
        .visible(get(columnsVisibility, SessionsMonitoringComponent.UNSORTABLE_COLUMNS.VERSION, true))
        .titleHeaderCell(formatMessage({ id: 'acquisition-sessions.table.aip-stored.tooltip' }))
        .rowCellDefinition({
          Constructor: SessionsMonitoringProductsStoredRenderer,
          props: {
            availableDependencies,
            onRelaunchProductsOAIS,
            onViewProductsOAIS,
            onViewRequestsOAIS,
          },
        })
        .label(formatMessage({ id: 'acquisition-sessions.table.aip-stored' }))
        .build(),
      new TableColumnBuilder(SessionsMonitoringComponent.UNSORTABLE_COLUMNS.INDEXED)
        .visible(get(columnsVisibility, SessionsMonitoringComponent.UNSORTABLE_COLUMNS.INDEXED, true))
        .titleHeaderCell(formatMessage({ id: 'acquisition-sessions.table.indexed.tooltip' }))
        .rowCellDefinition({
          Constructor: SessionsMonitoringIndexedRenderer,
          props: {
            availableDependencies,
            onGoToDatasources,
          },
        })
        .label(formatMessage({ id: 'acquisition-sessions.table.indexed' }))
        .build(),
      new TableColumnBuilder(SessionsMonitoringComponent.UNSORTABLE_COLUMNS.CREATION_DATE)
        .visible(get(columnsVisibility, SessionsMonitoringComponent.UNSORTABLE_COLUMNS.CREATION_DATE, false))
        .optionsSizing(2)
        .titleHeaderCell()
        .rowCellDefinition({ Constructor: SessionsMonitoringCreationDateRenderer })
        .label(formatMessage({ id: 'acquisition-sessions.table.creation-date' }))
        .build(),
    ]

    return (
      <Card>
        {this.renderDeleteDialog()}
        {this.renderShowProductsDialog()}
        <CardTitle
          title={this.renderBreadCrump()}
          subtitle={formatMessage({ id: 'acquisition-sessions.subtitle' })}
        />
        <CardText>
          <ConfirmDialogComponent
            dialogType={ConfirmDialogComponentTypes.CONFIRM}
            title={formatMessage({ id: 'acquisition-sessions.states.acknowledge' })}
            onConfirm={this.onConfirmAcknowledge}
            onClose={this.onCloseAcknowledge}
            open={!!sessionToAcknowledge}
          />
          <RaisedButton
            label={formatMessage({ id: 'acquisition-sessions.refresh.button' })}
            onClick={this.props.onRefresh}
            primary
            style={SessionsMonitoringComponent.ACQUISITION_REFRESH_BUTTON_STYLE}
          />
          <TableLayout>
            <SessionsMonitoringFiltersComponent
              initialFilters={initialFilters}
              onApplyFilters={onApplyFilters}
              onClearFilters={onClearFilters}
              onChangeSource={onChangeSource}
              onChangeSession={onChangeSession}
              onToggleErrorsOnly={onToggleErrorsOnly}
              onToggleLastSession={onToggleLastSession}
              onChangeFrom={onChangeFrom}
              onChangeTo={onChangeTo}
              filtersEdited={filtersEdited}
              canEmptyFilters={canEmptyFilters}
              onChangeColumnsVisibility={onChangeColumnsVisibility}
              columns={columns}
            />
            {/* Loading, results and refresh button */}
            <PageableInfiniteTableContainer
              pageActions={sessionsActions}
              pageSelectors={sessionsSelectors}
              requestParams={requestParameters}
              columns={columns}
              emptyComponent={SessionsMonitoringComponent.EMPTY_COMPONENT}
              minRowCount={minRowCount}
              maxRowCount={4}
              queryPageSize={SessionsMonitoringComponent.PAGE_SIZE}
              lineHeight={rowHeight}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonClick={onBack}
            mainButtonLabel={formatMessage({ id: 'acquisition-sessions.back.button' })}
          />
        </CardActions>
      </Card>
    )
  }
}
