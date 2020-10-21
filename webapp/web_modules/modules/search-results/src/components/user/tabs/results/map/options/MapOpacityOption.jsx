/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Opacity from 'mdi-material-ui/Opacity'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Option to active opacity
 * @author Léo Mieulet
 */
class MapOpacityOption extends React.Component {
  static propTypes = {
    handleToggleOpacitySlider: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { handleToggleOpacitySlider, open } = this.props
    const { moduleTheme: { user: { mapViewStyles } }, intl: { formatMessage } } = this.context

    return (
      <FlatButton
          // label from configuration when provided, default otherwise
        onClick={handleToggleOpacitySlider}
        icon={<Opacity />}
        secondary={open}
        style={mapViewStyles.iconToolButton}
        title={formatMessage({ id: 'results.map.tools.tooltip.opacity' })}
      />
    )
  }
}
export default MapOpacityOption
