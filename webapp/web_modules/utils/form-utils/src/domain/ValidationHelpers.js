/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import find from 'lodash/find'
import isUndefined from 'lodash/isUndefined'
import isNil from 'lodash/isNil'
import isNaN from 'lodash/isNaN'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import BigNumber from 'bignumber.js'
import cron from 'cron-validate'
import { validURLRegexp, relativeURLRegexp, validURIRegexp } from '@regardsoss/domain/common'
import ErrorTypes from './ErrorTypes'

/**
 * Returns {@code true} if the passed String is a valid cron expression.
 * @param {String} cron
 * @returns
 */
const isValidCronExp = (cronExp) => !isNil(cronExp) && cron(cronExp, { preset: 'default', override: { useSeconds: true, useAliases: true } }).isValid() ? undefined : ErrorTypes.INVALID_CRON

/**
 * Returns {@code true} if the passed String matches an email format.
 * @param {String} email
 */
const isValidEmail = (email) => /^[A-Z0-9._%+-]{2,71}@[A-Z0-9.-]{2,54}\.[A-Z]{2,}$/i.test(email)

/**
 * Returns {@code true} if the passed String matches an url format.
 * @param {String} url url text
 * @param {Boolean} relativeAllowed is relative URL allowed?
 */
const isValidUrl = (url, relativeAllowed = true) => validURLRegexp.test(url) || (relativeAllowed && relativeURLRegexp.test(url))

/**
 * Returns {@code true} if the passed String matches an url format.
 * @param {String} uri url text
 */
const isValidUri = (uri) => validURIRegexp.test(uri)

/**
 * Returns {@code true} if the passed String is only composed of alphanumeric or "_" characters.
 * @param {String} value
 */
const isValidAlphaNumericUnderscore = (value) => /^[A-Z0-9_]+$/i.test(value)

/**
 * Returns {@code true} if the passed String matches an IP address format.
 * @source : http://stackoverflow.com/a/27434991/2294168
 * @param {String} value
 * @returns {boolean}
 */
const isValidIP = (value) => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)

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
const compose = (...validators) => (value, allValues, props) => {
  const results = validators.map((validator) => validator(value, allValues, props))
  return find(results, (result) => !isUndefined(result))
}

/**
 * Redux-Form-style validator for Fields which content is required.
 *
 * @param {String} value
 * @returns {String||undefined}
 */
const required = (value) => !isNil(value) && value !== '' ? undefined : ErrorTypes.REQUIRED

/**
 * Redux-Form-style validator for Fields which content is required.
 *
 * @param {String} value
 * @returns {String||undefined}
 */
const arrayRequired = (value) => !isNil(value) && value !== '' && value.length > 0 ? undefined : ErrorTypes.ARRAY_REQUIRED

/**
 * Redux-Form-style validator for Fields which content is required.
 *
 * @param {String} value
 * @returns {String||undefined}
 */
const mapRequired = (value) => !isNil(value) && value !== '' ? undefined : ErrorTypes.ARRAY_REQUIRED

/**
 * Redux-Form-style validator for Fields which content must be a string.
 *
 * @param {String} value
 * @returns {String||undefined}
 */
const string = (value) => isString(value) || isNil(value) ? undefined : ErrorTypes.TYPE_STRING

/**
 * Redux-Form-style validator for Fields which content must not be empty.
 *
 * @param {String} value
 * @returns {String||undefined}
 */
const validRequiredNumber = (value) => !isNil(value) && value !== '' && !isNaN(value) ? undefined : ErrorTypes.REQUIRED

const matchRegex = (regex) => (value) => isString(value) && (value.search(regex) !== -1) ? undefined : ErrorTypes.invalidRegex(regex)

/**
 * Redux-Form-style validator for Fields which content must be an valid absolute path directory.
 * @param {*} value
 */
const isValidAbsolutePath = (value) => !isNil(value) && (matchRegex(/^\/.+/)(value) === undefined) ? undefined : ErrorTypes.INVALID_ABSOLUTE_PATH

const isInNumericRange = (lowerBound, upperBound, minExcluded, maxExcluded) => (value) => !isNaN(lowerBound) && !isNaN(upperBound) && ((maxExcluded && value < upperBound) || (!maxExcluded && value <= upperBound))
  && ((minExcluded && value > lowerBound) || (!minExcluded && value >= lowerBound)) ? undefined : ErrorTypes.invalidNumericRange(lowerBound, upperBound)

