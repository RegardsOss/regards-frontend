/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import SortDesc from 'mdi-material-ui/MenuUp'
import SortAsc from 'mdi-material-ui/MenuDown'
import Sort from 'mdi-material-ui/SwapVertical'
import { themeContextType } from '@regardsoss/theme'
import { CommonDomain } from '@regardsoss/domain'

/**
 * Default sortable column header
 * @author Raphaël Mechali
 */
class SortableColumnHeaderCell extends React.Component {
  static propTypes = {
    // column ID for sort (provided by column cell wrapper)
    columnKey: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    // sort order (ascending, descending, none)
    sortingOrder: PropTypes.oneOf(CommonDomain.SORT_ORDERS),
    // sort index (used in multi sorting tables), ranging from 0 to N-1
    sortIndex: PropTypes.number,
    hideLabel: PropTypes.bool.isRequired,
    sortable: PropTypes.bool.isRequired,
    tooltip: PropTypes.string,
    onSort: PropTypes.func.isRequired,
  }

  static defaultProps = {
    sortingOrder: CommonDomain.SORT_ORDERS_ENUM.NO_SORT,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * User callback: on sort
   */
  onSort = () => {
    const {
      sortable, sortingOrder, columnKey, onSort,
    } = this.props
    if (sortable && sortingOrder) { // do change sort only when sortable with known sorting state
      onSort(columnKey, CommonDomain.getNextSortOrder(sortingOrder))
    }
  }

  render() {
    const {
      label, hideLabel, sortable, sortingOrder, sortIndex, tooltip,
    } = this.props
    const {
      style, sortButtonStyle, sortComposedIconStyle, sortIndexStyle,
    } = this.context.moduleTheme.header.sortableHeader
    return (
      <div style={style} title={tooltip}>
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
                    case CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER:
                      return <SortAsc />
                    case CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER:
                      return <SortDesc />
                    case CommonDomain.SORT_ORDERS_ENUM.NO_SORT:
                      return <Sort />
                    default:
                      throw new Error(`Unknown sorting order ${sortingOrder}`)
                  }
                })()}
              </div>
            </IconButton>
          ) : null
        }
        {hideLabel ? null : label}
      </div>)
  }
}

export default SortableColumnHeaderCell
