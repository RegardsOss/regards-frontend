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
import { BasicSignalSelectors } from '@regardsoss/store-utils'

/**
 * Delete AIP on some storages client selectors
 * @author Raphaël Mechali
 */
class DeleteAIPsOnSomeStoragesSelectors extends BasicSignalSelectors {
  /** NO AIP in error (store reference) */
  static NO_AIP_IN_ERROR = []

  /**
   * @param {*} state redux state
   * @return {[{aipId: string, reason: string}]} AIP in errors during last operation array, or empty array
   */
  getLastAIPInError(state) {
    return this.uncombineStore(state).lastAIPInError || DeleteAIPsOnSomeStoragesSelectors.NO_AIP_IN_ERROR
  }
}

/**
 * Export selectors builder on store path for DeleteAIPOnSome redux client
 * @param [{string}} storePath redux store path to access reduced data
 * @return {*} selectors instance
 * @author Raphaël Mechali
 */
export default function getDeleteAIPsOnSomeStoragesSelectors(storePath) {
  return new DeleteAIPsOnSomeStoragesSelectors(storePath)
}
