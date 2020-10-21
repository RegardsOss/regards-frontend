/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Query from '../../common/query/abstract/Query'


/**
 * Manages an open search query parameter as a complete query (with its own separator and such)
 * @author Raphaël Mechali
 */
export default class OpenSearchQuery extends Query {
  /** Parameters separator */
  static PARAMETERS_SEPARATOR = ' AND '

  /** Open search query parameter name: Entity tags */
  static TAGS_PARAM_NAME = 'tags'

  /** Open search query parameter name: Entity model */
  static MODEL_PARAM_NAME = 'model'

  /** Open search query parameter name: Entity ID */
  static ID_PARAM_NAME = 'id'

  /** Open search query parameter name: Entity parent dataset model Ids */
  static DATASET_MODEL_NAMES_PARAM = 'datasetModelNames'

  /**
   * Constructor
   * @param {[*]} parameters array of QueryParameter
   * @param {String} rootQuery any root query, to be added before parameters
   */
  constructor(parameters = [], rootQuery = '') {
    super(rootQuery, OpenSearchQuery.PARAMETERS_SEPARATOR, parameters)
  }
}
