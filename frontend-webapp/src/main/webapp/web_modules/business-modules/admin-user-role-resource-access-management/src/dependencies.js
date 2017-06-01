/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { roleActions } from './clients/RoleClient'

/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const addDependencies = [
  roleActions.getDependency(RequestVerbEnum.POST),
]

const listDependencies = [
  roleActions.getDependency(RequestVerbEnum.GET_LIST),
]
export default {
  addDependencies,
  listDependencies,
}
