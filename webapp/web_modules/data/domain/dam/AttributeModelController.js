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
import isNil from 'lodash/isNil'
import map from 'lodash/map'
import isString from 'lodash/isString'

import { DataTypesEnum } from '../common/DataTypes'
import MODEL_ATTR_TYPES from './ModelAttrTypes'

/**
 * Enumeration and controller for AttributeModel entities
 *
 * @author Sébastien Binda
 */


const standardAttributesKeys = {
  id: 'id', // === URN
  providerId: 'providerId',
  label: 'label',
  model: 'model',
  tags: 'tags',
  thumbnail: 'thumbnail',
}

/**
 * Constant to define where to find dynamic attributes in the data objects returned by the search endpoint
 * @type {string}
 */
const standardAttributes = {
  [standardAttributesKeys.id]: {
    key: standardAttributesKeys.id,
    id: -1, // use negative index to not conflict with DB attribute models
    label: 'Internal ID',
    type: MODEL_ATTR_TYPES.STRING,
    jsonPath: 'id',
  },
  [standardAttributesKeys.providerId]: {
    key: standardAttributesKeys.providerId,
    id: -2,
    label: 'Provider ID',
    type: MODEL_ATTR_TYPES.STRING,
    jsonPath: 'providerId',
  },
  [standardAttributesKeys.label]: {
    key: standardAttributesKeys.label,
    id: -3,
    label: 'Label',
    type: MODEL_ATTR_TYPES.STRING,
    jsonPath: 'label',
  },
  [standardAttributesKeys.model]: {
    key: standardAttributesKeys.label,
    id: -4,
    label: 'Model',
    type: MODEL_ATTR_TYPES.STRING,
    jsonPath: 'model',
  },
  [standardAttributesKeys.tags]: {
    key: standardAttributesKeys.label,
    id: -5,
    label: 'Tags',
    type: MODEL_ATTR_TYPES.STRING_ARRAY,
    jsonPath: 'tags',
  },
  [standardAttributesKeys.thumbnail]: {
    key: standardAttributesKeys.thumbnail,
    id: -6,
    label: 'Thumbnail',
    type: MODEL_ATTR_TYPES.URL,
    jsonPath: `files.${DataTypesEnum.THUMBNAIL}[0]`,
  },
}

/**
 * Return an AttributeConfiguration for the given standardAttribute. Return null if attribute is not a standard attribute
 * @param standardAttributeKey standard attribute key
 * @return {{content: {label: *, name: *, type: *}}} attribute in the server shape
 */
function buildAsModel(standardAttributeKey) {
  const attribute = standardAttributes[standardAttributeKey]
  return {
    content: {
      id: attribute.id,
      label: attribute.label,
      name: standardAttributeKey,
      type: attribute.type,
      jsonPath: attribute.jsonPath,
    },
  }
}

/** All standard attributes with server AttributeModel shape, in a dictionnary by ID (mimics server) */
const standardAttributesAsModel = map(standardAttributesKeys, buildAsModel)

/**
 * Returns attribute model for standard attribute name as parameter
 * @param {string} standardAttributeKey standard attribute key
 * @return {*} attribute found as an attribute model or null
 */
function getStandardAttributeModel(standardAttributeKey) {
  return standardAttributesAsModel.find(({ content: { name } }) => name === standardAttributeKey)
}


/** Pseudo attributes, marks elements that should not be used with the server */
const pseudoAttributesKeys = [
  standardAttributesKeys.thumbnail,
]

/**
 * Filters attributes that can be searched
 * @param {*} attribute attribute as returned by the server (within content field)
 * @return {bool} true when that attribute can be used to search, filter, sort...
 */
const isSearchableAttribute = attribute => !pseudoAttributesKeys.includes(get(attribute, 'content.name'))

const DEFAULT_FRAGMENT = 'default'

/**
 * Retrieves an attribute from its full qualified name, searching in standard attributes and in attributes as parameter
 * @param {string} attributeFullyQualifiedName attribute full qualified name
 * @param {*} attributeModels server attribute models, as array or ID map
 * @return {*} found attribute model or undefined
 */
const findModelFromAttributeFullyQualifiedName = (attributeFullyQualifiedName, attributeModels) => find(attributeModels, ({ content: { jsonPath } }) => jsonPath === attributeFullyQualifiedName)
  // 2 - search in statndard attributes
  || find(standardAttributesAsModel, ({ content: { jsonPath } }) => jsonPath === attributeFullyQualifiedName)

/**
  * Finds an attribute value from the full qualified path
  * @param entity entity source, structrures {content: ..., links: ... an so on}
  * @param fullQualifiedPath String|Array full qualified path array or name (obtained from getAttributeAccessPath | getAttributeFullyQualifiedName)
  * @return found value or null / undefined
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
    const subsource = currentSource[pathElement]
    return remainingPath.length && !isNil(subsource)
      ? resolveAttribute(subsource, remainingPath) // next level
      : subsource // finished path or no such attribute
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

export default {
  getEntityAttributeValue,
  getStandardAttributeModel,
  findModelFromAttributeFullyQualifiedName,
  getAttributeModelFullLabel,
  isSearchableAttribute,
  standardAttributesKeys,
  standardAttributesAsModel,
}
