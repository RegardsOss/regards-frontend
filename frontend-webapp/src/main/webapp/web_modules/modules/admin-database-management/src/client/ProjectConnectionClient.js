/*
 * LICENSE_PLACEHOLDER
 */
import {
  ProjectConnectionActions,
  ProjectConnectionSelectors,
  ProjectConnectionReducers,
} from '@regardsoss/client'

/**
 * Server projectConnection entities client.
 *
 * @author Sébastien Binda
 */

const ENTITIES_STORE_PATH = ['admin', 'database-management', 'projectConnections']
const REDUX_ACTION_NAMESPACE = 'admin-database-management/projectConnections'

const projectConnectionReducers = ProjectConnectionReducers(REDUX_ACTION_NAMESPACE)
const projectConnectionActions = ProjectConnectionActions(REDUX_ACTION_NAMESPACE)
const projectConnectionSelectors = ProjectConnectionSelectors(ENTITIES_STORE_PATH)

export default {
  projectConnectionReducers,
  projectConnectionActions,
  projectConnectionSelectors,
}
