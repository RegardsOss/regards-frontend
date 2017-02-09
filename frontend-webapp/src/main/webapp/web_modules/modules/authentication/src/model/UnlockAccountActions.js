/**
 * LICENSE_PLACEHOLDER
 **/
import { AuthenticationRouteParameters } from '@regardsoss/authentication-manager'
import AccountActions from './AccountActions'

export const UnlockAccountActions = new AccountActions('unlockAccount', AuthenticationRouteParameters.mailAuthenticationAction.values.unlockAccount)
export default {
  sendAskUnlockAccount: mail => UnlockAccountActions.sendAskRequest(mail),
  sendFinishUnlockAccount: (mail, token) => UnlockAccountActions.sendFinishRequest(mail, token),
}
