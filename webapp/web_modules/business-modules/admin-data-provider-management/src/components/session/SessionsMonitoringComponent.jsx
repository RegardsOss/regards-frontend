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

import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import PageView from 'material-ui/svg-icons/action/pageview'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { CommonDomain } from '@regardsoss/domain'
import {
  PageableInfiniteTableContainer, TableColumnBuilder, TableLayout, TableHeaderLineLoadingAndResults,
  ConfirmDialogComponentTypes, ConfirmDialogComponent, CardActionsComponent, FormErrorMessage, Breadcrumb,
} from '@regardsoss/components'
import { sessionsActions, sessionsSelectors } from '../../clients/session/SessionsClient'
import { SessionsMonitoringSourceRenderer } from './render/SessionsMonitoringSourceRenderer'
import { SessionsMonitoringSessionRenderer } from './render/SessionsMonitoringSessionRenderer'
import { SessionsMonitoringCreationDateRenderer } from './render/SessionsMonitoringCreationDateRenderer'
import { SessionsMonitoringStateRenderer } from './render/SessionsMonitoringStateRenderer'
import SessionsMonitoringProductsGeneratedRenderer from './render/SessionsMonitoringProductsGeneratedRenderer'
import SessionsMonitoringProductsIngestedRenderer from './render/SessionsMonitoringProductsIngestedRenderer'
import SessionsMonitoringProductsStoredRenderer from './render/SessionsMonitoringProductsStoredRenderer'
import { SessionsMonitoringGeneratedAipRenderer } from './render/SessionsMonitoringGeneratedAipRenderer'
import { SessionsMonitoringIndexedRenderer } from './render/SessionsMonitoringIndexedRenderer'
import { SessionsEmptyComponent } from './SessionsEmptyComponent'
import { SessionsMonitoringFiltersComponent } from './SessionsMonitoringFiltersComponent'
import { SessionsMonitoringLastModificationRenderer } from './render/SessionsMonitoringLastModificationRenderer'

