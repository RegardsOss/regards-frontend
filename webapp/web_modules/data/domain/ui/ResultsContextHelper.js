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
import forEach from 'lodash/forEach'
import reduce from 'lodash/reduce'
import keys from 'lodash/keys'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import isPlainObject from 'lodash/isPlainObject'
import values from 'lodash/values'
import { RESULTS_TABS } from './ResultsTabs'
import ResultsContextConstants from './ResultsContextConstants'
import { CatalogSearchQueryHelper } from '../catalog'
import AttributeModelController from '../dam/AttributeModelController'

/**
 * Helper for results context (holds merge deep common method)
 *
 * @author Raphaël Mechali
 */
export class ResultsContextHelper {
  /**
   * Merges deeply two objects. Second object always has precedence (it is considered as "differences" from previous state)
   * @param {*} source source object
   * @param {*} diff diff object
   * @return {*} merged object
   */
  static deepMerge(source, diff) {
    // Merge break case A: a primary type (or previously null value) => return diff specified value
    if (!isPlainObject(source)) {
      return diff
    }

    // recursive loop case: merge fields below (break if only one object defines it)
    const sourceKeys = keys(source)
    const diffKeys = keys(diff)
    const allKeys = [...new Set([...sourceKeys, ...diffKeys])]
    return allKeys.reduce((acc, key) => {
      let mergedValue
      if (!sourceKeys.includes(key)) {
        mergedValue = diff[key] // merge break case B: only diff holds that value (new value to add)
      } else if (!diffKeys.includes(key)) {
        mergedValue = source[key] // merge break case C: only source holds that value (keep source value)
      } else {
        // recursive loop case: value has been defined in both objects: merge one level below
        mergedValue = ResultsContextHelper.deepMerge(source[key], diff[key])
      }
      return {
        ...acc,
        [key]: mergedValue,
      }
    }, {})
  }

  /**
 * Extracts and returns current view state (type and mode) in results tab
 * @param {*} resultsContext results context (respects corresponding shape)
 * @param {string} tabType tab (one of RESULTS_TABS_ENUM.MAIN_RESULTS | RESULTS_TABS_ENUM.TAG_RESULTS)
 * @return {{tab: *, selectedType: string, selectedMode: string, selectedTypeState: *, selectedModeState: *}} tab, selected type,
 * selected type state, selected mode and selected mode
 */
  static getViewData(resultsContext = {}, tabType) {
    // check tab type
    if (!RESULTS_TABS.includes(tabType)) {
      throw new Error(`Invalid tab type ${tabType}`)
    }
    const tab = resultsContext.tabs[tabType]
    const { selectedType, types } = tab
    const selectedTypeState = selectedType && types ? types[selectedType] : ResultsContextConstants.DISABLED_TYPE_STATE
    return {
      tab,
      selectedType,
      selectedMode: selectedTypeState.selectedMode,
      selectedTypeState,
      selectedModeState: selectedTypeState.modes[selectedTypeState.selectedMode],
    }
  }

  /**
   * Flattens all criteria arrays in map into a single criteria array
   * @param {*} criteriaMap criteria holder (with field named 'criteria' and matching ResultsContext#Criteria field)
   * @return {[*]} array of applying criteria in that holder
   */
  static getCriteriaMapAsArray(criteriaMap) {
    return (isEmpty(criteriaMap) ? [] : values(criteriaMap))
      .reduce((acc, criteriaForKey) => [...acc, ...(criteriaForKey || [])], [])
  }

  /**
   * Builds query for criteria array as parameter
   * @param {[*]} criteria array of criteria, matching UIShapes.BasicCriterion
   * @param {*} criteria parameters (where q parts have merged together)
   */
  static getQueryParametersFromCriteria(criteria) {
    // collect all parameters in criteria, grouping them in arrays by key
    const requestParameters = criteria.reduce((acc, criterion) => {
      const nextAcc = { ...acc }
      // Add in local accumulator all parameters of the current criterion (preserving other values)
      forEach(criterion.requestParameters || {}, (paramValue, paramKey) => {
        if (!isNil(paramKey) && !isNil(paramValue)) { // avoid empty / null parmeter values
          const previousParameterValues = nextAcc[paramKey]
          if (previousParameterValues && CatalogSearchQueryHelper.isAllowingMultipleValues(paramKey)) {
            // That parameter can accept many values, add new one at end
            nextAcc[paramKey] = [...nextAcc[paramKey], ...(isArray(paramValue) ? paramValue : [paramValue])]
          } else if (!previousParameterValues) {
            // first value found for parameter
            nextAcc[paramKey] = isArray(paramValue) ? paramValue : [paramValue]
          }
        }
      })
      return nextAcc
    }, {})
    // group q parts into a single string for value
    const qValue = CatalogSearchQueryHelper.mergeQueryParameter(requestParameters[CatalogSearchQueryHelper.Q_PARAMETER_NAME])
    // keep an array of queries for POST methods compatibility
    requestParameters[CatalogSearchQueryHelper.Q_PARAMETER_NAME] = qValue ? [qValue] : []
    return requestParameters
  }

  /**
   * Computes if the context as parameter is complete or partial (related with partial update from external controller)
   * @param {*} resultsContext context
   * @return {boolean}
   */
  static isFullContext(resultsContext) {
    function checkSubTree(testedTree, modelTree) {
      if (!isPlainObject(testedTree)) {
        // break case: simple value, it should be null / undefined
        return isNil(modelTree) || !isNil(testedTree) // accept nil values only when model worth nil too
      }
      // Recursive case: handle each property as a sub tree
      return keys(modelTree).reduce((acc, key) => acc && checkSubTree(testedTree[key], modelTree[key]), true)
    }
    return checkSubTree(resultsContext, ResultsContextConstants.DEFAULT_RESULTS_CONTEXT)
  }

  /**
   * Compute the list of sortable attributes
   * @param {*} resultsContext context
   * @param {string} tabType tab (one of RESULTS_TABS_ENUM.MAIN_RESULTS | RESULTS_TABS_ENUM.TAG_RESULTS)
   * @returns {{SortableAttributes}} an object containing sortable attributes
   */
  static getSortableAttributes(resultsContext, tabType) {
    const { tab, selectedType } = ResultsContextHelper.getViewData(resultsContext, tabType)
    const { initialSorting, modes } = tab.types[selectedType]
    const allAttributes = {
      // 1- Compute the attributes list from initial sorting
      ...reduce(initialSorting, (acc, sort) => {
        const { attribute } = sort
        acc[attribute.content.id] = { attribute }
        return acc
      }, {}),
      // 2- Compute the attributes list using all fields displayed in all view mode activated
      ...reduce(modes, (acc, mode) => {
        if (mode.enabled) {
          mode.presentationModels.forEach((presentationModel) => {
            const { attributes, enableSorting, label } = presentationModel
            if (enableSorting && attributes.length === 1) {
              const { model } = attributes[0]
              acc[model.content.id] = {
                attribute: model,
                label,
              }
            }
          })
        }
        return acc
      }, {}),
    }
    return reduce(allAttributes, (acc, sortAttr, attrKey) => {
      if (AttributeModelController.isSearchableAttribute(sortAttr.attribute)) {
        acc[attrKey] = sortAttr
      }
      return acc
    }, {})
  }
}
