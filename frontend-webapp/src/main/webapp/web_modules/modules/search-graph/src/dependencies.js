/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { dependencies as resultsDependencies } from '@regardsoss/search-results'
import CollectionModelActions from './model/CollectionModelActions'
import { AttributeModelAction } from './model/client/AttributeModelClient'

/**
 * Module hateoas depencies
 */
const user = [
  // TODO
  ...resultsDependencies.user,
]

const admin = [
  CollectionModelActions.getDependency(RequestVerbEnum.GET_LIST),
  AttributeModelAction.getDependency(RequestVerbEnum.GET_LIST),
  ...resultsDependencies.admin,
]

export default {
  user,
  admin,
}
