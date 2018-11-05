/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isNumber from 'lodash/isNumber'
import values from 'lodash/values'
import { CommonDomain } from '@regardsoss/domain'

/**
 * Possible description tabs enumeration. Provides tools to resolve available tabs for entity as parameter
 * @author Raphaël Mechali
 */

/** Enumeration */
export const DESCRIPTION_TABS_ENUM = {
  PROPERTIES: 'PROPERTIES',
  DESCRIPTION: 'DESCRIPTION',
  FILES: 'FILES',
  QUICKLOOK: 'QUICKLOOK',
}

/** Enumeration values array */
export const DESCRIPTION_TABS = values(DESCRIPTION_TABS_ENUM)

/**
 * Returns online files of a given file type in entity
 * @param {*} entity entity
 * @param {*} fileType fileType
 * @return [DataFile] files found in entity for file type
 */
function getOnlineFiles(entity, fileType) {
  return get(entity, `content.files.${fileType}`, []).filter(f => f.online)
}

/**
 * Computes if description file tab should be available for entity as parameter
 * @param {Entity} entity entity
 * @return {boolean} true if description tab should be available for entity
 */
function isDescriptionTabAvailable(entity) {
  return getOnlineFiles(entity, CommonDomain.DataTypesEnum.DESCRIPTION).length > 0
}

/**
 * Computes if files tab (documents) should be available for entity as parameter
 * @param {Entity} entity entity
 * @return {boolean} true if files tab should be available for entity
 */
function isFilesTabAvailable(entity) {
  return getOnlineFiles(entity, CommonDomain.DataTypesEnum.DOCUMENT).length > 0
}

/**
 * Computes if quicklook tab should be available for entity as parameter
 * @param {Entity} entity entity
 * @return {boolean} true if quicklook tab should be available for entity
 */
function isQuicklookTabAvailable(entity) {
  const allValidQuicklooks = [
    ...getOnlineFiles(entity, CommonDomain.DataTypesEnum.QUICKLOOK_SD),
    ...getOnlineFiles(entity, CommonDomain.DataTypesEnum.QUICKLOOK_MD),
    ...getOnlineFiles(entity, CommonDomain.DataTypesEnum.QUICKLOOK_HD),
  ].filter(({ imageWidth, imageHeight }) => isNumber(imageWidth) && isNumber(imageHeight))
  return allValidQuicklooks.length > 0
}

/**
 * Returns available tabs for entity
 * @param {*} entity catalog entity
 * @return {[string]} list of tabs available for entity as parameter
 */
export function getAvailableTabs(entity) {
  const allTabs = [DESCRIPTION_TABS_ENUM.PROPERTIES]
  if (isDescriptionTabAvailable(entity)) {
    allTabs.push(DESCRIPTION_TABS_ENUM.DESCRIPTION)
  }
  if (isFilesTabAvailable(entity)) {
    allTabs.push(DESCRIPTION_TABS_ENUM.FILES)
  }
  if (isQuicklookTabAvailable(entity)) {
    allTabs.push(DESCRIPTION_TABS_ENUM.QUICKLOOK)
  }
  return allTabs
}
