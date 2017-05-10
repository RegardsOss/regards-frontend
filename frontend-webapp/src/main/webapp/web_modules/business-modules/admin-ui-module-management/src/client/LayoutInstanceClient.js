/*
 * LICENSE_PLACEHOLDER
 */
import { AccessInstanceClient } from '@regardsoss/client'

/**
 * Server Project entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'ui', 'module', 'layouts-instance']
const REDUX_ACTION_NAMESPACE = 'admin-ui-module-management/layouts-instance'

const layoutInstanceReducers = AccessInstanceClient.LayoutReducers(REDUX_ACTION_NAMESPACE)
const layoutInstanceActions = AccessInstanceClient.LayoutActions(REDUX_ACTION_NAMESPACE)
const layoutInstanceSelectors = AccessInstanceClient.LayoutSelectors(ENTITIES_STORE_PATH)

export default {
  layoutInstanceReducers,
  layoutInstanceActions,
  layoutInstanceSelectors,
}
