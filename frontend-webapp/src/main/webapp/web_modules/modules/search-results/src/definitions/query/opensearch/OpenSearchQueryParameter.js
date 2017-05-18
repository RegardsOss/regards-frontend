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
  static ESCAPED_VALUES = ['\\', '+', '-', '&&', '||', '!', '(', ')', '{', '}', '[', ']', '^', '"', '~', '*', '?', ':', '/']

  /** Escaped string symbol */
  static ESCAPE_SYMBOL = '\\'

  /**
   * Escape string in parameter value that could conflict with open search query parsing
   * @see {documentation server}/microservice-catalog/search/
   * @param value parameter value string
   * @return escaped string (null undefined if the parameter is)
   */
  static escape = value => value && OpenSearchQueryParameter.ESCAPED_VALUES.reduce(
    // for each string to escape ...
    (previouslyEscaped, toEscape) =>
      // if it found...
      previouslyEscaped.includes(toEscape) ?
        // split the string and join it back on the escaped string symbol
        previouslyEscaped.split(toEscape).join(`${OpenSearchQueryParameter.ESCAPE_SYMBOL}${toEscape}`) :
        previouslyEscaped, value)


  constructor(name, value) {
    super(name, OpenSearchQueryParameter.escape(value), OpenSearchQueryParameter.VALUE_SEPARATOR)
  }

}
