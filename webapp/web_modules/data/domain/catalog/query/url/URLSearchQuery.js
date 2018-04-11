/**
* LICENSE_PLACEHOLDER
**/
import Query from '../common/Query'

/**
 * URL search query model (open search request URL)  (note: ? parameter is useless)
 */
export default class OpenSearchQuery extends Query {
  static PARAMETERS_SEPARATOR = '&'

  static QUERY_PARAMETER_NAME = 'q'
  static SORT_PARAMETER_NAME = 'sort'

  constructor(rootQuery, parameters) {
    super(rootQuery, parameters, OpenSearchQuery.PARAMETERS_SEPARATOR)
  }
}

