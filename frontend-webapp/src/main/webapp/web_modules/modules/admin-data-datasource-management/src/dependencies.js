/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import DatasourceActions from './model/DatasourceActions'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const EditDependencies = [
  DatasourceActions.getDependency(RequestVerbEnum.GET_LIST),
]
const AddDependencies = [
  DatasourceActions.getDependency(RequestVerbEnum.POST),
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
  DatasourceActions.getDependency(RequestVerbEnum.GET_LIST),
  DatasourceActions.getDependency(RequestVerbEnum.GET),
  DatasourceActions.getDependency(RequestVerbEnum.PUT),
  DatasourceActions.getDependency(RequestVerbEnum.POST),
  DatasourceActions.getDependency(RequestVerbEnum.DELETE),
]

export default {
  user,
  admin,
}
