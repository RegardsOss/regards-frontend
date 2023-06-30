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
import { Schema, arrayOf } from 'normalizr'

export const UIPluginConfConfiguration = {
  entityKey: 'id',
  normalizrKey: 'ui-plugin-configuration',
}

// Read more about Normalizr: https://github.com/paularmstrong/normalizr
export const UI_PLUGIN_CONFIGURATION = new Schema(UIPluginConfConfiguration.normalizrKey, {
  idAttribute: (plugin) => plugin.content[UIPluginConfConfiguration.entityKey],
  assignEntity(output, key, value, input) {
    if (value && value.conf) {
      try {
        // eslint-disable-next-line no-param-reassign
        output.content.conf = JSON.parse(value.conf)
      } catch (e) {
        console.error(`Failed to parse UIPluginConfiguration with id[${value.id}] for plugin id[${value.pluginId}]: ${e}`)
      }
    }
  },
})
export const UI_PLUGIN_CONFIGURATION_ARRAY = arrayOf(UI_PLUGIN_CONFIGURATION)
