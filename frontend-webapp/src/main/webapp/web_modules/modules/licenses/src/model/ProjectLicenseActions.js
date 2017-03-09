/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'


const baseURL = `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/project/{project}/license`

/**
 * Project license actions: retrieves and updates user licence accepted state
 */
export class ProjectLicenseActions extends BasicSignalActions {
  constructor(namespace = 'licenses/information', urlSubpath = '') {
    super({ entityEndpoint: `${baseURL}${urlSubpath}`, namespace })
  }
  /**
   * Fetch project license information
   * @param project project
   */
  fetchLicenseInformation(project) {
    return this.sendSignal('GET', null, { project })
  }

  /**
   * Send reset accepted licenses
   * @param project project
   */
  sendAcceptLicense(project) {
    return this.sendSignal('PUT', null, { project })
  }
}

// export instance
export default new ProjectLicenseActions()

