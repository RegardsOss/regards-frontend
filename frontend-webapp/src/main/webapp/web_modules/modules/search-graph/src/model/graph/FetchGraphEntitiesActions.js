/**
* LICENSE_PLACEHOLDER
**/
import last from 'lodash/last'
import { BasicPageableActions } from '@regardsoss/store-utils'
import { ENTITY, ENTITY_ARRAY } from '@regardsoss/api'
import { OpenSearchQuery } from '@regardsoss/domain/catalog'

/**
 * Parent actions to fetch graph entities at a given graph level
 */
class FetchGraphEntitiesActions extends BasicPageableActions {

  /**
   * Constructor
   * @param objectTypePath object type path (collections / datasets)
   */
  constructor(objectTypePath) {
    super({
      namespace: `search-graph/GRAPH_LEVEL_${objectTypePath.toUpperCase()}`,
      // note: search query is dynamically computed on fetch request
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/${objectTypePath}/search`,
      schemaTypes: {
        ENTITY,
        ENTITY_ARRAY,
      },
    })
  }

  /**
   * Fetches all objects for parent as parameter. use null if first level. Note:
   * For first level, the level model name must be provided but not the parents entity ID.
   * For next levels, parentEntityId must be provided (the parent path for datasets)
   * @param levelIndex level index
   * @param {*} parentEntityIds parent entity IDs (collections use only one, dataset needs all parent path)
   * @param levelModelName level model name, or null if none (when searching datasets for instance)
   */
  fetchAll(levelIndex, parentEntityIds = [], levelModelName = '') {
    // build query parts required for request and check preconditions
    const openSearchParameters = []
    if (levelIndex === 0) {
      if (parentEntityIds.length) {
        throw new Error('Parent should not be provided when fetching root graph level!')
      }
      if (!levelModelName) {
        throw new Error('No level model name for root, this request would fetch the entire catalog!')
      }
    } else {
      if (!parentEntityIds.length) {
        throw new Error('At least one parent should be provided when fetching non root graph level!')
      }
      // parent Id as tag
      parentEntityIds.forEach((parentEntityId) => {
        openSearchParameters.push(OpenSearchQuery.buildTagParameter(parentEntityId))
      })
    }

    if (levelModelName) {
      openSearchParameters.push(OpenSearchQuery.buildModelNameParameter(levelModelName))
    }
    // build search query and fetch server data (keep invocation context for action metadata)
    const searchQuery = new OpenSearchQuery(null, openSearchParameters).toQueryString()
    this.levelIndex = levelIndex
    this.parentEntityId = parentEntityIds.length ? last(parentEntityIds) : null
    return this.fetchPagedEntityList(0, 0, { levelModelName }, { q: searchQuery })
  }

  normalizeEntitiesPagePayload(json) {
    // override to add levels
    return {
      // let parent provide its content
      ...super.normalizeEntitiesPagePayload(json),
      // add parent entity ID and level
      parentEntityId: this.parentEntityId,
      levelIndex: this.levelIndex,
    }
  }

}

export default FetchGraphEntitiesActions
