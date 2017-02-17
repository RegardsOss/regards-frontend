/**
 * LICENSE_PLACEHOLDER
 **/
import AccountCreationActions from './AccountCreationActions'

/**
 * Actions to create a project user (requires an existing REGARDS account).
 * @type {createUserActions}
 */
export const CreateUserActions = new AccountCreationActions('createUser')
export default {
  /**
   * Sends create account request (project is hold by the token)
   * @param email account mail
   */
  sendCreateUser: email => CreateUserActions.sendCreateRequest({ email }),
}
