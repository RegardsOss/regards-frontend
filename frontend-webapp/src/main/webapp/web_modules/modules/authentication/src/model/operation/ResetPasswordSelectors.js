/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalSelectors } from '@regardsoss/store-utils'
import { AuthenticationRouteHelper } from '@regardsoss/authentication-manager'
import { pathname } from './ResetPasswordReducers'

export default new BasicSignalSelectors(AuthenticationRouteHelper.getSelectorPath(pathname))
