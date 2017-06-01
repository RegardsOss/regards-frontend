/*
 * LICENSE_PLACEHOLDER
 */
import { AccessProjectClient } from '@regardsoss/client'

/**
 * Server Project entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'ui', 'module', 'layouts']
const REDUX_ACTION_NAMESPACE = 'admin-ui-module-management/layouts'

const layoutReducers = AccessProjectClient.LayoutReducers(REDUX_ACTION_NAMESPACE)
const layoutActions = AccessProjectClient.LayoutActions(REDUX_ACTION_NAMESPACE)
const layoutSelectors = AccessProjectClient.LayoutSelectors(ENTITIES_STORE_PATH)

export default {
  layoutReducers,
  layoutActions,
  layoutSelectors,
}
