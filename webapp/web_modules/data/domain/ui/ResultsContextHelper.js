/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isPlainObject from 'lodash/isPlainObject'
import keys from 'lodash/keys'
import { RESULTS_TABS } from './ResultsTabs'
import ResultsContextConstants from './ResultsContextConstants'

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
}
