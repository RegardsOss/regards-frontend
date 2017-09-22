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
 * Actions to dispatch dialog related operations
 * @author Raphaël Mechali
 */
class ModuleDialogActions {

  /**
   * Default namespace
   */
  static DEFAULT_NAMESPACE = 'order-cart/dialog'

  /**
   * Constructor
   * @param {*} namespace actions namespace
   */
  constructor(namespace = ModuleDialogActions.DEFAULT_NAMESPACE) {
    this.SHOW_DETAIL = `${namespace}/show-detail`
    this.HIDE_DETAIL = `${namespace}/hide-detail`
  }

  /**
   * @param {string} datasetLabel selection parent dataset
   * @param {string} date corresponding selection date (as model string)
   * @param {string} openSearchRequest corresponding selection Open Search request
   * @return action to dispatch to show detail dialog
   */
  showDetail(datasetLabel, date, openSearchRequest) {
    return {
      type: this.SHOW_DETAIL,
      datasetLabel,
      date,
      openSearchRequest,
    }
  }

  hideDetail() {
    return { type: this.HIDE_DETAIL }
  }

}

export default {
  ModuleDialogActions,
  moduleDialogActions: new ModuleDialogActions(),
}
