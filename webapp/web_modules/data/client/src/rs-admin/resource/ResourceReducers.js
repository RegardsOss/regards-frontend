/*
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
import map from 'lodash/map'
import { BasicPageableReducers, BasicReducer } from '@regardsoss/store-utils'
import { ResourceAccessConfiguration } from '@regardsoss/api'
import ResourceActions from './ResourceActions'

/**
 * Redux Reducer for ProjectConnection actions.
 *
 * To use those actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Sébastien Binda
 */
class ResourceReducers extends BasicPageableReducers {
  constructor(namespace) {
    super(ResourceAccessConfiguration, new ResourceActions(namespace))
  }

  static buildListOfKeys(list) {
    return map(list, (item) => `${item.content.microservice}@${item.content.resource}@${item.content.verb}`)
  }

  reduce(state, action) {
    if (BasicReducer.isCancelled(state, action)) {
      return state
    }

    const newState = super.reduce(state, action)
    switch (action.type) {
      case this.basicListActionInstance.ENTITY_LIST_SUCCESS:
        return {
          ...newState,
          listOfKeys: ResourceReducers.buildListOfKeys(newState.items),
          metadata: action.payload.metadata,
        }
      default:
        return newState
    }
  }
}

export default (namespace) => {
  const instance = new ResourceReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
