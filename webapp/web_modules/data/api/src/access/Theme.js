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
import { Schema, arrayOf } from 'normalizr'

export const ThemeConfiguration = {
  entityKey: 'id',
  normalizrKey: 'theme',
}

// Read more about Normalizr: https://github.com/paularmstrong/normalizr
export const THEME = new Schema(ThemeConfiguration.normalizrKey, {
  idAttribute: (theme) => theme.content[ThemeConfiguration.entityKey],
  assignEntity(output, key, value, input) {
    if (value && value.configuration) {
      try {
        // eslint-disable-next-line no-param-reassign
        output.content.configuration = JSON.parse(value.configuration)
      } catch (e) {
        console.error(`Invalid Theme configuration for theme ${value.id}`)
        console.error('Conf:', value.configuration)
      }
    }
  },
})
export const THEME_ARRAY = arrayOf(THEME)
