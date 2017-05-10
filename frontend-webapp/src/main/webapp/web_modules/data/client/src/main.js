/**
 * LICENSE_PLACEHOLDER
 */
import AccessInstanceClient from './rs-access-instance/main'
import AccessProjectClient from './rs-access-project/main'
import AdminClient from './rs-admin'
import AuthenticationClient from './rs-authentication'
import CatalogClient from './rs-catalog'
import CommonClient from './rs-common'
import DataManagementClient from './rs-dam'


/**
 * Module Client exports all the common REST API Client to request informations from REGARDS backend server.
 * One client is created per microservice.
 * A client is composed with 3 components :
 * - Actions : allow to submit redux api actions to request informations from server.
 * - Reducers : allow to add into the redux store the results of the actions.
 * - Selectors : allow to retrieve from the redux store the results of the actions.
 *
 * The reducers are normally only used to initialize the global application Redux Store.
 * From the other modules of this application ou should only use Actions and Selectors.
 *
 */
export default {
  AccessInstanceClient,
  AccessProjectClient,
  AuthenticationClient,
  AdminClient,
  CatalogClient,
  CommonClient,
  DataManagementClient,
}

