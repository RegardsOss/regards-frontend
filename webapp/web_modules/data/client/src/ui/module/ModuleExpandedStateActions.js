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
import { UIDomain } from '@regardsoss/domain'

/**
 * ModuleExpandedStateActions: use by module displayers (mostly DynamicModulePane) to share control over their
 * expandable and expanded states
 * @author Raphaël Mechali
 */
export default class ModuleExpandedStateActions {
  /**
   * Builds a key for presentation state in store (shares builder accros different consumers in REGARDS)
   * @param {string} moduleType module type, identifies this component module type (not necessarily related with a module)
   * @param {number} moduleId module ID, optional, identifies this component type over multiple modules instances
   * @return {string} built key
   */
  static getPresentationModuleKey(moduleType, moduleId = 0) {
    return `${moduleType}-${moduleId}`
  }

  /**
   * Constructor
   * @param {string} namespace actions namespace or default namespace
   */
  constructor(namespace = 'user-module-panes-expand') {
    this.INITIALIZE = `${namespace}/initialize`
    this.SET_STATE = `${namespace}/set-state`
  }

  /**
   * Initialize state for a given module type
   * @param {string} moduleType module type or any identifier for component instance
   * @param {boolean} expandable Is expandable?
   * @param {boolean} expanded Is initially expanded?
   * @return action to dispatch
   */
  initialize = (moduleType, expandable, expanded) => ({
    type: this.INITIALIZE,
    moduleType,
    expandable,
    state: expanded ? UIDomain.PRESENTATION_STATE_ENUM.NORMAL : UIDomain.PRESENTATION_STATE_ENUM.MINIMIZED,
  })

  setState = (moduleType, state) => ({
    type: this.SET_STATE,
    moduleType,
    state,
  })

  /**
   * @param {string} moduleType module type or any identifier for that pane
   * @return redux action to set module presentation as minimized
   */
  setMinimized = (moduleType) => this.setState(moduleType, UIDomain.PRESENTATION_STATE_ENUM.MINIMIZED)

  /**
   * @param {string} moduleType module type or any identifier for that pane
   * @return redux action to set module presentation in normal state
   */
  setNormal = (moduleType) => this.setState(moduleType, UIDomain.PRESENTATION_STATE_ENUM.NORMAL)

  /**
   * @param {string} moduleType module type or any identifier for that pane
   * @return redux action to set module presentation in maximized state
   */
  setMaximized = (moduleType) => this.setState(moduleType, UIDomain.PRESENTATION_STATE_ENUM.MAXIMIZED)
}
