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
import { UIDomain } from '@regardsoss/domain'
import { connect } from '@regardsoss/redux'
import { TableSelectAllOption } from '@regardsoss/components'
import { getTableClient } from '../../../../../../clients/TableClient'
import { getSearchCatalogClient } from '../../../../../../clients/SearchEntitiesClient'

/**
 * Container to select all elements
 * @author Raphaël Mechali
 */
export class SelectAllContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { tabType }) {
    const { tableSelectors } = getTableClient(tabType)
    const { searchSelectors } = getSearchCatalogClient(tabType)
    return {
      // are all elements selected?
      allSelected: tableSelectors.areAllSelected(state, searchSelectors),
      // results metadata
      pageMetadata: searchSelectors.getMetaData(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { tabType }) {
    const { tableActions } = getTableClient(tabType)
    return {
      dispatchSelectAll: () => dispatch(tableActions.selectAll()),
      dispatchUnselectAll: () => dispatch(tableActions.unselectAll()),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    tabType: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired, // used in mapStateToProps and mapDispatchToProps
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
