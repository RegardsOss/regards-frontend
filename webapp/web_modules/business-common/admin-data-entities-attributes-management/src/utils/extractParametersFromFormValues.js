/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import find from 'lodash/find'
import { MODEL_ATTR_TYPES, DEFAULT_FRAGMENT } from '@regardsoss/domain/dam'
import isRestrictedWithEnum from './isRestrictedWithEnum'

/**
 * Transform an array of object [{value: <value>},..] into an array [<value>,..]
 * @param attrValue
 * @returns {Array}
 */
const transformObjectValueIntoArray = (attrValue) => {
  const attrValueSentToBack = map(attrValue, (arrayValue) => arrayValue.value)
  return attrValueSentToBack
}

/**
 * Transform an array of object [{value: <value>},..] into an array [<value>,..] of integer
 * @param attrValue
 * @returns {Array}
 */
const transformObjectValueIntoArrayInteger = (attrValue) => {
  const attrValueSentToBack = map(attrValue, (arrayValue) => parseInt(arrayValue.value, 10))
  return attrValueSentToBack
}

/**
 * Transform an array of object [{value: <value>},..] into an array [<value>,..] of integer
 * @param attrValue
 * @returns {Array}
 */
const transformObjectValueIntoArrayFloat = (attrValue) => {
  const attrValueSentToBack = map(attrValue, (arrayValue) => parseFloat(arrayValue.value, 10))
  return attrValueSentToBack
}

/**
 * Retrieve an attribute value, depending of its type
 * @param attrValue
 * @param modelAttribute
 * @returns {*}
 */
const getAttributeValue = (attrValue, modelAttribute) => {
  switch (modelAttribute.content.attribute.type) {
    case MODEL_ATTR_TYPES.STRING:
    case MODEL_ATTR_TYPES.URL:
    case MODEL_ATTR_TYPES.BOOLEAN:
    case MODEL_ATTR_TYPES.DATE_ISO8601:
      return attrValue
    case MODEL_ATTR_TYPES.INTEGER:
      return parseInt(attrValue, 10)
    case MODEL_ATTR_TYPES.DOUBLE:
    case MODEL_ATTR_TYPES.LONG:
      return parseFloat(attrValue)
    case MODEL_ATTR_TYPES.STRING_ARRAY:
      if (isRestrictedWithEnum(modelAttribute)) {
        return attrValue
      }
      return transformObjectValueIntoArray(attrValue)

    case MODEL_ATTR_TYPES.INTEGER_ARRAY:
      return transformObjectValueIntoArrayInteger(attrValue)

    case MODEL_ATTR_TYPES.DOUBLE_ARRAY:
    case MODEL_ATTR_TYPES.LONG_ARRAY:
      return transformObjectValueIntoArrayFloat(attrValue)

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
 * Generate the parameters object using a formValues
 * returns the value of entity.parameters that we can send to the API
 * @param formValues
 * @returns {{}}
 */
const extractParametersFromFormValues = (formValues, modelAttributeList) => {
  const result = {}
  forEach(formValues.properties, (fragmentValues, fragmentName) => {
    forEach(fragmentValues, (attrValue, attrName) => {
      const modelAttr = find(modelAttributeList, (modelAttribute) => modelAttribute.content.attribute.name === attrName && modelAttribute.content.attribute.fragment.name === fragmentName)
      const { fragment } = modelAttr.content.attribute
      // Retrieve the value, depending of the modelAttr
      const attrValueSentToBack = getAttributeValue(attrValue, modelAttr)
      if (fragment.name !== DEFAULT_FRAGMENT) {
        if (!result[fragment.name]) {
          result[fragment.name] = {}
        }
        result[fragment.name][attrName] = attrValueSentToBack
      } else {
        result[attrName] = attrValueSentToBack
      }
    })
  })
  return result
}

export default extractParametersFromFormValues
