/**
* LICENSE_PLACEHOLDER
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

