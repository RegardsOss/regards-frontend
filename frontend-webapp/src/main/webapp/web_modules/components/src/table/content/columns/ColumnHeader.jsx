/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
