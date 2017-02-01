/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux store Actions for Module entities.
 */
class DatasetActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'form/datasets',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-catalog/datasets`,
      schemaTypes: {
        ENTITY: Schemas.DATASET,
        ENTITY_ARRAY: Schemas.DATASET_ARRAY,
      },
    })
  }
}

const instance = new DatasetActions()
export default instance
