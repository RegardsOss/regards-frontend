/**
* LICENSE_PLACEHOLDER
**/
import concat from 'lodash/concat'
import remove from 'lodash/remove'
import { FormattedMessage } from 'react-intl'
import Measure from 'react-measure'
import FlatButton from 'material-ui/FlatButton'
import ColumnsAction from 'material-ui/svg-icons/action/settings'
import Disatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied'
import { LoadingComponent } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import ShowableAtRender from '../cards/ShowableAtRender'
import NoContentMessageInfo from '../cards/NoContentMessageInfo'
import FixedTable from './FixedTable'
import FixedTableHeader from './FixedTableHeader'
import TableColumnFilterComponent from './TableColumnFilterComponent'
import Styles from './FixedTableStyles'
import ColumnConfiguration from './model/ColumnConfiguration'

export const tablePaneConfiguration = {
  // adds tabs buttons to results table
  resultsTabsButtons: React.PropTypes.arrayOf(React.PropTypes.node),
  // adds custom table options, nearside parmaeters
  customTableOptions: React.PropTypes.arrayOf(React.PropTypes.node),
  // shows a custom table header area instand of results count, just above columns
  customTableHeaderArea: React.PropTypes.node,
  // should show parameters button?
  showParameters: React.PropTypes.bool.isRequired,
  // Display table header toolbar ?
  displayTableHeader: React.PropTypes.bool,
}

/**
* Fixed table pane: adds table header and no data display, aligns table width on available width.
* It also handles columns visibility options
*/
class FixedTablePaneComponent extends React.Component {

  static propTypes = {
    // dynamic properis
    // is fetching entities?
    entitiesFetching: React.PropTypes.bool.isRequired,
    // results count
    resultsCount: React.PropTypes.number.isRequired,
    // provided table data and configuration
    tableData: React.PropTypes.shape(FixedTable.PropTypes).isRequired,
    columns: React.PropTypes.arrayOf(ColumnConfiguration).isRequired,
    // this configuration properties (see above)
    ...tablePaneConfiguration,
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
    if (this.state.tableWidth !== width) {
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
      const styles = Styles(this.context.muiTheme).loadingFilter
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
    const { showParameters, resultsTabsButtons, customTableOptions, customTableHeaderArea, displayTableHeader, resultsCount } = this.props
    const { columnsFilterPanelOpened } = this.state

    let options = customTableOptions
    if (showParameters) {
      // add parameters options at end
      options = options.concat([
        <FlatButton
          key="inner.parameters.table.option"
          onTouchTap={this.onOpenColumnsFilterPanel}
          label={<FormattedMessage id="table.filter.columns" />}
          icon={<ColumnsAction />}
          secondary={columnsFilterPanelOpened}
        />,
      ])
    }

    return (
      <ShowableAtRender show={!!displayTableHeader}>
        <FixedTableHeader
          resultsTabsButtons={resultsTabsButtons}
          customTableOptions={options}
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
        <TableColumnFilterComponent
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
    const { entitiesFetching, resultsCount, tableData } = this.props
    const { visibleColumns, tableWidth } = this.state
    return (
      <Measure onMeasure={this.onComponentResized}>
        <div style={{ width: '100%' }}>
          {this.renderHeaderBar()}
          {this.renderLoadingFilter()}
          {this.renderColumnsFilterPanel()}
          <NoContentMessageInfo
            noContent={!resultsCount && !entitiesFetching}
            title={'No results found'}
            message={'Your research returned no results. Please change your search criterion'}
            Icon={Disatisfied}
          >
            <FixedTable columns={visibleColumns} width={tableWidth} {...tableData} />
          </NoContentMessageInfo>
        </div >
      </Measure >
    )
  }
}
export default FixedTablePaneComponent
