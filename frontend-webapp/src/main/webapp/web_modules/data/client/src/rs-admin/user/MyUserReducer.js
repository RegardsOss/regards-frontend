/**
 * LICENSE_PLACEHOLDER
 */
import { BasicSignalReducers } from '@regardsoss/store-utils'
import MyUserActions from './MyUserActions'

class MyUserReducer extends BasicSignalReducers {

  constructor(namespace) {
    super(new MyUserActions(namespace))
  }

}


export default (namespace) => {
  const instance = new MyUserReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
