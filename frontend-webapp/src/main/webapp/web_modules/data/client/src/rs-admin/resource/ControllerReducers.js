import { BasicArrayReducers } from '@regardsoss/store-utils'
import ControllerActions from './ControllerActions'


/**
 * Redux Reducer for ProjectConnection actions.
 *
 * To user those actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Sébastien Binda
 */
class ControllerReducers extends BasicArrayReducers {

  constructor(namespace) {
    super(new ControllerActions(namespace))
  }
}

export default (namespace) => {
  const instance = new ControllerReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
