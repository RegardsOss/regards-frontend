import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

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
}
