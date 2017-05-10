/*
 * LICENSE_PLACEHOLDER
 */
import { AccessInstanceClient } from '@regardsoss/client'

/**
 * Server Project entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'ui', 'module', 'modules-instance']
const REDUX_ACTION_NAMESPACE = 'admin-ui-module-management-new/modules-instance'


const moduleInstanceReducers = AccessInstanceClient.ModuleReducers(REDUX_ACTION_NAMESPACE)
const moduleInstanceActions = AccessInstanceClient.ModuleActions(REDUX_ACTION_NAMESPACE)
const moduleInstanceSelectors = AccessInstanceClient.ModuleSelectors(ENTITIES_STORE_PATH)

export default {
  moduleInstanceReducers,
  moduleInstanceActions,
  moduleInstanceSelectors,
}
