import { combineReducers } from 'redux'
import { projectReducers } from './client/ProjectClient'
import { projectConnectionReducers } from './client/ProjectConnectionClient'
import getNotifyLicenseUpdatedReducer, { REDUCER_PATH as NotifyLicenseUpdatedReducerPath } from './model/NotifyLicenseUpdatedReducers'

const projectManagementReducer = combineReducers({
  projects: projectReducers,
  projectConnections: projectConnectionReducers,
  [NotifyLicenseUpdatedReducerPath]: getNotifyLicenseUpdatedReducer,
})

export default projectManagementReducer
