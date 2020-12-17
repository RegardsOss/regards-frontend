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
import { CatalogDomain, DamDomain } from '@regardsoss/domain'
import { OpenSearchQuery, OpenSearchQueryParameter } from '@regardsoss/domain/catalog'
import SearchCollectionsActions from './SearchCollectionsActions'
import SearchDataobjectsActions from './SearchDataobjectsActions'
import SearchDatasetsActions from './SearchDatasetsActions'

/**
 * Actions to search for an entity other versions (helper actions)
 */
export default class FetchEntityVersionsActions {
  constructor(namespace) {
    this.searchDelegates = {
      [DamDomain.ENTITY_TYPES_ENUM.COLLECTION]: new SearchCollectionsActions(namespace),
      [DamDomain.ENTITY_TYPES_ENUM.DATA]: new SearchDataobjectsActions(namespace),
      [DamDomain.ENTITY_TYPES_ENUM.DATASET]: new SearchDatasetsActions(namespace),
    }
  }

  /**
   * Fetches all versions of entity as parameter
   * @param {string} id entity ID
   * @param {string} type one of DamDomain.ENTITY_TYPES_ENUM
   * @return {*} redux action to dispatch
   */
  fetchAllVersions(id, type) {
    return this.searchDelegates[type].fetchPagedEntityList(0, 10000, null, {
      q: new OpenSearchQuery([
        // Searching similar IDs with different versions
        new OpenSearchQueryParameter(OpenSearchQuery.SAPN.id,
          OpenSearchQueryParameter.toStringContained(CatalogDomain.TagsHelper.getURNWithoutVersion(id))),
      ]).toQueryString(),
    })
  }
}
