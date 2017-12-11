/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

export const ModuleConfiguration = {
  entityKey: 'id',
  normalizrKey: 'modules',
}


// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const moduleSchema = new Schema(ModuleConfiguration.normalizrKey, {
  idAttribute: module =>
    module.content[ModuleConfiguration.entityKey],
  assignEntity(output, key, value, input) {
    if (value && value.conf) {
      try {
        // eslint-disable-next-line no-param-reassign
        output.content.conf = JSON.parse(value.conf)
      } catch (e) {
        console.error(`Invalid Module configuration for module ${value.id}`)
        console.error(`Conf: ${value.conf}`)
      }
    }
  },
})

// Schemas for API responses.
export default {
  MODULE: moduleSchema,
  MODULE_ARRAY: arrayOf(moduleSchema),
}
