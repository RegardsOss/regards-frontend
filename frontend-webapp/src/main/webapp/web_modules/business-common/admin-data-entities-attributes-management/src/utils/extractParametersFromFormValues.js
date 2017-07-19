/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
      // Do not send the value if it's not defined
      if (attrValue) {
        const fragment = modelAttr.content.attribute.fragment
        if (fragment.name !== DEFAULT_FRAGMENT) {
          if (!result[fragment.name]) {
            result[fragment.name] = {}
          }
          result[fragment.name][attrName] = attrValue
        } else {
          result[attrName] = attrValue
        }
      }
    })
  })
  return result
}

export default extractParametersFromFormValues
