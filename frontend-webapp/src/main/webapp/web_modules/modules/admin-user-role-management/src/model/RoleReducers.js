import { BasicListReducers } from '@regardsoss/store-utils'
import { RoleConfiguration } from '@regardsoss/api'
import RoleActions from './RoleActions'

class RoleReducers extends BasicListReducers {
  constructor() {
    super(RoleConfiguration, RoleActions)
    console.log(RoleConfiguration)
  }

  getReducer(state, action) {
    return instance.reduce(state, action)
  }
}

const instance = new RoleReducers()
export default instance
