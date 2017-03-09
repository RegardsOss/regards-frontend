/**
 * LICENSE_PLACEHOLDER
 */
import ProjectLicenseReducers, { REDUCER_PATH as PROJECT_LICENSE_REDUCER_PATH } from './model/ProjectLicenseReducers'
import ResetProjectLicensesReducers, { REDUCER_PATH as RESET_PROJECT_LICENSES_REDUCER_PATH } from './model/ResetProjectLicensesReducers'

const licenseReducer = {
  [PROJECT_LICENSE_REDUCER_PATH]: ProjectLicenseReducers,
  [RESET_PROJECT_LICENSES_REDUCER_PATH]: ResetProjectLicensesReducers,
}

export default licenseReducer

