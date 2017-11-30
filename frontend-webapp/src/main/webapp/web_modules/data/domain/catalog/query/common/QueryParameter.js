/**
* LICENSE_PLACEHOLDER
**/
import StaticQueryParameter from './StaticQueryParameter'

/**
 * Common query parameter model with value and name
 */
export default class QueryParameter extends StaticQueryParameter {
  /**
   * Query parameter constructor
   * @param name parameter name
   * @param value parameter value
   * @param valueSeparator value separator (like '=' or ')' )
   */
  constructor(name, value, valueSeparator) {
    super(value ? `${name}${valueSeparator}${value}` : '')
  }
}
