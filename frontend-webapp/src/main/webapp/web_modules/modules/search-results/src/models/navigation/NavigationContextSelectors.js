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
import { BasicSelector } from '@regardsoss/store-utils'

/**
 * Navigation context state selectors
 */
class NavigationContextSelectors extends BasicSelector {

  /**
   * Returns current tags levels
   * @param {*} state store
   * @return store navigation view object type
   */
  getLevels(state) {
    return this.uncombineStore(state).levels
  }

  /**
   * Returns current levels
   * @param {*} state store
   * @return store navigation context view object type
   */
  getViewObjectType(state) {
    return this.uncombineStore(state).viewObjectType
  }

  /**
   * Returns current levels
   * @param {*} state store
   * @return store navigation context view object type
   */
  getDisplayMode(state) {
    return this.uncombineStore(state).displayMode
  }

}

export default new NavigationContextSelectors(['modules.search-results', 'navigationContext'])
