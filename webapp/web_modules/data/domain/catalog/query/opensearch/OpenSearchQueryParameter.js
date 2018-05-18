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
import QueryParameter from '../common/QueryParameter'

/**
 * Open search query parameter model, escapes automically the parameter values that
 * could conflict
 */
export default class OpenSearchQueryParameter extends QueryParameter {
  /** Tag to value separator */
  static VALUE_SEPARATOR = ':'

  /** Strings to escape. Please note that '\' is escaped first, to not break the algorithm  */
  static ESCAPED_CHARS = ['\\', '+', '-', '&&', '||', '!', '(', ')', '{', '}', '[', ']', '^', '"', '~', '*', '?', ':', '/', ' ']


  /** Choice separator */
  static CHOICE_SEPARATOR = ' OR '

  /**
   * Escape string when its value cannot be parsed
   * @see {documentation server}/microservice-catalog/search/
   * @param value parameter value string
   * @return escaped string or initial value if it should not be escaped
   */
  static escape = (value) => {
    if (value) {
      return OpenSearchQueryParameter.ESCAPED_CHARS.some(char => value.includes(char)) ?
        // there are special characters in some of the parameter parts
        `"${encodeURIComponent(value)}"` :
        encodeURIComponent(value) // no lucen special char
    }
    return value // no value
  }
  /**
   * Compute the parameter value and serialize it, based on
   * @param {string|[string]} value parameter value as string or array of string in the case of choices
   */
  static computeParameterValue(value = '') {
    if (isArray(value)) {
      const paramValue = value.map(OpenSearchQueryParameter.escape).join(OpenSearchQueryParameter.CHOICE_SEPARATOR)
      return value.length > 1 ?
        `(${paramValue})` : // make sure choice values are enclose in parenthesis
        paramValue
    }
    return OpenSearchQueryParameter.escape(value)
  }

  /**
   * Constructor
   * @param {string} name parameter name
   * @param {string|[string]} values parameter value or value list in the case of choices
   * @param {boolean} negate (optional, defaults to false) should negate that parameter in request? (ie return elements that DO NOT match it)
   */
  constructor(name, values, negate = false) {
    super(name, OpenSearchQueryParameter.computeParameterValue(values), OpenSearchQueryParameter.VALUE_SEPARATOR)
    this.negate = negate
  }

  toQueryString() {
    const queryString = super.toQueryString()
    return this.negate && !!queryString ? `!(${queryString})` : queryString
  }
}
