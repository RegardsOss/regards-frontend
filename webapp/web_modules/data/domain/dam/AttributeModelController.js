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
import find from 'lodash/find'
import get from 'lodash/get'
import isString from 'lodash/isString'

import { DataTypesEnum } from '../common/DataTypes'
import MODEL_ATTR_TYPES from './ModelAttrTypes'

/**
 * Enumeration and controller for AttributeModel entities
 *
 * @author Sébastien Binda
 */


const SPECIAL_FILES_ATTRIBUTE_NAME = 'files'

const standardAttributesKeys = {
  ipId: 'ipId',
  sipId: 'sipId',
  label: 'label',
  creationDate: 'creationDate',
  lastUpdate: 'lastUpdate',
  thumbnail: 'thumbnail',
}

/**
 * Constant to define where to find dynamic attributes in the data objects returned by the search endpoint
 * @type {string}
 */
const standardAttributes = {
  [standardAttributesKeys.ipId]: {
    key: standardAttributesKeys.ipId,
    id: -1, // use negative index to not conflict with DB attribute models
    label: 'Internal ID',
    type: MODEL_ATTR_TYPES.STRING,
    entityPathName: 'ipId',
  },
  [standardAttributesKeys.sipId]: {
    key: standardAttributesKeys.sipId,
    id: -2,
    label: 'Provider ID',
    type: MODEL_ATTR_TYPES.STRING,
    entityPathName: 'sipId',
  },
  [standardAttributesKeys.label]: {
    key: standardAttributesKeys.label,
    id: -3,
    label: 'Label',
    type: MODEL_ATTR_TYPES.STRING,
    entityPathName: 'label',
  },
  [standardAttributesKeys.creationDate]: {
    key: standardAttributesKeys.creationDate,
    id: -4,
    label: 'Creation date',
    type: MODEL_ATTR_TYPES.DATE_ISO8601,
    entityPathName: 'creationDate',
  },
  [standardAttributesKeys.lastUpdate]: {
    key: standardAttributesKeys.lastUpdate,
    id: -5,
    label: 'Last update',
    type: MODEL_ATTR_TYPES.DATE_ISO8601,
    entityPathName: 'lastUpdate',
  },
  [standardAttributesKeys.thumbnail]: {
    key: standardAttributesKeys.thumbnail,
    id: -6,
    label: 'Thumbnail',
    type: DataTypesEnum.THUMBNAIL,
    entityPathName: SPECIAL_FILES_ATTRIBUTE_NAME,
  },
}

const searchableStandardAttributes = [
  standardAttributesKeys.ipId,
  standardAttributesKeys.sipId,
  standardAttributesKeys.label,
  standardAttributesKeys.creationDate,
  standardAttributesKeys.lastUpdate,
].map(key => standardAttributes[key])

const descriptionStandardAttributes = [
  standardAttributesKeys.ipId,
  standardAttributesKeys.sipId,
  standardAttributesKeys.label,
  standardAttributesKeys.creationDate,
  standardAttributesKeys.lastUpdate,
].map(key => standardAttributes[key])

const DEFAULT_FRAGMENT = 'default'

/**
 * Returns path to attribute
 *  @param attribute : attribute model
 * @return [String] attribute access path in an entity
 */
const getAttributeAccessPath = attributeModel => get(attributeModel, 'content.jsonPath')

const findAttribute = (attributeName, attributeFragment, attributeModelsList) => find(attributeModelsList, ({ content: { name, fragment } }) => attributeName === name && attributeFragment === fragment.name)

/**
 * Retrieves an attribute from its full qualified name
 * @param attributeFullyQualifiedName attribute full qualified name
 * @param attributeModels attribute models
 * @return found attribute or undefined
 */
const findModelFromAttributeFullyQualifiedName = (attributeFullyQualifiedName, attributeModels) =>
  find(attributeModels, ({ content: { jsonPath } }) => jsonPath === attributeFullyQualifiedName)

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
  } else if (attributeName) {
    fullAttributeLabel = `${fullAttributeLabel}${attributeName}`
  } else {
    fullAttributeLabel = `${fullAttributeLabel}undefined`
  }

  return fullAttributeLabel
}

module.exports = {
  getAttributeAccessPath,
  getEntityAttributeValue,
  findModelFromAttributeFullyQualifiedName,
  findAttribute,
  getAttributeModelFullLabel,
  standardAttributes,
  standardAttributesKeys,
  searchableStandardAttributes,
  descriptionStandardAttributes,
}
