/**
* LICENSE_PLACEHOLDER
**/
import { AdminClient } from '@regardsoss/client'

const namespace = 'menu/borrowable-roles'
const borrowableRolesActions = new AdminClient.BorrowableRolesActions(namespace)
const borrowableRolesReducer = AdminClient.getBorrowableRolesReducer(namespace)
const borrowableRolesSelectors = AdminClient.getBorrowableRolesSelectors(['modules.menu', 'borrowableRoles'])

module.exports = {
  borrowableRolesActions,
  borrowableRolesReducer,
  borrowableRolesSelectors,
}
