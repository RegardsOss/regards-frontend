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
  ModelActions.getDependency(RequestVerbEnum.GET_LIST),
  ModelActions.getDependency(RequestVerbEnum.GET),
  ModelActions.getDependency(RequestVerbEnum.PUT),
  ModelActions.getDependency(RequestVerbEnum.POST),
  ModelActions.getDependency(RequestVerbEnum.DELETE),
]

export default {
  user,
  admin,
}
