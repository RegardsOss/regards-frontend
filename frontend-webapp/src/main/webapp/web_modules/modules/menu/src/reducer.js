/**
 * LICENSE_PLACEHOLDER
 **/

import BorrowRoleReducers, { PATH as BORROW_ROLE_PATH } from './model/BorrowRoleReducers'
import BorrowableRolesReducers, { PATH as BORROWABLE_ROLES_PATH } from './model/BorrowableRolesReducers'

export default {
  [BORROW_ROLE_PATH]: BorrowRoleReducers,
  [BORROWABLE_ROLES_PATH]: BorrowableRolesReducers,
}
