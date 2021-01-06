/*
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import sortBy from 'lodash/sortBy'
import { BasicArrayReducers } from '@regardsoss/store-utils'
import AttributeModelTypeActions from './AttributeModelTypeActions'

class AttributeModelTypeReducer extends BasicArrayReducers {
  constructor(namespace) {
    super(new AttributeModelTypeActions(namespace))
  }

  reduce(state, action) {
    if (this.isCancelled(state, action)) {
      return state
    }

    const newState = super.reduce(state, action)
    switch (action.type) {
      case this.basicArrayActionInstance.ENTITY_LIST_SUCCESS:
        // Save sorted items
        return {
          ...newState,
          items: sortBy(action.payload, (type) => type),
        }
      default:
        return newState
    }
  }
}

export default (namespace) => {
  const instance = new AttributeModelTypeReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
