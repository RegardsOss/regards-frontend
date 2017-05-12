import { BasicSignalActions } from '@regardsoss/store-utils'


export default class ConnectionTestActions extends BasicSignalActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-dam/connections/{connectionId}`,
    })
  }
}