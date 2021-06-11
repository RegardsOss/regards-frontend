/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */

/**
 * Index for all datamanagement microservice clients.
 *
 * @author Sébastien Binda
 */
export { default as AccessRightActions } from './accessRight/AccessRightActions'
export { default as getAccessRightReducer } from './accessRight/AccessRightReducer'
export { default as getAccessRightSelectors } from './accessRight/AccessRightSelectors'

export { default as AccessGroupActions } from './accessGroup/AccessGroupActions'
export { default as getAccessGroupReducer } from './accessGroup/AccessGroupReducer'
export { default as getAccessGroupSelectors } from './accessGroup/AccessGroupSelectors'

export { default as AttributeModelActions } from './attributesModel/AttributeModelActions'
export { default as AttributeModelReducer } from './attributesModel/AttributeModelReducer'
export { default as AttributeModelSelectors } from './attributesModel/AttributeModelSelectors'

export { default as AttributeModelForModelTypeActions } from './attributesModel/AttributeModelForModelTypeActions'
export { default as AttributeModelForModelTypeReducer } from './attributesModel/AttributeModelForModelTypeReducer'
export { default as AttributeModelForModelTypeSelectors } from './attributesModel/AttributeModelForModelTypeSelectors'

export { default as ModelAttributesActions } from './modelAttributes/ModelAttributesActions'
export { default as ModelAttributesReducer } from './modelAttributes/ModelAttributesReducer'
export { default as ModelAttributesSelectors } from './modelAttributes/ModelAttributesSelectors'

export { default as ModelAttributeComputationTypesActions } from './modelAttributeComputationTypes/ModelAttributeComputationTypesActions'
export { default as getModelAttributeComputationTypesReducer } from './modelAttributeComputationTypes/ModelAttributeComputationTypesReducer'
export { default as getModelAttributeComputationTypesSelectors } from './modelAttributeComputationTypes/ModelAttributeComputationTypesSelectors'

export { default as FragmentActions } from './fragment/FragmentActions'
export { default as FragmentReducer } from './fragment/FragmentReducer'
export { default as FragmentSelectors } from './fragment/FragmentSelectors'

export { default as IndexActions } from './index/IndexActions'

export { default as AttributeModelRestrictionSelectors } from './attributesModelRestriction/AttributeModelRestrictionSelectors'
export { default as AttributeModelRestrictionActions } from './attributesModelRestriction/AttributeModelRestrictionActions'
export { default as AttributeModelRestrictionReducer } from './attributesModelRestriction/AttributeModelRestrictionReducer'

export { default as AttributeModelTypeSelectors } from './attributesModelType/AttributeModelTypeSelectors'
export { default as AttributeModelTypeActions } from './attributesModelType/AttributeModelTypeActions'
export { default as AttributeModelTypeReducer } from './attributesModelType/AttributeModelTypeReducer'

export { default as ModelSelectors } from './model/ModelSelectors'
export { default as ModelActions } from './model/ModelActions'
export { default as ModelReducer } from './model/ModelReducer'

export { default as ModelAttributesFragmentActions } from './modelAttributesFragment/ModelAttributesFragmentActions'
export { default as ModelAttributesFragmentReducer } from './modelAttributesFragment/ModelAttributesFragmentReducer'

export { default as CollectionSelectors } from './collection/CollectionSelectors'
export { default as CollectionActions } from './collection/CollectionActions'
export { default as CollectionReducer } from './collection/CollectionReducer'

export { default as ConnectionSelectors } from './connection/ConnectionSelectors'
export { default as ConnectionActions } from './connection/ConnectionActions'
export { default as ConnectionReducer } from './connection/ConnectionReducer'

export { default as CrawlerDatasourceActions } from './crawler/CrawlerDatasourceActions'
export { default as CrawlerDatasourceReducer } from './crawler/CrawlerDatasourceReducer'
export { default as CrawlerDatasourceSelectors } from './crawler/CrawlerDatasourceSelectors'

export { default as ScheduleCrawlerDatasourceActions } from './crawler/ScheduleCrawlerDatasourceActions'
export { default as ScheduleCrawlerDatasourceReducer } from './crawler/ScheduleCrawlerDatasourceReducer'
export { default as ScheduleCrawlerDatasourceSelectors } from './crawler/ScheduleCrawlerDatasourceSelectors'

