/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

/**
 * My user actions, user interface: fetches authenticated project user and updates it (GET / PUT on the same URL)
 */
class MyUserActions extends BasicSignalActions {

  /**
   * Constructor
   */
  constructor(namespace) {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/users/myuser`,
      namespace,
      bypassErrorMiddleware: true,
    })
  }

  /**
   * Fetches my project user from server
   */
  fetchMyUser() {
    return this.sendSignal('GET')
  }

  updateMyUser(projectUser) {
    return this.sendSignal('PUT')
  }

}

export default MyUserActions
