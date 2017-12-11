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

  /**
   * Builds a tag parameter
   * @param {[string]|string} values values array or simple string
   * @param {boolean} negate should negate parameter value in final request?
   * @return built parameter
   */
  static buildTagParameter(values, negate = false) {
    return new OpenSearchQueryParameter(OpenSearchQuery.TAGS_PARAM_NAME, values, negate)
  }

  /**
   * Builds a model name parameter
   * @param {[string]|string} values values array or simple string
   * @param {boolean} negate should negate parameter value in final request?
   * @return built parameter
   */
  static buildModelNameParameter(values, negate = false) {
    return new OpenSearchQueryParameter(OpenSearchQuery.MODEL_NAME_PARAM_NAME, values, negate)
  }

  /**
   * Builds a IP ID parameter
   * @param {[string]|string} values values array or simple string
   * @param {boolean} negate should negate parameter value in final request?
   * @return built parameter
   */
  static buildIpIdParameter(values, negate = false) {
    return new OpenSearchQueryParameter(OpenSearchQuery.IP_ID_PARAM_NAME, values, negate)
  }

  constructor(rootQuery, parameters) {
    super(rootQuery, parameters, OpenSearchQuery.PARAMETERS_SEPARATOR)
  }

}
