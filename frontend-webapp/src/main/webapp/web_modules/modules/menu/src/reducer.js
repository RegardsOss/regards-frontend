/**
 * LICENSE_PLACEHOLDER
 **/
import { borrowRoleReducer } from './client/BorrowRoleClient'
import { borrowableRolesReducer } from './client/BorrowableRolesClient'
import { myUserReducer } from './client/MyUserClient'
import profileDialogReducer from './model/ProfileDialogReducer'

export default {
  // web consuming clients (redux API actions / reducers)
  borrowRole: borrowRoleReducer,
  borrowableRoles: borrowableRolesReducer,
  myUser: myUserReducer,
  // local actions / reducers
  profileDialog: profileDialogReducer,
}
