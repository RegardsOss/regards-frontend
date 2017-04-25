/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * UI Plugin Configuration entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'data-management', 'attribute-model-management', 'fragment']
const REDUX_ACTION_NAMESPACE = 'admin-data-attributemodel-management/fragment'

const fragmentReducer = DataManagementClient.FragmentReducers(REDUX_ACTION_NAMESPACE)
const fragmentActions = DataManagementClient.FragmentActions(REDUX_ACTION_NAMESPACE)
const fragmentSelectors = DataManagementClient.FragmentSelectors(ENTITIES_STORE_PATH)


export default {
  fragmentReducer,
  fragmentActions,
  fragmentSelectors,
}
