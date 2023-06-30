/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Actions to fetch graph collections at a given graph level
 */
class FetchGraphCollectionsActions extends FetchGraphEntitiesActions {
  constructor() {
    super('collections') // specific URL path for collections
  }

  /**
  * Fetches all collections for parent entity ID and model name as parameter
  * @param {*} levelIndex level index
  * @param {*} parentEntityId parent entity ID
  * @param {*} levelModelName level model name
  */
  fetchAllCollections(levelIndex, parentEntityId = null, levelModelName) {
    if (!levelModelName) {
      throw new Error('Level model name must be provided for collections fetching!')
    }
    return super.fetchAll(levelIndex, parentEntityId ? [parentEntityId] : [], levelModelName)
  }
}

/**
 * Export single instance
 */
export default new FetchGraphCollectionsActions()
