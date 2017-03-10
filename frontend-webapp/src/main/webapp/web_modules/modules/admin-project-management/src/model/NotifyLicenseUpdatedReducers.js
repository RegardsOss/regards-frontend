/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import ResetProjectLicensesActions from './NotifyLicenseUpdatedActions'


const resetProjectLicensesReducers = new BasicSignalReducers(ResetProjectLicensesActions)
export const REDUCER_PATH = 'reset-license'

/**
 * Export instance reducer
 */
export default (state, action) => resetProjectLicensesReducers.reduce(state, action)
