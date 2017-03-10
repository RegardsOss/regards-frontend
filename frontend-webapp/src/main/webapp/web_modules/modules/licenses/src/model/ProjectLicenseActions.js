/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'


/**
 * Project license actions: retrieves and updates user licence accepted state
 */
export class ProjectLicenseActions extends BasicSignalActions {
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/project/{project}/license`,
      namespace: 'licenses/information',
    })
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