export class SessionsMonitoringComponent extends React.Component {
  static propTypes = {
    columnsSorting: PropTypes.arrayOf(PropTypes.shape({
      columnKey: PropTypes.string,
      order: PropTypes.oneOf(CommonDomain.SORT_ORDERS),
    })).isRequired,
    requestParameters: PropTypes.objectOf(PropTypes.array).isRequired,
    onBack: PropTypes.func.isRequired,
    onAcknowledge: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    initialFilters: PropTypes.shape({
      source: PropTypes.string.isRequired,
      session: PropTypes.string.isRequired,
      lastSessionOnly: PropTypes.bool.isRequired,
      errorsOnly: PropTypes.bool.isRequired,
      from: PropTypes.date,
      to: PropTypes.date,
    }).isRequired,
    onApplyFilters: PropTypes.func.isRequired, // () => ()
    onClearFilters: PropTypes.func.isRequired, // () => ()
    filtersEdited: PropTypes.bool.isRequired,
    onToggleErrorsOnly: PropTypes.func.isRequired,
    onToggleLastSession: PropTypes.func.isRequired,
    onChangeFrom: PropTypes.func.isRequired,
    onChangeTo: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static PAGE_SIZE = 100

  static SORTABLE_COLUMNS = {
    SOURCE: 'column.source',
    NAME: 'column.name',
    CREATION_DATE: 'column.creationDate',
    STATE: 'column.state',
  }

  static getColumnSortingData(columnsSorting, columnKey) {
    const foundColumnIndex = columnsSorting.findIndex(({ columnKey: localColumnKey }) => localColumnKey === columnKey)
    return foundColumnIndex === -1 ? [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null] : [columnsSorting[foundColumnIndex].order, foundColumnIndex]
  }

  state = {
    errorMessage: null,
    appliedFilters: {},
    sessionToAcknowledge: null,
  }

  applyFilters = (filters) => {
    this.setState({
      appliedFilters: filters,
    })
  }

  renderBreadCrump = () => {
    const { intl: { formatMessage } } = this.context
    const elements = [formatMessage({ id: 'acquisition-sessions.title' })]
    return (
      <Breadcrumb
        rootIcon={<PageView />}
        elements={elements}
        labelGenerator={label => label}
        onAction={() => { }}
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
  * Confirm dialog call action to update state
  */
  onConfirmAcknowledge = () => {
    const { sessionToAcknowledge } = this.state
    const { onAcknowledge } = this.props
    onAcknowledge(sessionToAcknowledge.content.id)
    this.onCloseAcknowledge()
  }


  render() {
    const { intl: { formatMessage }, muiTheme: { sessionsMonitoring: { rowHeight }, components: { infiniteTable: { admin: { minRowCount, maxRowCount } } } } } = this.context
    const {
      onBack, onSort, columnsSorting, requestParameters, onApplyFilters, onClearFilters, filtersEdited, onToggleErrorsOnly, onToggleLastSession, initialFilters, onChangeFrom, onChangeTo,
    } = this.props
    const {
      appliedFilters, errorMessage, sessionToAcknowledge,
    } = this.state

    const columns = [
      new TableColumnBuilder(SessionsMonitoringComponent.SORTABLE_COLUMNS.SOURCE)
        .sortableHeaderCell(...SessionsMonitoringComponent.getColumnSortingData(columnsSorting, SessionsMonitoringComponent.SORTABLE_COLUMNS.SOURCE), onSort)
        .rowCellDefinition({ Constructor: SessionsMonitoringSourceRenderer })
        .label(formatMessage({ id: 'acquisition-sessions.table.source' }))
        .build(),
      new TableColumnBuilder(SessionsMonitoringComponent.SORTABLE_COLUMNS.NAME)
        .sortableHeaderCell(...SessionsMonitoringComponent.getColumnSortingData(columnsSorting, SessionsMonitoringComponent.SORTABLE_COLUMNS.NAME), onSort)
        .rowCellDefinition({ Constructor: SessionsMonitoringSessionRenderer })
        .label(formatMessage({ id: 'acquisition-sessions.table.name' }))
        .build(),
      new TableColumnBuilder(SessionsMonitoringComponent.SORTABLE_COLUMNS.CREATION_DATE)
        .optionsSizing(2)
        .sortableHeaderCell(...SessionsMonitoringComponent.getColumnSortingData(columnsSorting, SessionsMonitoringComponent.SORTABLE_COLUMNS.CREATION_DATE), onSort)
        .rowCellDefinition({ Constructor: SessionsMonitoringCreationDateRenderer })
        .label(formatMessage({ id: 'acquisition-sessions.table.creation-date' }))
        .build(),
      new TableColumnBuilder(SessionsMonitoringComponent.SORTABLE_COLUMNS.STATE)
        .optionsSizing(2)
        .sortableHeaderCell(...SessionsMonitoringComponent.getColumnSortingData(columnsSorting, SessionsMonitoringComponent.SORTABLE_COLUMNS.STATE), onSort)
        .rowCellDefinition({ Constructor: SessionsMonitoringStateRenderer, props: { onShowAcknowledge: this.onShowAcknowledge } })
        .label(formatMessage({ id: 'acquisition-sessions.table.state' }))
        .build(),
      new TableColumnBuilder('column.products').titleHeaderCell(formatMessage({ id: 'acquisition-sessions.table.sip-generated.tooltip' })).rowCellDefinition({ Constructor: SessionsMonitoringProductsGeneratedRenderer })
        .label(formatMessage({ id: 'acquisition-sessions.table.sip-generated' }))
        .build(),
      new TableColumnBuilder('column.sip').titleHeaderCell(formatMessage({ id: 'acquisition-sessions.table.sip-treated.tooltip' })).rowCellDefinition({ Constructor: SessionsMonitoringProductsIngestedRenderer })
        .label(formatMessage({ id: 'acquisition-sessions.table.sip-treated' }))
        .build(),
      new TableColumnBuilder('column.aip-generated').optionsSizing(3).titleHeaderCell(formatMessage({ id: 'acquisition-sessions.table.aip-generated.tooltip' })).rowCellDefinition({ Constructor: SessionsMonitoringGeneratedAipRenderer })
        .label(formatMessage({ id: 'acquisition-sessions.table.aip-generated' }))
        .build(),
      new TableColumnBuilder('column.aip-stored').titleHeaderCell(formatMessage({ id: 'acquisition-sessions.table.aip-stored.tooltip' })).rowCellDefinition({ Constructor: SessionsMonitoringProductsStoredRenderer })
        .label(formatMessage({ id: 'acquisition-sessions.table.aip-stored' }))
        .build(),
      new TableColumnBuilder('column.indexed').optionsSizing(3).titleHeaderCell(formatMessage({ id: 'acquisition-sessions.table.indexed.tooltip' })).rowCellDefinition({ Constructor: SessionsMonitoringIndexedRenderer })
        .label(formatMessage({ id: 'acquisition-sessions.table.indexed' }))
        .build(),
      new TableColumnBuilder('column.last-modification').visible(false).optionsSizing(2).titleHeaderCell()
        .rowCellDefinition({ Constructor: SessionsMonitoringLastModificationRenderer })
        .label(formatMessage({ id: 'acquisition-sessions.table.last-modification' }))
        .build(),
    ]

    return (
      <Card>
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
          <TableLayout>
            <SessionsMonitoringFiltersComponent
              initialFilters={initialFilters}
              onApplyFilters={onApplyFilters}
              onClearFilters={onClearFilters}
              onToggleErrorsOnly={onToggleErrorsOnly}
              onToggleLastSession={onToggleLastSession}
              onChangeFrom={onChangeFrom}
              onChangeTo={onChangeTo}
              filtersEdited={filtersEdited}
            />
            {/* Loading, results and refresh button */}
            <PageableInfiniteTableContainer
              pageActions={sessionsActions}
              pageSelectors={sessionsSelectors}
            // tableActions={tableActions}
              requestParams={requestParameters}
              columns={columns}
              emptyComponent={<SessionsEmptyComponent />}
              minRowCount={minRowCount}
              maxRowCount={maxRowCount}
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
