/**
* LICENSE_PLACEHOLDER
**/
import { AdminClient } from '@regardsoss/client'

/**
 * Client for my user data (endpoint to fecth currently logged in user data)
 */
const namespace = 'MENU/MY_USER'
export const myUserActions = new AdminClient.MyUserActions(namespace)
export const myUserReducer = AdminClient.getMyUserReducer(namespace)
export const myUserSelectors = AdminClient.getMyUserSelectors(['modules.menu', 'myUser'])

export default {
  myUserActions,
  myUserReducer,
  myUserSelectors,
}
