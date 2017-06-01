/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

/** Specific authentication end point marker */
const SPECIFIC_ENDPOINT_MARKER = 'oauth/token'

class AuthenticateActions extends BasicSignalActions {

  /**
   * Constructor
   */
  constructor(namespace) {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.AUTHENTICATION}/${SPECIFIC_ENDPOINT_MARKER}?grant_type=password&username={username}&password={password}&scope={scope}&origineUrl={origineUrl}&requestLink={requestLink}`,
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

  login(username, password, scope, origineUrl, requestLink) {
    return this.sendSignal('POST', {}, {
      username,
      password,
      scope,
      origineUrl,
      requestLink,
    })
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
export {
  SPECIFIC_ENDPOINT_MARKER,
}
export default namespace => new AuthenticateActions(namespace)
