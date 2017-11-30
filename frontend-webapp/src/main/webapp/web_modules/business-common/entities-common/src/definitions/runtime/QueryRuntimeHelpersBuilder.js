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
import get from 'lodash/get'
import partial from 'lodash/partial'
import reduce from 'lodash/reduce'
import { AccessProjectClient } from '@regardsoss/client'
import { DamDomain } from '@regardsoss/domain'
import { EntityConfiguration } from '@regardsoss/api'


/**
 * Query runtime helper builder: provide helpers for service plugin developers convenience
 * @author Raphaël Mechali
 */
class QueryRuntimeHelpersBuilder {
  /** Instance index counter */
  static INSTANCE_INDEX = 0

  /**
   * Maps an entity type to corresponding fetching actions
   * @param {*} entityType entityType
   * @param {*} namespace actions namespace
   */
  static getActions(entityType, namespace) {
    switch (entityType) {
      case DamDomain.ENTITY_TYPES_ENUM.COLLECTION:
        return new AccessProjectClient.SearchCollectionsActions(namespace)
      case DamDomain.ENTITY_TYPES_ENUM.DATASET:
        return new AccessProjectClient.SearchDatasetsActions(namespace)
      case DamDomain.ENTITY_TYPES_ENUM.DOCUMENT:
        return new AccessProjectClient.SearchDocumentsActions(namespace)
      case DamDomain.ENTITY_TYPES_ENUM.DATA:
        return new AccessProjectClient.SearchDataobjectsActions(namespace)
      default: // covers ulterior cases with mixed up entity types
        return new AccessProjectClient.SearchEntitiesActions(namespace)
    }
  }

  /**
   * Constructor
   * @param {*} serviceTarget : service target, of type 'query'
   */
  constructor(serviceTarget) {
    this.serviceTarget = serviceTarget
    this.actions = QueryRuntimeHelpersBuilder.getActions(serviceTarget.entityType, `plugin-service-runtime/query/instance-${QueryRuntimeHelpersBuilder.INSTANCE_INDEX}`)
    QueryRuntimeHelpersBuilder.INSTANCE_INDEX += 1
    // Note: from actual search results module implementation, query parameters are indeed used as path parameters
    this.queryParams = { queryParams: serviceTarget.q ? `q=(${serviceTarget.q})` : '' }
  }

  /**
   * Builds 'getFetchAction' method closure
   * @return {function} buildFetchAction like (pageIndex: number, pageSize: number) => [dispatchable action]
   */
  buildGetFetchAction() {
    return partial(this.getFetchAction, this.actions, this.queryParams)
  }

  /**
   * get fetch action implementation.
   * @param {BasicFacetsPageableActions} actions actions - partially applied, never seen by user
   * @param {*} queryParams query parameters  - partially applied, never seen by user.
   * @param {number} pageIndex page index (an integer, ranging from 0 to N-1)
   * @param {number} pageSize page size (an integer, ranging from 1 to N)
   * @return {*} [dispatchable action]
   */
  getFetchAction = (actions, queryParams, pageIndex, pageSize) => actions.fetchPagedEntityList(pageIndex, pageSize, queryParams)

  /**
   * Builds 'getReducePromise' method closure
   * @return {function} function like ( {function} applier , {function} dispatchMethod, {*} initialValue ) => Promise
   */
  buildGetReducePromise() {
    return partial(this.getReducePromise, this.actions, this.queryParams, this.serviceTarget.entitiesCount, this.serviceTarget.excludedIpIds)
  }

  /**
   * Returns a promise to apply a reducer on each entity.
   * @param {BasicFacetsPageableActions} actions actions - partially applied, never seen by user
   * @param {*} queryParams query parameters  - partially applied, never seen by user.
   * @param {number} elementsCount total elements count
   * @param {Array} excludedIpIds excluded IP IDs from query results
   * @param {function} dispatchMethod redux dispatch method, strictly required to run fetch
   * @param {*} applier treatment to apply, like (accumulator, entity content, index) => *
   * @param {*} initialValue optional initial value (will be provided as first acculmulator in applier)
   * @param {number} pageSize optional page size
   */
  getReducePromise = (actions, queryParams, elementsCount, excludedIpIds, dispatchMethod, applier, initialValue, pageSize = 1000) => {
    const actualElementsCount = Math.min(10000, elementsCount) // FIXME-V2 Remove when the limit does no longer apply on catalog backend
    const totalPages = Math.ceil(actualElementsCount / pageSize)
    // build a promise that will resolve and reduce, page by page, and terminate on last page
    return new Promise((resolve, reject) => {
      /**
       * Recursive page resolver
       * @param {*} previousResult previous reduction result
       * @param {number} entityIndex this first entity index
       * @param {number} pageIndex page index
       */
      function handleQueryPage(previousResult, entityIndex, pageIndex) {
        dispatchMethod(actions.fetchPagedEntityList(pageIndex, pageSize, queryParams))
          .then(({ payload, error = false }) => {
            // reduce promise results (will be next then value) or throw error (will enter catch)
            const entities = get(payload, `entities.${EntityConfiguration.normalizrKey}`)
            // 1 - Error while fetching
            if (error || !entities) {
              throw new Error(`Entities page could not be retrieved: ${payload.message || 'unknow error'}`)
            }
            // 2 - reduce those entities then jump to next or terminate
            let currentIndex = entityIndex // sadly not provided by lodash.reduce :-(
            const pageResult = reduce(entities, (accumulator, { content: entityContent }, key, index) => {
              // do not handle the excluded IP IDs
              if (excludedIpIds.includes(entityContent.ipId)) {
                return accumulator // do not call reducer nor improve entity index
              }
              currentIndex += 1
              return applier(accumulator, entityContent, currentIndex)
            }, previousResult)
            // 3 - Loop or break case
            if (pageIndex === totalPages - 1) { // done
              resolve(pageResult)
            } else { // not done yet, loop
              handleQueryPage(pageResult, currentIndex + 1, pageIndex + 1)
            }
          }).catch(e => reject(e)) // any page error must terminate the promise
      }
      // start resolving first page
      handleQueryPage(initialValue, 0, 0)
    })
  }
}

module.exports = {
  QueryRuntimeHelpersBuilder,
}
