/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import { BasicSignalSelectors } from '@regardsoss/store-utils'
import { createSelector } from 'reselect'

/**
 * Order basket selectors, adding methods to select objectsCount, locally buffered through reselect,
 * to avoid runtime values computing (can make some components unstable due to new props values)
 * @author Raphaël Mechali
 */
class OrderBasketSelectors extends BasicSignalSelectors {
  /**
   * Returns basket (as result content field)
   * @param {*} state redux application state
   */
  getOrderBasket(state) {
    return get(this.uncombineStore(state), 'result.content')
  }

  getObjectsCount = createSelector(
    [(state) => this.getOrderBasket(state)],
    (orderBasket) => {
      const datasetSelections = get(orderBasket, 'datasetSelections', [])
      return datasetSelections.reduce((acc, datasetSelection) => acc + datasetSelection.objectsCount, 0)
    },
  )

  /**
   * Is currently adding to basket?
   * @param {*} state redux application state
   * @return {boolean} true when adding to basket
   */
  isAddingToBasket(state) {
    return this.uncombineStore(state).addingToBasket
  }
}

export default (storePath = ['user', 'order-basket']) => new OrderBasketSelectors(storePath)
