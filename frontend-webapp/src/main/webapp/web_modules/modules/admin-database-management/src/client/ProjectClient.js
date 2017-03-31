/*
 * LICENSE_PLACEHOLDER
 */
import { ProjectActions, ProjectSelectors, ProjectReducers } from '@regardsoss/client'

/**
 * Server Project entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'database-management', 'projects']
const REDUX_ACTION_NAMESPACE = 'admin-database-management/projects'

const projectReducers = ProjectReducers(REDUX_ACTION_NAMESPACE)
const projectActions = ProjectActions(REDUX_ACTION_NAMESPACE)
const projectSelectors = ProjectSelectors(ENTITIES_STORE_PATH)

export default {
  projectReducers,
  projectActions,
  projectSelectors,
}
