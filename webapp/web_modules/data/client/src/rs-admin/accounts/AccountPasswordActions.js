/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import { BasicSignalActions } from '@regardsoss/store-utils'

const { getJSON } = require('redux-api-middleware')

export default class AccountPasswordActions extends BasicSignalActions {
  static FetchingTypes = {
    passwordValidity: 'passwordValidity',
    passwordRules: 'passwordRules',
  }

  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES_PUBLIC.ADMIN_INSTANCE}/accounts/password`,
      // Resource endpoint is not the accessed one. it is the secured one, not the public one.
      resourcesEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ADMIN_INSTANCE}/accounts/password`,
    })
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
    return getJSON(stream).then((json) => ({
      type,
      content: json,
    }))
  }
}
