import { BasicArrayActions } from '@regardsoss/store-utils'

class ControllerActions extends BasicArrayActions {
  constructor() {
    super({
      namespace: 'admin-user-role-resource-access-management/controller',
      entityEndpoint: `${GATEWAY_HOSTNAME}/api/v1/rs-admin/resources/controller/%0`,
    })
  }
}

const instance = new ControllerActions()
export default instance
