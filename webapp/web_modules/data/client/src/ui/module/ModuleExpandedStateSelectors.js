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

import { BasicSelector } from '@regardsoss/store-utils'

/**
 * Module expanded state selectors
 * @author Raphaël Mechali
 */
export class ModuleExpandedStateSelectors extends BasicSelector {
  /**
   * Returns state for given module stype
   * @param {*} state redux state
   * @param {string} moduleType module type or any identifier for component instance
   * @return {expandable: boolean, expanded: boolean} current state if any, undefined otherwise
   */
  getExpandState(state, moduleType) {
    return this.uncombineStore(state)[moduleType]
  }

  /**
   * Returns expandable state for given module stype
   * @param {*} state redux state
   * @param {string} moduleType module type or any identifier for component instance
   * @return {boolean} is expandable? Undefined when uknown
   */
  isExpandable(state, moduleType) {
    const moduleState = this.getExpandState(state, moduleType)
    return moduleState && moduleState.expandable
  }

  /**
    * Returns expandable state for given module stype
    * @param {*} state redux state
    * @param {string} moduleType module type or any identifier for component instance
    * @return {boolean} is expandable? Undefined when uknown
    */
  isExpanded(state, moduleType) {
    const moduleState = this.getExpandState(state, moduleType)
    return moduleState && moduleState.expanded
  }
}

/**
 * Returns an instance of module state selectors on given store path
 * @param  {[string]} store path: reducer store path (default provided)
 * @return {ModuleExpandedStateSelectors} feedback selectors instance
 */
export function getModuleExpandedStateSelectors(storePath = ['user', 'modulesPanesStates']) {
  return new ModuleExpandedStateSelectors(storePath)
}
