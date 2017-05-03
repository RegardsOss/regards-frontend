/**
 * LICENSE_PLACEHOLDER
 **/

import reduceBorrowRole, { PATH as BORROW_ROLE_PATH } from './model/BorrowRoleReducer'
import reduceBorrowableRoles, { PATH as BORROWABLE_ROLES_PATH } from './model/BorrowableRolesReducer'
import reduceProfileDialog, { PATH as PROFILE_DIALOG_PATH } from './model/ProfileDialogReducer'

export default {
  [BORROW_ROLE_PATH]: reduceBorrowRole,
  [BORROWABLE_ROLES_PATH]: reduceBorrowableRoles,
  [PROFILE_DIALOG_PATH]: reduceProfileDialog,
}
