/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isArray from 'lodash/isArray'
import QueryParameter from '../../common/query/abstract/QueryParameter'

/**
 * Open search query parameter model, escapes automically the parameter values that
 * could conflict
 */
export default class OpenSearchQueryParameter extends QueryParameter {
  /** Tag to value separator */
  static VALUE_SEPARATOR = ':'

  /** Strings to escape. Please note that '\' is escaped first, to not break the algorithm  */
  static ESCAPED_CHARS = ['\\', '+', '-', '&&', '||', '!', '(', ')', '{', '}', '[', ']', '^', '"', '~', '*', '?', ':', '/', ' ']


  /** OR values separator */
  static OR_SEPARATOR = ' OR '

  /** AND values separator */
  static AND_SEPARATOR = ' AND '

  /** NEGATE value operator */
  static NEGATE_OPERATOR = 'NOT '

  /**
   * Escape string when its value cannot be parsed
   * @see {documentation server}/microservice-catalog/search/
   * @param {string} value parameter value string
   * @return {string} escaped string or initial value if it should not be escaped
   */
  static escape(value) {
    if (value) {
      return OpenSearchQueryParameter.ESCAPED_CHARS.some(char => value.includes(char))
        // there are special characters in some of the parameter parts
        ? `"${encodeURIComponent(value)}"`
        : encodeURIComponent(value) // no lucen special char
    }
    return value // no value
  }

  /**
   * Converts paramter value into usable query parameter value
   * @param {string} value a parameter value, as string
   * @param {boolean} negate should negate value?
   * @return {string} escaped value, negated when required
   */
  static toQueryParameterValue(value = '', negate = false) {
    const escapedString = OpenSearchQueryParameter.escape(value)
    if (escapedString) {
      return negate ? `${OpenSearchQueryParameter.NEGATE_OPERATOR}${escapedString}` : escapedString
    }
    return escapedString
  }

  /**
   * Compute the parameter value and serialize it, based on
   * @param {string|[string]} value parameter value as string or array of string in the case of choices
   * @param {boolean} negate should negate value?
   * @param negate
   */
  static computeParameterValue(value = '', negate = false) {
    // A - Convert to array without empty values
    const valuesArray = (isArray(value) ? value : [value]).filter(v => !!v)
    if (!valuesArray.length) {
      return null // no parameter value
    }

    // B - Convert array to open search query
    // build OR values array when not negated => a:(X OR Y)
    // build AND values array when negated => a:(!X AND !Y)
    const paramValue = valuesArray
      .map(v => OpenSearchQueryParameter.toQueryParameterValue(v, negate))
      .join(negate ? OpenSearchQueryParameter.AND_SEPARATOR : OpenSearchQueryParameter.OR_SEPARATOR)
    if (valuesArray.length > 1 || negate) {
      // add parenthesis for espressions like (A OR B), (NOT X), (NOT X AND NOT Y)
      return `(${paramValue})`
    }
    // simple value
    return paramValue
  }

  /**
   * Constructor
   * @param {string} name parameter name
   * @param {string|[string]} value parameter value or values list in the case of choices
   * @param {boolean} negate (optional, defaults to false) should negate that parameter in request? (ie return elements that DO NOT match it)
   */
  constructor(name, value, negate = false) {
    super(name, value, OpenSearchQueryParameter.VALUE_SEPARATOR)
    this.negate = negate
  }

  toQueryString() {
    if (!this.name) {
      return null
    }
    const queryString = OpenSearchQueryParameter.computeParameterValue(this.value, this.negate)
    if (!queryString) {
      return null
    }
    return `${this.name}${this.valueSeparator}${queryString}`
  }
}
