import { BasicArrayReducers } from '@regardsoss/store-utils'
import AttributeModelTypeActions from './AttributeModelTypeActions'

class AttributeModelTypeReducer extends BasicArrayReducers {
  constructor(namespace) {
    super(new AttributeModelTypeActions(namespace))
  }
}

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default (namespace) => {
  const instance = new AttributeModelTypeReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
