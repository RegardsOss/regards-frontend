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
 **/

/**
 * Allows for partitioned data storage in redux store (at runtime, avoids dynamic call to combine).
 * Typical use case: A container dispatches onDataLoadingStart(partitionKey), runs a promise to finally :
 * - A) In then instruction run onDataLoadingDone(data)
 * - or B) In catch instruction run onDataLoadingFailed(reason)
 *
 * Note: You can add in the reducer a callback to transform action data before it gets in store (optional)
 */
class BasicPartitionActions {
  constructor(options) {
    this.FLUSH = `${options.namespace}/FLUSH`
    this.INITIALIZE_PARTITIONS = `${options.namespace}/INITIALIZE_PARTITIONS`
    this.DATA_LOADING_DONE = `${options.namespace}/PARTITION_LOADING_DONE`
    this.DATA_LOADING_FAILED = `${options.namespace}/PARTITION_LOADING_FAILED`
  }

  /**
   * Notifies many partitions loading started
   * @param {[string|number]} partitionKey key for partition in store
   */
  onManyLoadingStart(partitionKeys) {
    return {
      type: this.INITIALIZE_PARTITIONS,
      partitionKeys,
    }
  }

  /**
   * Notifies data loading started for a partition
   * @param {string|number} partitionKey key for partition in store
   * @return {*} redux action to dispatch
   */
  onDataLoadingStart(partitionKey) {
    return this.onManyLoadingStart([partitionKey])
  }

  /**
   * Notifies data loading complete (will be stored)
   * @param {string|number} partitionKey key for partition in store
   * @param {*} data data to store
   * @return {*} redux action to dispatch
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
   * @param {string|number} partitionKey key for partition in store
   * @param {string} reason: fail reson
   * @return {*} redux action to dispatch
   */
  onDataLoadingFailed(partitionKey, reason) {
    return {
      type: this.DATA_LOADING_FAILED,
      partitionKey,
      reason,
    }
  }

  /**
   * @return {*} redux action to dispatch to clear partitions data
   */
  flush() {
    return {
      type: this.FLUSH,
    }
  }
}

export default BasicPartitionActions
