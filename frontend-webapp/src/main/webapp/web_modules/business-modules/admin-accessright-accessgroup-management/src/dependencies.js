/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { accessGroupActions } from './clients/AccessGroupClient'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const listDependencies = [
  accessGroupActions.getDependency(RequestVerbEnum.GET_LIST),
]
const addDependencies = [
  accessGroupActions.getDependency(RequestVerbEnum.POST),
]

export default {
  listDependencies,
  addDependencies,
}
