import Schemas from '@regardsoss/api'
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
        ENTITY: Schemas.DATASET,
        ENTITY_ARRAY: Schemas.DATASET_ARRAY,
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
  createEntityUsingMultiPart(objectValues, files, pathParams, queryParams) {
    if (has(objectValues, 'dataset.geometry')) {
      objectValues.dataset.geometry = DatasetActions.transformStringToJSon(objectValues.dataset.geometry)
    }
    return super.createEntityUsingMultiPart(objectValues, files, pathParams, queryParams)
  }

  /**
   * Serialize the geometry attribute before create / update dataset
   * @param keyValue
   * @param objectValues
   * @param files
   * @param pathParams
   * @param queryParams
   */
  updateEntityUsingMultiPart(keyValue, objectValues, files, pathParams, queryParams) {
    if (has(objectValues, 'dataset.geometry')) {
      objectValues.dataset.geometry = DatasetActions.transformStringToJSon(objectValues.dataset.geometry)
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
