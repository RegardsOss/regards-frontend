/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

/**
 * NotifyLicenseUpdatedActions: sends notification to backend that license was updated. The backend should
 * then reset project user license ack
 */
export class NotifyLicenseUpdatedActions extends BasicSignalActions {
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ADMIN}/license/{project}/reset`,
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

