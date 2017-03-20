/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import AccessGroupActions from './model/AccessGroupActions'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const EditDependencies = [
  AccessGroupActions.getDependency(RequestVerbEnum.PUT),
  AccessGroupActions.getDependency(RequestVerbEnum.POST),
  AccessGroupActions.getDependency(RequestVerbEnum.DELETE),
]
const AddDependencies = [
  AccessGroupActions.getDependency(RequestVerbEnum.POST),
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
  AccessGroupActions.getDependency(RequestVerbEnum.GET_LIST),
  AccessGroupActions.getDependency(RequestVerbEnum.GET),
  AccessGroupActions.getDependency(RequestVerbEnum.PUT),
  AccessGroupActions.getDependency(RequestVerbEnum.POST),
  AccessGroupActions.getDependency(RequestVerbEnum.DELETE),
]

export default {
  user,
  admin,
}
