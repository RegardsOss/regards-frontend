/**
 * LICENSE_PLACEHOLDER
 **/
import { AuthenticationRouteParameters } from '@regardsoss/authentication-manager'
import AccountOperationActions from './AccountOperationActions'

export const UnlockAccountActions = new AccountOperationActions('unlockAccount', AuthenticationRouteParameters.mailAuthenticationAction.values.unlockAccount)
export default {
  sendAskUnlockAccount: mail => UnlockAccountActions.sendAskRequest(mail),
  sendFinishAccountUnlocking: (mail, token) => UnlockAccountActions.sendFinishRequest(mail, token),
}
