import { RequestVerbEnum } from '@regardsoss/store-utils'
import { uiPluginDefinitionActions } from './clients/UIPluginDefinitionClient'

/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const boardAddRequiredDependencies = [
  uiPluginDefinitionActions.getDependency(RequestVerbEnum.POST),
]
/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const boardListRequiredDependencies = [
  uiPluginDefinitionActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  boardAddRequiredDependencies,
  boardListRequiredDependencies,
}
