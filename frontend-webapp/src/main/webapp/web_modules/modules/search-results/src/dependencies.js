/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import CatalogDatasetEntityActions from './models/catalog/CatalogDatasetEntityActions'
import CatalogDataobjectEntityActions from './models/catalog/CatalogDataobjectEntityActions'
import { AttributeModelAction } from './models/client/AttributeModelClient'

/**
 * Dependencies needed to display user page of the module
 * @author Sébastien binda
 */
const user = [
  CatalogDatasetEntityActions.getDependency(RequestVerbEnum.GET_LIST),
  CatalogDataobjectEntityActions.getDependency(RequestVerbEnum.GET_LIST),
]

/**
 * Dependencies needed to display admin page of the module
 * @type {[*]}
 */
const admin = [
  AttributeModelAction.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  user,
  admin,
}
