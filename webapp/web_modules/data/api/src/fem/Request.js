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

export const RequestFemExtractionConfiguration = {
  entityKey: 'id',
  normalizrKey: 'requests',
}

export const REQUEST_EXTRACTION_FEM = new Schema(RequestFemExtractionConfiguration.normalizrKey, {
  idAttribute: (model) => model.content[RequestFemExtractionConfiguration.entityKey],
})
export const REQUEST_EXTRACTION_FEM_ARRAY = arrayOf(REQUEST_EXTRACTION_FEM)

/**
 * request fem management for normalizr
 */
export const RequestFemConfiguration = {
  entityKey: 'providerId',
  normalizrKey: 'requests',
}

export const REQUEST_FEM = new Schema(RequestFemConfiguration.normalizrKey, {
  idAttribute: (model) => model.content[RequestFemConfiguration.entityKey],
})
export const REQUEST_FEM_ARRAY = arrayOf(REQUEST_FEM)
