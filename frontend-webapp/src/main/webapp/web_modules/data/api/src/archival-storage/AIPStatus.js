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

/**
 * AIP status management for normalizr
 */
export const AIPStatusConfiguration = {
  entityKey: 'id',
  normalizrKey: 'aips',
}

const aipStatusSchemaSchema = new Schema(AIPStatusConfiguration.normalizrKey, {
  idAttribute: model => model.content[AIPStatusConfiguration.entityKey],
})

// Schemas for API responses.
export default {
  AIP_STATUS: aipStatusSchemaSchema,
  AIP_STATUS_ARRAY: arrayOf(aipStatusSchemaSchema),
  AIPStatusConfiguration,
}
