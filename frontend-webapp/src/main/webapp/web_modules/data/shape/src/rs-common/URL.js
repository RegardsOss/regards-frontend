/**
 * LICENSE_PLACEHOLDER
 **/
import isNumber from 'lodash/isNumber'
import { relativeURLRegexp, validURLRegexp } from '@regardsoss/domain/common'
import getChainableTypeChecker from './ChainableTypeChecker'

/**
 * URL prop type validator (you can use isRequired on it)
 */
const urlStringValidator = (props, propName, componentName, location) => {
  const localComponentName = componentName || '[Anonymous component]'
  const url = props[propName]
  // pre : never empty here (see ChainableTypeChecker)
  if (isNumber(url)) {
    return new Error(`${propName} (${location}) is not a String object in ${localComponentName}.`)
  }
  if (!validURLRegexp.test(url) && !relativeURLRegexp.test(url)) {
    return new Error(`${propName} (${location}) has invalid URL format in ${localComponentName}.`)
  }
  return null
}

export default getChainableTypeChecker(urlStringValidator)
