/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Selected dynamic module selectors
 * @author Raphaël Mechali
 */
export class SelectedDynamicModuleSelectors extends BasicSelector {
  /**
   * Returns selected dynamic module ID from redux state
   * @param {*} state redux state
   * @return {number} stored selected module ID
   */
  getDynamicModuleId(state) {
    return this.uncombineStore(state).dynamicModuleId
  }
}

/**
 * Returns an instance of selected dynamic module selectors on given store path
 * @param  {[string]} store path: reducer store path (default provided)
 * @return {SelectedDynamicModuleSelectors} feedback selectors instance
 */
export default function getSelectedDynamicModuleSelectors(storePath = ['user', 'appState']) {
  return new SelectedDynamicModuleSelectors(storePath)
}
