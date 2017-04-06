/*
 * LICENSE_PLACEHOLDER
 */
import { AdminClient } from '@regardsoss/client'

/**
 * Server projectConnection entities client.
 *
 * @author Sébastien Binda
 */

const ENTITIES_STORE_PATH = ['admin', 'project-management', 'testConnection']
const REDUX_ACTION_NAMESPACE = 'admin-project-management/projectConnectionTest'

const projectConnectionTestReducers = AdminClient.ProjectConnectionTestReducers(REDUX_ACTION_NAMESPACE)
const projectConnectionTestActions = AdminClient.ProjectConnectionTestActions(REDUX_ACTION_NAMESPACE)
const projectConnectionTestSelectors = AdminClient.ProjectConnectionTestSelectors(ENTITIES_STORE_PATH, ENTITIES_STORE_PATH)

export default {
  projectConnectionTestReducers,
  projectConnectionTestActions,
  projectConnectionTestSelectors,
}
