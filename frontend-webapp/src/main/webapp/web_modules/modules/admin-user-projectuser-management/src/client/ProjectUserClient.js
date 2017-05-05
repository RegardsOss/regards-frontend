/**
* LICENSE_PLACEHOLDER
**/
import { AdminClient } from '@regardsoss/client'

const namespace = 'admin-user-projectuser-management/project-user'
const projectUserActions = new AdminClient.ProjectUserActions(namespace)
const projectUserReducer = AdminClient.getProjectUserReducer(namespace)
const projectUserSelectors = AdminClient.getProjectUserSelectors(['admin', 'user-management', 'project-user-management', 'projectUser'])

export default {
  projectUserActions,
  projectUserReducer,
  projectUserSelectors,
}

