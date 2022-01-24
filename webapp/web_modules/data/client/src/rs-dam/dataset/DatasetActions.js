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
import { DATASET, DATASET_ARRAY } from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'
import has from 'lodash/has'
import isString from 'lodash/isString'

export default class DatasetActions extends BasicPageableActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/datasets`,
      entityPathVariable: 'dataset_id',
      schemaTypes: {
        ENTITY: DATASET,
        ENTITY_ARRAY: DATASET_ARRAY,
      },
    })
  }

  /**
   * Serialize the geometry attribute before create / update dataset
   * @param objectValues
   * @param files
   * @param pathParams
   * @param queryParams
   */
  createEntity(objectValues, pathParams, queryParams) {
    const objectValuesWithGeometryAsJson = {
      ...objectValues,
    }
    if (has(objectValuesWithGeometryAsJson, 'feature.geometry')) {
      objectValuesWithGeometryAsJson.feature.geometry = DatasetActions.transformStringToJSon(objectValues.feature.geometry)
    }
    return super.createEntity(objectValuesWithGeometryAsJson, pathParams, queryParams)
  }

  /**
   * Serialize the geometry attribute before create / update dataset
   * @param keyValue
   * @param objectValues
   * @param files
   * @param pathParams
   * @param queryParams
   */
  updateEntity(keyValue, objectValues, pathParams, queryParams) {
    const objectValuesWithGeometryAsJson = {
      ...objectValues,
    }
    if (has(objectValuesWithGeometryAsJson, 'feature.geometry')) {
      objectValuesWithGeometryAsJson.feature.geometry = DatasetActions.transformStringToJSon(objectValues.feature.geometry)
    }
    return super.updateEntity(keyValue, objectValuesWithGeometryAsJson, pathParams, queryParams)
  }

  static transformStringToJSon(valueAsString) {
    if (isString(valueAsString)) {
      try {
        // eslint-disable-next-line no-param-reassign
        return JSON.parse(valueAsString)
      } catch (e) {
        console.error('Invalid attribute geometry for dataset', e)
      }
    }
    return undefined
  }
}
