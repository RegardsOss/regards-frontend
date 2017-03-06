/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

const namespace = 'common/authentication-manager'

class AuthenticateActions extends BasicSignalActions {


  /**
   * Constructor
   */
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/oauth/token?grant_type=password&username={username}&password={password}&scope={scope}`,
      namespace,
      bypassErrorMiddleware: true,
    })
    this.LOCK_SESSION = `${namespace}/LOCK_SESSION`
  }

  /**
   * Locks current user session
   */
  lockSession() {
    return {
      type: this.LOCK_SESSION,
    }
  }

  login(username, password, scope = 'instance') {
    return this.sendSignal('POST', {}, { username, password, scope })
  }

  logout() {
    return this.flush()
  }
}

export default new AuthenticateActions()
