/**
* LICENSE_PLACEHOLDER
**/
import Query from '../common/Query'


/**
 * Open search query model (q parameter content)
 */
export default class OpenSearchQuery extends Query {

  static PARAMETERS_SEPARATOR = ' AND '

  static TAGS_PARAM_NAME = 'tags'

  constructor(rootQuery, parameters) {
    super(rootQuery, parameters, OpenSearchQuery.PARAMETERS_SEPARATOR)
  }

}
