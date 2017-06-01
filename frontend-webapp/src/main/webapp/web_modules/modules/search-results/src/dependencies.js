/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { searchDatasetsActions, searchDataobjectsActions } from './clients/SearchEntitiesClient'
import { AttributeModelActions } from './clients/AttributeModelClient'

/**
 * Dependencies needed to display user page of the module
 * @author Sébastien binda
 */
const user = [
  searchDatasetsActions.getDependency(RequestVerbEnum.GET_LIST),
  searchDataobjectsActions.getDependency(RequestVerbEnum.GET_LIST),
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
