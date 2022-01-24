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
import forEach from 'lodash/forEach'
import keys from 'lodash/keys'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
// Based on https://github.com/rackt/redux/issues/37#issue-85098222
/**
 * Registry to handle add of new dynamic reducers during application runtime
  */
class ReducerRegistry {
  constructor(initialReducers = {}) {
    this.reducers = { ...initialReducers }
    this.emitChange = null
  }

  isRegistered(newReducers) {
    return find(keys(newReducers), (key, idx) => this.reducers[key] !== undefined)
  }

  register(newReducers) {
    const reducersToAdd = {}
    forEach(keys(newReducers), (key, idx) => {
      if (!this.reducers[key]) {
        reducersToAdd[key] = newReducers[key]
      } else {
        console.warn('Reducer already initialized for key', key)
      }
    })
    if (!isEmpty(reducersToAdd)) {
      this.reducers = { ...this.reducers, ...reducersToAdd }
      if (this.emitChange != null) {
        this.emitChange(this.getReducers())
      }
    } else {
      console.warn('No new reducers to initialize')
    }
  }

  getReducers() {
    return { ...this.reducers }
  }

  setChangeListener(listener) {
    if (this.emitChange != null) {
      throw new Error('Can only set the listener for a ReducerRegistry once.')
    }
    this.emitChange = listener
  }
}

let reducerRegistryInstance = null

const getReducerRegistry = (reducers) => {
  if (reducerRegistryInstance === null) {
    reducerRegistryInstance = new ReducerRegistry(reducers)
  }
  return reducerRegistryInstance
}

export default getReducerRegistry
