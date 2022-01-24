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

/**
 * DynamicModuleStateActions: used by user app to initialize current dynamic module ID
 * in user app redux state
 * @author Raphaël Mechali
 */
export default class SelectedDynamicModuleActions {
  /**
   * Constructor
   * @param {string} namespace actions namespace or default namespace
   */
  constructor(namespace = 'application/user') {
    this.SET_DYNAMIC_MODULE = `${namespace}/set-dynamic-module`
  }

  /**
   * Dispatches dynamic module change
   * @param {number} dynamicModuleId current dynamic module ID
   * @return action to dispatch
   */
  setDynamicModule = (dynamicModuleId) => ({
    type: this.SET_DYNAMIC_MODULE,
    dynamicModuleId,
  })
}