export { default as DatasourceSelectors } from './datasource/DatasourceSelectors'
export { default as DatasourceActions } from './datasource/DatasourceActions'
export { default as DatasourceReducer } from './datasource/DatasourceReducer'

export { default as DatasetActions } from './dataset/DatasetActions'
export { default as DatasetReducer } from './dataset/DatasetReducer'
export { default as DatasetSelectors } from './dataset/DatasetSelectors'

export { default as DatasetWithAccessRightActions } from './accessRight/DatasetWithAccessRightActions'
export { default as getDatasetWithAccessRightReducer } from './accessRight/DatasetWithAccessRightReducer'
export { default as getDatasetWithAccessRightSelectors } from './accessRight/DatasetWithAccessRightSelectors'

export { default as DocumentActions } from './document/DocumentActions'
export { default as getDocumentReducer } from './document/DocumentReducer'
export { default as getDocumentSelectors } from './document/DocumentSelectors'

export { default as DocumentLinkActions } from './documentLink/DocumentLinkActions'
export { default as getDocumentLinkReducer } from './documentLink/DocumentLinkReducer'

export { default as DatasetDataAttributesActions } from './dataset/DatasetDataAttributesActions'
export { default as DatasetDataAttributesReducer } from './dataset/DatasetDataAttributesReducer'
export { default as DatasetDataAttributesSelectors } from './dataset/DatasetDataAttributesSelectors'

export { default as DatasetAttributesActions } from './dataset/DatasetAttributesActions'
export { default as DatasetAttributesReducer } from './dataset/DatasetAttributesReducer'
export { default as DatasetAttributesSelectors } from './dataset/DatasetAttributesSelectors'
export { default as DatasetByIpIdActions } from './dataset/DatasetByIpIdActions'

export { default as DatasetValidSubsettingTestActions } from './datasetValidSubsettingTest/DatasetValidSubsettingTestActions'
export { default as getDatasetValidSubsettingTestReducer } from './datasetValidSubsettingTest/DatasetValidSubsettingTestReducer'

export { default as DatasetLinkActions } from './datasetLink/DatasetLinkActions'
export { default as DatasetLinkReducer } from './datasetLink/DatasetLinkReducer'

export { default as ConnectionTableSelectors } from './connectionTable/ConnectionTableSelectors'
export { default as ConnectionTableActions } from './connectionTable/ConnectionTableActions'
export { default as ConnectionTableReducer } from './connectionTable/ConnectionTableReducer'

export { default as ConnectionTestActions } from './connectionTest/ConnectionTestActions'
export { default as ConnectionTestReducer } from './connectionTest/ConnectionTestReducer'

export { default as ConnectionTableAttributesSelectors } from './connectionTableAttributes/ConnectionTableAttributesSelectors'
export { default as ConnectionTableAttributesActions } from './connectionTableAttributes/ConnectionTableAttributesActions'
export { default as ConnectionTableAttributesReducer } from './connectionTableAttributes/ConnectionTableAttributesReducer'

export { default as CollectionLinkActions } from './collectionLink/CollectionLinkActions'
export { default as CollectionLinkReducer } from './collectionLink/CollectionLinkReducer'

export { default as UserGroupActions } from './userGroup/UserGroupActions'
export { default as getUserGroupReducer } from './userGroup/UserGroupReducer'
export { default as getUserGroupSelectors } from './userGroup/UserGroupSelectors'

export { default as EntityAttachmentActions } from './entityAttachment/EntityAttachmentActions'
export { default as getEntityAttachmentReducer } from './entityAttachment/EntityAttachmentReducer'
export { default as getEntityAttachmentSelectors } from './entityAttachment/EntityAttachmentSelectors'

export { default as OpensearchDescriptorSelectors } from './opensearchDescriptor/OpensearchDescriptorSelectors'
export { default as OpensearchDescriptorActions } from './opensearchDescriptor/OpensearchDescriptorActions'
export { default as OpensearchDescriptorReducer } from './opensearchDescriptor/OpensearchDescriptorReducer'

export { default as SettingsActions } from './settings/SettingsActions'
export { default as getSettingsReducer } from './settings/SettingsReducer'
export { default as getSettingsSelectors } from './settings/SettingsSelectors'
export { default as UpdateSettingActions } from './settings/UpdateSettingActions'
