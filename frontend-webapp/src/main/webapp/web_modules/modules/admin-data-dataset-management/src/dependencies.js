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
  DatasetActions.getDependency(RequestVerbEnum.GET_LIST),
  DatasetActions.getDependency(RequestVerbEnum.GET),
  DatasetActions.getDependency(RequestVerbEnum.PUT),
  DatasetActions.getDependency(RequestVerbEnum.POST),
  DatasetActions.getDependency(RequestVerbEnum.DELETE),
]

export default {
  user,
  admin,
}
