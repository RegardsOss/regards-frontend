/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import isString from 'lodash/isString'
import last from 'lodash/last'
import { browserHistory } from 'react-router'
import { UIDomain, CatalogDomain, DamDomain } from '@regardsoss/domain'
import { UIClient } from '@regardsoss/client'
import { CriterionBuilder } from '../../../definitions/CriterionBuilder'

/**
 * Helper to export / restore results context to / from
 * @author Raphaël Mechali
 */
export class URLContextHelper {
  /**
   * Builds an element resolution promise: (ie: promise for a new context diff with a given element)  It:
   * 1. resolves the tag
   *   * a) resolves the tag when it is an entity tag
   *   * b) resolved promise immediately for any other value (jumps to 2a)
   * 2. resolves next context by
   *   * a) merging previous context with build context diff on resolution success
   *   * b) OR returning previous context on resolution fail
   * @param {*} previousContext previous results context
   * @param {*} buildContext build next context (resolution results: *) => (results context diff: *)
   * @param {string} value value to resolve and set in context (mandatory)
   * @param {Function} fetchEntity dispatches fetch entity and returns entity resolution promise
   * @return {Promise} next results context build promise
   */
  static resolveElementInContext(previousContext, value, fetchEntity, buildContext) {
    return new Promise((resolve) => {
      // 1 - Value resolution
      if (CatalogDomain.isURNTag(value)) {
        // 1.a
        fetchEntity(value)
          // Entity resolution successful
          .then(({ payload }) => {
            // Nota: payload can be the entity or the error holder here
            if (payload.error || !payload.content || !payload.content.id) { // retrieval failure
              resolve(previousContext) // (2.b)
            }
            // 2.a - successful entity resolution, complete context
            resolve(UIClient.ResultsContextHelper.mergeDeep(previousContext, buildContext(payload)))
          })
          // Entity resolution failed (2.b)
          .catch(err => console.error('THERE is an error', err) || resolve(previousContext)) // TODO delete console error
      } else {
        // 1.b -> 2.a : a simple value, resolve immediately
        resolve(UIClient.ResultsContextHelper.mergeDeep(previousContext, buildContext(value)))
      }
    })
  }

  /**
   * Builds a tag from its model: when model is an entity, build a word tag
   * @param {string | {*}} tagModel tag model (either a string or an entity)
   * @return {*} tag, matching ResultsContext.TagCriterion shape
   */
  static buildTagFrom(tagModel) {
    return isString(tagModel) ? CriterionBuilder.buildWordTagCriterion(tagModel) : CriterionBuilder.buildEntityTagCriterion(tagModel)
  }

