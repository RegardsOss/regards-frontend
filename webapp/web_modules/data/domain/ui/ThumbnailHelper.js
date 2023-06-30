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
import { DATA_TYPES_ENUM } from '../common'
import DataFileController from '../dam/DataFileController'

/**
 * Thumbnail helper, to retrieve thumbnail of fallback from quicklooks
 * @author Raphaël Mechali
 */
export class ThumbnailHelper {
  /**
   * Searches for a usable thumbnail file in entity files
   * @param {[*]} files array of thumbnail files, matching DataManagementShapes.DataFile
   * @param {string} primaryGroupKey primary quicklook group key
   * @param {string} accessToken current user access when there is one. Used to compute files access URI
   * @param {string} projectName current project (tenant) name. Used to compute files access URI
   * @param {function} canDisplay data file validity predicate like (dataFile) => (boolean)
   * @return {*} found file, matching DataManagementShapes.DataFile shape, or null (nota: file URI takes authentication in account)
   */
  static getThumbnail(thumbnailFiles = [], accessToken, projectName, canDisplay = DataFileController.isAvailableNow) {
    return thumbnailFiles.reduce((foundFile, currentFile) => foundFile || (canDisplay(currentFile) ? {
      ...currentFile,
      uri: DataFileController.getFileURI(currentFile, accessToken, projectName), // take auth information in account
    } : null), null)
  }

  /** Preferred quicklook dimension order when searching to a thumbnail replacement */
  static QL_FALLBACK_DIM_PREF = [
    DATA_TYPES_ENUM.QUICKLOOK_SD,
    DATA_TYPES_ENUM.QUICKLOOK_MD,
    DATA_TYPES_ENUM.QUICKLOOK_HD,
  ]

  /**
   * Search for a fallback in quicklook definitions (prefers small dimensions, except if there is a primary group)
   * @param {[*]} quicklookDefinitions array of UIShapes.QuicklookDefinition (nota: the 'canDisplay' filter must
   * have been already applied, thus the groups contains only displayable elements)
   */
  static getQuicklookFallback(quicklookDefinitions) {
    if (quicklookDefinitions.length > 0) {
      const firstGroup = quicklookDefinitions[0]
      if (firstGroup.primary) {
        // A - Primary group has more priority than any others, search fallback in that group first
        const primaryQL = ThumbnailHelper.QL_FALLBACK_DIM_PREF.reduce(
          (foundFile, fileType) => {
            if (foundFile) {
              return foundFile
            }
            const currentFile = firstGroup[fileType]
            return currentFile
          }, null)
        if (primaryQL) {
          // exit case A : a primary group quicklook was found, use it on top of others
          return primaryQL
        }
      }
      // B - No primary group or no valid quicklook file in primary group: search for any other fallback by
      // dimension preference (using loops to return ASAP)
      for (let i = 0; i < ThumbnailHelper.QL_FALLBACK_DIM_PREF.length; i += 1) {
        const currentDimType = ThumbnailHelper.QL_FALLBACK_DIM_PREF[i]
        // inner loop: search over all groups for the current dimension
        // skip first group if it was primary but failed providing a fallback in (A)
        for (let j = (firstGroup.primary ? 1 : 0); j < quicklookDefinitions.length; j += 1) {
          const currentFile = quicklookDefinitions[j][currentDimType]
          if (currentFile) {
            // exit case B: found the first available quicklook as thumbnail replacement matching preference order
            return currentFile
          }
        }
      }
    }
    // exit case C: no available quicklook for replacement
    return null
  }
}
