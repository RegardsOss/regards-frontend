/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import AccessRightActions from './accessRight/AccessRightActions'
import getAccessRightReducer from './accessRight/AccessRightReducer'
import getAccessRightSelectors from './accessRight/AccessRightSelectors'

import AccessGroupActions from './accessGroup/AccessGroupActions'
import getAccessGroupReducer from './accessGroup/AccessGroupReducer'
import getAccessGroupSelectors from './accessGroup/AccessGroupSelectors'

import AttributeModelActions from './attributesModel/AttributeModelActions'
import AttributeModelReducer from './attributesModel/AttributeModelReducer'
import AttributeModelSelectors from './attributesModel/AttributeModelSelectors'

import AttributeModelForModelTypeActions from './attributesModel/AttributeModelForModelTypeActions'
import AttributeModelForModelTypeReducer from './attributesModel/AttributeModelForModelTypeReducer'
import AttributeModelForModelTypeSelectors from './attributesModel/AttributeModelForModelTypeSelectors'

import DownloadDescriptionDefinitions from './description/DownloadDescriptionDefinitions'
import DownloadEntityDescriptionActions from './description/DownloadEntityDescriptionActions'
import DownloadEntityDescriptionReducer from './description/DownloadEntityDescriptionReducer'
import DownloadEntityDescriptionSelectors from './description/DownloadEntityDescriptionSelectors'

import ModelAttributesActions from './modelAttributes/ModelAttributesActions'
import ModelAttributesReducer from './modelAttributes/ModelAttributesReducer'
import ModelAttributesSelectors from './modelAttributes/ModelAttributesSelectors'

import ModelAttributeComputationTypesActions from './modelAttributeComputationTypes/ModelAttributeComputationTypesActions'
import getModelAttributeComputationTypesReducer from './modelAttributeComputationTypes/ModelAttributeComputationTypesReducer'
import getModelAttributeComputationTypesSelectors from './modelAttributeComputationTypes/ModelAttributeComputationTypesSelectors'

import FragmentActions from './fragment/FragmentActions'
import FragmentReducer from './fragment/FragmentReducer'
import FragmentSelectors from './fragment/FragmentSelectors'

import AttributeModelRestrictionSelectors from './attributesModelRestriction/AttributeModelRestrictionSelectors'
import AttributeModelRestrictionActions from './attributesModelRestriction/AttributeModelRestrictionActions'
import AttributeModelRestrictionReducer from './attributesModelRestriction/AttributeModelRestrictionReducer'

import AttributeModelTypeSelectors from './attributesModelType/AttributeModelTypeSelectors'
import AttributeModelTypeActions from './attributesModelType/AttributeModelTypeActions'
import AttributeModelTypeReducer from './attributesModelType/AttributeModelTypeReducer'

import ModelSelectors from './model/ModelSelectors'
import ModelActions from './model/ModelActions'
import ModelReducer from './model/ModelReducer'

import ModelAttributesFragmentActions from './modelAttributesFragment/ModelAttributesFragmentActions'
import ModelAttributesFragmentReducer from './modelAttributesFragment/ModelAttributesFragmentReducer'

import CollectionSelectors from './collection/CollectionSelectors'
import CollectionActions from './collection/CollectionActions'
import CollectionReducer from './collection/CollectionReducer'


import ConnectionSelectors from './connection/ConnectionSelectors'
import ConnectionActions from './connection/ConnectionActions'
import ConnectionReducer from './connection/ConnectionReducer'


import DatasourceSelectors from './datasource/DatasourceSelectors'
import DatasourceActions from './datasource/DatasourceActions'
import DatasourceReducer from './datasource/DatasourceReducer'

import DatasetActions from './dataset/DatasetActions'
import DatasetReducer from './dataset/DatasetReducer'
import DatasetSelectors from './dataset/DatasetSelectors'

import DocumentActions from './document/DocumentActions'
import getDocumentReducer from './document/DocumentReducer'
import getDocumentSelectors from './document/DocumentSelectors'

import DocumentLinkActions from './documentLink/DocumentLinkActions'
import getDocumentLinkReducer from './documentLink/DocumentLinkReducer'

