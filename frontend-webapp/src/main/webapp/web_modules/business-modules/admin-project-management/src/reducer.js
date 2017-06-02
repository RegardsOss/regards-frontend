/*
 * LICENSE_PLACEHOLDER
 */
import { combineReducers } from 'redux'
import { projectReducers } from './clients/ProjectClient'
import { projectConnectionReducers } from './clients/ProjectConnectionClient'
import { projectConnectionTestReducers } from './clients/ProjectConnectionTestClient'
import getNotifyLicenseUpdatedReducer, { REDUCER_PATH as NotifyLicenseUpdatedReducerPath } from './model/NotifyLicenseUpdatedReducers'

const projectManagementReducer = combineReducers({
  projects: projectReducers,
  projectConnections: projectConnectionReducers,
  projectConnectionTest: projectConnectionTestReducers,
  [NotifyLicenseUpdatedReducerPath]: getNotifyLicenseUpdatedReducer,
})

export default projectManagementReducer
