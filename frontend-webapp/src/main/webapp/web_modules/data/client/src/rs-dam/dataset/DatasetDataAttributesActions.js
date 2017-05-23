import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

export default class DatasetDataAttributesActions extends BasicPageableActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/datasets/data/attributes`,
      schemaTypes: {
        ENTITY: Schemas.ATTRIBUTE_MODEL,
        ENTITY_ARRAY: Schemas.ATTRIBUTE_MODEL_ARRAY,
      },
    })
  }
}
