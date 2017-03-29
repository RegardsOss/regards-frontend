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
 * Return the fully qualified name of the given attribute and ignoring the main "default" fragment
 *
 * @param attribute
 * @returns {string}
 */
const getAttributeFullyQualifiedNameWithoutDefaultFragment = (attribute) => {
  if (!attribute.content.fragment || !attribute.content.fragment.name ||
    attribute.content.fragment.name === DEFAULT_FRAGMENT) {
    return `${DATA_ATTRIBUTES_FIELD}.${attribute.content.name}`
  }
  return `${DATA_ATTRIBUTES_FIELD}.${attribute.content.fragment.name}.${attribute.content.name}`
}

const findAttribute = (attributeName, attributeFragment, attributeModelsList) => find(attributeModelsList, ({ content: { name, fragment } }) => attributeName === name && attributeFragment === fragment.name)

const findLabelFromAttributeFullyQualifiedName = (attributeFullyQualifiedName, attributeModels) => {
  // []
  // content >> fragment >> name ("default" par exemple)
  // content >> name
  const [searchedFragmentName, searchAttributeName] = attributeFullyQualifiedName.split('.').map(a => a.toLowerCase())
  const foundAttribute = findAttribute(searchAttributeName, searchedFragmentName, attributeModels)
  return foundAttribute ? foundAttribute.content.label : attributeFullyQualifiedName
}

const StandardAttributes = [
  'ipId', 'sipId', 'label', 'creationDate', 'lastUpdate', 'files',
]
const STANDARD_ATTRIBUTE_TYPE = 'STRING'


export default {
  getAttributeFullyQualifiedName,
  getAttributeFullyQualifiedNameWithoutDefaultFragment,
  StandardAttributes,
  findLabelFromAttributeFullyQualifiedName,
  findAttribute,
  DEFAULT_FRAGMENT,
  STANDARD_ATTRIBUTE_TYPE,
}
