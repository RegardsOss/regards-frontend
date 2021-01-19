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
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import TableSelectionModes from '../../model/TableSelectionModes'
import TableActions from '../../model/TableActions' // class for prop type
import { TableSelectors } from '../../model/TableSelectors' // class for prop type
import { CheckBoxCell } from './CheckBoxCell'

/**
 * Table selection cell, displaying and controlling row selection given a table client
 * Note: it acts as a container to bind the selection state of the row
 * @author Raphaël Mechali
 */
export class TableSelectionCell extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { tableSelectors }) {
    return {
      toggledElements: tableSelectors.getToggledElements(state),
      selectionMode: tableSelectors.getSelectionMode(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, { rowIndex, tableActions }) {
    return {
      dispatchToggleRowSelection: (entity) => dispatch(tableActions.toggleElement(rowIndex, entity)),
    }
  }

  static propTypes = {
    // common cell content properties
    rowIndex: PropTypes.number.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    entity: PropTypes.object.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    tableActions: PropTypes.instanceOf(TableActions), // Table actions instance, used in mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    tableSelectors: PropTypes.instanceOf(TableSelectors), // Table selectors instance, used in onPropertiesUpdate
    // from map state to props
    toggledElements: PropTypes.objectOf(PropTypes.object).isRequired, // inner object is entity type
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    // from map dispatch to props
    dispatchToggleRowSelection: PropTypes.func.isRequired,
  }

  /**
   * On user row selection (switches selection state for row index)
   */
  onToggleRowSelection = () => {
    // retrieve entity by its index in state
    const { dispatchToggleRowSelection, entity } = this.props
    if (entity) {
      dispatchToggleRowSelection(entity)
    }
  }

  /**
   * Is row as parameter selected?
   * @param rowIndex row index
   * @return true if row is selected
   */
  isSelectedRow = () => {
    const { rowIndex, selectionMode, toggledElements } = this.props
    return (selectionMode === TableSelectionModes.includeSelected && !!toggledElements[rowIndex])
      || (selectionMode === TableSelectionModes.excludeSelected && !toggledElements[rowIndex])
  }

  render() {
    return <CheckBoxCell selected={this.isSelectedRow()} onToggleSelection={this.onToggleRowSelection} />
  }
}

export default connect(
  TableSelectionCell.mapStateToProps,
  TableSelectionCell.mapDispatchToProps,
)(TableSelectionCell)
