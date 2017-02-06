import { BasicSignalReducers } from '@regardsoss/store-utils'
import DatasourceLinkActions from './DatasourceLinkActions'

class DatasourceLinkReducers extends BasicSignalReducers {
  constructor() {
    super(DatasourceLinkActions)
  }
}

const instance = new DatasourceLinkReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
