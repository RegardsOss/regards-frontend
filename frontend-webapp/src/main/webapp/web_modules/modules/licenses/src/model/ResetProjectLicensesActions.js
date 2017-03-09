/**
 * LICENSE_PLACEHOLDER
 **/
import { ProjectLicenseActions } from './ProjectLicenseActions'


/**
 * Reset license information signal action
 */
class ResetAcceptedLicensesActions extends ProjectLicenseActions {

  constructor() {
    super('licenses/reset', '/reset')
  }

  /**
   * Send reset accepted licenses
   * @param project project
   */
  sendResetAcceptedLicenses(project) {
    return this.sendSignal('PUT', null, { project })
  }

}

export default new ResetAcceptedLicensesActions()

