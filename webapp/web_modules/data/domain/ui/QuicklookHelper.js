/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import values from 'lodash/values'
import { DATA_TYPES_ENUM } from '../common/DataTypes'
import DataFileController from '../dam/DataFileController'

/**
 * Helps handling quicklooks in entities
 * @author Raphaël Mechali
 */
export class QuicklookHelper {
  /** All quicklook types (used as iterator) */
  static ALL_QUICKLOOK_TYPES = [DATA_TYPES_ENUM.QUICKLOOK_SD, DATA_TYPES_ENUM.QUICKLOOK_MD, DATA_TYPES_ENUM.QUICKLOOK_HD]

  /**
   * Stores, by quicklook type, the fallback preferences order
   */
  static QUICKLOOK_FALLBACK_PREFERENCE = {
    [DATA_TYPES_ENUM.QUICKLOOK_SD]: [DATA_TYPES_ENUM.QUICKLOOK_SD, DATA_TYPES_ENUM.QUICKLOOK_MD, DATA_TYPES_ENUM.QUICKLOOK_HD],
    [DATA_TYPES_ENUM.QUICKLOOK_MD]: [DATA_TYPES_ENUM.QUICKLOOK_MD, DATA_TYPES_ENUM.QUICKLOOK_HD, DATA_TYPES_ENUM.QUICKLOOK_SD],
    [DATA_TYPES_ENUM.QUICKLOOK_HD]: [DATA_TYPES_ENUM.QUICKLOOK_HD, DATA_TYPES_ENUM.QUICKLOOK_MD, DATA_TYPES_ENUM.QUICKLOOK_SD],
  }

  /** Unknown group */
  static UNKNOWN_GROUPNAME = 'UNKNOWN_QUICKLOOK_GROUPNAME'

  /**
   * Returns matching quicklook or fallback. pre: should not be null
   * @param {string} quicklookType quicklook data file type
   * @param {*} group quicklook group, matching QuicklookDefinition but without fallback applied
   * @return {*} found quicklook or fallback, as a DataManagementShapes.DataFile, granted to be defined
   * if at least one quicklook in group as parameter is defined.
   */
  static getQLDimensionOrFallback(quicklookType, group) {
    // search the first defined quicklook file by preference order
    return QuicklookHelper.QUICKLOOK_FALLBACK_PREFERENCE[quicklookType].reduce(
      (acc, nextType) => acc || group[nextType], null)
  }

  /**
   * Returns quicklooks found in files compiled as an array of quicklook definitions
   * @param {*} files map of files (matching CatalogShapes.Entity files field)
   * @param {string} primaryGroupKey primary quicklook group key
   * @param {string} accessToken current user access when there is one. Used to compute files access URI
   * @param {string} projectName current project (tenant) name. Used to compute files access URI
   * @param {function} canDisplay data file validity predicate like (dataFile) => (boolean)
   * @return {[*]} entity quicklook definitions, as an array of UIShapes.QuicklookDefinition where data file URI has been
   * computed with access token and project name. Groups are ordered primary first, then, in sub partitions, by group label.
   * Missing SD / MD / HD files are left empty
   */
  static getQuicklooks(files, primaryGroupKey, accessToken, projectName, canDisplay = DataFileController.isAvailableNow) {
    if (!files) {
      return []
    }
    // A - Group quicklooks by group name in map (update URI to use token project name when internal data files)
    const groupsMap = QuicklookHelper.ALL_QUICKLOOK_TYPES.reduce((acc, type) => {
      const typeFiles = files[type] || []
      return typeFiles.reduce((acc2, file) => {
        // 0 - Ignore files that cannot be displayed
        if (canDisplay(file)) {
          // 1 - identify file group and check if the file is part of primary group
          const fileMetaTypes = get(file, 'types', [])
          const groupName = fileMetaTypes.find((keyword) => keyword !== primaryGroupKey)
          const groupKey = groupName || QuicklookHelper.UNKNOWN_GROUPNAME
          const primary = fileMetaTypes.some((keyword) => keyword === primaryGroupKey)
          // 2 - assemble group, re-using it from accumulator, as that group may have already found
          const previouslyFoundGroup = acc2[groupKey] || { }
          return {
            ...acc2,
            // Nota: undefined label (groupName) is allowed, but group key must have a value
            [groupKey]: {
            // report any previous encoutended group data (for previously encountered types)
              ...previouslyFoundGroup,
              // group def
              label: groupName,
              primary: previouslyFoundGroup.primary || primary,
              // report the file in current type (override any previously known QL with same resolution)
              [type]: {
                ...file,
                uri: DataFileController.getFileURI(file, accessToken, projectName),
              },
            },
          }
        }
        return acc2
      }, acc)
    }, {})
    // B - complete each group to hold an SD/MD/HD file (with fallback mechanism), then sort on primary / group name
    return values(groupsMap)
      .sort((group1, group2) => {
        if (group1.primary && !group2.primary) {
          return -1 // primary first
        }
        if (!group1.primary && group2.primary) {
          return 1 // primary first
        }
        // when primary is same value, sort on label
        const g1ComparisonLabel = group1.label ? group1.label.toLowerCase() : ''
        const g2ComparisonLabel = group2.label ? group2.label.toLowerCase() : ''
        return g1ComparisonLabel.localeCompare(g2ComparisonLabel) // locale compare is OK here (as label will not change on locale)
      })
  }

  /**
   * Returns quicklooks found in entity compiled as an array of quicklook definitions
   * @param {*} entity matching CatalogShapes.Entity
   * @param {string} primaryGroupKey primary quicklook group key
   * @param {string} accessToken current user access when there is one. Used to compute files access URI
   * @param {string} projectName current project (tenant) name. Used to compute files access URI
   * @param {function} canDisplay data file validity predicate like (dataFile) => (boolean)
   * @return {[*]} entity quicklook definitions, as an array of UIShapes.QuicklookDefinition where data file URI has been
   * computed with access token and project name. Groups are ordered primary first, then, in sub partitions, by group label
   */
  static getQuicklooksIn(entity, primaryGroupKey, accessToken, projectName, canDisplay = DataFileController.isAvailableNow) {
    return QuicklookHelper.getQuicklooks(get(entity, 'content.files'), primaryGroupKey, accessToken, projectName, canDisplay)
  }
}
