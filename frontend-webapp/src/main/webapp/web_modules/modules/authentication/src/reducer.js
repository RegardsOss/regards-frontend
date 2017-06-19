/**
 * LICENSE_PLACEHOLDER
 **/
import resetPasswordReducer, { pathname as resetPath } from './model/operation/ResetPasswordReducers'
import unlockAccountReducer, { pathname as unlockPath } from './model/operation/UnlockAccountReducers'
import createAccountReducer, { pathname as createAccountPath } from './model/creation/CreateAccountReducers'
import createUserReducer, { pathname as createUserPath } from './model/creation/CreateUserReducers'
import verifyEmailReducer, { pathname as verifyEmailPath } from './model/creation/VerifyEmailReducers'
import { accountPasswordReducer } from './clients/AccountPasswordClient'

const projectsReducer = {
  [createAccountPath]: createAccountReducer,
  [createUserPath]: createUserReducer,
  [verifyEmailPath]: verifyEmailReducer,
  [resetPath]: resetPasswordReducer,
  [unlockPath]: unlockAccountReducer,
  accountPassword: accountPasswordReducer,
}

export default projectsReducer
