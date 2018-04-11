/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const DatasetConfiguration = {
  entityKey: 'id',
  normalizrKey: 'datasets',
}


// Read more about Normalizr: https://github.com/paularmstrong/normalizr
const datasetSchema = new Schema(DatasetConfiguration.normalizrKey, {
  idAttribute: dataset =>
    dataset.content[DatasetConfiguration.entityKey],
  assignEntity(output, key, value, input) {
    if (value && value.geometry) {
      try {
        // eslint-disable-next-line no-param-reassign
        output.content.geometry = JSON.stringify(value.geometry)
      } catch (e) {
        console.error(`Invalid attribute geometry for collection ${value.id}`, e)
      }
    }
  },
})

// Schemas for API responses.
module.exports = {
  DATASET: datasetSchema,
  DATASET_ARRAY: arrayOf(datasetSchema),
  DatasetConfiguration,
}
