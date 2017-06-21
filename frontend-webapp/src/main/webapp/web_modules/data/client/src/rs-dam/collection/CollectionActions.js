/*
 * LICENSE_PLACEHOLDER
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
    if (has(objectValues, 'collection.geometry')) {
      objectValues.collection.geometry = CollectionActions.transformStringToJSon(objectValues.collection.geometry)
    }
    return super.createEntityUsingMultiPart(objectValues, files, pathParams, queryParams)
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
    if (has(objectValues, 'collection.geometry')) {
      objectValues.collection.geometry = CollectionActions.transformStringToJSon(objectValues.collection.geometry)
    }
    return super.updateEntityUsingMultiPart(keyValue, objectValues, files, pathParams, queryParams)
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
