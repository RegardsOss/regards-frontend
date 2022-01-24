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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import PageView from 'mdi-material-ui/CardSearch'
import { CommonDomain } from '@regardsoss/domain'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import {
  PageableInfiniteTableContainer, TableColumnBuilder, TableLayout, TableHeaderLineLoadingSelectAllAndResults,
  NoContentComponent, CardActionsComponent, FormErrorMessage, Breadcrumb, TableDeleteOption, ConfirmDialogComponent,
  ConfirmDialogComponentTypes, PositionedDialog, HelpMessageComponent,
} from '@regardsoss/components'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import AcquisitionProcessingChainTableRunAction from './AcquisitionProcessingChainTableRunAction'
import AcquisitionProcessingChainTableListSessionsAction from './AcquisitionProcessingChainTableListSessionsAction'
import AcquisitionProcessingChainTableStopAction from './AcquisitionProcessingChainTableStopAction'
import AcquisitionProcessingChainActivityRenderer from './AcquisitionProcessingChainActivityRenderer'
import { AcquisitionProcessingChainModeRenderer } from './AcquisitionProcessingChainModeRenderer'
import { AcquisitionProcessingChainEnabledRenderer } from './AcquisitionProcessingChainEnabledRenderer'
import AcquisitionProcessingChainListFiltersComponent from './AcquisitionProcessingChainListFiltersComponent'
import AcquisitionProcessingChainTableDuplicateAction from './AcquisitionProcessingChainTableDuplicateAction'
import { AcquisitionProcessingChainActions, AcquisitionProcessingChainSelectors } from '../../clients/AcquisitionProcessingChainClient'
import AcquisitionProcessingChainTableEditAction from './AcquisitionProcessingChainTableEditAction'
import { tableActions, tableSelectors } from '../../clients/TableClient'
import messages from '../../i18n'
import styles from '../../styles'
import dependencies from '../../dependencies'

/**
* Component to display list of acquisition processing chains
* @author Sébastien Binda
*/
export class AcquisitionProcessingChainListComponent extends React.Component {
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
    onListSessions: PropTypes.func.isRequired,
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

