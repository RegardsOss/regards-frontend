/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { attributeModelActions } from './clients/AttributeModelClient'


/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const listDependencies = [
  attributeModelActions.getDependency(RequestVerbEnum.GET_LIST),
  attributeModelActions.getDependency(RequestVerbEnum.GET),
]

/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const addDependencies = [
  attributeModelActions.getDependency(RequestVerbEnum.POST),
]
export default {
  listDependencies,
  addDependencies,
}
