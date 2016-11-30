import { BasicSelector } from '@regardsoss/store-utils'

class AuthenticationSelectors extends BasicSelector {
  constructor() {
    super(['common', 'authentication'])
  }

  getAuthentication(state) {
    return this.uncombineStore(state)
  }
}

const instance = new AuthenticationSelectors()
export default instance
