import { BasicArrayReducers } from '@regardsoss/store-utils'
import AttributeModelTypeActions from './AttributeModelTypeActions'

class AttributeModelTypeReducer extends BasicArrayReducers {
  constructor(namespace) {
    super(new AttributeModelTypeActions(namespace))
  }
}

export default (namespace) => {
  const instance = new AttributeModelTypeReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
