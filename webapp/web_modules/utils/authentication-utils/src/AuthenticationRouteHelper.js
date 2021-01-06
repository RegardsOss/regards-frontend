/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/
import root from 'window-or-global'
import AuthenticationRouteParameters from './AuthenticationRouteParameters'

const moduleReducerPath = 'modules.authentication'

/**
 * Returns selector path for specific pathName as parameter
 * @param pathName last path element name
 */
const getSelectorPath = (pathName) => [moduleReducerPath, pathName]

/**
 * Returns Origin URL
 * @return origin URL
 */
const getOriginURL = () => `${root.location.pathname}${root.location.search}`

const getOriginUrlWithoutQueryParams = () => `${root.location.protocol}//${root.location.host}${root.location.pathname}`

/**
 * Returns the base request link to return by email to user so that he can terminate his operation
 * @param mailAuthenticationActionValue
 * @return request link URL
 */
const getRequestLinkURL = (mailAuthenticationActionValue) => `${root.location.protocol}//${root.location.host}${root.location.pathname}?${AuthenticationRouteParameters.mailAuthenticationAction.urlKey}=${mailAuthenticationActionValue}`

export default {
  getSelectorPath,
  getOriginURL,
  getRequestLinkURL,
  getOriginUrlWithoutQueryParams,
}
