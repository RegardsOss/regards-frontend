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
 * Description state selectors
 * @author Raphaël Mechali
 */
export class DescriptionStateSelectors extends BasicSelector {
  /**
   * Returns description state
   * @param {*} state Redux state
   * @return {*} description state matching DescriptionState.DescriptionState shape
   */
  getDescriptionState(state) {
    return super.uncombineStore(state)
  }

  /**
   * Returns description path
   * @param {*} state Redux state
   * @return {[*]} description path as an array of elements matching DescriptionState.DescriptionEntity shape
   */
  getDescriptionPath(state) {
    return this.getDescriptionState(state).descriptionPath
  }

  /**
   * Is browsing tree visible?
   * @param {*} state Redux state
   * @return {boolean} is showing browsing tree
   */
  isBrowsingTreeVisible(state) {
    return this.getDescriptionState(state).browsingTreeVisible
  }
}
