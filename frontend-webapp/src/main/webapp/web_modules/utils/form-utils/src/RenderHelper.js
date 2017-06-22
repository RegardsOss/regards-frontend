/**
 * LICENSE_PLACEHOLDER
 **/
import isString from 'lodash/isString'
/**
 * @author Sébastien Binda
 */

/**
 * Function to retrieve error message of a given field from redux-form.
 * @param touched
 * @param error
 * @param intl
 * @returns {*}
 */
export const getErrorMessage = (touched, error, intl) => {
  let errorMessage = null
  if (touched && error) {
    if (isString(error)) {
      errorMessage = intl.formatMessage({ id: error })
    } else {
      errorMessage = intl.formatMessage({ id: error.key }, error.props)
    }
  }
  return errorMessage
}

export default {
  getErrorMessage,
}
