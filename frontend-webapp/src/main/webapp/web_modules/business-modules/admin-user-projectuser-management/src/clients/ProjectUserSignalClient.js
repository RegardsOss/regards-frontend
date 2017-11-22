/**
* LICENSE_PLACEHOLDER
**/
import { AdminClient } from '@regardsoss/client'

const namespace = 'admin-user-projectuser-management/waiting-accounts-signals'
const ProjectUserSignalActions = new AdminClient.ProjectUserSignalActions(namespace)
const ProjectUserSignalReducer = AdminClient.getProjectUserSignalReducer(namespace)
const ProjectUserSignalSelectors = AdminClient.getProjectUserSignalSelectors(['admin', 'user-management', 'project-user-management', 'projectUserSignals'])

module.exports = {
  ProjectUserSignalActions,
  ProjectUserSignalReducer,
  ProjectUserSignalSelectors,
}
