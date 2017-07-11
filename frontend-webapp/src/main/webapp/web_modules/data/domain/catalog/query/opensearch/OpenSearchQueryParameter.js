/**
* LICENSE_PLACEHOLDER
**/
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

  /**
   * Escape string when its value cannot be parsed
   * @see {documentation server}/microservice-catalog/search/
   * @param value parameter value string
   * @return escaped string or initial value if it should not be escaped
   */
  static escape = value =>
    value && OpenSearchQueryParameter.ESCAPED_CHARS.some(char => value.includes(char)) ?
      `"${value}"` : // there are special charactars
      value // no value or no special char


  constructor(name, value) {
    super(name, OpenSearchQueryParameter.escape(value), OpenSearchQueryParameter.VALUE_SEPARATOR)
  }

}
