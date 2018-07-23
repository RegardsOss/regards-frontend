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

/**
 * Public actions to handle model dialog show / hide requests (.
 * Nota: when dispatched, this action is reduced by user app client. Then the consumer (identied by consumer ID)
 * should display.
 * Nota: it is mainly used for dialogs but could by any element type able to show / hide above UI
 * @author Raphaël Mechali
 */
export default class DialogRequestsActions {
  /**
   * Constructor
   * @param {string} namespace actions namespace, default user interface namespace when not provided
   */
  constructor(namespace = 'user/dialog-requests') {
    this.SHOW = `${namespace}/show`
    this.HIDE = `${namespace}/hide`
  }

  /**
   * Returns action to dispatch to show the dialog
   * @param {*} parameter parameters expected by the element that will consumer display event
   * @param {consumerID} id id of the UI element that should consume display event
   * @return {type:{string}} redux action to dispatch to show the dialog
   */
  show(parameters, consumerID) {
    return {
      type: this.SHOW,
      parameters,
      consumerID,
    }
  }

  /**
   * @return {type:{string}} redux action to dispatch to hide current dialog
   */
  hide() {
    return {
      type: this.HIDE,
    }
  }
}
