/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Model attributes entities client.
 *
 * @author Léo Mieulet
 */
const REDUX_ACTION_NAMESPACE = 'admin-data-modelattribute-management/model-attribute-fragment'

const modelAttributesFragmentReducer = DataManagementClient.ModelAttributesFragmentReducer(REDUX_ACTION_NAMESPACE)
const modelAttributesFragmentActions = new DataManagementClient.ModelAttributesFragmentActions(REDUX_ACTION_NAMESPACE)


export default {
  modelAttributesFragmentReducer,
  modelAttributesFragmentActions,
}
