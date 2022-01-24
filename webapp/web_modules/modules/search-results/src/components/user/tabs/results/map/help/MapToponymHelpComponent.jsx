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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import MapSearch from 'mdi-material-ui/MapSearchOutline'

/**
 * Map toponym help
 * @author Léo Mieulet
 */
class MapToponymHelpComponent extends React.Component {
  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      intl: { formatMessage },
      moduleTheme: {
        user: {
          mapViewStyles: {
            help,
          },
        },
      },
    } = this.context
    return (
      <div style={help.main.itemsWrapper}>
        <div style={help.main.itemWrapper}>
          <MapSearch style={help.main.icon} />
          <div style={help.main.title}>
            {formatMessage({ id: 'results.map.help.toponym.title' })}
          </div>
          <div style={help.main.text}>
            {formatMessage({ id: 'results.map.help.toponym.first_sentence' })}
            <br />
            {formatMessage({ id: 'results.map.help.toponym.snd_sentence' })}
          </div>
        </div>
      </div>
    )
  }
}
export default MapToponymHelpComponent
