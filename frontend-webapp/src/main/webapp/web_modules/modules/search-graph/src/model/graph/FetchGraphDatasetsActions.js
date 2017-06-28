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
