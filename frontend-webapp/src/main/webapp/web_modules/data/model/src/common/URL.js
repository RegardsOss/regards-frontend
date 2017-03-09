/**
 * LICENSE_PLACEHOLDER
 **/

const validURLRegexp = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i

/**
 * URL prop type validator (you can use isRequired on it)
 */
const urlStringValidtor = (props, propName, componentName, required = false) => {
  const url = props[propName]
  if (props[propName]) {
    if (typeof url !== 'string') {
      return new Error(`${propName} expects an URL string in ${componentName}`)
    }
    if (validURLRegexp.test(url)) {
      return null
    }
    return new Error(`Invalid URL format "${url}" for ${propName} in ${componentName}`)
  }
  return required ? new Error(`${propName} is required in ${componentName}`) : null
}
urlStringValidtor.isRequired = (props, propName, componentName) => urlStringValidtor(props, propName, componentName, true)

export default urlStringValidtor
