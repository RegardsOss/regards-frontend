

/**
* LICENSE_PLACEHOLDER
**/
import root from 'window-or-global'
import get from 'lodash/get'
/**
 * Helper to handle user connection informations into the web browser localstorage
 * @author Sébastien Binda
 */
class LocalStorageUser {
  static LOCALSTRAOGE_KEY = 'current-user'

  static getLocalStorageKey = (project, application) => `${LocalStorageUser.LOCALSTRAOGE_KEY}-${application}-${project}`

  /**
   * Retrieve user stored in local storage. Return null if no one is defined or if user informations are deprecated
   * @param project : project of connection information to retrieve
   * @param application : application of connection information to retrieve
   */
  static retrieve = (project, application) => {
    const storedUsed = root.localStorage.getItem(LocalStorageUser.getLocalStorageKey(project, application))
    if (storedUsed) {
      try {
        const storedUserObject = JSON.parse(storedUsed)
        // Check if token expired
        const expirationDate = get(storedUserObject, 'authenticationDate', 0) + get(storedUserObject, 'authentication.expires_in', 0)
        // If token is not expired, use it to authenticate, otherwise remove it from localStorage
        if (expirationDate > Date.now()) {
          return new LocalStorageUser(storedUserObject.authentication, storedUserObject.authenticationDate)
        }
        LocalStorageUser.delete()
      } catch (exception) {
        console.error('Error reading current user authentication informations')
        LocalStorageUser.delete()
      }
    }
    return null
  }

  /**
   * Delete user connection informations stored in localstorage
   * @param project : project of connection information to delete
   * @param application : application of connection information to delete
   */
  static delete = (project, application) => {
    root.localStorage.removeItem(LocalStorageUser.getLocalStorageKey(project, application))
  }

  /**
   *
   * @param {*} authentication : user connection informations (containing token)
   * @param {*} authenticationDate : authentication date
   * @param {*} project : project of connection informations
   * @param {*} application : application of connection informations
   */
  constructor(authentication, authenticationDate, project, application) {
    this.project = project
    this.application = application
    this.authentication = authentication
    this.authenticationDate = authenticationDate
  }

  /**
   * Save current user connection informations in localstorage
   */
  save() {
    root.localStorage.setItem(LocalStorageUser.getLocalStorageKey(this.project, this.application), JSON.stringify(this))
  }

  /**
   * Get authentication information of current user
   */
  getAuthenticationInformations = () => this.authentication

  /**
   * Get authentication date of current user
   */
  getAuthenticationDate = () => this.authenticationDate

  /**
   * Get project current user
   */
  getProject = () => this.project

  /**
   * Get application current user
   */
  getApplication = () => this.application
}

export default LocalStorageUser
