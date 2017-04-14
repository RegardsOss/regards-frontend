/*
 * LICENSE_PLACEHOLDER
 */
import { AdminClient } from '@regardsoss/client'

/**
 * Server Project entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'user-management', 'role-resource-access-management', 'controller']
const REDUX_ACTION_NAMESPACE = 'admin-user-role-resource-access-management/resource-controller'

const controllerReducers = AdminClient.ControllerReducers(REDUX_ACTION_NAMESPACE)
const controllerActions = AdminClient.ControllerActions(REDUX_ACTION_NAMESPACE)
const controllerSelectors = AdminClient.ControllerSelectors(ENTITIES_STORE_PATH)

export default {
  controllerReducers,
  controllerActions,
  controllerSelectors,
}
