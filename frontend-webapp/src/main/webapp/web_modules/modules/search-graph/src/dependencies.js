/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { dependencies as resultsDependencies } from '@regardsoss/search-results'
import CollectionModelActions from './model/CollectionModelActions'
import { attributeModelAction } from './model/client/AttributeModelClient'

/**
 * Module hateoas depencies
 */
const user = [
  ...resultsDependencies.user,
]

const admin = [
  CollectionModelActions.getDependency(RequestVerbEnum.GET_LIST),
  attributeModelAction.getDependency(RequestVerbEnum.GET_LIST),
  ...resultsDependencies.admin,
]

export default {
  user,
  admin,
}
