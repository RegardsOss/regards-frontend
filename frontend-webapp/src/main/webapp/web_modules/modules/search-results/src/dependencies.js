/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import CatalogEntityActions from './models/catalog/CatalogEntityActions'
import AttributeModelActions from './models/attributes/AttributeModelActions'

/**
 * Dependencies needed to display user page of the module
 * @author Sébastien binda
 */
const user = [
  CatalogEntityActions.getDependency(RequestVerbEnum.GET_LIST),
]
/**
 * Dependencies needed to display admin page of the module
 * @type {[*]}
 */
const admin = [
  AttributeModelActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  user,
  admin,
}
