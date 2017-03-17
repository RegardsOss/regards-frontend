/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import DatasetActions from './model/DatasetActions'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const EditDependencies = [
  DatasetActions.getDependency(RequestVerbEnum.GET_LIST),
]
const AddDependencies = [
  DatasetActions.getDependency(RequestVerbEnum.POST),
]

export {
  EditDependencies,
  AddDependencies,
}

export default [
  DatasetActions.getDependency(RequestVerbEnum.GET_LIST),
  DatasetActions.getDependency(RequestVerbEnum.GET),
  DatasetActions.getDependency(RequestVerbEnum.PUT),
  DatasetActions.getDependency(RequestVerbEnum.POST),
  DatasetActions.getDependency(RequestVerbEnum.DELETE),
]
