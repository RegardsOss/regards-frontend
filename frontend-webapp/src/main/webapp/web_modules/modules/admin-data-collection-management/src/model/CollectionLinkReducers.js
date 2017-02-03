import { BasicSignalReducers } from '@regardsoss/store-utils'
import CollectionLinkActions from './CollectionLinkActions'

class CollectionLinkReducers extends BasicSignalReducers {
  constructor() {
    super(CollectionLinkActions)
  }
}

const instance = new CollectionLinkReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
