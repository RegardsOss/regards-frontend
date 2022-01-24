/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
   * Returns state for given component stype
   * @param {*} state redux state
   * @param {string} moduleType module type or any identifier for component instance
   * @return {expandable: boolean, state: string} full state for component if any, undefined otherwise
   */
  getFullState(state, moduleType) {
    return this.uncombineStore(state)[moduleType]
  }

  /**
   * Returns expandable state for given component type
   * @param {*} state redux state
   * @param {string} moduleType module type or any identifier for component instance
   * @return {boolean} is expandable? Undefined when uknown
   */
  isExpandable(state, moduleType) {
    const moduleState = this.getFullState(state, moduleType)
    return moduleState && moduleState.expandable
  }

  /**
   * Returns presentation state (subpart of full state) for given component type
   * @param {*} state redux state
   * @param {string} moduleType module type or any identifier for component instance
   * @return {string} component presentation state as an UIDomain.PRESENTATION_STATE_ENUM value, or undefined if unknown
   */
  getPresentationState(state, moduleType) {
    const moduleState = this.getFullState(state, moduleType)
    return moduleState && moduleState.state
  }
}

/**
 * Returns an instance of module state selectors on given store path
 * @param  {[string]} store path: reducer store path (default provided)
 * @return {ModuleExpandedStateSelectors} feedback selectors instance
 */
export default function getModuleExpandedStateSelectors(storePath = ['user', 'modulesPanesStates']) {
  return new ModuleExpandedStateSelectors(storePath)
}
