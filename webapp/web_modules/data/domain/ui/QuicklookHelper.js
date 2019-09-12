/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import reduce from 'lodash/reduce'
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

  /**
   * Returns matching quicklook or fallback. pre: should not be null
   * @param {string} quicklookType quicklook data file type
   * @param {*} quicklooks map holding actual quicklooks by data file type
   * @return {*} found quicklook or fallback, as a DataManagementShapes.DataFile, granted to be defined
   * if at least one quicklook in quicklooks parameter is
   */
  static getQuicklookOrFallback(quicklookType, quicklooks) {
    // search the first defined quicklook file by preference order
    return QuicklookHelper.QUICKLOOK_FALLBACK_PREFERENCE[quicklookType].reduce(
      (acc, nextType) => acc || quicklooks[nextType], null)
  }

  /**
   * Returns quicklooks found in entity compiled as an array of quicklook definitions
   * @param {*} entity matching CatalogShapes.Entity
   * @param {string} accessToken current user access when there is one. Used to compute files access URI
   * @param {string} projectName current project (tenant) name. Used to compute files access URI
   * @return {[*]} entity quicklook definitions, as an array of UIShapes.QuicklookDefinition where data file URI has been computed with access token and project name
   */
  static getQuicklooksIn(entity, accessToken, projectName) {
    // Extract actual quickloks groups files (update URI to use token project name when internal data files)
    // TODO: also take in account online status
    const actualMap = { // TODO: current version: support multiple quicklook groups system
      main: QuicklookHelper.ALL_QUICKLOOK_TYPES.reduce((acc, type) => {
        const file = get(entity, `content.files.${type}[0]`, null)
        if (file) {
          return {
            ...acc,
            [type]: {
              ...file,
              uri: DataFileController.getFileURI(file, accessToken, projectName),
            },
          }
        }
        // type not found
        return acc
      }, {}),
    }

    // B - Return definition with group name and quicklook files, using fallback when required
    return reduce(actualMap, (acc, quicklooks, groupName) => {
      if (quicklooks[DATA_TYPES_ENUM.QUICKLOOK_SD] || quicklooks[DATA_TYPES_ENUM.QUICKLOOK_MD] || quicklooks[DATA_TYPES_ENUM.QUICKLOOK_HD]) {
        return [
          ...acc, {
            label: groupName,
            ...QuicklookHelper.ALL_QUICKLOOK_TYPES.reduce((qlAcc, type) => {
              const quickookForType = QuicklookHelper.getQuicklookOrFallback(type, quicklooks)
              return {
                ...qlAcc,
                [type]: quickookForType,
              }
            }, {}),
          }]
      }
      return acc
    }, [])
  }
}
