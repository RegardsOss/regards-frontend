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

/**
 * Return an AttributeConfiguration for the given standardAttribute. Return null if attribute is not a standard attribute
 * @param standardAttribute
 * @returns {{content: {label: *, name: *, type: *}}}
 */
const getStandardAttributeConf = (standardAttribute) => {
  if (AttributeModelController.StandardAttributes.find(attribute => attribute === standardAttribute)) {
    return {
      content: {
        label: standardAttribute,
        name: standardAttribute,
        type: AttributeModelController.getStandardAttributeType(standardAttribute),
      },
    }
  }
  return null
}

export default {
  isStandardAttribute,
  findAttributeConf,
  getStandardAttributeConf,
}
