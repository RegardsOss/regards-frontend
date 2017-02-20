/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalSelectors } from '@regardsoss/store-utils'
import { pathname } from './ResetPasswordReducers'
import { getSelectorPath } from '../Common'

export default new BasicSignalSelectors(getSelectorPath(pathname))
