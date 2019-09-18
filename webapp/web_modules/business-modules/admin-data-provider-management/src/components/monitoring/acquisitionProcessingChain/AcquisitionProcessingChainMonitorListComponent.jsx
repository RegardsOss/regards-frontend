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
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import PageView from 'material-ui/svg-icons/action/pageview'
import { CommonDomain } from '@regardsoss/domain'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import {
  PageableInfiniteTableContainer, TableColumnBuilder, TableLayout, TableHeaderLineLoadingAndResults,
  NoContentComponent, CardActionsComponent, FormErrorMessage, Breadcrumb, TableDeleteOption, ConfirmDialogComponent,
  ConfirmDialogComponentTypes, PositionedDialog,
} from '@regardsoss/components'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import AcquisitionProcessingChainMonitoringTableRunAction from './AcquisitionProcessingChainMonitoringTableRunAction'
import AcquisitionProcessingChainMonitoringTableListAction from './AcquisitionProcessingChainMonitoringTableListAction'
import AcquisitionProcessingChainMonitoringTableStopAction from './AcquisitionProcessingChainMonitoringTableStopAction'
import AcquisitionProcessingChainMonitoringActivityRenderer from './AcquisitionProcessingChainMonitoringActivityRenderer'
import { AcquisitionProcessingChainMonitorModeRenderer } from './AcquisitionProcessingChainMonitorModeRenderer'
import { AcquisitionProcessingChainMonitoringEnabledRenderer } from './AcquisitionProcessingChainMonitoringEnabledRenderer'
import AcquisitionProcessingChainMonitoringListFiltersComponent from './AcquisitionProcessingChainMonitoringListFiltersComponent'
import AcquisitionProcessingChainTableDuplicateAction from './AcquisitionProcessingChainTableDuplicateAction'
import { AcquisitionProcessingChainMonitorActions, AcquisitionProcessingChainMonitorSelectors }
  from '../../../clients/AcquisitionProcessingChainMonitorClient'
//import { AcquisitionProcessingChainActions, AcquisitionProcessingChainSelectors } from '../../clients/AcquisitionProcessingChainClient'
import AcquisitionProcessingChainTableEditAction from './AcquisitionProcessingChainTableEditAction'
import { tableActions, tableSelectors } from '../../../clients/TableClient'
import messages from '../../../i18n'
import styles from '../../../styles'
import dependencies from '../../../dependencies'

