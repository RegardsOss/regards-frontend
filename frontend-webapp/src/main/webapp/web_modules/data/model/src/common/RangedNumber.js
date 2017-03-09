/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Ranged number prop type validator (you can use isRequired on it)
 */
const RangedNumber = (min = Number.MIN_VALUE, max = Number.MAX_VALUE) => {
  const validatorInstance = (props, propName, componentName, location, required = false) => {
    const number = props[propName]
    if (number) {
      if (typeof number !== 'number') {
        return new Error(`${propName} expects a number in ${componentName}`)
      }
      if (number < min || number > max) {
        return new Error(`${propName} value (${number}) is not in expected range [${min};${max}], in ${componentName}`)
      }
      return null
    }
    return required ? new Error(`The property ${propName} is required in ${componentName} (number expected)`) : null
  }
  validatorInstance.isRequired = (props, propName, componentName, location) => validatorInstance(props, propName, componentName, location, true)
  return validatorInstance
}

export default RangedNumber
