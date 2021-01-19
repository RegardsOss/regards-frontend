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
import Mode3D from 'mdi-material-ui/Earth'
import Mode2D from 'mdi-material-ui/EarthBox'
import { UIDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Options to chose a view mode
 * @author Théo Lasserre
 */
class MapViewModeOption extends React.Component {
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    viewMode: PropTypes.oneOf(UIDomain.MAP_VIEW_MODES).isRequired, // current view mode
    onToggleViewMode: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired, // mandatory for styling purpose (last element)
    addStylingOption: PropTypes.bool.isRequired, // add specific styling or not
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static ICON_CONSTRUCTOR_BY_MODE = {
    [UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D]: Mode3D,
    [UIDomain.MAP_VIEW_MODES_ENUM.MODE_2D]: Mode2D,
  }

  /**
   * Callback: user clicked on this selector, call parent callback to set corresponding mode
   */
  onClicked = () => {
    const { viewMode, onToggleViewMode } = this.props
    onToggleViewMode(viewMode)
  }

  render() {
    const {
      selected, viewMode, addStylingOption, index,
    } = this.props
    const { moduleTheme: { user: { mapViewStyles } }, intl: { formatMessage } } = this.context
    const IconConstructor = MapViewModeOption.ICON_CONSTRUCTOR_BY_MODE[viewMode]
    return (
      <div style={addStylingOption && index === 1 ? mapViewStyles.toolsBox.lastBoxStyle : null}>
        <FlatButton
          onClick={this.onClicked}
          icon={<IconConstructor />}
          secondary={selected}
          style={mapViewStyles.iconToolButton}
          title={formatMessage({ id: `results.map.tools.tooltip.for.${viewMode}` })}
        />
      </div>

    )
  }
}
export default MapViewModeOption
