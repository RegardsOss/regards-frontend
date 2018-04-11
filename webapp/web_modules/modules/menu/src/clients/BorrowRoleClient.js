/**
* LICENSE_PLACEHOLDER
**/
import { AdminClient } from '@regardsoss/client'

const namespace = 'menu/borrow-role'
const borrowRoleActions = new AdminClient.BorrowRoleActions(namespace)
const borrowRoleReducer = AdminClient.getBorrowRoleReducer(namespace)
const borrowRoleSelectors = AdminClient.getBorrowRoleSelectors(['modules.menu', 'borrowRole'])

module.exports = {
  borrowRoleActions,
  borrowRoleReducer,
  borrowRoleSelectors,
}
