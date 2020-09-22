/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
**/
import ThemeListClientDump from '@regardsoss/client/tests/rs-access-project/ThemeList.dump'
import UIPluginConfigurationClientDump from '@regardsoss/client/tests/rs-access-project/UIPluginConfiguration.dump'
import UIPluginDefinitionClientDump from '@regardsoss/client/tests/rs-access-project/UIPluginDefinition.dump'
import LinkUIPluginDatasetDump from '@regardsoss/client/tests/rs-access-project/LinkUIPluginDataset.dump'
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
import SearchEngineConfigurationDump from '@regardsoss/client/tests/rs-catalog/SearchEngineConfiguration.dump'
import DatasetDump from '@regardsoss/client/tests/rs-dam/Dataset.dump'
import PluginConfigurationDump from '@regardsoss/client/tests/rs-common/PluginConfiguration.dump'
import CollectionDump from '@regardsoss/client/tests/rs-dam/Collection.dump'
import ModelAttributesComputationTypesDump from '@regardsoss/client/tests/rs-dam/ModelAttributesComputationTypes.dump'

import ProjectDump from '@regardsoss/client/tests/rs-admin/Project.dump'
import AccountDump from '@regardsoss/client/tests/rs-admin/Account.dump'
import RoleDump from '@regardsoss/client/tests/rs-admin/Role.dump'
import ProjectUserDump from '@regardsoss/client/tests/rs-admin/ProjectUser.dump'
import WaitingAccessUsersEntitiesDump from '@regardsoss/client/tests/rs-admin/WaitingAccessUsersEntities.dump'
import AccessGroupDump from '@regardsoss/client/tests/rs-dam/AccessGroup.dump'
import UserGroupDump from '@regardsoss/client/tests/rs-dam/UserGroup.dump'
import DatasetWithAccessRightDump from '@regardsoss/client/tests/rs-dam/DatasetWithAccessRight.dump'

import DocumentDump from '@regardsoss/client/tests/rs-dam/Document.dump'

import DatasetEntityDump from '@regardsoss/client/tests/rs-access-project/DatasetEntity.dump'
import DataobjectEntityDump from '@regardsoss/client/tests/rs-access-project/DataobjectEntity.dump'
import CollectionEntityDump from '@regardsoss/client/tests/rs-access-project/CollectionEntity.dump'

import ProductDump from '@regardsoss/client/tests/rs-dataprovider/Product.dump'
import AcquisitionFileDump from '@regardsoss/client/tests/rs-dataprovider/AcquisitionFile.dump'
import AcquisitionProcessingChainDump from '@regardsoss/client/tests/rs-dataprovider/AcquisitionProcessingChain.dump'
import AcquisitionProcessingChainMonitorDump from '@regardsoss/client/tests/rs-dataprovider/AcquisitionProcessingChainMonitor.dump'

import StorageLocationDump from '@regardsoss/client/tests/rs-storage/StorageLocation.dump'

import ProcessingDump from '@regardsoss/client/tests/rs-processing/Processing.dump'
import ProcessingMonitoringDump from '@regardsoss/client/tests/rs-processing/ProcessingMonitoring.dump'

import {

  ROLE_ARRAY,
  RoleConfiguration,

  ACCOUNT_ARRAY,
  AccountConfiguration,

  PROJECT_ARRAY,
  ProjectConfiguration,

  PROJECT_USER_ARRAY,
  ProjectUserConfiguration,

  ACCESS_GROUP_ARRAY,
  AccessGroupConfiguration,

  DATASET_WITH_ACCESS_RIGHT_ARRAY,
  DatasetWithAccessRightConfiguration,

  // UIPluginConfiguration
  UI_PLUGIN_CONFIGURATION_ARRAY,
  UIPluginConfConfiguration,

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

  MODEL_ATTRIBUTE_COMPUTATION_TYPES_ARRAY,
  ModelAttributeComputationTypesConfiguration,

  DATASET_ARRAY,
  DatasetConfiguration,

  LINK_PLUGIN_DATASET_ARRAY,
  LinkPluginDatasetConfiguration,

  SEARCH_ENGINE_ARRAY,
  SearchEngineConfiguration,

  PLUGIN_CONFIGURATION_ARRAY,
  AdminPluginConfigurationSchemaConfiguration,

  COLLECTION_ARRAY,
  CollectionConfiguration,

  DOCUMENT_ARRAY,
  DocumentConfiguration,

  LINK_UI_PLUGIN_DATASET_ARRAY,
  LinkUIPluginDatasetConfiguration,

  ENTITY_ARRAY as ENTITY_CATALOG_ARRAY,
  EntityConfiguration,

  PRODUCT_ARRAY,
  ProductConfiguration,

  AcquisitionProcessingChainConfiguration,
  ACQUISITION_PROCESSING_CHAIN_ARRAY,

  AcquisitionProcessingChainMonitorConfiguration,
  ACQUISITION_PROCESSING_CHAIN_MONITOR_ARRAY,

  AcquisitionFileConfiguration,
  ACQUISITION_FILE_ARRAY,

  STORAGE_LOCATION_ARRAY,
  StorageLocationConfiguration,

  THEME_ARRAY,
  ThemeConfiguration,

  // Processing
  PROCESSING_ARRAY,
  ProcessingConfiguration,
  PROCESSING_MONITORING_ARRAY,
  ProcessingMonitoringConfiguration,

} from '@regardsoss/api'

