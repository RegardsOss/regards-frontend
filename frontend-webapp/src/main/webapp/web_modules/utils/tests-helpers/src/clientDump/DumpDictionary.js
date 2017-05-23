import UIPluginConfigurationClientDump from '@regardsoss/client/tests/rs-access-project/UIPluginConfiguration.dump'
import UIPluginDefinitionClientDump from '@regardsoss/client/tests/rs-access-project/UIPluginDefinition.dump'
import FragmentClientDump from '@regardsoss/client/tests/rs-dam/Fragment.dump'
import AttributeModelDump from '@regardsoss/client/tests/rs-dam/AttributeModel.dump'
import ModelDump from '@regardsoss/client/tests/rs-dam/Model.dump'
import ModelAttributeDump from '@regardsoss/client/tests/rs-dam/ModelAttribute.dump'
import ConnectionDump from '@regardsoss/client/tests/rs-dam/Connection.dump'
import PluginMetaDataDump from '@regardsoss/client/tests/rs-common/PluginMetaData.dump'
import ConnectionTableDump from '@regardsoss/client/tests/rs-dam/ConnectionTable.dump'
import ConnectionTableAttributeDump from '@regardsoss/client/tests/rs-dam/ConnectionTableAttribute.dump'
import DatasourceDump from '@regardsoss/client/tests/rs-dam/Datasource.dump'
import LinkPluginDatasetDump from '@regardsoss/client/tests/rs-catalog/LinkPluginDataset.dump'
import DatasetDump from '@regardsoss/client/tests/rs-dam/Dataset.dump'
import PluginConfigurationDump from '@regardsoss/client/tests/rs-common/PluginConfiguration.dump'
import CollectionDump from '@regardsoss/client/tests/rs-dam/Collection.dump'

import RoleDump from '@regardsoss/client/tests/rs-admin/Role.dump'
import ProjectUserDump from '@regardsoss/client/tests/rs-admin/ProjectUser.dump'
import WaitingAccessUsersEntitiesDump from '@regardsoss/client/tests/rs-admin/WaitingAccessUsersEntities.dump'
import AccessGroupDump from '@regardsoss/client/tests/rs-dam/AccessGroup.dump'
import UserGroupDump from '@regardsoss/client/tests/rs-dam/UserGroup.dump'
import AccessRightDump from '@regardsoss/client/tests/rs-dam/AccessRight.dump'

import {

  ROLE_ARRAY,
  RoleConfiguration,

  PROJECT_USER_ARRAY,
  ProjectUserConfiguration,

  ACCESS_GROUP_ARRAY,
  AccessGroupConfiguration,

  ACCESS_RIGHT_ARRAY,
  AccessRightConfiguration,

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

  CONNECTION_ARRAY,
  ConnectionConfiguration,

  PLUGIN_META_DATA_ARRAY,
  PluginMetaDataConfiguration,

  DATASOURCE_ARRAY,
  DatasourceConfiguration,

  DATASET_ARRAY,
  DatasetConfiguration,

  LINK_PLUGIN_DATASET_ARRAY,
  LinkPluginDatasetConfiguration,

  PLUGIN_CONFIGURATION_ARRAY,
  AdminPluginConfigurationSchemaConfiguration,

  COLLECTION_ARRAY,
  CollectionConfiguration,
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
  AdminClient: {
    Role: {
      isPageable: false,
      dump: RoleDump,
      ENTITY_ARRAY: ROLE_ARRAY,
      normalizrKey: RoleConfiguration.normalizrKey,
    },
    ProjectUser: {
      isPageable: true,
      dump: ProjectUserDump,
      ENTITY_ARRAY: PROJECT_USER_ARRAY,
      normalizrKey: ProjectUserConfiguration.normalizrKey,
    },
    WaitingAccessUsersEntities: {
      isPageable: true,
      dump: WaitingAccessUsersEntitiesDump,
      ENTITY_ARRAY: PROJECT_USER_ARRAY,
      normalizrKey: ProjectUserConfiguration.normalizrKey,
    },
  },
  CommonClient: {
    PluginMetaData: {
      isPageable: false,
      dump: PluginMetaDataDump,
      ENTITY_ARRAY: PLUGIN_META_DATA_ARRAY,
      normalizrKey: PluginMetaDataConfiguration.normalizrKey,
    },
    PluginConfiguration: {
      isPageable: false,
      dump: PluginConfigurationDump,
      ENTITY_ARRAY: PLUGIN_CONFIGURATION_ARRAY,
      normalizrKey: AdminPluginConfigurationSchemaConfiguration.normalizrKey,
    },
  },
  DataManagementClient: {
    AccessGroup: {
      isPageable: true,
      dump: AccessGroupDump,
      ENTITY_ARRAY: ACCESS_GROUP_ARRAY,
      normalizrKey: AccessGroupConfiguration.normalizrKey,
    },
    AccessRight: {
      isPageable: true,
      dump: AccessRightDump,
      ENTITY_ARRAY: ACCESS_RIGHT_ARRAY,
      normalizrKey: AccessRightConfiguration.normalizrKey,
    },
    UserGroup: {
      isPageable: false,
      dump: UserGroupDump,
      ENTITY_ARRAY: ACCESS_GROUP_ARRAY,
      normalizrKey: AccessGroupConfiguration.normalizrKey,
    },
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
    Connection: {
      isPageable: false,
      dump: ConnectionDump,
      ENTITY_ARRAY: CONNECTION_ARRAY,
      normalizrKey: ConnectionConfiguration.normalizrKey,
    },
    ConnectionTable: {
      isSignal: true,
      dump: ConnectionTableDump,
    },
    ConnectionTableAttribute: {
      isSignal: true,
      dump: ConnectionTableAttributeDump,
    },
    Datasource: {
      isPageable: false,
      dump: DatasourceDump,
      ENTITY_ARRAY: DATASOURCE_ARRAY,
      normalizrKey: DatasourceConfiguration.normalizrKey,
    },
    LinkPluginDataset: {
      isPageable: true,
      dump: LinkPluginDatasetDump,
      ENTITY_ARRAY: LINK_PLUGIN_DATASET_ARRAY,
      normalizrKey: LinkPluginDatasetConfiguration.normalizrKey,
    },
    Dataset: {
      isPageable: true,
      dump: DatasetDump,
      ENTITY_ARRAY: DATASET_ARRAY,
      normalizrKey: DatasetConfiguration.normalizrKey,
    },
    Collection: {
      isPageable: false,
      dump: CollectionDump,
      ENTITY_ARRAY: COLLECTION_ARRAY,
      normalizrKey: CollectionConfiguration.normalizrKey,
    },
  },
}
