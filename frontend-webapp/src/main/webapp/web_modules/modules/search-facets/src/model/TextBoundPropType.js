/**
* LICENSE_PLACEHOLDER
**/
import { getChainableTypeChecker } from '@regardsoss/model'

/**
 * Validates a textual bound type: asserts we have here a parsable string or null
 * @param parser bound text parser: string => boolean (true if parsable)
 * @return PropType validator, to be used in getChainableTypeChecker to make a valid PropType
 */
const getTextBoundPropType = parser => (props, propName, componentName, location) => {
  const localComponentName = componentName || '[Anonymous component]'
  const boundText = props[propName]
  // pre : never empty here (see ChainableTypeChecker)
  if (typeof boundText !== 'string') {
    return new Error(`${propName} (${location}) is not a String object in ${localComponentName}.`)
  }
  if (!parser(boundText)) {
    console.info('=====================================')
    console.info('=====================================')
    console.info('=====================================')
    console.info('=====================================')
    console.info('=====================================')
    console.info('=====================================')
    console.info('I am that failer ', boundText)
    return new Error(`${propName} (${location}) cannot be parsed as bound in ${localComponentName}.`)
  }
  return null
}

const parseInt = (intText) => {
  const n = Number.parseInt(intText, 10)
  return !isNaN(n) && Number.isInteger(n)
}
export const NumericTextBoundPropType = getChainableTypeChecker(getTextBoundPropType(parseInt))

const parseDate = dateText => !isNaN(Date.parse(dateText))
export const DateTextBoundPropType = getChainableTypeChecker(getTextBoundPropType(parseDate))
