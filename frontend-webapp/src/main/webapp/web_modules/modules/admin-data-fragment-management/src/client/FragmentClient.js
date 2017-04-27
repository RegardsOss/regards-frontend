/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * UI Plugin Configuration entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'fragment-management', 'fragment']
const REDUX_ACTION_NAMESPACE = 'admin-data-fragment-management/fragment'

const fragmentReducer = DataManagementClient.FragmentReducer(REDUX_ACTION_NAMESPACE)
const fragmentActions = new DataManagementClient.FragmentActions(REDUX_ACTION_NAMESPACE)
const fragmentSelectors = DataManagementClient.FragmentSelectors(ENTITIES_STORE_PATH)


export default {
  fragmentReducer,
  fragmentActions,
  fragmentSelectors,
}
