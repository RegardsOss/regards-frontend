/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isNumber from 'lodash/isNumber'
import values from 'lodash/values'
import IconButton from 'material-ui/IconButton'
import SortDesc from 'material-ui/svg-icons/navigation/arrow-drop-up'
import SortAsc from 'material-ui/svg-icons/navigation/arrow-drop-down'
import Sort from 'material-ui/svg-icons/action/swap-vert'
import { themeContextType } from '@regardsoss/theme'
import { getNextSortOrder, TableSortOrders } from '../../model/TableSortOrders'

/**
 * Default sortable column header
 * @author Raphaël Mechali
 */
class SortableColumnHeaderCell extends React.Component {
  static propTypes = {
    // column ID for sort (how will it be retrieved by parent component)
    sortId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    // sort order (ascending, descending, none)
    sortingOrder: PropTypes.oneOf(values(TableSortOrders)),
    // sort index (used in multi sorting tables), ranging from 0 to N-1
    sortIndex: PropTypes.number,
    hideLabel: PropTypes.bool.isRequired,
    sortable: PropTypes.bool.isRequired,
    onSort: PropTypes.func.isRequired,
  }

  static defaultProps = {
    sortingOrder: TableSortOrders.NO_SORT,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * User callback: on sort
   */
  onSort = () => {
    const {
      sortable, sortingOrder, sortId, onSort,
    } = this.props
    if (sortable && sortingOrder) { // do change sort only when sortable with known sorting state
      onSort(sortId, getNextSortOrder(sortingOrder))
    }
  }

  render() {
    const {
      label, hideLabel, sortable, sortingOrder, sortIndex,
    } = this.props
    const {
      style, sortButtonStyle, sortComposedIconStyle, sortIndexStyle,
    } = this.context.moduleTheme.header.sortableHeader
    return (
      <div style={style} >
        {
          sortable ? (
            <IconButton
              style={sortButtonStyle}
              onClick={this.onSort}
            >
              <div style={sortComposedIconStyle}>
                {/* 1 - sort index if any */
                  isNumber(sortIndex) ? (
                    <div style={sortIndexStyle}>{sortIndex + 1}</div>
                  ) : null
                }
                {/* 2 - sort icon */}
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
              </div>
            </IconButton >
          ) : null
        }
        {hideLabel ? null : label}
      </div>)
  }
}

export default SortableColumnHeaderCell