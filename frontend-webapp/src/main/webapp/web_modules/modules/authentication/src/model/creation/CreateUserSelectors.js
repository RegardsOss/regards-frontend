/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalSelectors } from '@regardsoss/store-utils'
import { AuthenticationRouteHelper } from '@regardsoss/authentication-manager'
import { pathname } from './CreateUserReducers'


export default new BasicSignalSelectors(AuthenticationRouteHelper.getSelectorPath(pathname))
