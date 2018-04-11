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

/**
 * Allwos for partitioned data storage in redux store (at runtime, avoids dynamic call to combine).
 * Typical use case: A container dispatches onDataLoadingStart(partitionKey), runs a promise to finally :
 *    A - In then instruction run onDataLoadingDone(data)
 * or B - In catch instruction run onDataLoadingFailed(reason)
 *
 * Note: You can add in the reducer a callback to transform action data before it gets in store (optional)
 */
class BasicPartitionActions {
  constructor(options) {
    this.DATA_LOADING_START = `${options.namespace}/PARTITION_LOADING_START`
    this.DATA_LOADING_DONE = `${options.namespace}/PARTITION_LOADING_DONE`
    this.DATA_LOADING_FAILED = `${options.namespace}/PARTITION_LOADING_FAILED`
  }

  /**
   * Notifies data loading started
   * @param {*} partitionKey key for partition in store
   */
  onDataLoadingStart(partitionKey) {
    return {
      type: this.DATA_LOADING_START,
      partitionKey,
    }
  }

  /**
   * Notifies data loading complete (will be stored)
   * @param {*} partitionKey key for partition in store
   * @param {*} data data to store
   */
  onDataLoadingDone(partitionKey, data) {
    return {
      type: this.DATA_LOADING_DONE,
      partitionKey,
      data,
    }
  }

  /**
   * Notifies data loading failed
   * @param {*} partitionKey key for partition in store
   * @param {string} reason: fail reson
   */
  onDataLoadingFailed(partitionKey, reason) {
    return {
      type: this.DATA_LOADING_FAILED,
      partitionKey,
      reason,
    }
  }
}

export default BasicPartitionActions
