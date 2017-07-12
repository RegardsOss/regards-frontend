/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { BasicSignalSelectors } from '@regardsoss/store-utils'

class AuthenticateSelectors extends BasicSignalSelectors {

  getAuthentication(state) {
    return this.uncombineStore(state)
  }

  getAuthenticationResult(state) {
    const authentication = this.getAuthentication(state)
    if (authentication) {
      return authentication.result
    }
    return authentication
  }

  /**
   * Is a user authenticated (based on last fetch result)
   * @param state state
   * @returns {boolean}
   */
  isAuthenticated(state) {
    const authentication = this.getAuthentication(state)
    if (authentication && authentication.authenticateDate &&
      authentication.result && authentication.result.expires_in) {
      return authentication.result.sub !== undefined
    }
    return false
  }

  getAccessToken(state) {
    return this.getAuthentication(state).result.access_token
  }

}

export default storePath => new AuthenticateSelectors(storePath)
