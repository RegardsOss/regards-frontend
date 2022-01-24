/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import { DATA_TYPES_ENUM } from '@regardsoss/domain/common'
import { DataFileController } from '@regardsoss/domain/dam'

export class QuotaDownloadUtils {
  /**
   * Is file as parameter, by its attributes, constrained by quota functionnality
   * @param {string} fileType from DATA_TYPES_ENUM
   * @param {boolean} reference is file reference?
   */
  static isConstrainedByQuota(fileType, reference) {
    return fileType === DATA_TYPES_ENUM.RAWDATA && !reference
  }

  /**
   * Computes if a file can be downloaded
   * @param {boolean} fileAvailable is file available for download (not offline)
   * @param {string} fileType from DATA_TYPES_ENUM
   * @param {boolean} reference is file reference?
   * @param {*} quotaInfo matching QuotaInfo
   * @param {string} accessToken used here as authentication marker
   * @return {true} if file can be downloaded with current quota
   */
  static canDownload(fileAvailable, fileType, reference, quotaInfo, accessToken) {
    // file can be downloaded when
    // A - available
    // AND (B) - not an internal stored raw data (ignores quota rules)
    // OR (C) - user is authenticated and download is not disabled by quota (respects quota rules)
    return fileAvailable
    && (!QuotaDownloadUtils.isConstrainedByQuota(fileType, reference) // (B)
    || (!!accessToken && !quotaInfo.downloadDisabled)) // (C)
  }

  /**
   * Computes if a data file can be downloaded
   * @param {*} file matching DataManagementShapes.DataFile
   * @param {*} quotaInfo matching QuotaInfo
   * @param {string} accessToken used here as authentication marker
   * @return {true} if file can be downloaded with current quota
   */
  static canDownloadFile(file, quotaInfo, accessToken) {
    return QuotaDownloadUtils.canDownload(DataFileController.isAvailableNow(file), file.dataType, file.reference, quotaInfo, accessToken)
  }
}
