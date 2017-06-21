/**
 * LICENSE_PLACEHOLDER
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
 * Constant to define where to find dynamic attributes in the data objects returned by the search endpoint
 * @type {string}
 */
const StandardAttributes = [
  'ipId', 'sipId', 'label', 'creationDate', 'lastUpdate', 'thumbnail', 'download',
]

const SearchableStandardAttributes = ['label', 'creationDate', 'lastUpdate']
const SPECIAL_FILES_ATTRIBUTE_NAME = 'files'
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

/**
 * Return the fixed type of a standard attribute
 * @param standardAttribute
 * @returns {*}
 */
function getStandardAttributeType(standardAttribute) {
  switch (standardAttribute) {
    case 'creationDate':
    case 'lastUpdate':
      return ATTRIBUTE_TYPES.DATE_ISO8601
    case 'thumbnail':
      return ATTRIBUTE_TYPES.THUMBNAIL
    case 'download':
      return ATTRIBUTE_TYPES.DOWNLOAD_LINK
    case 'ipId':
    case 'sipId':
    case 'label':
    default:
      return ATTRIBUTE_TYPES.STRING

  }
}

/**
 * Return true if the standardAttribute name given is a standard attribute from files attribute.
 *
 * @param standardAttribute
 * @returns {boolean}
 */
function getStandardAttributeEntityPathName(standardAttribute) {
  if (standardAttribute === 'thumbnail' || standardAttribute === 'download') {
    return SPECIAL_FILES_ATTRIBUTE_NAME
  }
  return standardAttribute
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
  getStandardAttributeType,
  findLabelFromAttributeFullyQualifiedName,
  findAttribute,
  getStandardAttributeEntityPathName,
  getAttributeModelFullLabel,
  StandardAttributes,
  SearchableStandardAttributes,
  ATTRIBUTE_TYPES,
}
