/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import ProjectConnectionActions from './model/ProjectConnectionActions'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const EditDependencies = [
  ProjectConnectionActions.getDependency(RequestVerbEnum.PUT),
  ProjectConnectionActions.getDependency(RequestVerbEnum.POST),
  ProjectConnectionActions.getDependency(RequestVerbEnum.DELETE),
]
const AddDependencies = [
  ProjectConnectionActions.getDependency(RequestVerbEnum.POST),
]

export {
  EditDependencies,
  AddDependencies,
}

/**
 * Mandatory Dependencies to display module in user interface
 * @type {Array}
 */
const user = []

/**
 * Mandatory Dependencies to display module in admin interface
 * @type {Array}
 */
const admin = [
  ProjectConnectionActions.getDependency(RequestVerbEnum.GET_LIST),
  ProjectConnectionActions.getDependency(RequestVerbEnum.GET),
  ProjectConnectionActions.getDependency(RequestVerbEnum.PUT),
  ProjectConnectionActions.getDependency(RequestVerbEnum.POST),
  ProjectConnectionActions.getDependency(RequestVerbEnum.DELETE),
]

export default {
  user,
  admin,
}
