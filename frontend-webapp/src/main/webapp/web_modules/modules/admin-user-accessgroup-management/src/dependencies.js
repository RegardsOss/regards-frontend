/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import AccessGroupActions from './model/AccessGroupActions'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const listDependencies = [
  AccessGroupActions.getDependency(RequestVerbEnum.GET_LIST),
]
const addDependencies = [
  AccessGroupActions.getDependency(RequestVerbEnum.POST),
]

export default {
  listDependencies,
  addDependencies,
}
