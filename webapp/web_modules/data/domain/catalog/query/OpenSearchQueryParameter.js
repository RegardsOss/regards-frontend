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
import identity from 'lodash/identity'
import isArray from 'lodash/isArray'
import QueryParameter from '../../common/query/abstract/QueryParameter'

/**
 * Open search query parameter model, escapes automically the parameter values that
 * could conflict
 */
export default class OpenSearchQueryParameter extends QueryParameter {
  /** Tag to value separator */
  static VALUE_SEPARATOR = ':'

  /** Regexp of element to replace and corresponding replacement when building a value in contain mode  */
  static CONTAINS_STRING_ESCAPED = [
    { exp: /\\/g, rep: '\\\\' }, // first to not replace after next expressions
    { exp: /\+/g, rep: '\\+' },
    { exp: /-/g, rep: '\\-' },
    { exp: /&&/g, rep: '\\&&' },
    { exp: /\|\|/g, rep: '\\||' },
    { exp: /!/g, rep: '\\!' },
    { exp: /\(/g, rep: '\\(' },
    { exp: /\)/g, rep: '\\)' },
    { exp: /\{/g, rep: '\\{' },
    { exp: /\}/g, rep: '\\}' },
    { exp: /\[/g, rep: '\\[' },
    { exp: /\]/g, rep: '\\]' },
    { exp: /\^/g, rep: '\\^' },
    { exp: /"/g, rep: '\\"' },
    { exp: /~/g, rep: '\\~' },
    { exp: /\*/g, rep: '\\*' },
    { exp: /\?/g, rep: '\\?' },
    { exp: /:/g, rep: '\\:' },
    { exp: /\s/g, rep: '\\ ' }]

  /** Regexp of element to replace and corresponding replacement when building a value in strict equal mode  */
  static STRICT_STRING_EQUAL_ESCAPED = [{ exp: /"/g, rep: '\\"' }]

  /** OR values separator */
  static OR_SEPARATOR = ' OR '

  /** AND values separator */
  static AND_SEPARATOR = ' AND '

  /** NEGATE value operator */
  static NEGATE_OPERATOR = '!'

  /**
   * Negates a parameter value
   * @param {string} parameterValue parameter value
   * @returns {strgin} parameter value
   *
   */
  static negateParameterValue(parameterValue) {
    return `(${this.NEGATE_OPERATOR}(${parameterValue}))`
  }

  /**
   * Delegate to build string parameter value
   * @param {string | [string]} values value or values for the parameter
   * @param {string} separator semantic separator to use when providing a values array (note: it is reversed when negate is true)
   * @param {boolean} negate is negated value?
   * @param {[{exp: RegExp, rep: string}]} escapedRegexps regexp of element to replace
   * @param {Function} toValue String function to apply to generate parameter value, like (excapedValue: string)  => (queryValue: string)
   * @return {string} parameter value
   */
  static toStringParameterValue(values, separator, negate, escapedRegexps, toValueString = identity) {
    // 1 - exit if no value
    if (!values) {
      return null
    }
    // 2 - For each parameter, filter empty / null values
    const escapedValues = (isArray(values) ? values : [values])
      .reduce((acc, v) => {
        if (v) {
          const escapedValue = escapedRegexps.reduce((acc2, { exp, rep }) => acc2.replace(exp, rep), v)
          const queryValue = toValueString(escapedValue)
          if (queryValue) {
            return [...acc, queryValue]
          }
        }
        // no value
        return acc
      }, [])

    // If all values were filtered, exit here
    if (!escapedValues.length) {
      return null
    }

    // 3 - Join on separator (revert if negated)
    if (negate) {
      // 3.a - NOT ([values])
      return OpenSearchQueryParameter.negateParameterValue(
        escapedValues.join(
          separator === OpenSearchQueryParameter.OR_SEPARATOR ? OpenSearchQueryParameter.AND_SEPARATOR : OpenSearchQueryParameter.OR_SEPARATOR))
    }
    // 3.b - value or ([values])
    return escapedValues.length === 1 ? escapedValues[0] : `(${escapedValues.join(separator)})`
  }

  /**
   * Computes parameter value for value / values as parameter to get strictly equal results
   * @param {string | [string]} values value or values for the parameter
   * @param {string} separator semantic separator to use when providing a values array (note: it is reversed when negate is true)
   * @param {boolean} negate is negated value?
   * @return {string} corresponding OpenSearch parameter value, where each element is in quotes (meaning strict equality)
   */
  static toStrictStringEqual(values, separator = OpenSearchQueryParameter.OR_SEPARATOR, negate = false) {
    return OpenSearchQueryParameter.toStringParameterValue(values, separator, negate, OpenSearchQueryParameter.STRICT_STRING_EQUAL_ESCAPED,
      (escapedValue) => `"${escapedValue}"`)
  }

  /**
   * Computes parameter value for value / values as parameter to get results containing values
   * @param {string | [string]} values value or values for the parameter
   * @param {string} separator semantic separator to use when providing a values array (note: it is reversed when negate is true)
   * @param {boolean} negate is negated value?
   * @return {string} corresponding OpenSearch parameter value, where each element is in quotes (meaning strict equality)
   */
  static toStringContained(values, separator = OpenSearchQueryParameter.OR_SEPARATOR, negate = false) {
    return OpenSearchQueryParameter.toStringParameterValue(values, separator, negate, OpenSearchQueryParameter.CONTAINS_STRING_ESCAPED,
      (escapedValue) => `(${escapedValue})`)
  }

  /**
   * Computes parameter value for value / values as parameter to get results that respect a regular expression
   * @param {string | [string]} values value or values for the parameter
   * @param {string} separator semantic separator to use when providing a values array (note: it is reversed when negate is true)
   * @param {boolean} negate is negated value?
   * @return {string} corresponding OpenSearch parameter value, where each element is in quotes (meaning strict equality)
   */
  static toRegex(values, separator = OpenSearchQueryParameter.OR_SEPARATOR, negate = false) {
    return OpenSearchQueryParameter.toStringParameterValue(values, separator, negate, [], (escapedValue) => `/${escapedValue}/`)
  }

  /**
   * Constructor
   * @param {string} name parameter name
   * @param {string} value value
   */
  constructor(name, value) {
    super(name, value, OpenSearchQueryParameter.VALUE_SEPARATOR)
  }
}
