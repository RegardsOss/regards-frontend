import { RequestVerbEnum } from '@regardsoss/store-utils'
import PluginsActions from './model/PluginsActions'

/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const boardAddRequiredDependencies = [
  PluginsActions.getDependency(RequestVerbEnum.GET),
  PluginsActions.getDependency(RequestVerbEnum.POST),
]
/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const boardListRequiredDependencies = [
  PluginsActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  boardAddRequiredDependencies,
  boardListRequiredDependencies,
}
