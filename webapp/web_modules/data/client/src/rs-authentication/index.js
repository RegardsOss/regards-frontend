/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import AuthenticateActions, { SPECIFIC_ENDPOINT_MARKER } from './AuthenticateActions'
import AuthenticateReducers from './AuthenticateReducers'
import AuthenticateSelectors from './AuthenticateSelectors'

/**
 * Common authentication actions.
 * SPECIFIC_ENDPOINT_MARKER is used to know the special endpoint for authentication. This endpoint is special
 * for the autentication middleware to know that this endpoint don't need a public token scope. All other endpoints are
 * avaiable without token by passing the scope in query param or into the request header.
 */
module.exports = {
  AuthenticateActions,
  AuthenticateReducers,
  AuthenticateSelectors,
  SPECIFIC_ENDPOINT_MARKER,
}
