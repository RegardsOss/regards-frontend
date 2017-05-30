/**
 * LICENSE_PLACEHOLDER
 **/
import resetPasswordReducer, { pathname as resetPath } from './model/operation/ResetPasswordReducers'
import unlockAccountReducer, { pathname as unlockPath } from './model/operation/UnlockAccountReducers'
import createAccountReducer, { pathname as createAccountPath } from './model/creation/CreateAccountReducers'
import createUserReducer, { pathname as createUserPath } from './model/creation/CreateUserReducers'
import validateAccountReducer, { pathname as validateAccountPath } from './model/creation/ValidateAccountReducers'
import { accountPasswordReducer } from './client/AccountPasswordClient'

const projectsReducer = {
  [createAccountPath]: createAccountReducer,
  [createUserPath]: createUserReducer,
  [validateAccountPath]: validateAccountReducer,
  [resetPath]: resetPasswordReducer,
  [unlockPath]: unlockAccountReducer,
  accountPassword: accountPasswordReducer,
}

export default projectsReducer
