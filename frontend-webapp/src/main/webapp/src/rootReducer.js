/*
 * LICENSE_PLACEHOLDER
 */
import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import { reducers as ThemeReducers } from '@regardsoss/theme'
import { portalReducer } from '@regardsoss/portal'
import { adminReducer } from '@regardsoss/admin'
import { userReducer } from '@regardsoss/user'
import { PluginReducer } from '@regardsoss/plugins'
import { i18nReducers } from '@regardsoss/i18n'
import { AuthenticateReducers, AUTHENTICATE_REDUCERS_PATH, AuthenticationParametersReducers, AUTHENTICATION_PARAMETERS_REDUCERS_PATH } from '@regardsoss/authentication-manager'
import { EndpointReducers } from '@regardsoss/endpoint'
import { ApplicationErrorReducer } from '@regardsoss/global-sytem-error'

/**
 * Combine all reducers from common modules
 */
const commonReducer = combineReducers({

  i18n: i18nReducers,
  theme: ThemeReducers,
  plugins: PluginReducer,
  endpoints: EndpointReducers,
  [AUTHENTICATE_REDUCERS_PATH]: AuthenticateReducers,
  [AUTHENTICATION_PARAMETERS_REDUCERS_PATH]: AuthenticationParametersReducers,
  error: ApplicationErrorReducer,
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
}
