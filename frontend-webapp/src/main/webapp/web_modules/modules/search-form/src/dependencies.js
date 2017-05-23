/**
 * LICENSE_PLACEHOLDER
 **/
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { datasetActions } from './clients/DatasetClient'
import { modelActions } from './clients/ModelClient'
import { uiPluginDefinitionActions } from './clients/UIPluginDefinitionClient'
import AttributeModelClient from './clients/AttributeModelClient'

/**
 * Dependencies needed to display user page of the module
 * @author Sébastien binda
 */
const user = [
  AttributeModelClient.AttributeModelActions.getDependency(RequestVerbEnum.GET_LIST),
  uiPluginDefinitionActions.getDependency(RequestVerbEnum.GET_LIST),
]
/**
 * Dependencies needed to display admin page of the module
 * @type {[*]}
 */
const admin = [
  AttributeModelClient.AttributeModelActions.getDependency(RequestVerbEnum.GET_LIST),
  uiPluginDefinitionActions.getDependency(RequestVerbEnum.GET_LIST),
  datasetActions.getDependency(RequestVerbEnum.GET_LIST),
  modelActions.getDependency(RequestVerbEnum.GET_LIST),
]

export default {
  user,
  admin,
}