/**
* Component to display list of acquisition processing chains monitoring
* @author Sébastien Binda
*/
export class AcquisitionProcessingChainMonitorListComponent extends React.Component {
  static propTypes = {
    initialFilters: PropTypes.objectOf(PropTypes.string),
    pageSize: PropTypes.number.isRequired,
    resultsCount: PropTypes.number.isRequired,
    entitiesLoading: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    onRunChain: PropTypes.func.isRequired,
    onStopChain: PropTypes.func.isRequired,
    onListChainAction: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
    onMultiToggleSelection: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    isOneCheckboxToggled: PropTypes.bool.isRequired,
    hasAccess: PropTypes.bool.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static AUTO_REFRESH_PERIOD = 20000

  static getColumnSortingData(columnsSorting, columnKey) {
    const foundColumnIndex = columnsSorting.findIndex(({ columnKey: localColumnKey }) => localColumnKey === columnKey)
    return foundColumnIndex === -1 ? [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null] : [columnsSorting[foundColumnIndex].order, foundColumnIndex]
  }

  /**
   * Convert column id to query corresponding names
   */
  static COLUMN_KEY_TO_QUERY = {
    'column.name': 'label',
  }

  /**
   * Convert column order to request parameters value
   */
  static COLUMN_ORDER_TO_QUERY = {
    [CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER]: 'ASC',
    [CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER]: 'DESC',
  }

  /**
   * Converts columns order and filters state into request parameters
   * @param {[{columnKey: string, order: string}]} columnsSorting columns sorting definition, where order is a
   * @param {*} applyingFiltersState filters state from component state
   * @returns {*} requestParameters as an object compound of string and string arrays
   */
  static buildRequestParameters(columnsSorting, applyingFiltersState) {
    const requestParameters = {
      ...applyingFiltersState,
      sort: columnsSorting.map(({ columnKey, order }) => `${AcquisitionProcessingChainMonitorListComponent.COLUMN_KEY_TO_QUERY[columnKey]},${AcquisitionProcessingChainMonitorListComponent.COLUMN_ORDER_TO_QUERY[order]}`),
    }
    return requestParameters
  }

  state = {
    errorMessage: null,
    appliedFilters: {},
    columnsSorting: [],
    requestParams: {},
    sessionNameDialog: false,
    runLabel: null,
    runId: null,
    sessionRename: '',
  }

  /**
   * At component mount, run acquisition chains auto refresh
   */
  componentDidMount = () => {
    // this.autoRefresh()
  }

  /**
   * At component unmount, remove acquisition chains auto refresh
   */
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  /**
   * Update full state based on changes
   */
  onStateUpdated = (stateDiff) => {
    const nextState = { ...this.state, ...stateDiff }
    nextState.requestParams = AcquisitionProcessingChainMonitorListComponent.buildRequestParameters(nextState.columnsSorting, nextState.appliedFilters)
    this.setState(nextState)
  }

  /**
   * Use javascript setTimeout to run auto refresh of acquisition chains
   */
  autoRefresh = () => {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.handleRefresh().then(() => {
      this.timeout = setTimeout(this.autoRefresh, AcquisitionProcessingChainMonitorListComponent.AUTO_REFRESH_PERIOD)
    })
  }

  /**
  * Callback to apply specific filters for Product search
  * @param filters : new filters to apply
  * @param callback : callback called when state is updated with new filters
  */
  applyFilters = (filters, callback) => {
    this.onStateUpdated({ appliedFilters: filters }, callback)
  }

  handleRefresh = () => this.props.onRefresh(this.state.appliedFilters)

  runChainAction = (label, chainId, sessionName) => {
    this.props.onRunChain(chainId, sessionName).then(
      (ActionResult) => {
        if (!ActionResult.error) {
          this.autoRefresh()
        } else {
          this.setState({
            errorMessage: this.context.intl.formatMessage({ id: 'acquisition-chain.monitor.list.run.error' }, { label, chainId }),
          })
        }
      },
    )
  }

  stopChainAction = (label, chainId) => {
    this.props.onStopChain(chainId).then(
      (ActionResult) => {
        if (!ActionResult.error) {
          this.autoRefresh()
        } else {
          this.setState({
            errorMessage: this.context.intl.formatMessage({ id: 'acquisition-chain.monitor.list.stop.error' }, { label, chainId }),
          })
        }
      },
    )
  }

  renderBreadCrump = () => {
    const { intl: { formatMessage } } = this.context
    const elements = [formatMessage({ id: 'acquisition-chain-monitor.breadcrumb.label' })]
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
   * Callback to open the delete confirm dialog
   * @param {*} chain : chain to delete
   */
  onDelete = (chain) => {
    this.setState({
      chainToDelete: chain,
    })
  }

  /**
   * Callback for deletion confirmation
   */
  onConfirmDelete = () => {
    this.closeDeleteDialog()
    if (this.state.chainToDelete) {
      this.props.onDelete(this.state.chainToDelete)
    }
  }

  /**
   * User cb: Manage column sorting
   */
  onSort = (columnKey, order) => {
    const { columnsSorting } = this.state
    const newOrder = columnsSorting
    const columnIndex = newOrder.findIndex(columnArray => columnArray.columnKey === columnKey)
    if (order === CommonDomain.SORT_ORDERS_ENUM.NO_SORT) {
      newOrder.splice(columnIndex, 1)
    } else if (columnIndex === -1) {
      newOrder.push({ columnKey, order })
    } else {
      newOrder.splice(columnIndex, 1)
      newOrder.push({ columnKey, order })
    }
    this.onStateUpdated({ columnsSorting: newOrder })
  }

  /**
   * Callback to close delete confirm dialog
   */
  closeDeleteDialog = () => {
    this.setState({
      chainToDelete: null,
    })
  }

  renderDeleteConfirmDialog = () => {
    if (this.state.chainToDelete) {
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={this.context.intl.formatMessage({ id: 'acquisition-chain.list.delete.confirm.title' }, { label: this.state.chainToDelete.content.label })}
          onConfirm={this.onConfirmDelete}
          onClose={this.closeDeleteDialog}
        />
      )
    }
    return null
  }

  onCloseDialog = () => {
    this.setState({
      sessionNameDialog: false,
      runLabel: null,
      runId: null,
    })
  }

  onConfirmDialog = () => {
    const { runLabel, runId, sessionRename } = this.state
    this.runChainAction(runLabel, runId, sessionRename)
    this.setState({
      sessionNameDialog: false,
      runLabel: null,
      runId: null,
      sessionRename: '',
    })
  }

  onOpenDialog = (label, id) => {
    this.setState({
      sessionNameDialog: true,
      runLabel: label,
      runId: id,
      sessionRename: '',
    })
  }

  onChangeSessionName = (event, value) => {
    this.setState({
      sessionRename: value,
    })
  }

  render() {
    const { intl: { formatMessage }, muiTheme } = this.context
    const {
      onBack, pageSize, resultsCount, entitiesLoading, initialFilters, onListChainAction, onEdit, onCreate, fetchPage,
      onMultiToggleSelection, isOneCheckboxToggled, onToggle, hasAccess, onDuplicate,
    } = this.props
    const {
      errorMessage, columnsSorting, requestParams, sessionRename,
    } = this.state
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable

    const emptyComponent = (
      <NoContentComponent
        title={formatMessage({ id: 'acquisition-chain.monitor.empty.title' })}
        Icon={AddToPhotos}
      />
    )

    let columnSelectable = []
    /** Checkboxes are shown only if user have the right to use them */
    if (hasAccess) {
      columnSelectable = [new TableColumnBuilder()
        .selectionColumn(false, AcquisitionProcessingChainMonitorSelectors, tableActions, tableSelectors)
        .build()]
    }

    const columns = [
      ...columnSelectable,
      new TableColumnBuilder('column.name').titleHeaderCell().propertyRenderCell('content.chain.label')
        .sortableHeaderCell(...AcquisitionProcessingChainMonitorListComponent.getColumnSortingData(columnsSorting, 'column.name'), this.onSort)
        .label(formatMessage({ id: 'acquisition-chain.monitor.list.label' }))
        .build(),
      new TableColumnBuilder('column.mode').titleHeaderCell()
        .rowCellDefinition({ Constructor: AcquisitionProcessingChainMonitorModeRenderer, props: { onToggle } })
        .label(formatMessage({ id: 'acquisition-chain.monitor.list.mode' }))
        .build(),
      new TableColumnBuilder('column.running').titleHeaderCell()
        .rowCellDefinition({ Constructor: AcquisitionProcessingChainMonitoringEnabledRenderer, props: { onToggle } })
        .label(formatMessage({ id: 'acquisition-chain.monitor.list.running' }))
        .build(),
      new TableColumnBuilder('column.state').titleHeaderCell()
        .rowCellDefinition({ Constructor: AcquisitionProcessingChainMonitoringActivityRenderer })
        .label(formatMessage({ id: 'acquisition-chain.monitor.list.state' }))
        .build(),
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: AcquisitionProcessingChainMonitoringTableListAction,
        optionProps: { onListChain: onListChainAction },
      }, {
        OptionConstructor: AcquisitionProcessingChainMonitoringTableRunAction,
        optionProps: { onRunChain: this.onOpenDialog },
      }, {
        OptionConstructor: AcquisitionProcessingChainMonitoringTableStopAction,
        optionProps: { onStopChain: this.stopChainAction },
      }, {
        OptionConstructor: AcquisitionProcessingChainTableEditAction,
        optionProps: { onEdit },
      }, {
        OptionConstructor: AcquisitionProcessingChainTableDuplicateAction,
        optionProps: { onDuplicate },
      }, {
        OptionConstructor: TableDeleteOption,
        optionProps: {
          fetchPage,
          disableInsteadOfHide: true,
          onDelete: this.onDelete,
          queryPageSize: pageSize,
          handleHateoas: true,
        },
      }]).build(),
    ]

    const actions = [
      <FlatButton
        key="close"
        label={formatMessage({ id: 'acquisition-product.run.dialog.close.button' })}
        primary
        onClick={this.onCloseDialog}
      />,
      <FlatButton
        key="confirm"
        label={formatMessage({ id: 'acquisition-product.run.dialog.confirm.button' })}
        primary
        onClick={this.onConfirmDialog}
      />,
    ]

    const defaultDateSessionName = new Date()

    return (
      <Card>
        <PositionedDialog
          title={formatMessage({ id: 'acquisition-product.run.dialog.title' })}
          open={this.state.sessionNameDialog}
          autoScrollBodyContent
          actions={actions}
          dialogWidthPercent={60}
          onRequestClose={this.onCloseDialog}
        >
          <p>
            {formatMessage({ id: 'acquisition-product.run.dialog.message' })}
          </p>
          <TextField
            fullWidth
            hintText={defaultDateSessionName.toLocaleString()}
            onChange={this.onChangeSessionName}
            value={sessionRename}
          />
        </PositionedDialog>
        <CardTitle
          title={this.renderBreadCrump()}
          subtitle={formatMessage({ id: 'acquisition-chain.monitor.list.subtitle' })}
        />
        <CardText>
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
          <TableLayout>
            <AcquisitionProcessingChainMonitoringListFiltersComponent
              initialFilters={initialFilters}
              applyFilters={this.applyFilters}
              onMultiToggleSelection={onMultiToggleSelection}
              isOneCheckboxToggled={isOneCheckboxToggled}
            />
            <TableHeaderLineLoadingAndResults isFetching={entitiesLoading} resultsCount={resultsCount} />
            <PageableInfiniteTableContainer
              name="acquisition-chain-monitor-table"
              pageActions={AcquisitionProcessingChainMonitorActions}
              pageSelectors={AcquisitionProcessingChainMonitorSelectors}
              tableActions={tableActions}
              requestParams={requestParams}
              columns={columns}
              emptyComponent={emptyComponent}
              displayColumnsHeader
              minRowCount={minRowCount}
              maxRowCount={maxRowCount}
              queryPageSize={pageSize}
            />
          </TableLayout>
        </CardText>
        <CardActions>
          <CardActionsComponent
            mainButtonClick={onCreate}
            mainHateoasDependencies={dependencies.addDependencies}
            mainButtonLabel={formatMessage({ id: 'acquisition-chain.list.addnew.button' })}
            secondaryButtonLabel={formatMessage({ id: 'acquisition-chain.list.back.button' })}
            secondaryButtonClick={onBack}
          />
        </CardActions>
      </Card>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(AcquisitionProcessingChainMonitorListComponent))
