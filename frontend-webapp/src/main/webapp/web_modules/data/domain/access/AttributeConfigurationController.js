/**
 * LICENSE_PLACEHOLDER
 **/
import find from 'lodash/find'
import map from 'lodash/map'
import filter from 'lodash/filter'
import AttributeModelController from '../dam/AttributeModelController'
/**
 * Controller to handle AttributeConfiguration entities.
 * @author Sébastien binda
 */

/**
 * Is the given AttributeConfiguration entity a standard attribute configuration ?
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
  return find(attributesList, attribute => AttributeModelController.getAttributeAccessPath(attribute) === attributeConfigurationToFind.attributeFullQualifiedName)
}

/**
 * Return an AttributeConfiguration for the given standardAttribute. Return null if attribute is not a standard attribute
 * @param standardAttribute standard attribute key
 * @returns {{content: {label: *, name: *, type: *}}}
 */
const getStandardAttributeConf = (standardAttribute) => {
  const attribute = AttributeModelController.standardAttributes[standardAttribute]
  if (attribute) {
    return {
      content: {
        label: attribute.label,
        name: standardAttribute,
        type: attribute.type,
        jsonPath: attribute.entityPathName,
      },
    }
  }
  return null
}

/**
 * Return an array of String containing fullyQualifiedName of all attributes configured to be used as
 * initial sort parameter for search requests.
 *
 * @param attributeConfigurations
 * @returns {Array}
 */
const getInitialSortAttributes = (attributeConfigurations) => {
  const filteredResults = filter(attributeConfigurations, conf => conf.initialSort)
  const results = map(filteredResults, filteredResult => filteredResult.attributeFullQualifiedName)
  return results
}

export default {
  isStandardAttribute,
  findAttributeConf,
  getInitialSortAttributes,
  getStandardAttributeConf,
}
