/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { projectUserActions } from './clients/ProjectUserClient'
import { roleActions } from './clients/RoleClient'
import { accessGroupActions } from './clients/AccessGroupClient'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const listDependencies = [
  projectUserActions.getDependency(RequestVerbEnum.GET_LIST),
]
const addDependencies = [
  projectUserActions.getDependency(RequestVerbEnum.POST),
  roleActions.getDependency(RequestVerbEnum.GET),
  accessGroupActions.getDependency(RequestVerbEnum.GET),
]

console.error('SEB', addDependencies)

export default {
  listDependencies,
  addDependencies,
}

