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

import Checkbox from 'material-ui/Checkbox'
import { Column } from '../../../shapes/Column'

/**
 * Column visibility checkbox
 * @author Raphaël Mechali
 */
class ColumnVisibilityCheckBox extends React.Component {
  static propTypes = {
    column: Column.isRequired,
    onToggleVisibility: PropTypes.func.isRequired,
  }

  /**
   * User callback: toggles column visibility
   */
  onToggleVisibility = () => {
    const { column, onToggleVisibility } = this.props
    onToggleVisibility(column)
  }

  render() {
    const { column } = this.props
    return (
      <Checkbox
        label={column.label}
        checked={column.visible}
        onCheck={this.onToggleVisibility}
      />
    )
  }
}
export default ColumnVisibilityCheckBox
