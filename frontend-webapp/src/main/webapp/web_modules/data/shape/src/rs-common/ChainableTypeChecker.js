/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Creates a chainable type checker, required to create new property types
 */
export default function getChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location) {
    const localComponentName = componentName || '[Anonymous component]'
    if (!props[propName]) {
      if (isRequired) {
        return new Error(`Required ${propName} (${location}) was not specified in ${localComponentName}.`)
      }
      return null
    }
    return validate(props, propName, componentName, location)
  }

  const chainedCheckType = checkType.bind(null, false)
  chainedCheckType.isRequired = checkType.bind(null, true)

  return chainedCheckType
}
