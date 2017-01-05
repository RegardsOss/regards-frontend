/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux store Actions for Module entities.
 */
class DatasetModelActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'form/datasets/models',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-dam/models?type=DATASET`,
      schemaTypes: {
        ENTITY: Schemas.MODEL,
        ENTITY_ARRAY: Schemas.MODEL_ARRAY,
      },
    })
  }
}

const instance = new DatasetModelActions()
export default instance
