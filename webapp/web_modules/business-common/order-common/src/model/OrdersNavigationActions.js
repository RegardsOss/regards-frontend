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
 **/

/**
 * Actions for navigation in orders components
 * @author Raphaël Mechali
 */
export class OrdersNavigationActions {
  /**
   * Constructor
   * @param {string} namespace actions / reducer namespace
   */
  constructor(namespace) {
    this.SELECT_ORDER = `${namespace}/orders-browsing/select-order`
    this.SELECT_DATASET = `${namespace}/orders-browsing/select-dataset`
    this.RESET_TO_LEVEL = `${namespace}/orders-browsing/reset-to-level`
  }

  /**
   * Returns action to dispatch to select an order
   * @param {OrderWithContent} order order to select
   * @return {type: string, order: OrderWithContent} action to dispatch
   */
  selectOrder(order) {
    return { type: this.SELECT_ORDER, order }
  }

  /**
   * Returns action to dispatch to select a dataset task
   * @param {DatasetTask} dataset dataset task
   * @return {type: {string}, dataset: {DatasetTask}} action to dispatch
   */
  selectDataset(dataset) {
    return { type: this.SELECT_DATASET, dataset }
  }

  /**
   * Returns action to dispatch to reset navigation level to level as parameter
   * @param {number} level level to select, values range is 0-2 as follow:
   * 0 - root browsing context
   * 1 - order browsing context
   * 2 - dataset browing context
   * @return {type: string, level: number} action to dispatch
   */
  resetToLevel(level) {
    return { type: this.RESET_TO_LEVEL, level }
  }
}
