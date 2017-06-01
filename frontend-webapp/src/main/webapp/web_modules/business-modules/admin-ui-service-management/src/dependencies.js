/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { uiPluginDefinitionActions } from './clients/UIPluginDefinitionClient'
import { uiPluginConfigurationActions } from './clients/UIPluginConfigurationClient'

/**
 * Mandatory Dependencies to display module in parent board
 * @type {Array}
 */
const boardListRequiredDependencies = [
  uiPluginDefinitionActions.getDependency(RequestVerbEnum.GET_LIST),
  uiPluginDefinitionActions.getDependency(RequestVerbEnum.GET),
  uiPluginConfigurationActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  boardListRequiredDependencies,
}
