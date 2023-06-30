/*
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import { reducers as ThemeReducers } from '@regardsoss/theme'
import { portalReducer } from '@regardsoss/portal'
import { adminReducer } from '@regardsoss/admin'
import { authenticateRedirectionReducer } from '@regardsoss/authenticate'
import { userReducer } from '@regardsoss/user'
import { PluginReducer } from '@regardsoss/plugins'
import { i18nReducers } from '@regardsoss/i18n'
import { AuthenticationClient, AuthenticationParametersReducers, AUTHENTICATION_PARAMETERS_REDUCERS_PATH } from '@regardsoss/authentication-utils'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { ApplicationErrorReducer } from '@regardsoss/global-system-error'
import { projectClient } from '@regardsoss/project-handler'

/**
 * Combine all reducers from common modules
 */
const commonReducer = combineReducers({

  i18n: i18nReducers,
  theme: ThemeReducers,
  plugins: PluginReducer,
  endpoints: CommonEndpointClient.endpointReducers,
  authentication: AuthenticationClient.authenticationReducers,
  [AUTHENTICATION_PARAMETERS_REDUCERS_PATH]: AuthenticationParametersReducers,
  error: ApplicationErrorReducer,
  project: projectClient.projectReducers,
})

/**
 * Combine all reducers module to a single root reducer.
 */

export default {
  portal: portalReducer,
  common: commonReducer,
  admin: adminReducer,
  user: userReducer,
  form: reduxFormReducer,
  authenticate: authenticateRedirectionReducer,
}
