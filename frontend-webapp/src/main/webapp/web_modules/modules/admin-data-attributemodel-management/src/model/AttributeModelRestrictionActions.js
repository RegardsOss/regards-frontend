import { BasicArrayActions } from '@regardsoss/store-utils'

class AttributeModelRestrictionsActions extends BasicArrayActions {
  constructor() {
    super({
      namespace: 'admin-data-attributemodel-management/restrictions',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam-array/models/attributes/restrictions`,
    })
  }
  getList(modelAttributeType) {
    this.entityEndpoint = `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam-array/models/attributes/restrictions?type=${modelAttributeType}`
    return super.fetchEntityList()
  }
}

const instance = new AttributeModelRestrictionsActions()
export default instance
