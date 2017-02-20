/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

class AuthenticateActions extends BasicSignalActions {


  /**
   * Constructor
   */
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/oauth/token?grant_type=password&username={username}&password={password}&scope={scope}`,
      namespace: 'common/authentication-manager',
      bypassErrorMiddleware: true,
    })
  }

  login(username, password, scope = 'instance') {
    return this.sendSignal('POST', {}, { username, password, scope })
  }

  logout() {
    return this.flush()
  }
}

export default new AuthenticateActions()
