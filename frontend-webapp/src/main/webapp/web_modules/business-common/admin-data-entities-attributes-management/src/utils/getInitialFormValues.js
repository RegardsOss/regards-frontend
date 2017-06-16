/**
* LICENSE_PLACEHOLDER
**/
import forEach from 'lodash/forEach'
import isObject from 'lodash/isObject'
import has from 'lodash/has'
import { DEFAULT_FRAGMENT } from '@regardsoss/domain/dam'

function getInitialFormValues (entity) {
  const properties = {
    // Create the default fragment object
    [DEFAULT_FRAGMENT]: {}
  }
  forEach(entity.content.properties, (attributeValueOrFragment, key) => {
    if (isObject(attributeValueOrFragment)) {
      // Create the fragment in the properties if not existing
      if (!has(properties, key)) {
        properties[key] = {}
      }
      // It's a fragment
      forEach(attributeValueOrFragment, (attribute, id) => {
        properties[key][id] = attribute
      })
    } else {
      // This is an attribute
      properties[DEFAULT_FRAGMENT][key] = attributeValueOrFragment
    }
  })
  return properties
}

export default getInitialFormValues