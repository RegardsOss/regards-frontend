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
import SelectedDynamicModuleActions from './SelectedDynamicModuleActions'

/**
 * Current user app dynamic module reducer
 * @author Raphaël Mechali
 */
export class SelectedDynamicModuleReducer {
  /** Reducer default state */
  static DEFAULT_STATE = {
    dynamicModuleId: null,
  }

  /**
   * Constructor
   * @param {*} namespace actions namespace (leave blank to get default namespace)
   */
  constructor(namespace) {
    this.actions = new SelectedDynamicModuleActions(namespace)
  }

  /**
   * Reduces action or returns default state
   * @param {*} state this reducer redux state (uncombined before)
   * @param {*} action redux action to reduce (or ignore)
   * @return {*} next redux state for this reducer
   */
  reduce = (state = SelectedDynamicModuleReducer.DEFAULT_STATE, action) => {
    switch (action.type) {
      case this.actions.SET_DYNAMIC_MODULE:
        return {
          dynamicModuleId: action.dynamicModuleId,
        }
      default:
        return state
    }
  }
}

/**
 * Returns a reducer instance on actions namespace
 * @param {string} namespace actions namespace (leave blank to get default namespace)
 * @return {SelectedDynamicModuleReducer} reducer instance
 */
export default function getSelectedDynamicModuleReducer(namespace) {
  const reducerInstance = new SelectedDynamicModuleReducer(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}
