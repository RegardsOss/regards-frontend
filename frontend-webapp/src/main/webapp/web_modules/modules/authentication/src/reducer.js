/**
 * LICENSE_PLACEHOLDER
 **/
import resetPasswordReducer, { pathname as resetPath } from './model/operation/ResetPasswordReducers'
import unlockAccountReducer, { pathname as unlockPath } from './model/operation/UnlockAccountReducers'
import createAccountReducer, { pathname as createAccountPath } from './model/creation/CreateAccountReducers'
import createUserReducer, { pathname as createUserPath } from './model/creation/CreateUserReducers'
import validateAccountReducer, { pathname as validateAccountPath } from './model/creation/ValidateAccountReducers'

const projectsReducer = {
  [createAccountPath]: createAccountReducer,
  [createUserPath]: createUserReducer,
  [validateAccountPath]: validateAccountReducer,
  [resetPath]: resetPasswordReducer,
  [unlockPath]: unlockAccountReducer,
}

export default projectsReducer
