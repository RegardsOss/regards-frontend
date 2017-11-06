/**
* LICENSE_PLACEHOLDER
**/
import concat from 'lodash/concat'
import isEqual from 'lodash/isEqual'
import remove from 'lodash/remove'
import values from 'lodash/values'
import Measure from 'react-measure'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import Table from './content/Table'
import TableContentLoadingComponent from './content/TableContentLoadingComponent'
import TableSelectionModes from './model/TableSelectionModes'

const allWidthStyles = { width: '100%' }

/**
 * This container manages the two following points:
 * - responsiveness : adjust table to the available width
 * - Loading / No data: replaces table by the corresponding component in props
 */
class TableResponsiveManager extends React.Component {

  static propTypes = {
    // dynamic properis
    // is fetching entities?
    entitiesFetching: PropTypes.bool.isRequired,
    // results count
    resultsCount: PropTypes.number.isRequired,
    // provided table data and configuration
    tableData: PropTypes.shape(Table.PropTypes).isRequired,

    // Customize
    emptyComponent: PropTypes.element,
    loadingComponent: PropTypes.element.isRequired,
  }

  static defaultProps = {
    displayTableHeader: true,
    loadingComponent: <TableContentLoadingComponent />,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentWillMount = () => this.setState({
    tableWidth: 0,
  })

  /**
   * Called when component is resized, to force the inner table implementation at same width
  */
  onComponentResized = ({ width }) => {
    this.setState({ tableWidth: width })
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

  render() {
    const { entitiesFetching, resultsCount, tableData, emptyComponent, loadingComponent } = this.props
    const { tableWidth } = this.state
    return (
      <Measure onMeasure={this.onComponentResized}>
        <div style={allWidthStyles}>
          <LoadableContentDisplayDecorator
            isLoading={!resultsCount && entitiesFetching} // Display only the initial loading state to avoid resetting user scroll
            loadingComponent={loadingComponent}
            isEmpty={!resultsCount}
            emptyComponent={emptyComponent}
          >
            <Table
              width={tableWidth}
              {...tableData}
            />
          </LoadableContentDisplayDecorator>
        </div >
      </Measure >
    )
  }
}
export default TableResponsiveManager
