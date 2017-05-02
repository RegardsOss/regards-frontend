/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import ProjectUserActions from './model/ProjectUserActions'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const listDependencies = [
  ProjectUserActions.getDependency(RequestVerbEnum.GET_LIST),
]
const addDependencies = [
  ProjectUserActions.getDependency(RequestVerbEnum.POST),
]

export default {
  listDependencies,
  addDependencies,
}

