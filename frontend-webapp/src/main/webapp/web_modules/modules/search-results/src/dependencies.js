/**
 * LICENSE_PLACEHOLDER
 **/
import CatalogEntityActions from './models/catalog/CatalogEntityActions'

/**
 * Dependencies needed to display user page of the module
 * @author Sébastien binda
 */
const user = [
  CatalogEntityActions.getDependency('GET'),
]
/**
 * Dependencies needed to display admin page of the module
 * @type {[*]}
 */
const admin = [
]

export default {
  user,
  admin,
}
