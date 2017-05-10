/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

/**
 * NotifyLicenseUpdatedActions: sends notification to backend that license was updated. The backend should
 * then reset project user license ack
 */
export class NotifyLicenseUpdatedActions extends BasicSignalActions {
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/license/{project}/reset`,
      namespace: 'licenses/reset',
    })
  }
  /**
   * Send license updated notification accepted licenses
   * @param project project
   */
  sendLicenseUpdatedNotification(project) {
    return this.sendSignal('PUT', null, { project })
  }
}

// export instance
export default new NotifyLicenseUpdatedActions()

