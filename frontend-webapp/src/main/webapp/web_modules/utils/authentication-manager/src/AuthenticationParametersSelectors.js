/**
* LICENSE_PLACEHOLDER
**/
import { BasicSelector } from '@regardsoss/store-utils'
import { PATH } from './AuthenticationParametersReducers'

class AuthenticateParametersSelectors extends BasicSelector {

  constructor() {
    super(['common', PATH])
  }

  getProject(state) {
    return this.uncombineStore(state)
  }

}

export default new AuthenticateParametersSelectors()

