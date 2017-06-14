/**
* LICENSE_PLACEHOLDER
**/
import concat from 'lodash/concat'
import remove from 'lodash/remove'
import values from 'lodash/values'
import Measure from 'react-measure'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import ColumnsAction from 'material-ui/svg-icons/action/settings'
import Disatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied'
import { LoadingComponent } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import ShowableAtRender from '../cards/ShowableAtRender'
import NoContentMessageInfo from '../cards/NoContentMessageInfo'
import Table from './content/Table'
import TablePaneHeader from './header/TablePaneHeader'
import HeaderAdvancedOption from './header/HeaderAdvancedOption'
import ColumnsVisibilitySelector from './content/columns/ColumnsVisibilitySelector'
import ColumnConfiguration from './content/columns/model/ColumnConfiguration'
import TablePaneConfigurationModel from './model/TablePaneConfigurationModel'
import TableSelectionModes from './model/TableSelectionModes'

const allWidthStyles = { width: '100%' }

/**
* Table pane: adds table header and no data display, aligns table width on available width.
* It also handles columns visibility options and installs the seleciton manager
*/
class TablePane extends React.Component {

  static propTypes = {
    // dynamic properis
    // is fetching entities?
    entitiesFetching: PropTypes.bool.isRequired,
    // results count
    resultsCount: PropTypes.number.isRequired,
    // provided table data and configuration
    tableData: PropTypes.shape(Table.PropTypes).isRequired,
    // columns
    columns: PropTypes.arrayOf(ColumnConfiguration).isRequired,

    // selection related
    allSelected: PropTypes.bool.isRequired,
    toggledElements: PropTypes.objectOf(PropTypes.object).isRequired, // inner object is entity type
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    onToggleRowSelection: PropTypes.func.isRequired,
    onToggleSelectAll: PropTypes.func.isRequired,

    // this configuration properties (see above)
    ...TablePaneConfigurationModel,
  }

  static defaultProps = {
    resultsTabsButtons: [],
    customTableOptions: [],
    customTableHeaderArea: null,
    showParameters: true,
    displayTableHeader: true,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    const { columns } = props
    this.state = {
      tableWidth: 0,
      hiddenColumns: [],
      visibleColumns: columns,
      columnsFilterPanelOpened: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.columns !== this.props.columns) {
      // re-init columns visibility
      this.setState({
        hiddenColumns: [],
        visibleColumns: nextProps.columns,
        columnsFilterPanelOpened: false,
      })
    }
  }

  /**
   * Called when component is resized, to force the inner table implementation at same width
  */
  onComponentResized = ({ width }) => {
    // avoid handling event if same width...
    if ((this.state.tableWidth > width + 20) || (this.state.tableWidth < width - 20)  ) {
      this.setState({ tableWidth: width })
    }
  }

  /**
 * Update column visibility
 * @param column
 */
  onToggleColumnVisibility = (column) => {
    const hiddenColumns = concat([], this.state.hiddenColumns)
    if (hiddenColumns.includes(column)) {
      remove(hiddenColumns, col => column === col)
    } else {
      hiddenColumns.push(column)
    }

    // update visible columns list (to not perform it on render)
    const { columns } = this.props
    const visibleColumns = columns.filter(({ label }) => !hiddenColumns.includes(label))

    this.setState({
      hiddenColumns,
      visibleColumns,
    })
  }

  /**
   * Open the column visibility panel
   */
  onOpenColumnsFilterPanel = () => {
    this.setState({
      columnsFilterPanelOpened: true,
    })
  }

  /**
   * Close the column visibility panel
   */
  onCloseColumnsFilterPanel = () => {
    this.setState({
      columnsFilterPanelOpened: false,
    })
  }

  /**
   * Render the loading to inform user thaht entities are fetching
   * @param height
   * @returns {*}
   */
  renderLoadingFilter = () => {
    if (this.props.entitiesFetching) {
      const styles = this.context.moduleTheme
      return (

        <div style={styles}>
          <LoadingComponent />
        </div>
      )
    }
    return null
  }

  /**
   * Render the toolbar over the table
   */
  renderHeaderBar = () => {
    const { showParameters, resultsTabsButtons,
      customTableOptions, contextOptions, advancedOptions,
      customTableHeaderArea, displayTableHeader, resultsCount } = this.props

    // 1 - add columns option in advanced menu items, if required
    let computedAdvancedMenuItems = advancedOptions || []
    if (showParameters) {
      if (computedAdvancedMenuItems.length) {
        // A - add divider
        computedAdvancedMenuItems = [...computedAdvancedMenuItems, <Divider key="separator.to.automatic.options" />]
      }
      // B - (always) add menu item for columns
      computedAdvancedMenuItems = [...computedAdvancedMenuItems, (
        <MenuItem
          key="inner.parameters.table.option"
          onTouchTap={this.onOpenColumnsFilterPanel}
          value={// Workaround: makes the menu close on item clicked, useless otherwise (crappy material UI)
            'more.option'}
          primaryText={this.context.intl.formatMessage({ id: 'table.filter.columns.label' })}
          icon={<ColumnsAction />}
        />),
      ]
    }

    // b - add the HeaderAdvancedOption button to show menu (it is distabled if there is no menu)
    const computedContextOptions = (contextOptions || []).concat([
      <HeaderAdvancedOption key="more.option.button">
        {computedAdvancedMenuItems}
      </HeaderAdvancedOption>,
    ])

    // c - Render table pane
    return (
      <ShowableAtRender show={!!displayTableHeader}>
        <TablePaneHeader
          resultsTabsButtons={resultsTabsButtons}
          contextOptions={computedContextOptions}
          customTableOptions={customTableOptions}
          customTableHeaderArea={customTableHeaderArea}
          resultsCount={resultsCount}
        />
      </ShowableAtRender>
    )
  }


  /**
   * Display the cloumn filter panel
   * @returns {*}
   */
  renderColumnsFilterPanel = () => {
    if (this.state.columnsFilterPanelOpened) {
      return (
        <ColumnsVisibilitySelector
          columns={this.props.columns}
          hiddenColumns={this.state.hiddenColumns}
          changeColumnVisibility={this.onToggleColumnVisibility}
          closePanel={this.onCloseColumnsFilterPanel}
        />
      )
    }
    return null
  }

  render() {
    const { entitiesFetching, resultsCount, tableData, toggledElements, selectionMode,
      allSelected, onToggleRowSelection, onToggleSelectAll } = this.props
    const { visibleColumns, tableWidth } = this.state
    return (
      <Measure onMeasure={this.onComponentResized}>
        <div style={allWidthStyles}>
          {this.renderHeaderBar()}
          {this.renderLoadingFilter()}
          {this.renderColumnsFilterPanel()}
          <NoContentMessageInfo
            noContent={!resultsCount && !entitiesFetching}
            title={'No results found'}
            message={'Your research returned no results. Please change your search criterion'}
            Icon={Disatisfied}
          >
            <Table
              columns={visibleColumns}
              width={tableWidth}

              allSelected={allSelected}
              toggledElements={toggledElements}
              selectionMode={selectionMode}
              onToggleRowSelection={onToggleRowSelection}
              onToggleSelectAll={onToggleSelectAll}

              {...tableData}
            />
          </NoContentMessageInfo>
        </div >
      </Measure >
    )
  }
}
export default TablePane
