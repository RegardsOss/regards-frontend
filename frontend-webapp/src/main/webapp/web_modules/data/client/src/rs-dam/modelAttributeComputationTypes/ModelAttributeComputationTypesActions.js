/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * We only use POST and DELETE on this BasicList
 */

export default class ModelAttributeComputationTypesActions extends BasicListActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DAM}/models/assocs/computation/types`,
      schemaTypes: {
        ENTITY: Schemas.MODEL_ATTRIBUTE_COMPUTATION_TYPES,
        ENTITY_ARRAY: Schemas.MODEL_ATTRIBUTE_COMPUTATION_TYPES_ARRAY,
      },
    })
  }
}

