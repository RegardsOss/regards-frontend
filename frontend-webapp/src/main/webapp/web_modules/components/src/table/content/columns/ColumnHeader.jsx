/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'
import IconButton from 'material-ui/IconButton'
import SortDesc from 'material-ui/svg-icons/navigation/arrow-drop-up'
import SortAsc from 'material-ui/svg-icons/navigation/arrow-drop-down'
import Sort from 'material-ui/svg-icons/action/swap-vert'
import { themeContextType } from '@regardsoss/theme'
import { getNextSortOrder, TableSortOrders } from '../../model/TableSortOrders'

/**
 * Column header cell rendering for FixedTable
 * @author Sébastien Binda
 */
class ColumnHeader extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    lineHeight: PropTypes.number.isRequired,
    sortable: PropTypes.bool,
    sortingOrder: PropTypes.oneOf(values(TableSortOrders)),
    sortAction: PropTypes.func,
    isLastColumn: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    sortingOrder: TableSortOrders.NO_SORT,
  }

  static contextTypes = {
    ...themeContextType,
  }

  runSort = () => {
    const { sortable, sortingOrder, sortAction } = this.props
    if (sortable && sortingOrder) { // do change sort only when sortable with known sorting state
      sortAction(getNextSortOrder(sortingOrder))
    }
  }

  render() {
    const { cellHeader, lastCellHeader, sortButton: { iconStyle, buttonStyle } } = this.context.moduleTheme
    const { sortable, isLastColumn, lineHeight, label, sortingOrder } = this.props

    const cellStyle = isLastColumn ? lastCellHeader : cellHeader
    const height = `${lineHeight - 1}px`
    const minHeight = height
    return (
      <div style={{ ...cellStyle, height, minHeight }}>
        {
          sortable ? (
            <IconButton
              iconStyle={iconStyle}
              style={buttonStyle}
              onTouchTap={this.runSort}
            >
              {(() => {
                switch (sortingOrder) {
                  case TableSortOrders.ASCENDING_ORDER:
                    return <SortAsc />
                  case TableSortOrders.DESCENDING_ORDER:
                    return <SortDesc />
                  case TableSortOrders.NO_SORT:
                    return <Sort />
                  default:
                    throw new Error(`Unknown sorting order ${sortingOrder}`)
                }
              })()
              }
            </IconButton>
          ) : null
        }
        <div>{label}</div>
      </div>
    )
  }
}

ColumnHeader.defaultProps = {
  fixed: false,
}

export default ColumnHeader
