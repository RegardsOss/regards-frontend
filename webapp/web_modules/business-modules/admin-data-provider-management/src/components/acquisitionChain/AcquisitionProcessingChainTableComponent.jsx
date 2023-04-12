/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import TextField from 'material-ui/TextField'
import {
  PageableInfiniteTableContainer, TableColumnBuilder, TableLayout, TableHeaderLineLoadingSelectAllAndResults,
  NoContentComponent, TableDeleteOption, ConfirmDialogComponent,
  ConfirmDialogComponentTypes, AutoRefreshPageableTableHOC,
  TableFilterSortingAndVisibilityContainer,
  TableHeaderLine, TableSelectionModes,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import HeaderActionsBarComponent from './HeaderActionsBarComponent'
import AcquisitionProcessingChainTableRunAction from './AcquisitionProcessingChainTableRunAction'
import AcquisitionProcessingChainTableListSessionsAction from './AcquisitionProcessingChainTableListSessionsAction'
import AcquisitionProcessingChainTableStopAction from './AcquisitionProcessingChainTableStopAction'
import AcquisitionProcessingChainActivityRenderer from './AcquisitionProcessingChainActivityRenderer'
import { AcquisitionProcessingChainModeRenderer } from './AcquisitionProcessingChainModeRenderer'
import { AcquisitionProcessingChainEnabledRenderer } from './AcquisitionProcessingChainEnabledRenderer'
import AcquisitionProcessingChainTableDuplicateAction from './AcquisitionProcessingChainTableDuplicateAction'
import { AcquisitionProcessingChainActions, AcquisitionProcessingChainSelectors } from '../../clients/AcquisitionProcessingChainClient'
import AcquisitionProcessingChainTableEditAction from './AcquisitionProcessingChainTableEditAction'
import { tableActions, tableSelectors } from '../../clients/TableClient'
import DIALOG_TYPES from '../../domain/dialogTypes'

/**
 * @author Théo Lasserre
 */
class AcquisitionProcessingChainTableComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    pageSize: PropTypes.number,
    hasAccess: PropTypes.bool.isRequired,
    onToggle: PropTypes.func,
    onDelete: PropTypes.func,
    onStopChain: PropTypes.func,
    onRunChain: PropTypes.func,
    onMultiToggleSelection: PropTypes.func,
    isOneCheckboxToggled: PropTypes.bool.isRequired,
    entitiesLoading: PropTypes.bool.isRequired,
    resultsCount: PropTypes.number.isRequired,

    // table sorting, column visiblity & filters management
    requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    getColumnSortingData: PropTypes.func,
    onSort: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static COLUMN_KEYS = {
    NAME: 'label',
    MODE: 'mode',
    RUNNING: 'running',
    STATE: 'state',
  }

  static LOADING_COMPONENT = (
    <NoContentComponent
      titleKey="acquisition-chain.loading.content.title"
      Icon={SearchIcon}
    />)

  static EMPTY_COMPONENT = (
    <NoContentComponent
      titleKey="acquisition-chain.empty.title"
      messageKey="acquisition-chain.no.content.message"
      Icon={AddToPhotos}
    />)

  static DEFAULT_DIALOG_STATE = {
    open: false,
    mode: TableSelectionModes.includeSelected,
    entity: null,
  }

  state = {
    isAutoRefreshEnabled: true,
    [DIALOG_TYPES.RUN_DIALOG]: {
      ...AcquisitionProcessingChainTableComponent.DEFAULT_DIALOG_STATE,
      sessionName: '',
    },
    [DIALOG_TYPES.DELETE_DIALOG]: AcquisitionProcessingChainTableComponent.DEFAULT_DIALOG_STATE,
  }

  onOpenActionDialog = (dialogType, entity) => this.setState({
    [dialogType]: {
      open: true,
      mode: TableSelectionModes.includeSelected,
      entity,
    },
  })

  onCloseActionDialog = (dialogType) => {
    let newDialogState = { ...AcquisitionProcessingChainTableComponent.DEFAULT_DIALOG_STATE }
    if (dialogType === DIALOG_TYPES.RUN_DIALOG) {
      newDialogState = {
        ...newDialogState,
        sessionName: '',
      }
    }
    this.setState({
      [dialogType]: newDialogState,
    })
  }

  onChangeSessionName = (event, value) => {
    this.setState({
      [DIALOG_TYPES.RUN_DIALOG]: {
        ...this.state[DIALOG_TYPES.RUN_DIALOG],
        sessionName: value,
      },
    })
  }

  onRunSelectedChain = (entity) => this.onOpenActionDialog(DIALOG_TYPES.RUN_DIALOG, entity)

  onDeleteSelectedChain = (entity) => this.onOpenActionDialog(DIALOG_TYPES.DELETE_DIALOG, entity)

  onToggleAutoRefresh = () => {
    this.setState({
      isAutoRefreshEnabled: !this.state.isAutoRefreshEnabled,
    })
  }

  onConfirm = (dialogType) => {
    const { onDelete, onRunChain } = this.props
    const dialogStateValues = this.state[dialogType]
    switch (dialogType) {
      case DIALOG_TYPES.RUN_DIALOG:
        onRunChain(dialogStateValues.entity, dialogStateValues.sessionName)
        break
      case DIALOG_TYPES.DELETE_DIALOG:
        onDelete(dialogStateValues.entity)
        break
      default:
        console.error('Invalid dialog type : ', dialogType)
    }
  }

  renderDialog = (dialogType) => {
    const { intl: { formatMessage } } = this.context
    const { open, entity } = this.state[dialogType]
    if (open) {
      let title
      let dialogConfirmType
      let dialogContent = null
      switch (dialogType) {
        case DIALOG_TYPES.RUN_DIALOG:
          dialogConfirmType = ConfirmDialogComponentTypes.CONFIRM
          title = formatMessage({ id: 'acquisition-product.run.dialog.title' })
          dialogContent = (<>
            <p>
              {formatMessage({ id: 'acquisition-product.run.dialog.message' })}
            </p>
            <TextField
              fullWidth
              hintText={new Date().toLocaleString()}
              onChange={this.onChangeSessionName}
              value={this.state[DIALOG_TYPES.RUN_DIALOG].sessionName}
              maxLength={128}
            />
          </>)
          break
        case DIALOG_TYPES.DELETE_DIALOG:
          dialogConfirmType = ConfirmDialogComponentTypes.DELETE
          title = formatMessage({ id: 'acquisition-chain.list.delete.confirm.title' }, { label: entity.content.chain.label })
          break
        default:
      }
      return (<ConfirmDialogComponent
        dialogType={dialogConfirmType}
        onConfirm={() => this.onConfirm(dialogType)}
        onClose={() => this.onCloseActionDialog(dialogType)}
        title={title}
        message={dialogContent}
      />)
    }
    return null
  }

  /**
   * Builds table columns
   * @return columns
   */
  buildColumns = () => {
    const {
      hasAccess, getColumnSortingData, onSort,
      onStopChain, project,
      onToggle,
    } = this.props
    const { intl: { formatMessage } } = this.context

    let columnSelectable = []
    /** Checkboxes are shown only if user have the right to use them */
    if (hasAccess) {
      columnSelectable = [new TableColumnBuilder()
        .selectionColumn(false, AcquisitionProcessingChainSelectors, tableActions, tableSelectors)
        .build()]
    }

    const columns = [
      ...columnSelectable,
      new TableColumnBuilder(AcquisitionProcessingChainTableComponent.COLUMN_KEYS.NAME)
        .titleHeaderCell()
        .propertyRenderCell('content.chain.label')
        .sortableHeaderCell(...getColumnSortingData(AcquisitionProcessingChainTableComponent.COLUMN_KEYS.NAME), onSort)
        .label(formatMessage({ id: 'acquisition-chain.list.label' }))
        .build(),
      new TableColumnBuilder(AcquisitionProcessingChainTableComponent.COLUMN_KEYS.MODE).titleHeaderCell()
        .rowCellDefinition({ Constructor: AcquisitionProcessingChainModeRenderer, props: { onToggle } })
        .label(formatMessage({ id: 'acquisition-chain.list.mode' }))
        .build(),
      new TableColumnBuilder(AcquisitionProcessingChainTableComponent.COLUMN_KEYS.RUNNING).titleHeaderCell()
        .rowCellDefinition({ Constructor: AcquisitionProcessingChainEnabledRenderer, props: { onToggle } })
        .label(formatMessage({ id: 'acquisition-chain.list.running' }))
        .build(),
      new TableColumnBuilder(AcquisitionProcessingChainTableComponent.COLUMN_KEYS.STATE).titleHeaderCell()
        .rowCellDefinition({ Constructor: AcquisitionProcessingChainActivityRenderer })
        .label(formatMessage({ id: 'acquisition-chain.list.state' }))
        .build(),
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: AcquisitionProcessingChainTableListSessionsAction,
        optionProps: { project },
      }, {
        OptionConstructor: AcquisitionProcessingChainTableRunAction,
        optionProps: { onRunChain: this.onRunSelectedChain },
      }, {
        OptionConstructor: AcquisitionProcessingChainTableStopAction,
        optionProps: { onStopChain },
      }, {
        OptionConstructor: AcquisitionProcessingChainTableEditAction,
        optionProps: { project },
      }, {
        OptionConstructor: AcquisitionProcessingChainTableDuplicateAction,
        optionProps: { project },
      }, {
        OptionConstructor: TableDeleteOption,
        optionProps: {
          disableInsteadOfHide: true,
          onDelete: this.onDeleteSelectedChain,
          handleHateoas: true,
        },
      }]).build(),
    ]
    return columns
  }

  render() {
    const { muiTheme } = this.context
    const {
      pageSize, requestParameters, isOneCheckboxToggled,
      entitiesLoading, resultsCount, onMultiToggleSelection,
    } = this.props
    const { isAutoRefreshEnabled } = this.state
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const columns = this.buildColumns()
    return (
      <TableLayout>
        <TableHeaderLine>
          <HeaderActionsBarComponent
            onMultiToggleSelection={onMultiToggleSelection}
            isOneCheckboxToggled={isOneCheckboxToggled}
            onToggleAutoRefresh={this.onToggleAutoRefresh}
            isAutoRefreshEnabled={isAutoRefreshEnabled}
          />
        </TableHeaderLine>
        <TableHeaderLineLoadingSelectAllAndResults isFetching={entitiesLoading} resultsCount={resultsCount} />
        <AutoRefreshPageableTableHOC
          pageSize={pageSize}
          requestParams={requestParameters}
          pageableTableActions={AcquisitionProcessingChainActions}
          pageableTableSelectors={AcquisitionProcessingChainSelectors}
          enableAutoRefresh={isAutoRefreshEnabled}
          refreshTimeMS={AcquisitionProcessingChainTableComponent.AUTO_REFRESH_PERIOD}
        />
        <PageableInfiniteTableContainer
          name="acquisition-chain-table"
          pageActions={AcquisitionProcessingChainActions}
          pageSelectors={AcquisitionProcessingChainSelectors}
          tableActions={tableActions}
          requestParams={requestParameters}
          columns={columns}
          emptyComponent={entitiesLoading ? AcquisitionProcessingChainTableComponent.LOADING_COMPONENT : AcquisitionProcessingChainTableComponent.EMPTY_COMPONENT}
          displayColumnsHeader
          minRowCount={minRowCount}
          maxRowCount={maxRowCount}
          queryPageSize={pageSize}
        />
        {this.renderDialog(DIALOG_TYPES.RUN_DIALOG)}
        {this.renderDialog(DIALOG_TYPES.DELETE_DIALOG)}
      </TableLayout>
    )
  }
}
export default AcquisitionProcessingChainTableComponent
