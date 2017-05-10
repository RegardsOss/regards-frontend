/**
* LICENSE_PLACEHOLDER
**/
import { AdminClient } from '@regardsoss/client'

// this client only consumes project admin waiting user access (no fetch nor reducing)
const waitingAccessUsersEntitiesSelectors = AdminClient.getWaitingAccessUsersEntitiesSelectors(['admin', 'notifications-waiting-users'])

export default {
  waitingAccessUsersEntitiesSelectors,
}
