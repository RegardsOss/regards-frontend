/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { attributeModelReducer } from './clients/AttributeModelClient'
import { modelReducer } from './clients/ModelClient'
import { modelAttributesReducer } from './clients/ModelAttributesClient'
import { modelAttributesFragmentReducer } from './clients/ModelAttributesFragmentClient'
import { pluginConfigurationReducer } from './clients/PluginConfigurationClient'
import { pluginMetaDataReducer } from './clients/PluginMetaDataClient'

const modelAttributeDataManagementReducer = combineReducers({
  'attribute-model': attributeModelReducer,
  model: modelReducer,
  'model-attribute': modelAttributesReducer,
  'model-attribute-fragment': modelAttributesFragmentReducer,
  'plugin-configuration': pluginConfigurationReducer,
  'plugin-meta-data': pluginMetaDataReducer,
})

export default modelAttributeDataManagementReducer
