/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { attributeModelActions } from './clients/AttributeModelClient'


/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const EditDependencies = [
  attributeModelActions.getDependency(RequestVerbEnum.PUT),
  attributeModelActions.getDependency(RequestVerbEnum.POST),
  attributeModelActions.getDependency(RequestVerbEnum.DELETE),
]
const AddDependencies = [
  attributeModelActions.getDependency(RequestVerbEnum.POST),
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
  attributeModelActions.getDependency(RequestVerbEnum.GET_LIST),
  attributeModelActions.getDependency(RequestVerbEnum.GET),
  attributeModelActions.getDependency(RequestVerbEnum.PUT),
  attributeModelActions.getDependency(RequestVerbEnum.POST),
  attributeModelActions.getDependency(RequestVerbEnum.DELETE),
]

export default {
  user,
  admin,
}
