/**
 * LICENSE_PLACEHOLDER
 **/
import { AuthenticationRouteParameters } from '@regardsoss/authentication-manager'
import AccountOperationActions from './AccountOperationActions'

export const ResetPasswordActions = new AccountOperationActions('resetPassword', AuthenticationRouteParameters.mailAuthenticationAction.values.changePassword)
export default {
  sendAskResetPassword: mail => ResetPasswordActions.sendAskRequest(mail),
  sendFinishResetPassword: (token, mail, newPassword) => ResetPasswordActions.sendFinishRequest(token, mail, { newPassword }),
}
