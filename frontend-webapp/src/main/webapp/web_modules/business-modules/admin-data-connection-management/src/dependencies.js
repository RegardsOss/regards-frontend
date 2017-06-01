/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { connectionActions } from './clients/ConnectionClient'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const listDependencies = [
  connectionActions.getDependency(RequestVerbEnum.GET_LIST),
]
const addDependencies = [
  connectionActions.getDependency(RequestVerbEnum.POST),
]

export default {
  listDependencies,
  addDependencies,
}
