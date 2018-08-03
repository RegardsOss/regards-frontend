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
import Query from '../common/Query'
import OpenSearchQueryParameter from './OpenSearchQueryParameter'


/**
 * Open search query model (q parameter content)
 */
export default class OpenSearchQuery extends Query {
  static PARAMETERS_SEPARATOR = ' AND '
  static TAGS_PARAM_NAME = 'tags'
  static MODEL_PARAM_NAME = 'model'
  static ID_PARAM_NAME = 'id'

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
  static buildModelParameter(values, negate = false) {
    return new OpenSearchQueryParameter(OpenSearchQuery.MODEL_PARAM_NAME, values, negate)
  }

  /**
   * Builds a IP ID parameter
   * @param {[string]|string} values values array or simple string
   * @param {boolean} negate should negate parameter value in final request?
   * @return built parameter
   */
  static buildIDParameter(values, negate = false) {
    return new OpenSearchQueryParameter(OpenSearchQuery.ID_PARAM_NAME, values, negate)
  }

  constructor(rootQuery, parameters) {
    super(rootQuery, parameters, OpenSearchQuery.PARAMETERS_SEPARATOR)
  }
}
