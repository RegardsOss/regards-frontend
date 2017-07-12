/*
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
 */
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'
import has from 'lodash/has'
import isString from 'lodash/isString'

/**
 * Redux actions to handle Collection entities from backend server.
 *
 * @author Léo Mieulet
 */
export default class CollectionActions extends BasicListActions {

  /**
   * Construtor
   * @param namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/collections`,
      entityPathVariable: 'collection_id',
      schemaTypes: {
        ENTITY: Schemas.COLLECTION,
        ENTITY_ARRAY: Schemas.COLLECTION_ARRAY,
      },
    })
  }

  /**
   * Serialize the geometry attribute before create / update collection
   * @param objectValues
   * @param files
   * @param pathParams
   * @param queryParams
   */
  createEntityUsingMultiPart(objectValues, files, pathParams, queryParams) {
    const objectValuesWithGeometryAsJson = {
      ...objectValues,
    }
    if (has(objectValues, 'collection.geometry')) {
      objectValuesWithGeometryAsJson.collection.geometry = CollectionActions.transformStringToJSon(objectValues.collection.geometry)
    }
    return super.createEntityUsingMultiPart(objectValuesWithGeometryAsJson, files, pathParams, queryParams)
  }

  /**
   * Serialize the geometry attribute before create / update collection
   * @param keyValue
   * @param objectValues
   * @param files
   * @param pathParams
   * @param queryParams
   */
  updateEntityUsingMultiPart(keyValue, objectValues, files, pathParams, queryParams) {
    const objectValuesWithGeometryAsJson = {
      ...objectValues,
    }
    if (has(objectValuesWithGeometryAsJson, 'collection.geometry')) {
      objectValuesWithGeometryAsJson.collection.geometry = CollectionActions.transformStringToJSon(objectValues.collection.geometry)
    }
    return super.updateEntityUsingMultiPart(keyValue, objectValuesWithGeometryAsJson, files, pathParams, queryParams)
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
