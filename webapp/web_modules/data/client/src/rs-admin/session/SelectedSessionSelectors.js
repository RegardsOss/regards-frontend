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
 */
import { BasicSignalSelectors } from '@regardsoss/store-utils'

class SelectedSessionSelectors extends BasicSignalSelectors {
  /**
   * Returns fetched user on last REST action (since both GET and PUT should return user data)
   * @param {*} state redux store
   */
  getSession(state) {
    return this.uncombineStore(state).result || null
  }
}

/**
 * Builds selectors on expected store path
 */
export default (storePath) => new SelectedSessionSelectors(storePath)