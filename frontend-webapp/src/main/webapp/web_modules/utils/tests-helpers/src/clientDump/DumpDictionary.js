import UIPluginConfigurationClientDump from '@regardsoss/client/tests/rs-access-project/UIPluginConfiguration.dump'
import UIPluginDefinitionClientDump from '@regardsoss/client/tests/rs-access-project/UIPluginDefinition.dump'
import FragmentClientDump from '@regardsoss/client/tests/rs-dam/Fragment.dump'
import AttributeModelDump from '@regardsoss/client/tests/rs-dam/AttributeModel.dump'
import ModelDump from '@regardsoss/client/tests/rs-dam/ModelDump.dump'
import ModelAttributeDump from '@regardsoss/client/tests/rs-dam/ModelAttribute.dump'


import {
  // UIPluginConfiguration
  UI_PLUGIN_CONFIGURATION_ARRAY,
  UIPluginConfConfiguration,

  // UIPluginConfiguration
  PluginConfiguration,
  PLUGIN_ARRAY,

  FragmentConfiguration,
  FRAGMENT_ARRAY,

  AttributeModelConfiguration,
  ATTRIBUTE_MODEL_ARRAY,

  MODEL_ARRAY,
  ModelConfiguration,

  MODEL_ATTRIBUTE_ARRAY,
  ModelAttributeConfiguration,
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
    AttributeModel: {
      isPageable: false,
      dump: AttributeModelDump,
      ENTITY_ARRAY: ATTRIBUTE_MODEL_ARRAY,
      normalizrKey: AttributeModelConfiguration.normalizrKey,
    },
    Model: {
      isPageable: false,
      dump: ModelDump,
      ENTITY_ARRAY: MODEL_ARRAY,
      normalizrKey: ModelConfiguration.normalizrKey,
    },
    ModelAttribute: {
      isPageable: false,
      dump: ModelAttributeDump,
      ENTITY_ARRAY: MODEL_ATTRIBUTE_ARRAY,
      normalizrKey: ModelAttributeConfiguration.normalizrKey,
    },
  },
}
