/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import {
  CheckBoxCell, TableSelectionModes, TableActions,
} from '@regardsoss/components'
import values from 'lodash/values'
import { BasicSelector } from '@regardsoss/store-utils'
import { connect } from '@regardsoss/redux'

/**
 * Table selection cell, displaying and controlling row selection given a table client
 * @author Théo Lasserre
 */
class ToggleElementComponent extends React.Component {
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
  static mapDispatchToProps(dispatch, { tableActions }) {
    return {
      dispatchToggleRowSelection: (entity) => dispatch(tableActions.toggleElement(entity.content.id, entity)),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    entity: PropTypes.object.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    tableActions: PropTypes.instanceOf(TableActions), // Table actions instance, used in mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    tableSelectors: PropTypes.instanceOf(BasicSelector), // Table selectors instance, used in onPropertiesUpdate
    // from map state to props
    toggledElements: PropTypes.objectOf(PropTypes.object).isRequired, // inner object is entity type
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    // from map dispatch to props
    dispatchToggleRowSelection: PropTypes.func.isRequired,
  }

  /**
   * On user row selection
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
   * @return true if row is selected
   */
  isSelectedRow = () => {
    const { selectionMode, toggledElements, entity } = this.props
    return (selectionMode === TableSelectionModes.includeSelected && !!toggledElements[entity.content.id])
      || (selectionMode === TableSelectionModes.excludeSelected && !toggledElements[entity.content.id])
  }

  render() {
    return <CheckBoxCell selected={this.isSelectedRow()} onToggleSelection={this.onToggleRowSelection} />
  }
}

export default connect(
  ToggleElementComponent.mapStateToProps,
  ToggleElementComponent.mapDispatchToProps,
)(ToggleElementComponent)
