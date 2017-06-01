/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { fragmentActions } from './clients/FragmentClient'

/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const listDependencies = [
  fragmentActions.getDependency(RequestVerbEnum.GET_LIST),
  fragmentActions.getDependency(RequestVerbEnum.GET),
]

/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const addDependencies = [
  fragmentActions.getDependency(RequestVerbEnum.POST),
]


export default {
  listDependencies,
  addDependencies,
}
