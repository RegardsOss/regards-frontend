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
  FragmentActions.getDependency(RequestVerbEnum.GET_LIST),
  FragmentActions.getDependency(RequestVerbEnum.GET),
  FragmentActions.getDependency(RequestVerbEnum.PUT),
  FragmentActions.getDependency(RequestVerbEnum.POST),
  FragmentActions.getDependency(RequestVerbEnum.DELETE),
]

export default {
  user,
  admin,
}
