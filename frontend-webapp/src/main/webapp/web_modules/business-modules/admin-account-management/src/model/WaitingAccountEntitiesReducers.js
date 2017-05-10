import { AccountReducers } from './AccountReducers'
import WaitingAccountEntitiesActions from './WaitingAccountEntitiesActions'

class WaitingAccountEntitiesReducers extends AccountReducers {
  constructor() {
    super(WaitingAccountEntitiesActions)
  }
}

const instance = new WaitingAccountEntitiesReducers()

/**
 * Return a function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default (state, action) => instance.reduce(state, action)

export const PATHNAME = 'waiting-account-entities'
