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
 * Dialog requests state selectors
 * @author Raphaël Mechali
 */
class DialogRequestsSelectors extends BasicSelector {
  /**
   * Returns current dialog state
   * @param {*} state current redux state
   * @return { visible, parameters, consumerID } current dialog state.
   */
  getDialogState(state) {
    return this.uncombineStore(state)
  }

  /**
   * Returns current dialog visible state
   * @param {*} state current redux state
   * @return {bool} true if a dialog is currently visible
   */
  isVisible(state) {
    return this.getDialogState(state).visible
  }

  /**
   * Returns current dialog parameters
   * @param {*} state current redux state
   * @return {*} Parameter for current dialog if any
   */
  getParameters(state) {
    return this.getDialogState(state).parameters
  }

  /**
   * Return current dialog request consumer ID
   * @param {*} state current redux state
   * @return current dialog consumer ID
   */
  getConsumerID(state) {
    return this.getDialogState(state).consumerID
  }
}

/**
 * Return selectors instance
 * @param {[string]} storePath store path (leave empty to get default selectors for user app)
 * @return {DialogRequestsSelectors} selectors instance
 */
export default function getDialogRequestsSelectors(storePath = ['user', 'dialogRequests']) {
  return new DialogRequestsSelectors(storePath)
}
