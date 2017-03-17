/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import RoleActions from './model/RoleActions'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const EditDependencies = [
  RoleActions.getDependency(RequestVerbEnum.PUT),
  RoleActions.getDependency(RequestVerbEnum.POST),
  RoleActions.getDependency(RequestVerbEnum.DELETE),
]
const AddDependencies = [
  RoleActions.getDependency(RequestVerbEnum.POST),
]

export {
  EditDependencies,
  AddDependencies,
}

export default [
  RoleActions.getDependency(RequestVerbEnum.GET_LIST),
  RoleActions.getDependency(RequestVerbEnum.GET),
  RoleActions.getDependency(RequestVerbEnum.PUT),
  RoleActions.getDependency(RequestVerbEnum.POST),
  RoleActions.getDependency(RequestVerbEnum.DELETE),
]
