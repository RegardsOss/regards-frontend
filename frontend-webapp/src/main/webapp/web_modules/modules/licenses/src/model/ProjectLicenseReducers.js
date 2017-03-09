/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import ProjectLicenseActions from './ProjectLicenseActions'


const licenseInformationReducer = new BasicSignalReducers(ProjectLicenseActions)
export const REDUCER_PATH = 'license-information'

/**
 * Export instance reducer
 */
export default (state, action) => licenseInformationReducer.reduce(state, action)
