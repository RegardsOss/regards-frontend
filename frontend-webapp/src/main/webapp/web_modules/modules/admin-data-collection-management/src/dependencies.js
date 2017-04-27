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
  CollectionActions.getDependency(RequestVerbEnum.GET_LIST),
  CollectionActions.getDependency(RequestVerbEnum.GET),
  CollectionActions.getDependency(RequestVerbEnum.PUT),
  CollectionActions.getDependency(RequestVerbEnum.POST),
  CollectionActions.getDependency(RequestVerbEnum.DELETE),
]

export default {
  user,
  admin,
}
