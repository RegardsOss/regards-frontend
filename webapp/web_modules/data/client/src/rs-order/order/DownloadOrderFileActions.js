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
import { BasicActions } from '@regardsoss/store-utils'

/**
 * Pseudo actions to obtain the link to download an order file and build corresponding dependencies
 */
class DownloadOrderFileActions extends BasicActions {
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ORDER}/orders/files/{dataFileId}`,
    })
  }

  /**
   * Returns file download link
   * @param {number} dataFileId data file ID
   * @param {string} token logged user token (required for order files)
   * @return {string} file download URL
   */
  getFileDownloadLink(dataFileId, token) {
    return BasicActions.buildURL(this.entityEndpoint, { dataFileId }, { token })
  }
}

export default DownloadOrderFileActions
