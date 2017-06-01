/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { projectUserActions } from './clients/ProjectUserClient'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const listDependencies = [
  projectUserActions.getDependency(RequestVerbEnum.GET_LIST),
]
const addDependencies = [
  projectUserActions.getDependency(RequestVerbEnum.POST),
]

export default {
  listDependencies,
  addDependencies,
}

