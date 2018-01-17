/**
* LICENSE_PLACEHOLDER
**/
import { AdminClient } from '@regardsoss/client'

const namespace = 'admin-order-management/project-user'
const projectUserActions = new AdminClient.ProjectUserActions(namespace)
const projectUserReducer = AdminClient.getProjectUserReducer(namespace)
const projectUserSelectors = AdminClient.getProjectUserSelectors(['admin', 'user-management', 'order-management', 'users'])

module.exports = {
  projectUserActions,
  projectUserReducer,
  projectUserSelectors,
}

