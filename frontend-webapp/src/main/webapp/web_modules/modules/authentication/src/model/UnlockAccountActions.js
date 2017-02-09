/**
 * LICENSE_PLACEHOLDER
 **/
import { AuthenticationRouteParameters } from '@regardsoss/authentication-manager'
import AccountActions from './AccountActions'

const instance = new AccountActions('unlockAccount', AuthenticationRouteParameters.mailAuthenticationAction.values.unlockAccount)
export default {
  sendAskUnlockAccount: mail => instance.sendAskRequest(mail),
  sendFinishUnlockAccount: (mail, token) => instance.sendFinishRequest(mail, token),
}
