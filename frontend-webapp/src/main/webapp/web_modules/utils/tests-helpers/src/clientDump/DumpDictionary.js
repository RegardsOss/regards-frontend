import UIPluginConfigurationClientDump from '@regardsoss/client/tests/rs-access-project/UIPluginConfiguration.dump'
import UIPluginDefinitionClientDump from '@regardsoss/client/tests/rs-access-project/UIPluginDefinition.dump'
import FragmentClientDump from '@regardsoss/client/tests/rs-dam/Fragment.dump'

import {
  // UIPluginConfiguration
  UI_PLUGIN_CONFIGURATION_ARRAY,
  UIPluginConfConfiguration,

  // UIPluginConfiguration
  PluginConfiguration,
  PLUGIN_ARRAY,

  FragmentConfiguration,
  FRAGMENT_ARRAY,
} from '@regardsoss/api'

/**
 * Store for
 * each microservice
 *   > each type of entity
 *      a client dump and everything required to normalize that dump
 * @author Léo Mieulet
 */
export default {
  AccessProjectClient: {
    UIPluginConfiguration: {
      isPageable: true,
      dump: UIPluginConfigurationClientDump,
      ENTITY_ARRAY: UI_PLUGIN_CONFIGURATION_ARRAY,
      normalizrKey: UIPluginConfConfiguration.normalizrKey,
    },
    UIPluginDefinition: {
      isPageable: true,
      dump: UIPluginDefinitionClientDump,
      ENTITY_ARRAY: PLUGIN_ARRAY,
      normalizrKey: PluginConfiguration.normalizrKey,
    },
  },
  DataManagementClient: {
    Fragment: {
      isPageable: false,
      dump: FragmentClientDump,
      ENTITY_ARRAY: FRAGMENT_ARRAY,
      normalizrKey: FragmentConfiguration.normalizrKey,
    },
  },
}
