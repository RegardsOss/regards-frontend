/**
 * LICENSE_PLACEHOLDER
 **/
import { AuthenticationRouteParameters } from '@regardsoss/authentication-manager'
import AccountActions from './AccountActions'

export const ResetPasswordActions = new AccountActions('resetPassword', AuthenticationRouteParameters.mailAuthenticationAction.values.changePassword)
export default {
  sendAskResetPassword: mail => ResetPasswordActions.sendAskRequest(mail),
  sendFinishResetPassword: (mail, token, newPassword) => ResetPasswordActions.sendFinishRequest(mail, token, newPassword),
}
