/**
* LICENSE_PLACEHOLDER
**/
import { BasicSelector } from '@regardsoss/store-utils'
import { PATH } from './AuthenticationParametersReducers'
import { INSTANCE } from './AuthenticationParametersActions'

class AuthenticateParametersSelectors extends BasicSelector {

  constructor() {
    super(['common', PATH])
  }

  getProject(state) {
    return this.uncombineStore(state)
  }

  isInstance(state) {
    return this.getProject(state) === INSTANCE
  }

}

export default new AuthenticateParametersSelectors()

