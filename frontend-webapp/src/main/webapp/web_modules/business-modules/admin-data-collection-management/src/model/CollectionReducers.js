import { BasicPageableReducers } from '@regardsoss/store-utils'
import { CollectionConfiguration } from '@regardsoss/api'
import CollectionActions from './CollectionActions'

class CollectionReducers extends BasicPageableReducers {
  constructor() {
    super(CollectionConfiguration, CollectionActions)
  }
}

const instance = new CollectionReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
