/**
 * LICENSE_PLACEHOLDER
 **/
import Schemas from '@regardsoss/api'
import { BasicPageableActions } from '@regardsoss/store-utils'

class DatasetActions extends BasicPageableActions {
  constructor() {
    super({
      namespace: 'admin-accessright-management/dataset',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/datasets`,
      schemaTypes: {
        ENTITY: Schemas.DATASET,
        ENTITY_ARRAY: Schemas.DATASET_ARRAY,
      },
    })
  }
}


const instance = new DatasetActions()
export default instance
