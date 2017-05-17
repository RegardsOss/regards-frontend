/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { attributeModelReducer } from './client/AttributeModelClient'
import { modelReducer } from './client/ModelClient'
import { modelAttributesReducer } from './client/ModelAttributesClient'
import { modelAttributesFragmentReducer } from './client/ModelAttributesFragmentClient'
import { pluginConfigurationReducer } from './client/PluginConfigurationClient'
import { pluginMetaDataReducer } from './client/PluginMetaDataClient'

const modelAttributeDataManagementReducer = combineReducers({
  'attribute-model': attributeModelReducer,
  model: modelReducer,
  'model-attribute': modelAttributesReducer,
  'model-attribute-fragment': modelAttributesFragmentReducer,
  'plugin-configuration': pluginConfigurationReducer,
  'plugin-meta-data': pluginMetaDataReducer,
})

export default modelAttributeDataManagementReducer
