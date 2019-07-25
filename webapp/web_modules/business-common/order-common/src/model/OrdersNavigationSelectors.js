/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Orders navigation selectors: provides selected order and dataset in current context
 * @author Raphaël Mechali
 */
export class OrdersNavigationSelectors extends BasicSelector {
  /**
   * Returns selected navigation path
   * @param {*} state application redux state
   * @return [{*}] path elements (at 0: necessary and order. at 1: necessary a dataset)
   */
  getNavigationPath(state) {
    return super.uncombineStore(state).navigationPath
  }
}

/**
 * Builds orders navigation selectors instance
 * @param {[string]} storePath path in store to access reducer data
 */
export function getOrdersNavigationSelectors(storePath) {
  return new OrdersNavigationSelectors(storePath)
}
