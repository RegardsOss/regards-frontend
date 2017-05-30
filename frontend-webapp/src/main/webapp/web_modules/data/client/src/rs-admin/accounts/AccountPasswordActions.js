/**
 * LICENSE_PLACEHOLDER
 */
import { BasicSignalActions } from '@regardsoss/store-utils'

const { getJSON } = require('redux-api-middleware')

export default class AccountPasswordActions extends BasicSignalActions {

  static FetchingTypes = {
    passwordValidity: 'passwordValidity',
    passwordRules: 'passwordRules',
  }

  constructor(namespace) {
    super({ namespace, entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/accounts/password` })
  }

  fetchPasswordRules() {
    this.fetchingType = AccountPasswordActions.FetchingTypes.passwordRules
    return this.sendSignal('GET')
  }

  fetchPasswordValidity(password) {
    this.fetchingType = AccountPasswordActions.FetchingTypes.passwordValidity
    return this.sendSignal('POST', { password })
  }

  buildResults(stream) {
    const type = this.fetchingType
    return getJSON(stream).then(json => ({
      type,
      content: json,
    }))
  }
}

