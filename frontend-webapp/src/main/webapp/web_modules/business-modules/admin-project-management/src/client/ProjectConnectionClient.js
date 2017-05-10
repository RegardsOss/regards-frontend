/*
 * LICENSE_PLACEHOLDER
 */
import { AdminClient } from '@regardsoss/client'

/**
 * Server projectConnection entities client.
 *
 * @author Sébastien Binda
 */

const ENTITIES_STORE_PATH = ['admin', 'project-management', 'projectConnections']
const REDUX_ACTION_NAMESPACE = 'admin-project-management/projectConnections'

const projectConnectionReducers = AdminClient.ProjectConnectionReducers(REDUX_ACTION_NAMESPACE)
const projectConnectionActions = AdminClient.ProjectConnectionActions(REDUX_ACTION_NAMESPACE)
const projectConnectionSelectors = AdminClient.ProjectConnectionSelectors(ENTITIES_STORE_PATH)

export default {
  projectConnectionReducers,
  projectConnectionActions,
  projectConnectionSelectors,
}
