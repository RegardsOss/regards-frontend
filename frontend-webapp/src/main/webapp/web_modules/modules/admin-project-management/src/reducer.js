import { combineReducers } from 'redux'
import getProjectReducer from './model/ProjectReducers'
import getNotifyLicenseUpdatedReducer, { REDUCER_PATH as NotifyLicenseUpdatedReducerPath } from './model/NotifyLicenseUpdatedReducers'

const projectManagementReducer = combineReducers({
  project: getProjectReducer,
  [NotifyLicenseUpdatedReducerPath]: getNotifyLicenseUpdatedReducer,
})

export default projectManagementReducer
