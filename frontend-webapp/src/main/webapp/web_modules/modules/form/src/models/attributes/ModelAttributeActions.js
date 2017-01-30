/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux store Actions for Module entities.
 */
class ModelAttributeActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'form/attributes',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/attributes?queryable=true&{queryParam}`,
      schemaTypes: {
        ENTITY: Schemas.ATTRIBUTE_MODEL,
        ENTITY_ARRAY: Schemas.ATTRIBUTE_MODEL_ARRAY,
      },
    })
  }
}

const instance = new ModelAttributeActions()
export default instance
