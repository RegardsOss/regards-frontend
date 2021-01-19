/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import resetPasswordReducer, { pathname as resetPath } from './model/operation/ResetPasswordReducers'
import changePasswordReducer, { pathname as changePath } from './model/operation/ChangePasswordReducers'
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
  [changePath]: changePasswordReducer,
  [unlockPath]: unlockAccountReducer,
  accountPassword: accountPasswordReducer,
}

export default projectsReducer
