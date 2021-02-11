/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import { RuntimeTargetTypes } from '@regardsoss/domain/access'
import { CatalogDomain } from '@regardsoss/domain'

/**
 * Target helper: builds services targets and parameters
 * @author Raphaël Mechali
 */
export class TargetHelper {
  /** Common search context */
  static COMMON_CONTEXT = {
    engineType: CatalogDomain.LEGACY_SEARCH_ENGINE,
  }

  /**
   * Builds a "one element" target
   * @param {*} entity matching CatalogShapes.Entity
   * @return One element target
   */
  static buildOneElementTarget(entity) {
    return {
      type: RuntimeTargetTypes.ONE,
      searchContext: {
        ...TargetHelper.COMMON_CONTEXT,
        searchParameters: {
          // query: the selected entity
          q: [new CatalogDomain.OpenSearchQuery([
            new CatalogDomain.OpenSearchQueryParameter(CatalogDomain.OpenSearchQuery.SAPN.id,
              CatalogDomain.OpenSearchQueryParameter.toStrictStringEqual(entity.content.id))])
            .toQueryString()],
        },
      },
      entityType: entity.content.entityType,
      entitiesCount: 1,
      entity,
    }
  }

  /**
   * Builds a "many elements" target
   * @param {[*]} entities selected entity as an array of CatalogShapes.Entity
   * @return many elements target
   */
  static buildManyElementsTarget(entities) {
    return {
      type: RuntimeTargetTypes.MANY,
      searchContext: {
        ...TargetHelper.COMMON_CONTEXT,
        searchParameters: {
          // query: any selected entity
          q: [new CatalogDomain.OpenSearchQuery([
            new CatalogDomain.OpenSearchQueryParameter(CatalogDomain.OpenSearchQuery.SAPN.id,
              CatalogDomain.OpenSearchQueryParameter.toStrictStringEqual(entities.map((e) => e.content.id)))])
            .toQueryString()],
        },
      },
      entityType: entities[0].content.entityType,
      entitiesCount: entities.length,
      entities,
    }
  }

  /**
   * Builds "query" target
   * @param {*} requestParameters OpenSearch request parameters
   * @param entityType type of entities to retrieve with query
   * @param entitiesCount query entities count (total, ignore the unselected elements count here)
   * @param {[*]} excludedEntities excluded entities, as array of CatalogShapes.Entity
   * @return query target
   */
  static buildQueryTarget(requestParameters, entityType, entitiesCount, excludedEntities) {
    return {
      type: RuntimeTargetTypes.QUERY,
      searchContext: {
        ...TargetHelper.COMMON_CONTEXT,
        searchParameters: {
          ...requestParameters,
          // q : current context and excluded IDs
          q: [new CatalogDomain.OpenSearchQuery([
            // excluded IDs
            new CatalogDomain.OpenSearchQueryParameter(CatalogDomain.OpenSearchQuery.SAPN.id,
              CatalogDomain.OpenSearchQueryParameter.toStrictStringEqual(
                excludedEntities.map((e) => e.content.id), CatalogDomain.OpenSearchQueryParameter.AND_SEPARATOR, true))],
          // context query as base query
          requestParameters.q && requestParameters.q.length > 0 ? requestParameters.q[0] : '').toQueryString()],
        },
      },
      entityType,
      entitiesCount: entitiesCount - excludedEntities.length,
      excludedEntities,
    }
  }
}
