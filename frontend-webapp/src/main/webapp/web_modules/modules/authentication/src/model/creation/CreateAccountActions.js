/**
 * LICENSE_PLACEHOLDER
 **/
import AccountCreationActions from './AccountCreationActions'

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
   */
  sendCreateAccount: (email, firstName, lastName, password) => CreateAccountActions.sendCreateRequest({ email, firstName, lastName, password }),
}
