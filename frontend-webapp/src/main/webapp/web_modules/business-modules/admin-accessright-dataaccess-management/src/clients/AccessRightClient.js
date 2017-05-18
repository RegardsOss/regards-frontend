/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Accessright entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'access-right-management', 'access-rights-management', 'access-right']
const REDUX_ACTION_NAMESPACE = 'admin-accessright-management/access-right'

const accessRightReducer = DataManagementClient.getAccessRightReducer(REDUX_ACTION_NAMESPACE)
const accessRightActions = new DataManagementClient.AccessRightActions(REDUX_ACTION_NAMESPACE)
const accessRightSelectors = DataManagementClient.getAccessRightSelectors(ENTITIES_STORE_PATH)


export default {
  accessRightReducer,
  accessRightActions,
  accessRightSelectors,
}
