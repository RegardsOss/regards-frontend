/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalSelectors } from '@regardsoss/store-utils'
import { pathname } from './CreateAccountReducers'
import { AuthenticationRouteHelper } from '@regardsoss/authentication-manager'

export default new BasicSignalSelectors(AuthenticationRouteHelper.getSelectorPath(pathname))
