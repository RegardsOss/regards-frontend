/**
 * LICENSE_PLACEHOLDER
 **/
import forEach from 'lodash/forEach'
import find from 'lodash/find'
import { DEFAULT_FRAGMENT } from '@regardsoss/domain/dam'

/**
 * Retrieve model attributes values from form values
 * and returns the value of collection "attributes" sendeable to the API
 * @param values
 * @returns {{}}
 */
function extractParametersFromFormValues(values, modelAttributeList) {
  const result = {}
  forEach(values.properties, (fragmentValues, fragmentName) => {
    forEach(fragmentValues, (attrValue, attrName) => {
      const modelAttr = find(modelAttributeList, modelAttribute =>
        modelAttribute.content.attribute.name === attrName && modelAttribute.content.attribute.fragment.name === fragmentName,
      )
      const fragment = modelAttr.content.attribute.fragment
      if (fragment.name !== DEFAULT_FRAGMENT) {
        if (!result[fragment.name]) {
          result[fragment.name] = {}
        }
        result[fragment.name][attrName] = attrValue
      } else {
        result[attrName] = attrValue
      }
    })
  })
  return result
}

export default extractParametersFromFormValues
