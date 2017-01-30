import Schemas from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

class FragmentActions extends BasicListActions {
  constructor() {
    super({
      namespace: 'admin-data-attributemodel-management/fragment',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam-list/models/fragments`,
      schemaTypes: {
        ENTITY: Schemas.FRAGMENT,
        ENTITY_ARRAY: Schemas.FRAGMENT_ARRAY,
      },
    })
  }
}

const instance = new FragmentActions()
export default instance
