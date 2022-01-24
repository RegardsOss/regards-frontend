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
import last from 'lodash/last'
import { BasicPageableActions } from '@regardsoss/store-utils'
import { ENTITY, ENTITY_ARRAY } from '@regardsoss/api'
import { CatalogDomain } from '@regardsoss/domain'

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
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ACCESS_PROJECT}/${objectTypePath}/search`,
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
      openSearchParameters.push(

      )
      parentEntityIds.forEach((parentEntityId) => {
        openSearchParameters.push(
          new CatalogDomain.OpenSearchQueryParameter(
            CatalogDomain.OpenSearchQuery.SAPN.tags,
            CatalogDomain.OpenSearchQueryParameter.toStrictStringEqual(parentEntityId),
            CatalogDomain.OpenSearchQueryParameter.AND_SEPARATOR))
      })
    }

    if (levelModelName) {
      openSearchParameters.push(
        new CatalogDomain.OpenSearchQueryParameter(
          CatalogDomain.OpenSearchQuery.SAPN.model,
          CatalogDomain.OpenSearchQueryParameter.toStrictStringEqual(levelModelName)))
    }
    // build search query and fetch server data (keep invocation context for action metadata)
    const searchQuery = new CatalogDomain.OpenSearchQuery(openSearchParameters).toQueryString()
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
