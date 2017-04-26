/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { fragmentActions } from './client/FragmentClient'

/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const boardListRequiredDependencies = [
  fragmentActions.getDependency(RequestVerbEnum.GET_LIST),
  fragmentActions.getDependency(RequestVerbEnum.GET),
]

/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const boardAddRequiredDependencies = [
  fragmentActions.getDependency(RequestVerbEnum.POST),
]


export default {
  boardListRequiredDependencies,
  boardAddRequiredDependencies,
}
