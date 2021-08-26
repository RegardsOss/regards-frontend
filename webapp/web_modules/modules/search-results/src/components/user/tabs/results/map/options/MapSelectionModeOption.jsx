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
import FlatButton from 'material-ui/FlatButton'
import PickOnClickSelectionMode from 'mdi-material-ui/MapMarkerRadius'
import DrawRectangleSelectionMode from 'mdi-material-ui/Select'
import { UIDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Option to chose a selection mode
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class MapSelectionModeOption extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired, // mandatory for styling purpose
    selected: PropTypes.bool.isRequired,
    mapSelectionMode: PropTypes.oneOf(UIDomain.MAP_SELECTION_MODES).isRequired, // current selection mode
    onToggleSelectionMode: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static ICON_CONSTRUCTOR_BY_MODE = {
    [UIDomain.MAP_SELECTION_MODES_ENUM.PICK_ON_CLICK]: PickOnClickSelectionMode,
    [UIDomain.MAP_SELECTION_MODES_ENUM.DRAW_RECTANGLE]: DrawRectangleSelectionMode,
  }

  /**
   * Callback: user clicked on this selector, call parent callback to set corresponding mode
   */
  onClicked = () => {
    const { mapSelectionMode, onToggleSelectionMode } = this.props
    onToggleSelectionMode(mapSelectionMode)
  }

  render() {
    const { selected, mapSelectionMode, index } = this.props
    const { moduleTheme: { user: { mapViewStyles } }, intl: { formatMessage } } = this.context
    const IconConstructor = MapSelectionModeOption.ICON_CONSTRUCTOR_BY_MODE[mapSelectionMode]
    return (
      <div style={index === 0 ? mapViewStyles.toolsBox.firstBoxStyle : null}>
        <FlatButton
          onClick={this.onClicked}
          icon={<IconConstructor />}
          secondary={selected}
          style={mapViewStyles.iconToolButton}
          title={formatMessage({ id: `results.map.tools.tooltip.for.${mapSelectionMode}` })}
        />
      </div>

    )
  }
}
export default MapSelectionModeOption
