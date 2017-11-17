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
import find from 'lodash/find'
import get from 'lodash/get'
import isString from 'lodash/isString'
/**
 * Controller for AttributeModel entities
 *
 * @author Sébastien Binda
 */

/**
 * Enum for all available attribute types.
 * @type {{DEFAULT: string, BOOLEAN: string, DATE_ISO8601: string, DATE_INTERVAL: string, DATE_ARRAY: string, DOUBLE_INTERVAL: string, INTEGER: string, INTEGER_INTERVAL: string, LONG_INTERVAL: string, STRING: string, URL: string, THUMBMAIL: string, DOWNLOAD_LINK: string}}
 */
const ATTRIBUTE_TYPES = {
  DEFAULT: 'DEFAULT',
  BOOLEAN: 'BOOLEAN',
  DATE_ISO8601: 'DATE_ISO8601',
  DATE_INTERVAL: 'DATE_INTERVAL',
  DATE_ARRAY: 'DATE_ARRAY',
  DOUBLE_INTERVAL: 'DOUBLE_INTERVAL',
  INTEGER: 'INTEGER',
  INTEGER_INTERVAL: 'INTEGER_INTERVAL',
  LONG_INTERVAL: 'LONG_INTERVAL',
  STRING: 'STRING',
  URL: 'URL',
  THUMBNAIL: 'THUMBNAIL',
  DOWNLOAD_LINK: 'DOWNLOAD_LINK',
}

const SPECIAL_FILES_ATTRIBUTE_NAME = 'files'

const standardAttributesKeys = {
  ipId: 'ipId',
  sipId: 'sipId',
  label: 'label',
  creationDate: 'creationDate',
  lastUpdate: 'lastUpdate',
  thumbnail: 'thumbnail',
  download: 'download',
}

/**
 * Constant to define where to find dynamic attributes in the data objects returned by the search endpoint
 * @type {string}
 */
const standardAttributes = {
  [standardAttributesKeys.ipId]: {
    key: standardAttributesKeys.ipId,
    id: -1, // use negative index to not conflict with DB attribute models
    label: 'IP Identifier',
    type: ATTRIBUTE_TYPES.STRING,
    entityPathName: 'ipId',
  },
  [standardAttributesKeys.sipId]: {
    key: standardAttributesKeys.sipId,
    id: -2,
    label: 'SIP identifier',
    type: ATTRIBUTE_TYPES.STRING,
    entityPathName: 'sipId',
  },
  [standardAttributesKeys.label]: {
    key: standardAttributesKeys.label,
    id: -3,
    label: 'Label',
    type: ATTRIBUTE_TYPES.STRING,
    entityPathName: 'label',
  },
  [standardAttributesKeys.creationDate]: {
    key: standardAttributesKeys.creationDate,
    id: -4,
    label: 'Creation date',
    type: ATTRIBUTE_TYPES.DATE_ISO8601,
    entityPathName: 'creationDate',
  },
  [standardAttributesKeys.lastUpdate]: {
    key: standardAttributesKeys.lastUpdate,
    id: -5,
    label: 'Last update',
    type: ATTRIBUTE_TYPES.DATE_ISO8601,
    entityPathName: 'lastUpdate',
  },
  [standardAttributesKeys.thumbnail]: {
    key: standardAttributesKeys.thumbnail,
    id: -6,
    label: 'Thumbnail',
    type: ATTRIBUTE_TYPES.THUMBNAIL,
    entityPathName: SPECIAL_FILES_ATTRIBUTE_NAME,
  },
  [standardAttributesKeys.download]: {
    key: standardAttributesKeys.download,
    id: -7,
    label: 'Download',
    type: ATTRIBUTE_TYPES.DOWNLOAD_LINK,
    entityPathName: SPECIAL_FILES_ATTRIBUTE_NAME,
  },
}

const searchableStandardAttributes = ['label', 'creationDate', 'lastUpdate']
const descriptionStandardAttributes = ['ipId', 'sipId', 'label', 'creationDate', 'lastUpdate']

const DEFAULT_FRAGMENT = 'default'

/**
 * Returns path to attribute
 *  @param attribute : attribute model
 * @return [String] attribute access path in an entity
 */
const getAttributeAccessPath = attributeModel => get(attributeModel, 'content.jsonPath')

const findAttribute = (attributeName, attributeFragment, attributeModelsList) => find(attributeModelsList, ({ content: { name, fragment } }) => attributeName === name && attributeFragment === fragment.name)

const findLabelFromAttributeFullyQualifiedName = (attributeFullyQualifiedName, attributeModels) => {
  // []
  // content >> fragment >> name ("default" for example)
  // content >> name
  const foundAttribute = find(attributeModels, ({ content: { jsonPath } }) => jsonPath === attributeFullyQualifiedName)
  return foundAttribute ? foundAttribute.content.label : attributeFullyQualifiedName
}

/**
  * Finds an attribute value from the full qualified path
  * @param entity entity source, structrures {content: ..., links: ... an so on}
  * @param fullQualifiedPath String|Array full qualified path array or name (obtained from getAttributeAccessPath | getAttributeFullyQualifiedName)
  * @return found value or null
  */
function getEntityAttributeValue(entity, fullQualifiedPath) {
  // 1 - check and prepare attributes
  if (!fullQualifiedPath) {
    throw new Error('Cannot extract any entity value from unknown path')
  }
  if (!entity || !entity.content) {
    throw new Error('Cannot extract any entity value from null entity')
  }
  // prepare path as array
  const path = isString(fullQualifiedPath) ? fullQualifiedPath.split('.') : fullQualifiedPath
  if (path.length < 1) {
    throw new Error('An attribute path cannot have less than one element!')
  }
  // 2 - recursive resolution (break when path length === 1)
  const resolveAttribute = (currentSource, [pathElement, ...remainingPath]) => {
    const subsource = currentSource[pathElement] || null
    return remainingPath.length && subsource ?
      resolveAttribute(subsource, remainingPath) : // next level
      subsource // finished path or no such attribute
  }
  return resolveAttribute(entity.content, path)
}

/**
 * Method to retrieve full label of a given AttributeModel. The full labels is a string composed with fragment and attribute names.
 * @param attribute
 * @returns {string}
 */
function getAttributeModelFullLabel(attribute) {
  let fullAttributeLabel = ''

  const fragment = get(attribute, 'content.fragment.name')
  const attributeLabel = get(attribute, 'content.label')
  const attributeName = get(attribute, 'content.name')
  if (fragment && (fragment !== DEFAULT_FRAGMENT)) {
    fullAttributeLabel = `${fragment} - `
  }

  if (attributeLabel) {
    fullAttributeLabel = `${fullAttributeLabel}${attributeLabel}`
  } else if (name) {
    fullAttributeLabel = `${fullAttributeLabel}${attributeName}`
  } else {
    fullAttributeLabel = `${fullAttributeLabel}undefined`
  }

  return fullAttributeLabel
}

export default {
  getAttributeAccessPath,
  getEntityAttributeValue,
  findLabelFromAttributeFullyQualifiedName,
  findAttribute,
  getAttributeModelFullLabel,
  standardAttributes,
  standardAttributesKeys,
  searchableStandardAttributes,
  descriptionStandardAttributes,
  ATTRIBUTE_TYPES,
}
