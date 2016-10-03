import { combineReducers } from "redux"
import { portalReducer } from "@regardsoss/portal"
import { adminReducer } from "@regardsoss/admin"
import { themeReducers } from "@regardsoss/theme"
import { PluginReducer } from "@regardsoss/plugins"
import { i18nReducers } from "@regardsoss/i18n"
import { accessRightsReducers } from "@regardsoss/access-rights"
import { authentication } from "@regardsoss/authentication"
import { endpointReducer } from "@regardsoss/display-control"

/**
 * Combile all reducers from common modules
 * @type {Redux.Reducer<S>}
 */
const commonReducer = combineReducers({
  i18n: i18nReducers,
  theme: themeReducers,
  plugins: PluginReducer,
  api: accessRightsReducers,
  authentication,
  endpoints: endpointReducer
})

/**
 * Combine all reducers module to a single root reducer.
 */
export default combineReducers({
  portal: portalReducer,
  common: commonReducer,
  admin: adminReducer
  /*
   userApp,*/
})

