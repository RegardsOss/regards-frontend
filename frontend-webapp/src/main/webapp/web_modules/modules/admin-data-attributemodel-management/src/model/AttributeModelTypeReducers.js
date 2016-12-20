import { BasicArrayReducers } from '@regardsoss/store-utils'
import AttributeModelTypeActions from './AttributeModelTypeActions'

class AttributeModelRestrictionReducers extends BasicArrayReducers {
  constructor() {
    super(AttributeModelTypeActions)
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
