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
import Select from 'mdi-material-ui/Select'

/**
 * Map draw help
 * @author Léo Mieulet
 */
class MapDrawHelpComponent extends React.Component {
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
      <div style={help.main.itemWrapper}>
        <Select style={help.main.icon} />
        <div style={help.main.title}>
          {formatMessage({ id: 'results.map.help.draw.title' })}
        </div>
        <div style={help.main.text}>
          {formatMessage({ id: 'results.map.help.draw.first_sentence' })}
          <br />
          {formatMessage({ id: 'results.map.help.draw.snd_sentence' })}
          <br />
          {formatMessage({ id: 'results.map.help.draw.thr_sentence' })}

        </div>
      </div>
    )
  }
}
export default MapDrawHelpComponent
