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

export const EndpointConfiguration = {
  entityKey: 'id',
  normalizrKey: 'endpoint',
}

const schema = new Schema(EndpointConfiguration.normalizrKey, {
  idAttribute: entity => entity.content[EndpointConfiguration.entityKey],
  assignEntity: (output, key, value, input) => {
    if (key === 'content') {
      // eslint-disable-next-line no-param-reassign
      output = `${output.content.resource}@${output.content.verb}`
    }
  },
})

// Schemas for API responses.
export default {
  ENDPOINT: schema,
  ENDPOINT_ARRAY: arrayOf(schema),
}
