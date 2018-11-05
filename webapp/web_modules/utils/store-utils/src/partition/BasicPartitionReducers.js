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
import identity from 'lodash/identity'

/**
 * Reducers for partition data, update store state by partitionKey
 */
export default class BasicPartitionReducers {
  /**
   * Constructor
   * @param {*} storePartionedAction actions (provides the actions identifier for this reducer)
   * @param {*} dataPostTreatment (optional) data post treatment
   */
  constructor(storePartionedAction, dataPostTreatment = identity) {
    this.actions = storePartionedAction
    this.dataPostTreatment = dataPostTreatment
  }

  reduce(state = {}, action) {
    switch (action.type) {
      case this.actions.DATA_LOADING_START:
        return {
          ...state, // copy other partitions
          [action.partitionKey]: { // set the partition in loading state
            loading: true,
            hasError: false,
            error: null,
            data: null,
          },
        }
      case this.actions.DATA_LOADING_DONE:
        return {
          ...state, // copy other partitions
          [action.partitionKey]: { // set the partition in loading state
            loading: false,
            hasError: false,
            error: null,
            data: this.dataPostTreatment(action.data),
          },
        }
      case this.actions.DATA_LOADING_FAILED:
        return {
          ...state, // copy other partitions
          [action.partitionKey]: { // set the partition in loading state
            loading: false,
            hasError: true,
            error: action.reason,
            data: null,
          },
        }
      default:
        return state
    }
  }
}
