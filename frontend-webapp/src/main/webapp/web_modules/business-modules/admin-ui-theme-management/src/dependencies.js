/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { ThemeActions } from '@regardsoss/theme'

/**
 * Module dependencies descriptions
 * @author Sébastien Binda
 */

/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const boardRequiredDependencies = [
  ThemeActions.getDependency(RequestVerbEnum.GET),
  ThemeActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  boardRequiredDependencies,
}
