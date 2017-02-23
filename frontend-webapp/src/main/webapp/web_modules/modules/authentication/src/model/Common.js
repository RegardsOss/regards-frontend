/**
 * LICENSE_PLACEHOLDER
 **/
import { AuthenticationRouteParameters } from '@regardsoss/authentication-manager'
import root from 'window-or-global'

const moduleReducerPath = 'modules.authentication'

/**
 * Returns selector path for specific pathName as parameter
 * @param pathName last path element name
 */
export const getSelectorPath = pathName => [moduleReducerPath, pathName]

/**
 * Returns Origin URL
 * @return origin URL
 */
export const getOriginURL = () => `${root.location.pathname}${root.location.search}`

/**
 * Returns the base request link to return by email to user so that he can terminate his operation
 * @param mailAuthenticationActionValue
 * @return request link URL
 */
export const getRequestLinkURL = mailAuthenticationActionValue => `${root.location.protocol}//${root.location.host}${root.location.pathname}?${AuthenticationRouteParameters.mailAuthenticationAction.urlKey}=${mailAuthenticationActionValue}`
