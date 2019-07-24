/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { TableSelectAllOption } from '@regardsoss/components'
import { tableSelectors, tableActions } from '../../../../../clients/TableClient'
import { selectors as searchSelectors } from '../../../../../clients/SearchEntitiesClient'

/**
 * Container to select all elements
 * @author Raphaël Mechali
 */
export class SelectAllContainer extends React.Component {
  static mapStateToProps = state => ({
    // are all elements selected?
    allSelected: tableSelectors.areAllSelected(state, searchSelectors),
    // results metadata
    pageMetadata: searchSelectors.getMetaData(state),
  })

  static mapDispatchToProps = dispatch => ({
    dispatchSelectAll: () => dispatch(tableActions.selectAll()),
    dispatchUnselectAll: () => dispatch(tableActions.unselectAll()),
  })

  static propTypes = {
    // from mapStateToProps
    allSelected: PropTypes.bool.isRequired,
    pageMetadata: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // from mapDispatchToProps
    dispatchSelectAll: PropTypes.func.isRequired,
    dispatchUnselectAll: PropTypes.func.isRequired,
  }

  onToggleSelectAll = () => {
    const { dispatchSelectAll, dispatchUnselectAll } = this.props
    if (this.props.allSelected) {
      dispatchUnselectAll()
    } else {
      dispatchSelectAll()
    }
  }

  render() {
    const { pageMetadata, allSelected } = this.props
    return (
      <TableSelectAllOption
        disabled={!pageMetadata || !pageMetadata.totalElements}
        allSelected={allSelected}
        onToggleSelectAll={this.onToggleSelectAll}
      />
    )
  }
}

export default connect(
  SelectAllContainer.mapStateToProps,
  SelectAllContainer.mapDispatchToProps,
)(SelectAllContainer)
