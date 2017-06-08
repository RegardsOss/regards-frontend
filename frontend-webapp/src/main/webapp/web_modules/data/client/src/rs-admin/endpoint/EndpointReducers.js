/*
 * LICENSE_PLACEHOLDER
 */
import map from 'lodash/map'
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { EndpointConfiguration } from '@regardsoss/api'
import EndpointActions from './EndpointActions'

/**
 * Redux Reducer for endpoint actions.
 *
 * To use those actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Sébastien Binda
 */
class EndpointReducers extends BasicPageableReducers {
  constructor(namespace) {
    super(EndpointConfiguration, new EndpointActions(namespace))
  }

  static buildListOfKeys(list) {
    return map(list, item => `${item.content.microservice}@${item.content.resource}@${item.content.verb}`)
  }

  reduce(state, action) {
    const newState = super.reduce(state, action)
    switch (action.type) {
      case this.basicListActionInstance.ENTITY_LIST_SUCCESS:
        return {
          ...newState,
          listOfKeys: EndpointReducers.buildListOfKeys(newState.items),
          metadata: action.payload.metadata,
        }
      default:
        return newState
    }
  }
}

export default (namespace) => {
  const instance = new EndpointReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}

