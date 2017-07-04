/**
* LICENSE_PLACEHOLDER
**/
import Query from '../common/Query'
import OpenSearchQueryParameter from './OpenSearchQueryParameter'


/**
 * Open search query model (q parameter content)
 */
export default class OpenSearchQuery extends Query {

  static PARAMETERS_SEPARATOR = ' AND '
  static TAGS_PARAM_NAME = 'tags'
  static MODEL_NAME_PARAM_NAME = 'model.name'
  static IP_ID_PARAM_NAME = 'ipId'

  static buildTagParameter(value) {
    return new OpenSearchQueryParameter(OpenSearchQuery.TAGS_PARAM_NAME, value)
  }

  static buildModelNameParameter(value) {
    return new OpenSearchQueryParameter(OpenSearchQuery.MODEL_NAME_PARAM_NAME, value)
  }

  static buildIpIdParameter(value) {
    return new OpenSearchQueryParameter(OpenSearchQuery.IP_ID_PARAM_NAME, value)
  }

  constructor(rootQuery, parameters) {
    super(rootQuery, parameters, OpenSearchQuery.PARAMETERS_SEPARATOR)
  }

}
