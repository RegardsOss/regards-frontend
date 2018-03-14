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

/**
 * ModuleExpandedStateActions: use by module displayers (mostly DynamicModulePane) to share control over their
 * expandable and expanded states
 * @author Raphaël Mechali
 */
export class ModuleExpandedStateActions {
  /**
   * Constructor
   * @param {string} namespace actions namespace or default namespace
   */
  constructor(namespace = 'user-module-panes-expand') {
    this.INITIALIZE = `${namespace}/initialize`
    this.SET_EXPANDED_STATE = `${namespace}/set-expanded-state`
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
    expanded,
  })

  /**
   * Sets expanded module state
   * @param {string} moduleType module type or any identifier for component instance
   * @param {boolean} expanded Is expanded?
   * @return action to dispatch
   */
  setExpanded = (moduleType, expanded) => ({
    type: this.SET_EXPANDED_STATE,
    moduleType,
    expanded,
  })

  /**
   * Sets module collapsed
   * @param {string} moduleType module type or any identifier for component instance
   * @return action to dispatch
   */
  setCollapsed = moduleType => this.setExpanded(moduleType, false)

  /**
   * Sets module expanded
  * @param {string} moduleType module type or any identifier for component instance
   * @return action to dispatch
   */
  setExpanded = moduleType => this.setExpanded(moduleType, true)
}
