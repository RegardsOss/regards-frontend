/**
* LICENSE_PLACEHOLDER
**/
import isString from 'lodash/isString'
import root from 'window-or-global'
import { CommonShapes } from '@regardsoss/shape'

/**
 * Validates a textual bound type: asserts we have here a parsable string or null
 * @param parser bound text parser: string => boolean (true if parsable)
 * @return PropType validator, to be used in getChainableTypeChecker to make a valid PropType
 */
const getTextBoundPropType = parser => (props, propName, componentName, location) => {
  const localComponentName = componentName || '[Anonymous component]'
  const boundText = props[propName]
  // pre : never empty here (see ChainableTypeChecker)
  if (!isString(boundText)) {
    return new Error(`${propName} (${location}) is not a String object in ${localComponentName}.`)
  }
  if (!parser(boundText)) {
    return new Error(`${propName} (${location}) cannot be parsed as bound in ${localComponentName}.`)
  }
  return null
}

const parseInt = (intText) => {
  const n = Number.parseInt(intText, 10)
  return !root.isNaN(n) && Number.isInteger(n)
}

const NumericTextBoundPropType = CommonShapes.getChainableTypeChecker(getTextBoundPropType(parseInt))

const parseDate = dateText => !root.isNaN(Date.parse(dateText))
const DateTextBoundPropType = CommonShapes.getChainableTypeChecker(getTextBoundPropType(parseDate))

module.exports = {
  DateTextBoundPropType,
  NumericTextBoundPropType,
}
