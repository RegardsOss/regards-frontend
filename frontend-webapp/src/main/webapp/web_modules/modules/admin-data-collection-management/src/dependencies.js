/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import CollectionActions from './model/CollectionActions'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const EditDependencies = [
  CollectionActions.getDependency(RequestVerbEnum.GET_LIST),
]
const AddDependencies = [
  CollectionActions.getDependency(RequestVerbEnum.POST),
]

export {
  EditDependencies,
  AddDependencies,
}

export default [
  CollectionActions.getDependency(RequestVerbEnum.GET_LIST),
  CollectionActions.getDependency(RequestVerbEnum.GET),
  CollectionActions.getDependency(RequestVerbEnum.PUT),
  CollectionActions.getDependency(RequestVerbEnum.POST),
  CollectionActions.getDependency(RequestVerbEnum.DELETE),
]
