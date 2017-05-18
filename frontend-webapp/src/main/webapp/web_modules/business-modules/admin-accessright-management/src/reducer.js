/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { accessGroupManagementReducer } from '@regardsoss/admin-accessright-accessgroup-management'
import { accessRightManagementReducer } from '@regardsoss/admin-accessright-dataaccess-management'

const accessRightsManagementReducer = combineReducers({
  'access-group-management': accessGroupManagementReducer,
  'access-rights-management': accessRightManagementReducer,
})


export default accessRightsManagementReducer
