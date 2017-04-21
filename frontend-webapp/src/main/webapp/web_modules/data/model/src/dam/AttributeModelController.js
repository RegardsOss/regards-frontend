/**
 * LICENSE_PLACEHOLDER
 **/
import find from 'lodash/find'
/**
 * Controller for AttributeModel entities
 *
 * @author Sébastien Binda
 */

/**
 * Constant to define where to find dynamic attributes in the data objects returned by the search endpoint
 * @type {string}
 */
const DATA_ATTRIBUTES_FIELD = 'properties'
const DEFAULT_FRAGMENT = 'default'
const StandardAttributes = [
  'ipId', 'sipId', 'label', 'creationDate', 'lastUpdate', 'thumbmail', 'download',
]
const SPECIAL_FILES_ATTRIBUTE_NAME = 'files'

/**
 * Return the fully qualified name of the given attribute. The fully qualified name is :
 * <attribute.fragment.name>.<attribute.name>
 *
 * @param attribute
 * @returns {string}
 */
const getAttributeFullyQualifiedName = (attributeModel) => {
  if (!attributeModel || !attributeModel.content || !attributeModel.content.name) {
    return null
  }

  if (!attributeModel.content.fragment || !attributeModel.content.fragment.name || attributeModel.content.fragment.name.length === 0) {
    return attributeModel.content.name
  }
  return `${attributeModel.content.fragment.name}.${attributeModel.content.name}`
}

/**
 * Returns path to attribute
 *  @param attribute : attribute model
 * @return [String] attribute access path in an entity
 */
const getAttributeAccessPath = ({ content: { fragment, name } }) => {
  if (!fragment || !fragment.name || fragment.name === DEFAULT_FRAGMENT) {
    return [DATA_ATTRIBUTES_FIELD, name]
  }
  return [DATA_ATTRIBUTES_FIELD, fragment.name, name]
}
/**
 * Return the fully qualified name of the given attribute and ignoring the main "default" fragment
 * @param attribute
 * @returns {string}
 */
const getAttributeFullyQualifiedNameWithoutDefaultFragment = attribute => getAttributeAccessPath(attribute).join('.')

const findAttribute = (attributeName, attributeFragment, attributeModelsList) => find(attributeModelsList, ({ content: { name, fragment } }) => attributeName === name && attributeFragment === fragment.name)

const findLabelFromAttributeFullyQualifiedName = (attributeFullyQualifiedName, attributeModels) => {
  // []
  // content >> fragment >> name ("default" par exemple)
  // content >> name
  const [searchedFragmentName, searchAttributeName] = attributeFullyQualifiedName.split('.').map(a => a.toLowerCase())
  const foundAttribute = findAttribute(searchAttributeName, searchedFragmentName, attributeModels)
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
  THUMBMAIL: 'THUMBMAIL',
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
    case 'thumbmail' :
      return ATTRIBUTE_TYPES.THUMBMAIL
    case 'download' :
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
  if (standardAttribute === 'thumbmail' || standardAttribute === 'download') {
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
  const path = fullQualifiedPath instanceof String ? fullQualifiedPath.split('.') : fullQualifiedPath
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

export default {
  getAttributeAccessPath,
  getAttributeFullyQualifiedName,
  getAttributeFullyQualifiedNameWithoutDefaultFragment,
  getEntityAttributeValue,
  getStandardAttributeType,
  findLabelFromAttributeFullyQualifiedName,
  findAttribute,
  getStandardAttributeEntityPathName,
  StandardAttributes,
  ATTRIBUTE_TYPES,
  DEFAULT_FRAGMENT,
}
