/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { dependencies as resultsDependencies } from '@regardsoss-modules/search-results'
import CollectionModelActions from './model/CollectionModelActions'
import { AttributeModelActions } from './model/clients/AttributeModelClient'

/**
 * Module hateoas depencies
 */
const user = [
  ...resultsDependencies.user,
]

const admin = [
  CollectionModelActions.getDependency(RequestVerbEnum.GET_LIST),
  AttributeModelActions.getDependency(RequestVerbEnum.GET_LIST),
  ...resultsDependencies.admin,
]

export default {
  user,
  admin,
}
