import { BasicArrayReducers } from '@regardsoss/store-utils'
import AttributeModelRestrictionActions from './AttributeModelRestrictionActions'

class AttributeModelRestrictionReducers extends BasicArrayReducers {
  constructor(namespace) {
    super(new AttributeModelRestrictionActions(namespace))
  }
}

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default (namespace) => {
  const instance = new AttributeModelRestrictionReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
