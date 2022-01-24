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
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { AIPConfiguration } from '@regardsoss/api'
import AIPActions from './AIPActions'
/**
 * Redux Reducer for AIP entities
 * @author Léo Mieulet
 */
class AIPReducer extends BasicPageableReducers {
  constructor(namespace) {
    super(AIPConfiguration, new AIPActions(namespace))
  }

  reduce(state, action) {
    if (this.isCancelled(state, action)) {
      return state
    }
    const newState = super.reduce(state, action)
    switch (action.type) {
      case this.basicListActionInstance.ENTITY_LIST_SUCCESS:
        return {
          ...newState,
          dataStorages: action.payload.dataStorages, // add data storage info
        }
      default:
        return newState
    }
  }
}

export default (namespace) => {
  const instance = new AIPReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
