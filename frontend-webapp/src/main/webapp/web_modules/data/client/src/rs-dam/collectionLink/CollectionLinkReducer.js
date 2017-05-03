/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import CollectionLinkActions from './CollectionLinkActions'

/**
 * Redux Reducer for Collection link (tags) actions.
 *
 * To use those actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Léo Mieulet
 */
class CollectionLinkReducers extends BasicSignalReducers {
  constructor(namespace) {
    super(new CollectionLinkActions(namespace))
  }
}


export default (namespace) => {
  const instance = new CollectionLinkReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
