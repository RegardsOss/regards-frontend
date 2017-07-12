/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { BasicSelector } from '@regardsoss/store-utils'

/**
 * Navigation context state selectors
 */
class DatasetServicesSelectors extends BasicSelector {

  /**
   * Returns dataset services from state
   * @param {*} state state
   * @return [Service] dataset service list for contextual dataset, maybe empty
   */
  getDatasetServices(state) {
    return this.uncombineStore(state).datasetServices
  }

  /**
   * Returns selected dataobjects services from state
   * @param {*} state state
   * @return [Service] selected dataobject services for contextual dataset, maybe empty
   */
  getSelectedDataobjectsServices(state) {
    return this.uncombineStore(state).selectedDataobjectsServices
  }

}

export default new DatasetServicesSelectors(['modules.search-results', 'datasetServices'])
