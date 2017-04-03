import { combineReducers } from 'redux'
import { projectReducers } from './client/ProjectClient'
import getNotifyLicenseUpdatedReducer, { REDUCER_PATH as NotifyLicenseUpdatedReducerPath } from './model/NotifyLicenseUpdatedReducers'

const projectManagementReducer = combineReducers({
  project: projectReducers,
  [NotifyLicenseUpdatedReducerPath]: getNotifyLicenseUpdatedReducer,
})

export default projectManagementReducer
