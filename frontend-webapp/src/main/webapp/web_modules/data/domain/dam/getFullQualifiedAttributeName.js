/**
 * LICENSE_PLACEHOLDER
 **/
import FRAGMENT_NONE from './FragmentNone'

function getFullQualifiedAttributeName (attribute) {
  if (attribute.fragment.name === FRAGMENT_NONE) {
    return `${attribute.name}`
  }
  return `${attribute.fragment.name} ${attribute.name}`
}

export default getFullQualifiedAttributeName