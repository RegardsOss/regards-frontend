/*
 * LICENSE_PLACEHOLDER
 */
import { AccessProjectClient } from '@regardsoss/client'

/**
 * Server Project entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'ui', 'module', 'modules']
const REDUX_ACTION_NAMESPACE = 'admin-ui-module-management-new/modules'

const moduleReducers = AccessProjectClient.ModuleReducers(REDUX_ACTION_NAMESPACE)
const moduleActions = AccessProjectClient.ModuleActions(REDUX_ACTION_NAMESPACE)
const moduleSelectors = AccessProjectClient.ModuleSelectors(ENTITIES_STORE_PATH)

export default {
  moduleReducers,
  moduleActions,
  moduleSelectors,
}
