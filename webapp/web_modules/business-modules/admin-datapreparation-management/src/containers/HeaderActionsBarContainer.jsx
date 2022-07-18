/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { WorkerShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { requestSelectors } from '../clients/WorkerRequestClient'
import { tableSelectors } from '../clients/TableClient'
import HeaderActionsBarComponent from '../components/HeaderActionsBarComponent'

/**
 * Comment Here
 * @author Théo Lasserre
 */
export class HeaderActionsBarContainer extends React.Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onRetry: PropTypes.func.isRequired,

    // table sorting, column visiblity & filters management
    onChangeColumnsVisibility: PropTypes.func.isRequired,

    // from mapStateToProps
    tableSelection: PropTypes.arrayOf(WorkerShapes.Request),
    selectionMode: PropTypes.string.isRequired,
    areAllSelected: PropTypes.bool.isRequired,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      tableSelection: tableSelectors.getToggledElementsAsList(state),
      selectionMode: tableSelectors.getSelectionMode(state),
      areAllSelected: tableSelectors.areAllSelected(state, requestSelectors),
    }
  }

  render() {
    const {
      onChangeColumnsVisibility, columns,
      tableSelection, selectionMode, areAllSelected,
      onDelete, onRetry,
    } = this.props
    return (
      <HeaderActionsBarComponent
        columns={columns}
        onChangeColumnsVisibility={onChangeColumnsVisibility}
        areAllSelected={areAllSelected}
        selectionMode={selectionMode}
        tableSelection={tableSelection}
        onDelete={onDelete}
        onRetry={onRetry}
      />
    )
  }
}
export default connect(
  HeaderActionsBarContainer.mapStateToProps,
  null)(HeaderActionsBarContainer)
