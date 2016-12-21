/*
 * LICENSE_PLACEHOLDER
 */
import { combineReducers } from 'redux'
import { adminReducer } from '@regardsoss/admin'
import { reducer } from '@regardsoss/projects-list'
import { themeReducers } from '@regardsoss/theme'
import { PluginReducer } from '@regardsoss/plugins'
import { i18nReducers } from '@regardsoss/i18n'
import { authentication } from '@regardsoss/authentication-manager'
import { endpointReducer } from '@regardsoss/display-control'
import { ApplicationErrorReducer } from '@regardsoss/global-sytem-error'
import { reducer as reduxFormReducer } from 'redux-form'

/**
 * Combine all reducers from common modules
 */
const commonReducer = combineReducers({
  i18n: i18nReducers,
  theme: themeReducers,
  plugins: PluginReducer,
  endpoints: endpointReducer,
  authentication,
  error: ApplicationErrorReducer,
})

/**
 * Combine all reducers module to a single root reducer.
 */

export default combineReducers({
  portal: reducer,
  common: commonReducer,
  admin: adminReducer,
  form: reduxFormReducer,
})
