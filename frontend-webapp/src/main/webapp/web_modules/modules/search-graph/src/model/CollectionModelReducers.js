/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { ModelConfiguration } from '@regardsoss/api'
import CollectionModelActions from './CollectionModelActions'

class CollectionModelReducers extends BasicListReducers {
  constructor() {
    super(ModelConfiguration, CollectionModelActions)
  }
}

const instance = new CollectionModelReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}

export const REDUCER_PATH = 'collection-model'
