/**
 * LICENSE_PLACEHOLDER
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
   * @param {*} parentEntityId parent entity ID
   */
  fetchAllDatasets(levelIndex, parentEntityId) {
    if (levelIndex === 0 || parentEntityId === null) {
      throw new Error('Datasets cannot be retrieved at root level (it would result in whole catalog datasets)')
    }
    return super.fetchAll(levelIndex, parentEntityId)
  }

}

/**
 * Export single instance
 */
export default new FetchGraphDatasetsActions()