/**
 * Wrap the {@link isValidAlphaNumericUnderscore} logic into a Redux-Form-style validator.
 *
 * @param {String} value
 * @returns {String||undefined}
 * @author Xavier-Alexandre Brochard
 */
const validAlphaNumericUnderscore = (value) => isValidAlphaNumericUnderscore(value) ? undefined : ErrorTypes.ALPHA_NUMERIC

const validStringSize = (minSize, maxSize) => (value) => !value || (isString(value) && value.length <= maxSize && value.length >= minSize) ? undefined : ErrorTypes.invalidStringSize(minSize || '0', maxSize)

/**
 * Checks that the given value is a valid mimeType.
 * @param value
 */
const validMimeType = (value) => !isNil(value) && (matchRegex(/[^/ ]*\/[^/ ]/)(value) === undefined) ? undefined : ErrorTypes.INVALID_MIME_TYPE

const validStringNoSpaceNoSpecial = (value) => !isNil(value) && (matchRegex(/^[-_a-zA-Z0-9]+$/)(value) === undefined) ? undefined : ErrorTypes.INVALIDE_STRING_NO_SPACE_NO_SPECIAL

/**
 * Redux-Form-style validator for Fields which content must be an email.
 *
 * @param {String} value
 * @returns {String||undefined}
 */
const email = (value) => isValidEmail(value) ? undefined : ErrorTypes.EMAIL

/**
 * Redux-Form-style validator for Fields which content must be an url.
 *
 * @param {String} value
 * @returns {String||undefined}
 */
const url = (value) => isValidUrl(value) ? undefined : ErrorTypes.INVALID_URL

/**
 * Redux-Form-style validator for Fields which content must be an URI.
 *
 * @param {String} value
 * @returns {String||undefined}
 */
const uri = (value) => isValidUri(value) ? undefined : ErrorTypes.INVALID_URI

/**
 * Construct a Redux-Form-style validator for Fields with length must be less than given value
 *
 * @param {Number} pNumber
 * @returns {String||undefined}
 */
const lengthLessThan = (pNumber) => (value) => isNil(value) || value.length <= pNumber ? undefined : ErrorTypes.lengthLessThan(pNumber)

/**
 * Construct a Redux-Form-style validator for Fields with length must be more than given value
 *
 * @param {Number} pNumber
 * @returns {String||undefined}
 */
const lengthMoreThan = (pNumber) => (value) => isNil(value) || value.length >= pNumber ? undefined : ErrorTypes.lengthMoreThan(pNumber)

/**
 * Construct a Redux-Form-style validator for Numeric Fields with value less than given value
 *
 * @param {Number} pNumber
 * @returns {String||undefined}
 */
const lessThan = (pNumber) => (value) => isNil(value) || value <= pNumber ? undefined : ErrorTypes.lessThan(pNumber)

/**
 * Construct a Redux-Form-style validator for Numeric Fields with value more than given value
 *
 * @param {Number} pNumber
 * @returns {String||undefined}
 */
const moreThan = (pNumber) => (value) => isNil(value) || value >= pNumber ? undefined : ErrorTypes.moreThan(pNumber)

/** Regexp to match a number */
const NUMBER_REGEXP = /^[-+]?[0-9.,]*$/

/** Regexp to match a number */
const INTEGER_REGEXP = /^[-+]?[0-9]*$/

/**
 * Validates a parsable number
 * @param {function} parser parser like {string} => {number}
 * @param {string} parsingError parsing error
 * @param {*} value value
 * @param {BigNumber} min min accepted value
 * @param {BigNumber} max max accepted value
 * @return {function} value validator like {string} => {string|undefined}
 */
const parsableNumberValidator = (parsingError, min, max, regexp = NUMBER_REGEXP) => (value) => {
  if (value) {
    let bnValue = new BigNumber()
    // 1 - compute value to consider
    if (isString(value) && value.match(regexp)) {
      bnValue = new BigNumber(value)
    } else if (isNumber(value)) {
      // number input
      bnValue = new BigNumber(value)
    } // else: non handled type

    // 2 - check value
    if (bnValue.isNaN() || !bnValue.isFinite()) {
      return parsingError
    }
    if (bnValue.isLessThan(min)) {
      return ErrorTypes.LOWER_THAN_MIN
    }
    if (bnValue.isGreaterThan(max)) {
      return ErrorTypes.GREATER_THAN_MAX
    }
  }
  // when NaN is received as value, handle it separately (this is an error)
  if (isNaN(value)) {
    return parsingError
  }
  // no error
  return undefined
}

