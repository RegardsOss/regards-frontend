import { BasicListReducers } from '@regardsoss/store-utils'
import { FragmentConfiguration } from '@regardsoss/api'
import FragmentActions from './FragmentActions'

class FragmentReducers extends BasicListReducers {
  constructor() {
    super(FragmentConfiguration, FragmentActions)
  }
}

const instance = new FragmentReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
