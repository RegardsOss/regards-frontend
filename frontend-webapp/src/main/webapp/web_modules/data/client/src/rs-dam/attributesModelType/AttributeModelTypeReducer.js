/*
 * LICENSE_PLACEHOLDER
 */
import sortBy from 'lodash/sortBy'
import { BasicArrayReducers } from '@regardsoss/store-utils'
import AttributeModelTypeActions from './AttributeModelTypeActions'

class AttributeModelTypeReducer extends BasicArrayReducers {
  constructor(namespace) {
    super(new AttributeModelTypeActions(namespace))
  }

  reduce(state, action) {
    const newState = super.reduce(state, action)
    switch (action.type) {
      case this.basicArrayActionInstance.ENTITY_LIST_SUCCESS:
        // Save sorted items
        return {
          ...newState,
          items: sortBy(action.payload, type => type),
        }
      default:
        return newState
    }
  }
}

export default (namespace) => {
  const instance = new AttributeModelTypeReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