/**
 * Store for
 * each microservice
 *   > each type of entity
 *      a client dump and everything required to normalize that dump
 * @author Léo Mieulet
 */
export default {
  ProcessingMonitoringClient: {
    ProcessingMonitoring: {
      isPageable: true,
      dump: ProcessingMonitoringDump,
      ENTITY_ARRAY: PROCESSING_MONITORING_ARRAY,
      normalizrKey: ProcessingMonitoringConfiguration.normalizrKey,
    },
  },
  ProcessingClient: {
    Processing: {
      isPageable: false,
      dump: ProcessingDump,
      ENTITY_ARRAY: PROCESSING_ARRAY,
      normalizrKey: ProcessingConfiguration.normalizrKey,
    },
  },
  StorageClient: {
    StorageLocation: {
      isPageable: false,
      dump: StorageLocationDump,
      ENTITY_ARRAY: STORAGE_LOCATION_ARRAY,
      normalizrKey: StorageLocationConfiguration.normalizrKey,
    },
  },
  AccessProjectClient: {
    Themes: {
      isPageable: true,
      dump: ThemeListClientDump,
      ENTITY_ARRAY: THEME_ARRAY,
      normalizrKey: ThemeConfiguration.normalizrKey,
    },
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
    LinkUIPluginDataset: {
      isPageable: false,
      dump: LinkUIPluginDatasetDump,
      ENTITY_ARRAY: LINK_PLUGIN_DATASET_ARRAY,
      normalizrKey: LinkPluginDatasetConfiguration.normalizrKey,
    },
    DataobjectEntity: {
      isPageable: true,
      dump: DataobjectEntityDump,
      ENTITY_ARRAY: ENTITY_CATALOG_ARRAY,
      normalizrKey: EntityConfiguration.normalizrKey,
    },
    DatasetEntity: {
      isPageable: true,
      dump: DatasetEntityDump,
      ENTITY_ARRAY: ENTITY_CATALOG_ARRAY,
      normalizrKey: EntityConfiguration.normalizrKey,
    },
    CollectionEntity: {
      isPageable: true,
      dump: CollectionEntityDump,
      ENTITY_ARRAY: ENTITY_CATALOG_ARRAY,
      normalizrKey: EntityConfiguration.normalizrKey,
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
    Account: {
      isPageable: true,
      dump: AccountDump,
      ENTITY_ARRAY: ACCOUNT_ARRAY,
      normalizrKey: AccountConfiguration.normalizrKey,
    },
    Project: {
      isPageable: true,
      dump: ProjectDump,
      ENTITY_ARRAY: PROJECT_ARRAY,
      normalizrKey: ProjectConfiguration.normalizrKey,
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
    DatasetWithAccessRight: {
      isPageable: true,
      dump: DatasetWithAccessRightDump,
      ENTITY_ARRAY: DATASET_WITH_ACCESS_RIGHT_ARRAY,
      normalizrKey: DatasetWithAccessRightConfiguration.normalizrKey,
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
      isPageable: true,
      dump: CollectionDump,
      ENTITY_ARRAY: COLLECTION_ARRAY,
      normalizrKey: CollectionConfiguration.normalizrKey,
    },
    Document: {
      isPageable: true,
      dump: DocumentDump,
      ENTITY_ARRAY: DOCUMENT_ARRAY,
      normalizrKey: DocumentConfiguration.normalizrKey,
    },
    ModelAttributesComputationTypes: {
      isPageable: false,
      dump: ModelAttributesComputationTypesDump,
      ENTITY_ARRAY: MODEL_ATTRIBUTE_COMPUTATION_TYPES_ARRAY,
      normalizrKey: ModelAttributeComputationTypesConfiguration.normalizrKey,
    },
  },
  CatalogClient: {
    LinkPluginDataset: {
      isPageable: false,
      dump: LinkPluginDatasetDump,
      ENTITY_ARRAY: LINK_UI_PLUGIN_DATASET_ARRAY,
      normalizrKey: LinkUIPluginDatasetConfiguration.normalizrKey,
    },
    SearchEngineConfiguration: {
      isPageable: true,
      dump: SearchEngineConfigurationDump,
      ENTITY_ARRAY: SEARCH_ENGINE_ARRAY,
      normalizrKey: SearchEngineConfiguration.normalizrKey,
    },
  },
  DataProviderClient: {
    Product: {
      isPageable: true,
      dump: ProductDump,
      ENTITY_ARRAY: PRODUCT_ARRAY,
      normalizrKey: ProductConfiguration.normalizrKey,
    },
    AcquisitionFile: {
      isPageable: true,
      dump: AcquisitionFileDump,
      ENTITY_ARRAY: ACQUISITION_FILE_ARRAY,
      normalizrKey: AcquisitionFileConfiguration.normalizrKey,
    },
    AcquisitionProcessingChain: {
      isPageable: true,
      dump: AcquisitionProcessingChainDump,
      ENTITY_ARRAY: ACQUISITION_PROCESSING_CHAIN_ARRAY,
      normalizrKey: AcquisitionProcessingChainConfiguration.normalizrKey,
    },
    AcquisitionProcessingChainMonitor: {
      isPageable: true,
      dump: AcquisitionProcessingChainMonitorDump,
      ENTITY_ARRAY: ACQUISITION_PROCESSING_CHAIN_MONITOR_ARRAY,
      normalizrKey: AcquisitionProcessingChainMonitorConfiguration.normalizrKey,
    },
  },
}
