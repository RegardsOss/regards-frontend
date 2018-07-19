/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import { AuthenticationDialogActions } from './authenticationDialog/AuthenticationDialogActions'
import { getAuthenticationDialogReducer } from './authenticationDialog/AuthenticationDialogReducer'
import { AuthenticationDialogSelectors, getAuthenticationDialogSelectors } from './authenticationDialog/AuthenticationDialogSelectors'
import DialogRequestsActions from './dialog/DialogRequestsActions'
import { getDialogRequestsReducer } from './dialog/DialogRequestsReducer'
import getDialogRequestsSelectors from './dialog/DialogRequestsSelectors'
import { ModuleExpandedStateActions } from './module/ModuleExpandedStateActions'
import { getModuleExpandedStateReducer } from './module/ModuleExpandedStateReducer'
import { ModuleExpandedStateSelectors, getModuleExpandedStateSelectors } from './module/ModuleExpandedStateSelectors'

module.exports = {
  AuthenticationDialogActions,
  AuthenticationDialogSelectors,
  getAuthenticationDialogReducer,
  getAuthenticationDialogSelectors,
  DialogRequestsActions,
  getDialogRequestsReducer,
  getDialogRequestsSelectors,
  ModuleExpandedStateActions,
  ModuleExpandedStateSelectors,
  getModuleExpandedStateReducer,
  getModuleExpandedStateSelectors,
}
