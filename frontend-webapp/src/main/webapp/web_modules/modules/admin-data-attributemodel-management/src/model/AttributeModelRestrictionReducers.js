import { BasicArrayReducers } from '@regardsoss/store-utils'
import AttributeModelRestrictionActions from './AttributeModelRestrictionActions'

class AttributeModelRestrictionReducers extends BasicArrayReducers {
  constructor() {
    super(AttributeModelRestrictionActions)
  }
}

const instance = new AttributeModelRestrictionReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
