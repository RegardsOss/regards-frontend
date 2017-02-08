/**
 * LICENSE_PLACEHOLDER
 **/
import { AuthenticationRouteParameters } from '@regardsoss/authentication-manager'
import AccountActions from './AccountActions'

const instance = new AccountActions('resetPassword', AuthenticationRouteParameters.mailAuthenticationAction.values.changePassword)
export default {
  sendAskResetPassword: mail => instance.sendAskRequest(mail),
  sendFinishResetPassword: (mail, token, newPassword) => instance.sendFinishRequest(mail, token, newPassword),
}
