/**
 * LICENSE_PLACEHOLDER
 **/
import getChainableTypeChecker from './ChainableTypeChecker'

const relativeURLRegexp = new RegExp('^((\\.\\.?\\/)*)([-a-z\\d%_\\.~+]+)' +    // . / .. / and first word
  '(\\/[-a-z\\d%_\\.~+]*)*$', 'i') // next words


export const validURLRegexp = new RegExp('^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_\\.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator

/**
 * URL prop type validator (you can use isRequired on it)
 */
const urlStringValidator = (props, propName, componentName, location) => {
  const localComponentName = componentName || '[Anonymous component]'
  const url = props[propName]
  // pre : never empty here (see ChainableTypeChecker)
  if (typeof url !== 'string') {
    return new Error(`${propName} (${location}) is not a String object in ${localComponentName}.`)
  }
  if (!validURLRegexp.test(url) && !relativeURLRegexp.test(url)) {
    return new Error(`${propName} (${location}) has invalid URL format in ${localComponentName}.`)
  }
  return null
}

export default getChainableTypeChecker(urlStringValidator)
