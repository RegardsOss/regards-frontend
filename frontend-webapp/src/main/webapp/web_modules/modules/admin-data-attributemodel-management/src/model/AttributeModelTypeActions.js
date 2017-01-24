import { BasicArrayActions } from '@regardsoss/store-utils'

class AttributeModelTypeActions extends BasicArrayActions {
  constructor() {
    super({
      namespace: 'admin-data-attributemodel-management/types',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-dam-array/models/attributes/types`,
    })
  }
}

const instance = new AttributeModelTypeActions()
export default instance
