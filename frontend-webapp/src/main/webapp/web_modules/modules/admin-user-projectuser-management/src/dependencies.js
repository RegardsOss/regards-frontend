/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import ProjectUserActions from './model/ProjectUserActions'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const EditDependencies = [
  ProjectUserActions.getDependency(RequestVerbEnum.PUT),
  ProjectUserActions.getDependency(RequestVerbEnum.POST),
  ProjectUserActions.getDependency(RequestVerbEnum.DELETE),
]
const AddDependencies = [
  ProjectUserActions.getDependency(RequestVerbEnum.POST),
]

export {
  EditDependencies,
  AddDependencies,
}

export default [
  ProjectUserActions.getDependency(RequestVerbEnum.GET_LIST),
  ProjectUserActions.getDependency(RequestVerbEnum.GET),
  ProjectUserActions.getDependency(RequestVerbEnum.PUT),
  ProjectUserActions.getDependency(RequestVerbEnum.POST),
  ProjectUserActions.getDependency(RequestVerbEnum.DELETE),
]
