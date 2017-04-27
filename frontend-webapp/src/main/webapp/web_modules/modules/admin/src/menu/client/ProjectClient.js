/*
 * LICENSE_PLACEHOLDER
 */
import { AdminClient } from '@regardsoss/client'

/**
 * Server Project entities client.
 *
 * @author Sébastien Binda
 */
const REDUX_ACTION_NAMESPACE = 'admin-project-management/projects'

const projectActions = AdminClient.ProjectActions(REDUX_ACTION_NAMESPACE)

export default {
  projectActions,
}
