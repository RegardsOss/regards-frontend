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

export const EntityConfiguration = {
  entityKey: 'ipId',
  normalizrKey: 'entities',
}


// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const entitySchema = new Schema(EntityConfiguration.normalizrKey, {
  idAttribute: entity =>
    entity.content[EntityConfiguration.entityKey]
  ,
})

// Schemas for API responses.
module.exports = {
  ENTITY: entitySchema,
  ENTITY_ARRAY: arrayOf(entitySchema),
  EntityConfiguration,
}
