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
import { Schema, arrayOf } from 'normalizr'
import has from 'lodash/has'

export const CollectionConfiguration = {
  entityKey: 'id',
  normalizrKey: 'collection',
}

export const COLLECTION = new Schema(CollectionConfiguration.normalizrKey, {
  idAttribute: (entity) => entity.content[CollectionConfiguration.entityKey],
  assignEntity(output, key, value, input) {
    if (has(value, 'feature.geometry')) {
      try {
        // eslint-disable-next-line no-param-reassign
        output.content.feature.geometry = JSON.stringify(value.feature.geometry)
      } catch (e) {
        console.error(`Invalid attribute geometry for collection ${value.id}`, e)
      }
    }
  },
})
export const COLLECTION_ARRAY = arrayOf(COLLECTION)
