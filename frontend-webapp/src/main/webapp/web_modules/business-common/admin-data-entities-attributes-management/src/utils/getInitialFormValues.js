/**
* LICENSE_PLACEHOLDER
**/
import forEach from 'lodash/forEach'
import has from 'lodash/has'
import set from 'lodash/set'
import get from 'lodash/get'
import map from 'lodash/map'
import { MODEL_ATTR_TYPES, DEFAULT_FRAGMENT } from '@regardsoss/domain/dam'
import isRestrictedWithEnum from './isRestrictedWithEnum'

/**
 * Return the key to get the value inside the entity returned by the API
 * @param modelAttribute
 * @returns {string}
 */
const retrieveEntityKeyInsideEntity = (modelAttribute) => {
  if (modelAttribute.content.attribute.fragment.name !== DEFAULT_FRAGMENT) {
    return `content.properties.${modelAttribute.content.attribute.fragment.name}.${modelAttribute.content.attribute.name}`
  }
  return `content.properties.${modelAttribute.content.attribute.name}`
}

/**
 * Return the key that we'll use on the form
 * @param modelAttribute
 * @returns {string}
 */
const retrieveFieldKeyUsedOnForm = (modelAttribute) => {
  if (modelAttribute.content.attribute.fragment.name !== DEFAULT_FRAGMENT) {
    return `${modelAttribute.content.attribute.fragment.name}.${modelAttribute.content.attribute.name}`
  }
  return `${DEFAULT_FRAGMENT}.${modelAttribute.content.attribute.name}`
}

/**
 * Transform an array [<value>,..] into an array of object [{value: <value>},..]
 * @param attrValue
 * @returns {Array}
 */
const transformArrayIntoObjectValue = (attrValue) => {
  const attrValueForForm = map(attrValue, arrayValue => ({ value: arrayValue }))
  return attrValueForForm
}

/**
 * Alter the formResult with the attrValue for the corresponding modelAttribute
 * @param formResult
 * @param attrValue
 * @param modelAttribute
 * @returns {null}
 */
const saveAttributeValueInForm = (formResult, attrValue, modelAttribute) => {
  const { fragment } = modelAttribute.content.attribute
  // Add the fragment if it was not already there
  if (fragment.name !== DEFAULT_FRAGMENT) {
    // Create the fragment in the properties if not existing
    if (!has(formResult, fragment.name)) {
      set(formResult, fragment.name, {})
    }
  }
  switch (modelAttribute.content.attribute.type) {
    case MODEL_ATTR_TYPES.STRING:
    case MODEL_ATTR_TYPES.DOUBLE:
    case MODEL_ATTR_TYPES.LONG:
    case MODEL_ATTR_TYPES.INTEGER:
    case MODEL_ATTR_TYPES.URL:
    case MODEL_ATTR_TYPES.BOOLEAN:
    case MODEL_ATTR_TYPES.DATE:
      set(formResult, retrieveFieldKeyUsedOnForm(modelAttribute), attrValue)
      break

    case MODEL_ATTR_TYPES.STRING_ARRAY:
      if (isRestrictedWithEnum(modelAttribute)) {
        set(formResult, retrieveFieldKeyUsedOnForm(modelAttribute), attrValue)
      } else {
        set(formResult, retrieveFieldKeyUsedOnForm(modelAttribute), transformArrayIntoObjectValue(attrValue))
      }
      break

    case MODEL_ATTR_TYPES.INTEGER_ARRAY:
    case MODEL_ATTR_TYPES.DOUBLE_ARRAY:
    case MODEL_ATTR_TYPES.LONG_ARRAY:
      set(formResult, retrieveFieldKeyUsedOnForm(modelAttribute), transformArrayIntoObjectValue(attrValue))
      break

    case MODEL_ATTR_TYPES.DATE_ARRAY:
    case MODEL_ATTR_TYPES.INTEGER_INTERVAL:
    case MODEL_ATTR_TYPES.DOUBLE_INTERVAL:
    case MODEL_ATTR_TYPES.DATE_INTERVAL:
    case MODEL_ATTR_TYPES.LONG_INTERVAL:
    default:
      console.error(`The type of attribute ${modelAttribute.content.attribute.type} is not correctly implemented`)
  }
  return null
}

/**
 * Retrieve the value of a property from the API payload
 * @param entity
 * @param modelAttribute
 * @returns {*}
 */
const retrieveCurrentValue = (entity, modelAttribute) => get(entity, retrieveEntityKeyInsideEntity(modelAttribute), null)

/**
 * Return form data
 * @param entity
 * @param modelAttributeList
 * @returns {{}}
 */
function getInitialFormValues(modelAttributeList, entity) {
  const properties = {
    // Create the default fragment object
    [DEFAULT_FRAGMENT]: {},
  }
  forEach(modelAttributeList, (modelAttribute) => {
    const currentValue = retrieveCurrentValue(entity, modelAttribute)
    if (currentValue) {
      saveAttributeValueInForm(properties, currentValue, modelAttribute)
    }
  })
  return properties
}

export default getInitialFormValues
