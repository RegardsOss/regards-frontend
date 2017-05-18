/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Accessgroup entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'access-right-management', 'access-rights-management', 'access-group']
const REDUX_ACTION_NAMESPACE = 'admin-accessright-management/access-group'

const accessGroupReducer = DataManagementClient.getAccessGroupReducer(REDUX_ACTION_NAMESPACE)
const accessGroupActions = new DataManagementClient.AccessGroupActions(REDUX_ACTION_NAMESPACE)
const accessGroupSelectors = DataManagementClient.getAccessGroupSelectors(ENTITIES_STORE_PATH)


export default {
  accessGroupReducer,
  accessGroupActions,
  accessGroupSelectors,
}
