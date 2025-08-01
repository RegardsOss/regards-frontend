/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DownloadFileActions } from '@regardsoss/store-utils'

/**
 * Pseudo actions to obtain the link to orders list summary CSV file
 */
class DownloadOrderSummaryCSVFileActions extends DownloadFileActions {
  constructor(namespace) {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ORDER}/orders/csv`,
      namespace,
      headers: {
        Accept: '*/*', // Accept: all
      },
    })
  }

  /**
   * Download csv file
   * @param {object} optional request parameters needed to filter results
   * @return {string} csv download URL
   */
  downloadCSV(requestParameters = {}) {
    return this.download(null, null, 'POST', requestParameters)
  }
}

export default DownloadOrderSummaryCSVFileActions
