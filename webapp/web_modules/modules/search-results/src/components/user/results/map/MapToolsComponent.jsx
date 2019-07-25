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
import { UIDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { TableHeaderLine, TableHeaderOptionGroup } from '@regardsoss/components'
import MapSelectionModeOption from './options/MapSelectionModeOption'

/**
 * Component to show map tools
 * @author Raphaël Mechali
 */
class MapToolsComponent extends React.Component {
  static propTypes = {
    selectionMode: PropTypes.oneOf(UIDomain.MAP_SELECTION_MODES).isRequired, // current selection mode
    onSetSelectionMode: PropTypes.func.isRequired, // (mode) => ()
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { selectionMode: currentSelectionMode, onSetSelectionMode } = this.props
    const { moduleTheme: { user: { mapViewStyles } } } = this.context

    return (
      <div style={mapViewStyles.toolsBox}>
        <TableHeaderLine>
          <TableHeaderOptionGroup>
            { /** Show a selector for each available mode */
            UIDomain.MAP_SELECTION_MODES.map(selectionMode => <MapSelectionModeOption
              key={selectionMode}
              selected={currentSelectionMode === selectionMode}
              selectionMode={selectionMode}
              onSetSelectionMode={onSetSelectionMode}
            />)
          }
          </TableHeaderOptionGroup>
        </TableHeaderLine>
      </div>)
  }
}
export default MapToolsComponent