  /**
   * module URL parameters serialization management. Each parameter defines:
   * - name: parameter name in URL
   * - toParameterValue: Value to push in URL for parameter  (recovered in resultsContext)
   * resultsContext: value: * => string
   * - fromParameterValue: Builds a promise that resolves on updated results context with value from URL.
   * resultsContext: *, value: *, fetchEntity: Function => Promise
   */
  static MODULE_URL_PARAMETERS = [
    // selected tab
    {
      name: 't',
      toParameterValue: resultsContext => resultsContext.selectedTab,
      fromParameterValue: (resultsContext, value, fetchEntity) => URLContextHelper.resolveElementInContext(resultsContext, value, fetchEntity,
        selectedTab => ({ selectedTab })),
    }, { // main reults entities type
      name: 'rt',
      toParameterValue: resultsContext => resultsContext.tabs[UIDomain.ResultsContextConstants.TABS_ENUM.MAIN_RESULTS].selectedType,
      fromParameterValue: (resultsContext, value, fetchEntity) => URLContextHelper.resolveElementInContext(resultsContext, value, fetchEntity,
        selectedType => ({
          tabs: {
            [UIDomain.ResultsContextConstants.TABS_ENUM.MAIN_RESULTS]: { selectedType },
          },
        })),
    }, { // main results display mode
      name: 'rd',
      toParameterValue: (resultsContext) => {
        const resultsTab = resultsContext.tabs[UIDomain.ResultsContextConstants.TABS_ENUM.MAIN_RESULTS]
        return resultsTab.types[resultsTab.selectedType].selectedMode
      },
      fromParameterValue: (resultsContext, value, fetchEntity) => URLContextHelper.resolveElementInContext(resultsContext, value, fetchEntity,
        (selectedMode) => {
          const resultsTabType = get(resultsContext, `tabs.${UIDomain.ResultsContextConstants.TABS_ENUM.MAIN_RESULTS}.selectedType`, DamDomain.ENTITY_TYPES_ENUM.DATA)
          return {
            tabs: {
              [UIDomain.ResultsContextConstants.TABS_ENUM.MAIN_RESULTS]: {
                types: {
                  [resultsTabType]: { selectedMode },
                },
              },
            },
          }
        }),
    }, { // main results user filters
      name: 'rf',
      toParameterValue: (resultsContext) => {
        const resultsTab = resultsContext.tabs[UIDomain.ResultsContextConstants.TABS_ENUM.MAIN_RESULTS]
        const { tagsFiltering } = resultsTab.criteria
        // optional filter tag
        return tagsFiltering.length ? tagsFiltering[0].searchKey : null
      },
      fromParameterValue: (resultsContext, value, fetchEntity) => URLContextHelper.resolveElementInContext(resultsContext, value, fetchEntity,
        tagModel => ({
          tabs: {
            [UIDomain.ResultsContextConstants.TABS_ENUM.MAIN_RESULTS]: {
              criteria: {
                tagsFiltering: [URLContextHelper.buildTagFrom(tagModel)],
              },
            },
          },
        })),
    }, { // last description entity
      name: 'd',
      toParameterValue: (resultsContext) => {
        const { descriptionPath } = resultsContext.tabs[UIDomain.ResultsContextConstants.TABS_ENUM.DESCRIPTION]
        // optional description path
        return descriptionPath.length ? last(descriptionPath).content.id : null
      },
      fromParameterValue: (resultsContext, value, fetchEntity) => URLContextHelper.resolveElementInContext(resultsContext, value, fetchEntity,
        entity => ({
          tabs: {
            [UIDomain.ResultsContextConstants.TABS_ENUM.DESCRIPTION]: {
              descriptionPath: [entity],
            },
          },
        })),
    }, { // tag view main tag
      name: 'st',
      toParameterValue: (resultsContext) => {
        const tagsTab = resultsContext.tabs[UIDomain.ResultsContextConstants.TABS_ENUM.TAG_RESULTS]
        const { contextTags } = tagsTab.criteria
        // view is hidden when there is no context tag
        return contextTags.length ? contextTags[0].searchKey : null
      },
      fromParameterValue: (resultsContext, value, fetchEntity) => URLContextHelper.resolveElementInContext(resultsContext, value, fetchEntity,
        tagModel => ({
          tabs: {
            [UIDomain.ResultsContextConstants.TABS_ENUM.TAG_RESULTS]: {
              criteria: { // restore context tag
                contextTags: [URLContextHelper.buildTagFrom(tagModel)],
              },
            },
          },
        })),
    }, { // tag view display mode
      name: 'td',
      toParameterValue: (resultsContext) => {
        const tagsTab = resultsContext.tabs[UIDomain.ResultsContextConstants.TABS_ENUM.TAG_RESULTS]
        const { contextTags } = tagsTab.criteria
        // view is hidden when there is no context tag (do no append in URL when hidden)
        return contextTags.length ? tagsTab.types[tagsTab.selectedType].selectedMode : null
      },
      fromParameterValue: (resultsContext, value, fetchEntity) => URLContextHelper.resolveElementInContext(resultsContext, value, fetchEntity,
        selectedMode => ({
          tabs: {
            [UIDomain.ResultsContextConstants.TABS_ENUM.TAG_RESULTS]: {
              types: {
                [DamDomain.ENTITY_TYPES_ENUM.DATA]: { selectedMode },
              },
            },
          },
        })),
    }, { // tag view user filter
      name: 'tf',
      toParameterValue: (resultsContext) => {
        const tagsTab = resultsContext.tabs[UIDomain.ResultsContextConstants.TABS_ENUM.TAG_RESULTS]
        const { contextTags, tagsFiltering } = tagsTab.criteria
        // user filtering tag, when view is visible (has context tag)
        return contextTags.length && tagsFiltering.length ? tagsFiltering[0].searchKey : null
      },
      fromParameterValue: (resultsContext, value, fetchEntity) => URLContextHelper.resolveElementInContext(resultsContext, value, fetchEntity,
        tagModel => ({
          tabs: {
            [UIDomain.ResultsContextConstants.TABS_ENUM.TAG_RESULTS]: {
              criteria: { // restore as user tag
                tagsFiltering: [URLContextHelper.buildTagFrom(tagModel)],
              },
            },
          },
        }),
      ),
    },
  ]

  /**
   * Returns a promise that resolves the context to set, updated with elements from URL
   * @param {*} query query to apply
   * @param {*} initContext int context or empty object, to be completed here
   * @param {*} fetchEntity fetch entity method, return an entity resolving promise
   * @return {Promise} context resolution promise (dumb promise when none)
   */
  static resolveContextFromURL(initContext, fetchEntity) {
    const { query } = browserHistory.getCurrentLocation()
    // build the promise: promise chain of all parameters
    const contextResolutionPromise = URLContextHelper.MODULE_URL_PARAMETERS.reduce(
      (accPromise, { name, fromParameterValue }) => {
        const parameterValue = query[name]
        if (!isNil(parameterValue)) {
          if (accPromise) {
            // chain with previous resolution promise
            return accPromise.then(resultingContext => fromParameterValue(resultingContext, parameterValue, fetchEntity))
          }
          // the first promise to resolve
          return fromParameterValue(initContext, parameterValue, fetchEntity)
        }
        // That parameter is not found, skip it
        return accPromise
      }, null)
    return contextResolutionPromise || new Promise(resolve => resolve(initContext)) // no change
  }

  /**
   * Builds query parameters for results context as parameter
   * @param {*} resultsContext results context
   * @return {*} query parameters built for context
   */
  static buildURLQuery(resultsContext) {
    return URLContextHelper.MODULE_URL_PARAMETERS.reduce((acc, { name, toParameterValue }) => {
      const parameterValue = toParameterValue(resultsContext)
      // TODO remove parameters when they worth default value?
      return isNil(parameterValue) ? acc : {
        ...acc,
        [name]: parameterValue,
      }
    }, {})
  }


  /**
   * Updates browser URL, **when required**, to match new results context
   * @param {*} oldContext old results context (must be present and fully completed)
   * @param {*} newContext new results context (must be present and fully completed)
   */
  static updateURLForContext(oldContext, newContext) {
    const { pathname } = browserHistory.getCurrentLocation()
    const previousQuery = URLContextHelper.buildURLQuery(oldContext)
    const nextQuery = URLContextHelper.buildURLQuery(newContext)
    if (!isEqual(previousQuery, nextQuery)) {
      browserHistory.replace({ pathname, query: nextQuery })
    }
  }
}
