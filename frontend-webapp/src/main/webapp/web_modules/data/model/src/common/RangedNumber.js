/**
 * LICENSE_PLACEHOLDER
 **/
import getChainableTypeChecker from './ChainableTypeChecker'

/**
 * Ranged number prop type validator (returns range validation closure)
 */
const getRangedNumberValidator = (min = Number.MIN_VALUE, max = Number.MAX_VALUE) =>
  (props, propName, componentName, location) => {
    const localComponentName = componentName || '[Anonymous component]'
    const number = props[propName]
    // pre : never empty here (see ChainableTypeChecker)
    if (typeof number !== 'number') {
      return new Error(`${propName} (${location}) is not a number in ${localComponentName}.`)
    }
    if (number < min || number > max) {
      return new Error(`${propName} (${location}) is not in expected range [${min};${max}] in ${localComponentName}.`)
    }
    return null
  }

export default (min = Number.MIN_VALUE, max = Number.MAX_VALUE) => getChainableTypeChecker(getRangedNumberValidator(min, max))
