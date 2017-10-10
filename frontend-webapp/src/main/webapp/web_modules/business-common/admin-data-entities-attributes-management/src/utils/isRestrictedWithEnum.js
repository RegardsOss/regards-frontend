/**
 * LICENSE_PLACEHOLDER
 **/
import has from 'lodash/has'

/**
 * Return true if the modelAttribute is restricted by an enumeration
 * @param modelAttribute
 * @returns {boolean}
 */
const isRestrictedWithEnum = (modelAttribute) => {
  if (has(modelAttribute, 'content.attribute.restriction.type')) {
    return modelAttribute.content.attribute.restriction.type === 'ENUMERATION'
  }
  return false
}

export default isRestrictedWithEnum
