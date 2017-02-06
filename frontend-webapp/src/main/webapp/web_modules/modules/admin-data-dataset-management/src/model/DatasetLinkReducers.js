import { BasicSignalReducers } from '@regardsoss/store-utils'
import DatasetLinkActions from './DatasetLinkActions'

class DatasetLinkReducers extends BasicSignalReducers {
  constructor() {
    super(DatasetLinkActions)
  }
}

const instance = new DatasetLinkReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
