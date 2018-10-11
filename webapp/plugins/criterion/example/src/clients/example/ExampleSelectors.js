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
 * Holds selector for ExampleReducer state.
 * Note: it extends BasicSelectors to use the uncombine system, that allows retrieving easily in store the subpart of
 * corresponding reducer
 * @author Raphaël Mechali
 */
class ExampleSelectors extends BasicSelector {
  // parent constructor already holds store path

  /**
   * Getter exposing the current to do value from current reducer state
   * @param {*} state Full application reducer state
   * @return {string} current to do value (or null as it is default state)
   */
  getTodo(state) {
    return this.uncombineStore(state).todo
  }
}

/** By convention in Regards, selectors are also exported as a builder */
export default function getExampleSelectors(storePath) {
  return new ExampleSelectors(storePath)
}
