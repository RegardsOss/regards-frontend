/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import ModelActions from './model/ModelActions'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const EditDependencies = [
  ModelActions.getDependency(RequestVerbEnum.PUT),
  ModelActions.getDependency(RequestVerbEnum.POST),
  ModelActions.getDependency(RequestVerbEnum.DELETE),
]
const AddDependencies = [
  ModelActions.getDependency(RequestVerbEnum.POST),
]

export {
  EditDependencies,
  AddDependencies,
}

export default [
  ModelActions.getDependency(RequestVerbEnum.GET_LIST),
  ModelActions.getDependency(RequestVerbEnum.GET),
  ModelActions.getDependency(RequestVerbEnum.PUT),
  ModelActions.getDependency(RequestVerbEnum.POST),
  ModelActions.getDependency(RequestVerbEnum.DELETE),
]
