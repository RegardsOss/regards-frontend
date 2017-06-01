/**
 * LICENSE_PLACEHOLDER
 **/
import { borrowRoleReducer } from './clients/BorrowRoleClient'
import { borrowableRolesReducer } from './clients/BorrowableRolesClient'
import { myUserReducer } from './clients/MyUserClient'
import profileDialogReducer from './model/ProfileDialogReducer'

export default {
  // web consuming clients (redux API actions / reducers)
  borrowRole: borrowRoleReducer,
  borrowableRoles: borrowableRolesReducer,
  myUser: myUserReducer,
  // local actions / reducers
  profileDialog: profileDialogReducer,
}
