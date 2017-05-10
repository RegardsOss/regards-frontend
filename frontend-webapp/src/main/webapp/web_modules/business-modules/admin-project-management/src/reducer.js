import { combineReducers } from 'redux'
import { projectReducers } from './client/ProjectClient'
import { projectConnectionReducers } from './client/ProjectConnectionClient'
import { projectConnectionTestReducers } from './client/ProjectConnectionTestClient'
import getNotifyLicenseUpdatedReducer, { REDUCER_PATH as NotifyLicenseUpdatedReducerPath } from './model/NotifyLicenseUpdatedReducers'

const projectManagementReducer = combineReducers({
  projects: projectReducers,
  projectConnections: projectConnectionReducers,
  projectConnectionTest: projectConnectionTestReducers,
  [NotifyLicenseUpdatedReducerPath]: getNotifyLicenseUpdatedReducer,
})

export default projectManagementReducer
