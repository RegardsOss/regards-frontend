/**
 * LICENSE_PLACEHOLDER
 **/
import find from 'lodash/find'
import isUndefined from 'lodash/isUndefined'
import isNil from 'lodash/isNil'
import isString from 'lodash/isString'
import { validURLRegexp, relativeURLRegexp } from '@regardsoss/domain/common'
import ErrorTypes from './ErrorTypes'

/**
 * Returns {@code true} if the passed String matches an email format.
 * @param {String} email
 */
export const isValidEmail = email => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)


/**
 * Returns {@code true} if the passed String matches an url format.
 * @param {String} url url text
 * @param {Boolean} relativeAllowed is relative URL allowed?
 */
export const isValidUrl = (url, relativeAllowed = true) => validURLRegexp.test(url) || (relativeAllowed && relativeURLRegexp.test(url))

/**
 * Returns {@code true} if the passed String is only composed of alphanumeric or "_" characters.
 * @param {String} value
 */
export const isValidAlphaNumericUnderscore = value => /^[A-Z0-9_]+$/i.test(value)

/**
 * Returns {@code true} if the passed String matches an IP address format.
 * @source : http://stackoverflow.com/a/27434991/2294168
 * @param {String} value
 * @returns {boolean}
 */
export const isValidIP = value => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)

/**
 * Compose all passed validator functions as a single validator. If all validators are valid, the composed validator is valid.
 * If some validators are invalid, the composed validator is invalid and the returned error is the first error found.
 *
 * @deprecated The prop 'validate' on Redux-Form's {@link Field}s can accept an array of validators
 * @param {Function[]} validators If the field is valid, each validator should return undefined, if the field is invalid, it should return an error (usually, but not necessarily, a String).
 * @returns {String||undefined}
 * @author Xavier-Alexandre Brochard
 * @see http://redux-form.com/6.5.0/docs/api/Field.md/  => validate
 */
export const compose = (...validators) => (value, allValues, props) => {
  const results = validators.map(validator => validator(value, allValues, props))
  return find(results, result => !isUndefined(result))
}

/**
 * Redux-Form-style validator for Fields which content is required.
 *
 * @param {String} value
 * @returns {String||undefined}
 */
export const required = value => !isNil(value) && value !== '' ? undefined : ErrorTypes.REQUIRED

/**
 * Redux-Form-style validator for Fields which content must be a string.
 *
 * @param {String} value
 * @returns {String||undefined}
 */
export const string = value => isString(value) ? undefined : ErrorTypes.TYPE_STRING

/**
 * Redux-Form-style validator for Fields which content must not be empty.
 *
 * @param {String} value
 * @returns {String||undefined}
 */
export const validRequiredNumber = value =>
  !isNil(value) && value !== '' && !isNaN(value) ? undefined : ErrorTypes.REQUIRED

export const matchRegex = regex => value => isString(value) && (value.search(regex) !== -1) ? undefined : ErrorTypes.invalidRegex(regex)

export const isInNumericRange = (lowerBound, upperBound, minExcluded, maxExcluded) => value =>
  !isNaN(lowerBound) && !isNaN(upperBound) && ((maxExcluded && value < upperBound) || (!maxExcluded && value <= upperBound))
  && ((minExcluded && value > lowerBound) || (!minExcluded && value >= lowerBound)) ? undefined : ErrorTypes.invalidNumericRange(lowerBound, upperBound)

/**
 * Wrap the {@link isValidAlphaNumericUnderscore} logic into a Redux-Form-style validator.
 *
 * @param {String} value
 * @returns {String||undefined}
 * @author Xavier-Alexandre Brochard
 */
export const validAlphaNumericUnderscore = value => isValidAlphaNumericUnderscore(value) ? undefined : ErrorTypes.ALPHA_NUMERIC

export default {
  isValidEmail,
  isValidUrl,
  isValidAlphaNumericUnderscore,
  isValidIP,
  compose,
  required,
  string,
  validRequiredNumber,
  validAlphaNumericUnderscore,
  matchRegex,
  isInNumericRange,
}
