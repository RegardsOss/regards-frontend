/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListReducers } from '@regardsoss/store-utils'
import { RoleConfiguration } from '@regardsoss/api'
import RoleActions from './RoleActions'

class RoleReducers extends BasicListReducers {
  constructor() {
    super(RoleConfiguration, RoleActions)
  }
}

const instance = new RoleReducers()
export default instance

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function getRoleReducer(state, action) {
  return instance.reduce(state, action)
}

export const reducerPath = 'role'
