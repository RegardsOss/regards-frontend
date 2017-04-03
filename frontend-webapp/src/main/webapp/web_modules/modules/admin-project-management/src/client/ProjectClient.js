/*
 * LICENSE_PLACEHOLDER
 */
import { AdminClient } from '@regardsoss/client'

/**
 * Server Project entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'project-management', 'projects']
const REDUX_ACTION_NAMESPACE = 'admin-project-management/projects'

const projectReducers = AdminClient.ProjectReducers(REDUX_ACTION_NAMESPACE)
const projectActions = AdminClient.ProjectActions(REDUX_ACTION_NAMESPACE)
const projectSelectors = AdminClient.ProjectSelectors(ENTITIES_STORE_PATH)

export default {
  projectReducers,
  projectActions,
  projectSelectors,
}