  static getColumnSortingData(columnsSorting, columnKey) {
    const foundColumnIndex = columnsSorting.findIndex(({ columnKey: localColumnKey }) => localColumnKey === columnKey)
    return foundColumnIndex === -1 ? [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null] : [columnsSorting[foundColumnIndex].order, foundColumnIndex]
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
      sort: columnsSorting.map(({ columnKey, order }) => `${AcquisitionProcessingChainListComponent.COLUMN_KEY_TO_QUERY[columnKey]},${AcquisitionProcessingChainListComponent.COLUMN_ORDER_TO_QUERY[order]}`),
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
    this.autoRefresh()
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
    nextState.requestParams = AcquisitionProcessingChainListComponent.buildRequestParameters(nextState.columnsSorting, nextState.appliedFilters)
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
      this.timeout = setTimeout(this.autoRefresh, AcquisitionProcessingChainListComponent.AUTO_REFRESH_PERIOD)
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

  onToggle = (chainId, target, nextValue) => {
    this.props.onToggle(chainId, target, nextValue).then(
      (ActionResult) => {
        if (!ActionResult.error) {
          this.handleRefresh()
        } else {
          this.setState({
            errorMessage: this.context.intl.formatMessage({ id: 'acquisition-chain.list.toggle.error' }, { chainId }),
          })
        }
      },
    )
  }

  runChainAction = (label, chainId, sessionName) => {
    this.props.onRunChain(chainId, sessionName).then(
      (ActionResult) => {
        if (!ActionResult.error) {
          this.autoRefresh()
        } else {
          this.setState({
            errorMessage: this.context.intl.formatMessage({ id: 'acquisition-chain.list.run.error' }, { label, chainId }),
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
            errorMessage: this.context.intl.formatMessage({ id: 'acquisition-chain.list.stop.error' }, { label, chainId }),
          })
        }
      },
    )
  }

  renderBreadCrump = () => {
    const { intl: { formatMessage } } = this.context
    const elements = [formatMessage({ id: 'acquisition-chain-breadcrumb.label' })]
    return (
      <Breadcrumb
        rootIcon={<PageView />}
        elements={elements}
        labelGenerator={(label) => label}
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
      this.props.onDelete(this.state.chainToDelete, this.props.onRefresh)
    }
  }

  /**
   * User cb: Manage column sorting
   */
  onSort = (columnKey, order) => {
    const { columnsSorting } = this.state
    const newOrder = columnsSorting
    const columnIndex = newOrder.findIndex((columnArray) => columnArray.columnKey === columnKey)
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
          title={this.context.intl.formatMessage({ id: 'acquisition-chain.list.delete.confirm.title' }, { label: this.state.chainToDelete.content.chain.label })}
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
      onBack, pageSize, resultsCount, entitiesLoading, initialFilters, onListSessions, onEdit, onCreate, fetchPage,
      onMultiToggleSelection, isOneCheckboxToggled, hasAccess, onDuplicate,
    } = this.props
    const {
      errorMessage, columnsSorting, requestParams, sessionRename,
    } = this.state
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable

    const emptyComponent = (
      <NoContentComponent
        titleKey="acquisition-chain.empty.title"
        Icon={AddToPhotos}
      />
    )

    let columnSelectable = []
    /** Checkboxes are shown only if user have the right to use them */
    if (hasAccess) {
      columnSelectable = [new TableColumnBuilder()
        .selectionColumn(false, AcquisitionProcessingChainSelectors, tableActions, tableSelectors)
        .build()]
    }

    const columns = [
      ...columnSelectable,
      new TableColumnBuilder('column.name').titleHeaderCell().propertyRenderCell('content.chain.label')
        .sortableHeaderCell(...AcquisitionProcessingChainListComponent.getColumnSortingData(columnsSorting, 'column.name'), this.onSort)
        .label(formatMessage({ id: 'acquisition-chain.list.label' }))
        .build(),
      new TableColumnBuilder('column.mode').titleHeaderCell()
        .rowCellDefinition({ Constructor: AcquisitionProcessingChainModeRenderer, props: { onToggle: this.onToggle } })
        .label(formatMessage({ id: 'acquisition-chain.list.mode' }))
        .build(),
      new TableColumnBuilder('column.running').titleHeaderCell()
        .rowCellDefinition({ Constructor: AcquisitionProcessingChainEnabledRenderer, props: { onToggle: this.onToggle } })
        .label(formatMessage({ id: 'acquisition-chain.list.running' }))
        .build(),
      new TableColumnBuilder('column.state').titleHeaderCell()
        .rowCellDefinition({ Constructor: AcquisitionProcessingChainActivityRenderer })
        .label(formatMessage({ id: 'acquisition-chain.list.state' }))
        .build(),
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: AcquisitionProcessingChainTableListSessionsAction,
        optionProps: { onListSessions },
      }, {
        OptionConstructor: AcquisitionProcessingChainTableRunAction,
        optionProps: { onRunChain: this.onOpenDialog },
      }, {
        OptionConstructor: AcquisitionProcessingChainTableStopAction,
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

    const defaultDateSessionName = new Date()

    return (
      <Card>
        <PositionedDialog
          title={formatMessage({ id: 'acquisition-product.run.dialog.title' })}
          open={this.state.sessionNameDialog}
          autoScrollBodyContent
          actions={<>
            <FlatButton
              key="close"
              label={formatMessage({ id: 'acquisition-product.run.dialog.close.button' })}
              primary
              onClick={this.onCloseDialog}
            />
            <FlatButton
              key="confirm"
              label={formatMessage({ id: 'acquisition-product.run.dialog.confirm.button' })}
              primary
              onClick={this.onConfirmDialog}
            />
          </>}
          dialogWidthPercent={60}
          dialogHeightPercent={30}
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
            maxlength={128}
          />
        </PositionedDialog>
        <CardTitle
          title={this.renderBreadCrump()}
          subtitle={formatMessage({ id: 'acquisition-chain.list.subtitle' })}
        />
        <CardText>
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
          <HelpMessageComponent
            message={formatMessage({ id: 'acquisition-product.help.deletion.message' })}
          />
          <TableLayout>
            <AcquisitionProcessingChainListFiltersComponent
              initialFilters={initialFilters}
              applyFilters={this.applyFilters}
              onMultiToggleSelection={onMultiToggleSelection}
              isOneCheckboxToggled={isOneCheckboxToggled}
            />
            <TableHeaderLineLoadingSelectAllAndResults isFetching={entitiesLoading} resultsCount={resultsCount} />
            <PageableInfiniteTableContainer
              name="acquisition-chain-table"
              pageActions={AcquisitionProcessingChainActions}
              pageSelectors={AcquisitionProcessingChainSelectors}
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
        {this.renderDeleteConfirmDialog()}
      </Card>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(AcquisitionProcessingChainListComponent))