/**
 * Builds a validator
 * @param {number} minValue min range value (optional)
 * @param {number} maxValue max range value (optional)
 * @return {Function} validator
 */
const getIntegerInRangeValidator = (minValue = Number.MIN_VALUE, maxValue = Number.MAX_VALUE) => parsableNumberValidator(
  ErrorTypes.INVALID_INTEGER_NUMBER, new BigNumber(minValue), new BigNumber(maxValue), INTEGER_REGEXP)

/** Validates a JS number */
const number = parsableNumberValidator(ErrorTypes.NUMERIC,
  new BigNumber(Number.MIN_VALUE), new BigNumber(Number.MAX_VALUE))

/** Validates a JS integer number */
const intNumber = getIntegerInRangeValidator(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)

/** Validates a JS integer positive number */
const positiveIntNumber = parsableNumberValidator(ErrorTypes.INVALID_POSITIVE_INTEGER_NUMBER,
  new BigNumber(0), new BigNumber(Number.MAX_SAFE_INTEGER), INTEGER_REGEXP)

/** Validates a standard Java byte */
const javaByteValidator = parsableNumberValidator(ErrorTypes.INVALID_INTEGER_NUMBER,
  new BigNumber('-128'), new BigNumber(127), INTEGER_REGEXP)

/** Validates a standard Java Short */
const javaShortValidator = parsableNumberValidator(ErrorTypes.INVALID_INTEGER_NUMBER,
  new BigNumber('-32,768'), new BigNumber('32,767'), INTEGER_REGEXP)

/** Validates a standard Java Integer */
const javaIntegerValidator = parsableNumberValidator(ErrorTypes.INVALID_INTEGER_NUMBER,
  new BigNumber('-2147483648'), new BigNumber('2147483647'), INTEGER_REGEXP)

/** Validates a standard Java Long. Please note that Java long is greater than max safe value in JS, so we limit it to JS value */
const javaLongValidator = parsableNumberValidator(ErrorTypes.INVALID_INTEGER_NUMBER,
  new BigNumber('-9223372036854775808'), new BigNumber('9223372036854775807'), INTEGER_REGEXP)

/** Validates a standard Float Double. Please note that Java double is (slightly) greater than max JS value, so we limit it to JS value */
const javaDoubleValidator = parsableNumberValidator(ErrorTypes.INVALID_FLOATING_NUMBER,
  new BigNumber('4.9E-324'), new BigNumber('1.7976931348623157E308'))

/**
 * Validates a standard Java Float. Note: according with https://stackoverflow.com/questions/9746850/min-value-of-float-in-java-is-positive-why,
 * it seems reverted MAX_VALUE is the actual minimum value for Java floats
 */
const javaFloatValidator = parsableNumberValidator(ErrorTypes.INVALID_FLOATING_NUMBER,
  new BigNumber('1.4E-45'), new BigNumber('3.4028235E38'))

/** Character validator */
const characterValidator = (value) => value && value.length && value.length !== 1 ? ErrorTypes.INVALID_CHARACTER : undefined

export default {
  isValidCronExp,
  isValidAbsolutePath,
  isValidEmail,
  isValidUrl,
  isValidUri,
  isValidAlphaNumericUnderscore,
  isValidIP,
  compose,
  required,
  arrayRequired,
  mapRequired,
  string,
  validStringSize,
  validRequiredNumber,
  validAlphaNumericUnderscore,
  validMimeType,
  matchRegex,
  validStringNoSpaceNoSpecial,
  isInNumericRange,
  email,
  lengthLessThan,
  lengthMoreThan,
  lessThan,
  moreThan,
  number,
  intNumber,
  positiveIntNumber,
  getIntegerInRangeValidator,
  url,
  uri,
  characterValidator,
  javaByteValidator,
  javaDoubleValidator,
  javaFloatValidator,
  javaIntegerValidator,
  javaLongValidator,
  javaShortValidator,
}
