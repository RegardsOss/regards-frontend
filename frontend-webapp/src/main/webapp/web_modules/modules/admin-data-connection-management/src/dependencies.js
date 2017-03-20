/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import ConnectionActions from './model/ConnectionActions'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const EditDependencies = [
  ConnectionActions.getDependency(RequestVerbEnum.PUT),
  ConnectionActions.getDependency(RequestVerbEnum.POST),
  ConnectionActions.getDependency(RequestVerbEnum.DELETE),
]
const AddDependencies = [
  ConnectionActions.getDependency(RequestVerbEnum.POST),
]

export {
  EditDependencies,
  AddDependencies,
}

export default [
  ConnectionActions.getDependency(RequestVerbEnum.GET_LIST),
  ConnectionActions.getDependency(RequestVerbEnum.GET),
  ConnectionActions.getDependency(RequestVerbEnum.PUT),
  ConnectionActions.getDependency(RequestVerbEnum.POST),
  ConnectionActions.getDependency(RequestVerbEnum.DELETE),
]
