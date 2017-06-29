/**
 * LICENSE_PLACEHOLDER
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
