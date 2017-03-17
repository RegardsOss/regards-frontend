/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import FragmentActions from './model/FragmentActions'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const EditDependencies = [
  FragmentActions.getDependency(RequestVerbEnum.GET_LIST),
]
const AddDependencies = [
  FragmentActions.getDependency(RequestVerbEnum.POST),
]

export {
  EditDependencies,
  AddDependencies,
}

export default [
  FragmentActions.getDependency(RequestVerbEnum.GET_LIST),
  FragmentActions.getDependency(RequestVerbEnum.GET),
  FragmentActions.getDependency(RequestVerbEnum.PUT),
  FragmentActions.getDependency(RequestVerbEnum.POST),
  FragmentActions.getDependency(RequestVerbEnum.DELETE),
]
