/**
 * LICENSE_PLACEHOLDER
 **/
import { AuthenticationRouteParameters } from '@regardsoss/authentication-manager'
import AccountCreationActions from './AccountCreationActions'
import { AuthenticationRouteHelper } from '@regardsoss/authentication-manager'

/**
 * Actions to create a REGARDS account (linked with the global instance)
 * @type {CreateAccountActions}
 */
export const CreateAccountActions = new AccountCreationActions('createAccount')
export default {
  /**
   * Sends create account request
   * @param email account mail
   * @param firstName first name
   * @param lastName last name
   * @param password password
   * @param metadata array of user metadata
   */
  sendCreateAccount: (email, firstName, lastName, password, metadata) =>
    CreateAccountActions.sendCreateRequest({
      email,
      firstName,
      lastName,
      password,
      metadata,
      requestLink: AuthenticationRouteHelper.getRequestLinkURL(AuthenticationRouteParameters.mailAuthenticationAction.values.validateAccount),
    }),
}
