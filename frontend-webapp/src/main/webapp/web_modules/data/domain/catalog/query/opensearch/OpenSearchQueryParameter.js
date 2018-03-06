/**
* LICENSE_PLACEHOLDER
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
  static escape = value =>
    value && OpenSearchQueryParameter.ESCAPED_CHARS.some(char => value.includes(char)) ?
      // there are special characters in some of the parameter parts
      `"${encodeURIComponent(value)}"` :
      encodeURIComponent(value) // no value or no special char


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
