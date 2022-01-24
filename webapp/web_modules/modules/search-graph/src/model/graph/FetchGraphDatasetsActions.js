/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FetchGraphEntitiesActions from './FetchGraphEntitiesActions'

/**
 * Actions to fetch graph datasets at a given graph level
 */
class FetchGraphDatasetsActions extends FetchGraphEntitiesActions {
  constructor() {
    super('datasets') // specific URL path for datasets
  }

  /**
   * Fetches all datasest for parent entity ID as parameter
   * @param {*} levelIndex level index
   * @param {*} parentPath parent entities path (IP IDs)
   */
  fetchAllDatasets(levelIndex, parentPath = []) {
    if (levelIndex === 0 || !parentPath.length) {
      throw new Error('Datasets cannot be retrieved at root level (it would result in whole catalog datasets)')
    }
    return super.fetchAll(levelIndex, parentPath)
  }
}

/**
 * Export single instance
 */
export default new FetchGraphDatasetsActions()
