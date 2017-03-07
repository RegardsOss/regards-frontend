import { BasicSignalReducers } from '@regardsoss/store-utils'
import TestConnectionActions from './TestConnectionActions'

class TestConnectionReducers extends BasicSignalReducers {
  constructor() {
    super(TestConnectionActions)
  }
}

const instance = new TestConnectionReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
