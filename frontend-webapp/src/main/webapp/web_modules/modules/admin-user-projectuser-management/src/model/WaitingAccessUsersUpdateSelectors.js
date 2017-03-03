/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalSelectors } from '@regardsoss/store-utils'
import { pathname } from './WaitingAccessUsersFetchReducers'

export default new BasicSignalSelectors(['admin', 'user-management', 'project-user-management', pathname])
