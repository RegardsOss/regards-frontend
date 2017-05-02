/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Model attributes entities client.
 *
 * @author Léo Mieulet
 */
const REDUX_ACTION_NAMESPACE = 'admin-data-model-management'

const modelAttributesActions = new DataManagementClient.ModelAttributesActions(REDUX_ACTION_NAMESPACE)

export default {
  modelAttributesActions,
}