import DatasetDataAttributesActions from './dataset/DatasetDataAttributesActions'
import DatasetDataAttributesReducer from './dataset/DatasetDataAttributesReducer'
import DatasetDataAttributesSelectors from './dataset/DatasetDataAttributesSelectors'

import DatasetValidSubsettingTestActions from './datasetValidSubsettingTest/DatasetValidSubsettingTestActions'
import getDatasetValidSubsettingTestReducer from './datasetValidSubsettingTest/DatasetValidSubsettingTestReducer'

import DatasetLinkActions from './datasetLink/DatasetLinkActions'
import DatasetLinkReducer from './datasetLink/DatasetLinkReducer'

import ConnectionTableSelectors from './connectionTable/ConnectionTableSelectors'
import ConnectionTableActions from './connectionTable/ConnectionTableActions'
import ConnectionTableReducer from './connectionTable/ConnectionTableReducer'


import ConnectionTestActions from './connectionTest/ConnectionTestActions'
import ConnectionTestReducer from './connectionTest/ConnectionTestReducer'


import ConnectionTableAttributesSelectors from './connectionTableAttributes/ConnectionTableAttributesSelectors'
import ConnectionTableAttributesActions from './connectionTableAttributes/ConnectionTableAttributesActions'
import ConnectionTableAttributesReducer from './connectionTableAttributes/ConnectionTableAttributesReducer'


import CollectionLinkActions from './collectionLink/CollectionLinkActions'
import CollectionLinkReducer from './collectionLink/CollectionLinkReducer'

import UserGroupActions from './userGroup/UserGroupActions'
import getUserGroupReducer from './userGroup/UserGroupReducer'
import getUserGroupSelectors from './userGroup/UserGroupSelectors'

/**
 * Index for all datamanagement microservice clients.
 *
 * @author Sébastien Binda
 */
export default {
  AccessRightActions,
  getAccessRightReducer,
  getAccessRightSelectors,

  AccessGroupActions,
  getAccessGroupReducer,
  getAccessGroupSelectors,

  AttributeModelActions,
  AttributeModelReducer,
  AttributeModelSelectors,

  AttributeModelForModelTypeActions,
  AttributeModelForModelTypeReducer,
  AttributeModelForModelTypeSelectors,

  AttributeModelRestrictionSelectors,
  AttributeModelRestrictionActions,
  AttributeModelRestrictionReducer,

  AttributeModelTypeSelectors,
  AttributeModelTypeActions,
  AttributeModelTypeReducer,

  CollectionSelectors,
  CollectionActions,
  CollectionReducer,

  ConnectionSelectors,
  ConnectionActions,
  ConnectionReducer,

  DatasourceSelectors,
  DatasourceActions,
  DatasourceReducer,

  DatasetActions,
  DatasetReducer,
  DatasetSelectors,

  DocumentActions,
  getDocumentReducer,
  getDocumentSelectors,

  DocumentLinkActions,
  getDocumentLinkReducer,


  DatasetValidSubsettingTestActions,
  getDatasetValidSubsettingTestReducer,

  DatasetDataAttributesActions,
  DatasetDataAttributesReducer,
  DatasetDataAttributesSelectors,

  DatasetLinkActions,
  DatasetLinkReducer,

  ConnectionTestActions,
  ConnectionTestReducer,

  ConnectionTableReducer,
  ConnectionTableActions,
  ConnectionTableSelectors,

  ConnectionTableAttributesReducer,
  ConnectionTableAttributesActions,
  ConnectionTableAttributesSelectors,

  CollectionLinkActions,
  CollectionLinkReducer,

  DownloadDescriptionDefinitions,
  DownloadEntityDescriptionActions,
  DownloadEntityDescriptionReducer,
  DownloadEntityDescriptionSelectors,

  FragmentActions,
  FragmentReducer,
  FragmentSelectors,

  ModelSelectors,
  ModelActions,
  ModelReducer,

  ModelAttributesActions,
  ModelAttributesReducer,
  ModelAttributesSelectors,

  ModelAttributeComputationTypesActions,
  getModelAttributeComputationTypesReducer,
  getModelAttributeComputationTypesSelectors,

  ModelAttributesFragmentActions,
  ModelAttributesFragmentReducer,

  UserGroupActions,
  getUserGroupReducer,
  getUserGroupSelectors,

}
