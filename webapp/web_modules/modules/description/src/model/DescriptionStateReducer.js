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
import { DescriptionStateActions } from './DescriptionStateActions'

/**
 * Description user dialog state reducer
 * @author Raphaël Mechali
 */
export class DescriptionStateReducer {
  /** Default reducer state: at first tree element */
  static DEFAULT_STATE = {
    selectedPath: [0],
  }

  /**
   * Constructor
   * @param {*} namespace corresponding actions namespace
   */
  constructor(namespace) {
    this.actions = new DescriptionStateActions(namespace)
  }

  /**
   * Reduce method: computes next reducer state
   * @param {*} state store state for reducer (uncombined)
   * @param {*} action action to handle
   * @return {*} next reducer state for action
   */
  reduce(state = DescriptionStateReducer.DEFAULT_STATE, action) {
    if (action.type === this.actions.SELECT_TREE_ENTRY) {
      return { selectedPath: action.selectedPath }
    }
    return state
  }
}

/**
 * Builds reducer function closure on namespace
 * @param {*} namespace namespace
 * @return {Function} reducer function for redux
 */
export function buildDescriptionStateReducer(namespace) {
  const reducer = new DescriptionStateReducer(namespace)
  return (state, action) => reducer.reduce(state, action)
}
