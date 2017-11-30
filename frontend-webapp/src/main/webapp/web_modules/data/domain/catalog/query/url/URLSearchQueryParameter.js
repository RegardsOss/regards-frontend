/**
* LICENSE_PLACEHOLDER
**/
import QueryParameter from '../common/QueryParameter'

/**
 * URL search query parameter model
 */
export default class URLQueryParameter extends QueryParameter {
  static VALUE_SEPARATOR = '='

  constructor(name, value) {
    super(name, value, URLQueryParameter.VALUE_SEPARATOR)
  }
}
