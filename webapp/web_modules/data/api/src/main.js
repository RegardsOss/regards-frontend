/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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


// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Schemas for API responses.

export { AccountConfiguration, ACCOUNT, ACCOUNT_ARRAY } from './schemas/Account'
export { ProjectConfiguration, PROJECT, PROJECT_ARRAY } from './schemas/Project'
export { ProjectConnectionConfiguration, PROJECT_CONNECTION, PROJECT_CONNECTION_ARRAY } from './schemas/ProjectConnection'
export { PROJECT_USER_ARRAY, PROJECT_USER, ProjectUserConfiguration } from './schemas/ProjectUser'
export { RoleConfiguration, ROLE, ROLE_ARRAY } from './schemas/Role'
export { NOTIFICATION, NOTIFICATION_ARRAY, NotificationConfiguration } from './schemas/Notification'
export { ModelConfiguration, MODEL, MODEL_ARRAY } from './schemas/Model'
export { ACCESSES_ARRAY, ACCESSES, AccessesConfiguration } from './schemas/Accesses'
export { ATTRIBUTE_MODEL_ARRAY, ATTRIBUTE_MODEL, AttributeModelConfiguration } from './dam/AttributeModel'
export { ATTRIBUTE_MODEL_RESTRICTION_ARRAY, ATTRIBUTE_MODEL_RESTRICTION, AttributeModelRestrictionConfiguration } from './dam/AttributeModelRestriction'
// Access
export { MODULE, MODULE_ARRAY, ModuleConfiguration } from './access/Module'
export { LAYOUT, LAYOUT_ARRAY, LayoutConfiguration } from './access/Layout'
export { LINK_UI_PLUGIN_DATASET, LINK_UI_PLUGIN_DATASET_ARRAY, LinkUIPluginDatasetConfiguration } from './access/LinkUIPluginDataset'
export { THEME, THEME_ARRAY, ThemeConfiguration } from './access/Theme'
export { PLUGIN_ARRAY, PLUGIN, PluginConfiguration } from './access/Plugin'
export { UI_PLUGIN_CONFIGURATION, UI_PLUGIN_CONFIGURATION_ARRAY, UIPluginConfConfiguration } from './access/UIPluginConf'
export { SESSIONS, SESSIONS_ARRAY, SessionsConfiguration } from './access/Sessions'
// DAM
export { FragmentConfiguration, FRAGMENT, FRAGMENT_ARRAY } from './dam/Fragment'
export { DatasetConfiguration, DATASET, DATASET_ARRAY } from './dam/Dataset'
export { DATASET_WITH_ACCESS_RIGHT, DATASET_WITH_ACCESS_RIGHT_ARRAY, DatasetWithAccessRightConfiguration } from './dam/DatasetWithAccessRight'
export { AccessRightConfiguration, ACCESS_RIGHT, ACCESS_RIGHT_ARRAY } from './dam/AccessRight'
export { ACCESS_GROUP, ACCESS_GROUP_ARRAY, AccessGroupConfiguration } from './dam/AccessGroup'
export { CrawlerDatasourceConfiguration, CRAWLER_DATASOURCE, CRAWLER_DATASOURCE_ARRAY } from './dam/CrawlerDatasource'
export { DATASOURCE, DatasourceConfiguration, DATASOURCE_ARRAY } from './dam/Datasource'
export { DocumentConfiguration, DOCUMENT, DOCUMENT_ARRAY } from './dam/Document'
export { ModelAttributeConfiguration, MODEL_ATTRIBUTE, MODEL_ATTRIBUTE_ARRAY } from './dam/ModelAttribute'
export { CollectionConfiguration, COLLECTION, COLLECTION_ARRAY } from './dam/Collection'
export { CONNECTION, CONNECTION_ARRAY, ConnectionConfiguration } from './dam/Connection'
export { ModelAttributeComputationTypesConfiguration, MODEL_ATTRIBUTE_COMPUTATION_TYPES_ARRAY, MODEL_ATTRIBUTE_COMPUTATION_TYPES } from './dam/ModelAttributeComputationTypes'
// Common
export { PluginMetaDataConfiguration, PLUGIN_META_DATA, PLUGIN_META_DATA_ARRAY } from './common/PluginMetaData'
export { AdminPluginConfigurationSchemaConfiguration, PLUGIN_CONFIGURATION, PLUGIN_CONFIGURATION_ARRAY } from './common/PluginConfiguration'
export { PLUGIN_PARAMETER_ARRAY, PLUGIN_PARAMETER, PluginParameterConfiguration } from './common/PluginParameter'
// Storage
export { PRIORIZED_DATASTORAGE, PRIORIZED_DATASTORAGE_ARRAY, PrioritizedDataStorageConfiguration } from './storage/PrioritizedDataStorage'
export { StorageMonitoringConfiguration, STORAGE_MONITORING, STORAGE_MONITORING_ARRAY } from './storage/StorageMonitoring'
export { AIP_STATUS, AIP_STATUS_ARRAY, AIPStatusConfiguration } from './storage/AIPStatus'
export { AIPSessionConfiguration, AIP_SESSION_ARRAY, AIP_SESSION } from './storage/AIPSession'
export { AIPConfiguration, AIP, AIP_ARRAY } from './storage/AIP'
export { AIPFileConfiguration, AIP_FILE_ARRAY, AIP_FILE } from './storage/AIPFile'
// Admin
export { RESOURCE_ACCESS, RESOURCE_ACCESS_ARRAY, ResourceAccessConfiguration } from './admin/ResourceAccess'
export { ENDPOINT, ENDPOINT_ARRAY, EndpointConfiguration } from './admin/Endpoint'
// Catalog
export { ATTRIBUTE_BOUNDS, ATTRIBUTE_BOUNDS_ARRAY, AttributeBoundsConfiguration } from './catalog/AttributeBounds'
export { ENTITY_ARRAY, ENTITY, EntityConfiguration } from './catalog/Entity'
export { LINK_PLUGIN_DATASET_ARRAY, LINK_PLUGIN_DATASET, LinkPluginDatasetConfiguration } from './catalog/LinkPluginDataset'
export { SearchEngineConfiguration, SEARCH_ENGINE, SEARCH_ENGINE_ARRAY } from './catalog/SearchEngineConfiguration'
// Order
export { ORDER, ORDER_ARRAY, OrderConfiguration } from './order/Order'
export { ORDER_FILE, ORDER_FILE_ARRAY, OrderFileConfiguration } from './order/OrderFile'
// Ingest
export { PROCESSING_CHAIN, PROCESSING_CHAIN_ARRAY, ProcessingChainConfiguration } from './ingest/ProcessingChain'
export { SIP, SIP_ARRAY, SIPConfiguration } from './ingest/SIP'
export { SESSION, SESSION_ARRAY, SessionConfiguration } from './ingest/Session'
// Data Provider
export { ACQUISITION_PROCESSING_CHAIN, ACQUISITION_PROCESSING_CHAIN_ARRAY, AcquisitionProcessingChainConfiguration } from './data-provider/AcquisitionProcessingChain'
export { ACQUISITION_PROCESSING_CHAIN_MONITOR_ARRAY, ACQUISITION_PROCESSING_CHAIN_MONITOR, AcquisitionProcessingChainMonitorConfiguration } from './data-provider/AcquisitionProcessingChainMonitor'
export { PRODUCT_ARRAY, PRODUCT, ProductConfiguration } from './data-provider/Product'
export { ACQUISITION_FILE_ARRAY, ACQUISITION_FILE, AcquisitionFileConfiguration } from './data-provider/AcquisitionFile'
