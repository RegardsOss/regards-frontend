import { BasicArrayActions } from '@regardsoss/store-utils'

class ControllerActions extends BasicArrayActions {
  constructor() {
    super({
      namespace: 'admin-user-role-resource-access-management/controller',
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/resources/controller/{microserviceName}`,
    })
  }
}

const instance = new ControllerActions()
export default instance
