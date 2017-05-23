/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { ResourceAccessConfiguration } from '@regardsoss/api'
import EndpointActions from './EndpointActions'

class EndpointReducers extends BasicPageableReducers {
  constructor() {
    super(ResourceAccessConfiguration, EndpointActions)
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

const instance = new EndpointReducers()

/**
 * Return an function where the reducer instance exists
 *
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default (state, action) => instance.reduce(state, action)
