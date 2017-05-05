import PluginMetaDataActions from './pluginMetaData/PluginMetaDataActions'
import PluginMetaDataReducer from './pluginMetaData/PluginMetaDataReducer'
import PluginMetaDataSelectors from './pluginMetaData/PluginMetaDataSelectors'

import PluginConfigurationActions from './pluginConfiguration/PluginConfigurationActions'
import PluginConfigurationReducer from './pluginConfiguration/PluginConfigurationReducer'
import PluginConfigurationSelectors from './pluginConfiguration/PluginConfigurationSelectors'

import MicroserviceInfosActions from './info/MicroserviceInfosActions'
import MicroserviceInfosReducer from './info/MicroserviceInfosReducer'
import MicroserviceInfosSelectors from './info/MicroserviceInfosSelectors'


export default {
  PluginMetaDataActions,
  PluginMetaDataReducer,
  PluginMetaDataSelectors,


  PluginConfigurationActions,
  PluginConfigurationReducer,
  PluginConfigurationSelectors,

  MicroserviceInfosActions,
  MicroserviceInfosReducer,
  MicroserviceInfosSelectors,
}
