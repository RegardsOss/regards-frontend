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
import map from 'lodash/map'
import size from 'lodash/size'
import { createSelector } from 'reselect'
/**
 * @author Léo Mieulet
 */
import BasicSelector from '../BasicSelector'
/**
 *  Provide an high level class to interact with entity stored in a list
 */
class BasicListSelectors extends BasicSelector {
  getList = (state) => this.uncombineStore(state).items

  getResults = (state) => this.uncombineStore(state).results

  getOrderedList = createSelector(
    [this.getResults, this.getList],
    (orderedResults, list) => map(orderedResults, (entityId) => list[entityId]),
  )

  getById(state, id) {
    const { items } = this.uncombineStore(state)
    return items ? items[id] : null
  }

  getContentById(state, id) {
    const response = this.getById(state, id)
    if (response && response.content) {
      return response.content
    }
    return undefined
  }

  getSize(state) {
    return size(this.uncombineStore(state).items)
  }
}

export default BasicListSelectors
