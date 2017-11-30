/**
* LICENSE_PLACEHOLDER
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
