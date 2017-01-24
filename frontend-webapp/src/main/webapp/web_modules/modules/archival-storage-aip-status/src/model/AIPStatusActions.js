/**
 * LICENSE_PLACEHOLDER
 */
import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class AIPStatusConfiguration extends BasicListActions {
  constructor() {
    super({
      namespace: 'archival-storage/aip-status',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-archival-storage/aip-status`, // TODO check me when back is ready!
      schemaTypes: {
        ENTITY: Schemas.AIP_STATUS,
        ENTITY_ARRAY: Schemas.AIP_STATUS_ARRAY,
      },
    })
  }
}

const instance = new AIPStatusConfiguration()
export default instance
