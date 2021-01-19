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
import { CheckBoxCell } from '@regardsoss/components'

/**
 * Option (checkbox) to toggle element selection on / off.
 * @author Raphaël Mechali
 */
class ToggleElementSelectionComponent extends React.Component {
  static propTypes = {
    entity: PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
    rowIndex: PropTypes.number.isRequired,
    selectedElements: PropTypes.arrayOf(PropTypes.string).isRequired,
    onToggleSelection: PropTypes.func.isRequired,
  }

  /**
   * User callback: selection of the row has been toggled, propagate event to parent
   */
  onToggleSelection = () => {
    const { rowIndex, onToggleSelection } = this.props
    onToggleSelection(rowIndex)
  }

  render() {
    const { selectedElements, entity } = this.props
    return <CheckBoxCell selected={selectedElements.includes(entity.id)} onToggleSelection={this.onToggleSelection} />
  }
}
export default ToggleElementSelectionComponent
