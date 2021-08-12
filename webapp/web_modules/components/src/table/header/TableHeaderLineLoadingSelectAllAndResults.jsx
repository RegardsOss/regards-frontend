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
import TableHeaderLine from './TableHeaderLine'
import TableHeaderContentBox from './TableHeaderContentBox'
import TableHeaderResultsCountMessage from './TableHeaderResultsCountMessage'
import TableHeaderLoadingComponent from './TableHeaderLoadingComponent'
import TableHeaderSelectAll from './TableHeaderSelectAll'

/**
 * Displays results on left and a button to select all.
 * Alternates children or loading display at center.
 */
class TableHeaderLineLoadingSelectAllAndResults extends React.Component {
  static propTypes = {
    loadedResultsCount: PropTypes.number, // when not provided, shows only total
    resultsCount: PropTypes.number,
    isFetching: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    // select all props
    saDisabled: PropTypes.bool,
    saAllSelected: PropTypes.bool,
    saOnToggleSelectAll: PropTypes.func,
    saSelectionEnabled: PropTypes.bool,
  }

  static defaultProps = {
    isFetching: false,
    resultsCount: 0,
    children: null,
  }

  render() {
    const {
      children = null, isFetching, loadedResultsCount, resultsCount, saDisabled, saAllSelected, saOnToggleSelectAll, saSelectionEnabled,
    } = this.props
    return (
      <TableHeaderLine>
        {/* results count group */}
        <TableHeaderContentBox>
          <TableHeaderSelectAll
            disabled={saDisabled}
            allSelected={saAllSelected}
            onToggleSelectAll={saOnToggleSelectAll}
            selectionEnabled={saSelectionEnabled}
            isFetching={isFetching}
          />
          <TableHeaderResultsCountMessage loadedResultsCount={loadedResultsCount} count={resultsCount} isFetching={isFetching} />
        </TableHeaderContentBox>
        { /* loading or custom childrens groups */}
        <TableHeaderLoadingComponent loading={isFetching}>
          {children}
        </TableHeaderLoadingComponent>
        {/* On right: placeholder */}
        <div />
      </TableHeaderLine>
    )
  }
}

export default TableHeaderLineLoadingSelectAllAndResults
