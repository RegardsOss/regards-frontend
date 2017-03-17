/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

const namespace = 'common/authentication-manager'

export class AuthenticateActions extends BasicSignalActions {

  /** Specific authentication end point marker */
  static SPECIFIC_ENDPOINT_MARKER = 'oauth/token'

  /**
   * Constructor
   */
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${AuthenticateActions.SPECIFIC_ENDPOINT_MARKER}?grant_type=password&username={username}&password={password}&scope={scope}`,
      namespace,
      bypassErrorMiddleware: true,
    })
    this.LOCK_SESSION = `${namespace}/LOCK_SESSION`
    this.AUTHENTICATION_CHANGED = `${namespace}/AUTHENTICATION_CHANGED`
  }

  /**
   * Locks current user session
   */
  lockSession() {
    return {
      type: this.LOCK_SESSION,
    }
  }

  login(username, password, scope) {
    return this.sendSignal('POST', {}, { username, password, scope })
  }

  logout() {
    return this.flush()
  }

  /**
   * Notifies authentication state changed. Especially used for role borrowing, as we need a
   * new token / authentication date managed. May be used to change other authentication values later
   * @param result: new authentication state result (as returned by the server)
   */
  notifyAuthenticationChanged(result) {
    return {
      type: this.AUTHENTICATION_CHANGED,
      result,
    }
  }

}

export default new AuthenticateActions()
