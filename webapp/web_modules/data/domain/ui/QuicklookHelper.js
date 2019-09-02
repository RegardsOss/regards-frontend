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

/**
 * Helps handling quicklooks in entities
 * @author Raphaël Mechali
 */
export class QuicklookHelper {
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
   * @return {[*]} entity quicklook definitions, as an array of UIShapes.QuicklookDefinition
   */
  static getQuicklooksIn(entity) {
    // Extract actual quickloks groups files
    const actualMap = { // TODO: current version: support multiple quicklook groups system
      main: {
        [DATA_TYPES_ENUM.QUICKLOOK_SD]: get(entity, `content.files.${DATA_TYPES_ENUM.QUICKLOOK_SD}[0]`, null),
        [DATA_TYPES_ENUM.QUICKLOOK_MD]: get(entity, `content.files.${DATA_TYPES_ENUM.QUICKLOOK_MD}[0]`, null),
        [DATA_TYPES_ENUM.QUICKLOOK_HD]: get(entity, `content.files.${DATA_TYPES_ENUM.QUICKLOOK_HD}[0]`, null),
      },
    }

    // B - Return definition with group name and quicklook files, using fallback when required
    return reduce(actualMap, (acc, quicklooks, groupName) => {
      if (quicklooks[DATA_TYPES_ENUM.QUICKLOOK_SD] || quicklooks[DATA_TYPES_ENUM.QUICKLOOK_MD] || quicklooks[DATA_TYPES_ENUM.QUICKLOOK_HD]) {
        return [
          ...acc, {
            label: groupName,
            [DATA_TYPES_ENUM.QUICKLOOK_SD]: QuicklookHelper.getQuicklookOrFallback(DATA_TYPES_ENUM.QUICKLOOK_SD, quicklooks),
            [DATA_TYPES_ENUM.QUICKLOOK_MD]: QuicklookHelper.getQuicklookOrFallback(DATA_TYPES_ENUM.QUICKLOOK_MD, quicklooks),
            [DATA_TYPES_ENUM.QUICKLOOK_HD]: QuicklookHelper.getQuicklookOrFallback(DATA_TYPES_ENUM.QUICKLOOK_HD, quicklooks),
          }]
      }
      return acc
    }, [])
  }
}
