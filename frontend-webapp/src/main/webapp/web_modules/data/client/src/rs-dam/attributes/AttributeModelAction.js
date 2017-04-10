/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

/**
 * Redux store Action for Module entities. Fetches attribute model
 */
export default class AttributeModelAction extends BasicPageableActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/attributes`,
      schemaTypes: {
        ENTITY: Schemas.ATTRIBUTE_MODEL,
        ENTITY_ARRAY: Schemas.ATTRIBUTE_MODEL_ARRAY,
      },
    })
  }
}
