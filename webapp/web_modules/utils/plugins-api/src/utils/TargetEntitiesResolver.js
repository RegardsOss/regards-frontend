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
import get from 'lodash/get'
import values from 'lodash/values'
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import { EntityConfiguration } from '@regardsoss/api'
import { AccessProjectClient } from '@regardsoss/client'

/**
 * Helpers to deal with plugin service target: provides an easy way to resolve a result built on
 * all entities in target
 * @author Raphaël Mechali
 */
export class TargetEntitiesResolver {
  /**
   * @param {Function} dispatch dispatch method, from redux
   * @param {*} target service target, matching AccessShapes.PluginTarget
   * @param {Function} reducer like (acc:*, entity:CatalogShapes.Entity => nextAcc:*, index)
   * @param {*} initialValue reduction initial value (acc value when calling reducer for the first time)
   * @return {Promise} reduction promise
   */
  static getReducePromise(dispatch, target, reducer, initialValue) {
    switch (target.type) {
      case AccessDomain.RuntimeTargetTypes.ONE:
        return TargetEntitiesResolver.getImmediateReducePromise([target.entity], reducer, initialValue)
      case AccessDomain.RuntimeTargetTypes.MANY:
        return TargetEntitiesResolver.getImmediateReducePromise(target.entities, reducer, initialValue)
      case AccessDomain.RuntimeTargetTypes.QUERY:
        return TargetEntitiesResolver.getQueryReducePromise(dispatch, target, reducer, initialValue)
      default:
        throw new Error(`Unknown target type ${target.type}`)
    }
  }

  /**
   * Returns immediately resolved promise on entities as parameter
   * @param {*} entities entities list
   * @param {*} reducer reducer
   * @param {*} initialValue initial value
   */
  static getImmediateReducePromise(entities, reducer, initialValue) {
    return new Promise((resolve) => resolve(entities.reduce((acc, value, index) => reducer(acc, value, index), initialValue)))
  }

  /**
   * Maps an entity type to corresponding fetching actions
   * @param {*} entityType entityType
   * @param {*} namespace actions namespace
   */
  static getActions(entityType) {
    const namespace = 'plugin-service-runtime/entities-resolve'
    switch (entityType) {
      case DamDomain.ENTITY_TYPES_ENUM.COLLECTION:
        return new AccessProjectClient.SearchCollectionsActions(namespace)
      case DamDomain.ENTITY_TYPES_ENUM.DATASET:
        return new AccessProjectClient.SearchDatasetsActions(namespace)
      case DamDomain.ENTITY_TYPES_ENUM.DATA:
        return new AccessProjectClient.SearchDataobjectsActions(namespace)
      default: // covers ulterior cases with mixed up entity types
        return new AccessProjectClient.SearchEntitiesActions(namespace)
    }
  }

  /** Page size, by */
  static PAGE_SIZE = '100'

  /**
   * Returns a promise that will fetch and apply reducer on each
   * @param {Function} dispatch dispatch method, from redux
   * @param {*} target service target, matching AccessShapes.QueryTarget
   * @param {Function} reducer like (acc:*, entity:CatalogShapes.Entity => nextAcc:*, index: number)
   * @param {*} initialValue reduction initial value (acc value when calling reducer for the first time)
   * @return {Promise} reduction promise
   */
  static getQueryReducePromise(dispatch, target, reducer, initialValue) {
    const actions = TargetEntitiesResolver.getActions(target.entityType)
    const totalPages = Math.ceil(target.entitiesCount / TargetEntitiesResolver.PAGE_SIZE)
    // build a promise that will resolve and reduce, page by page, and terminate on last page
    return new Promise((resolve, reject) => {
      function handleResultsPage(beforePageResult, pageIndex = 0) {
        dispatch(actions.fetchPagedEntityList(pageIndex, TargetEntitiesResolver.PAGE_SIZE, null, target.searchContext.searchParameters))
          .then(({ payload, error = false }) => {
            // reduce promise results (will be next then value) or throw error (will enter catch)
            const entities = get(payload, `entities.${EntityConfiguration.normalizrKey}`)
            // 1 - Error while fetching
            if (error || !entities) {
              throw new Error(`Entities page could not be retrieved: ${payload.message || 'unknow error'}`)
            }
            // 2 - reduce those entities then jump to next or terminate
            const entitiesArray = values(entities)
            const firstIndex = pageIndex * TargetEntitiesResolver.PAGE_SIZE
            const afterPageResult = entitiesArray.reduce(
              (acc, currentEntity, index) => reducer(acc, currentEntity, firstIndex + index), beforePageResult)
            // 3 - Loop or break case
            if (pageIndex === totalPages - 1) { // done
              resolve(afterPageResult)
            } else { // not done yet, loop into next page
              handleResultsPage(afterPageResult, pageIndex + 1)
            }
          }).catch((e) => reject(e)) // any page error must terminate the promise
      }
      // start resolving first page
      handleResultsPage(initialValue)
    })
  }
}
