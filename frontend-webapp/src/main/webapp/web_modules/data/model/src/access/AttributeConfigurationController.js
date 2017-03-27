/**
 * LICENSE_PLACEHOLDER
 **/
import find from 'lodash/find'
import AttributeModelController from '../dam/AttributeModelController'
/**
 * Controller to handle AttributeConfiguration entities.
 * @author Sébastien binda
 */

/**
 * Does the given AttributeConfiguration entity is a standard attribute configuration ?
 *
 * @param attributeConf
 * @returns {boolean}
 */
const isStandardAttribute = (attributeConf) => {
  if (!attributeConf || !attributeConf.attributeFullQualifiedName) {
    return false
  }
  return !attributeConf.attributeFullQualifiedName.includes('.')
}

/**
 * Check if the AttributeConfiguration entity match an AttributeModel from the given list.
 * @param attributesList
 * @param attributeConfigurationToFind
 * @returns {boolean}
 */
const findAttributeConf = (attributesList, attributeConfigurationToFind) => {
  if (isStandardAttribute(attributeConfigurationToFind)) {
    return true
  }
  return find(attributesList, attribute => AttributeModelController.getAttributeFullyQualifiedName(attribute) === attributeConfigurationToFind.attributeFullQualifiedName)
}

export default {
  isStandardAttribute,
  findAttributeConf,
}
