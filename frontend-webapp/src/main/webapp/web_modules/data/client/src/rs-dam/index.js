import AccessGroupActions from './accessGroup/AccessGroupActions'
import getAccessGroupReducer from './accessGroup/AccessGroupReducer'
import getAccessGroupSelectors from './accessGroup/AccessGroupSelectors'

import AttributeModelActions from './attributesModel/AttributeModelActions'
import AttributeModelReducer from './attributesModel/AttributeModelReducer'
import AttributeModelSelectors from './attributesModel/AttributeModelSelectors'

import DownloadDescriptionDefinitions from './description/DownloadDescriptionDefinitions'
import DownloadEntityDescriptionActions from './description/DownloadEntityDescriptionActions'
import DownloadEntityDescriptionReducer from './description/DownloadEntityDescriptionReducer'
import DownloadEntityDescriptionSelectors from './description/DownloadEntityDescriptionSelectors'

import ModelAttributesActions from './modelAttributes/ModelAttributesActions'
import ModelAttributesReducer from './modelAttributes/ModelAttributesReducer'
import ModelAttributesSelectors from './modelAttributes/ModelAttributesSelectors'

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

import DatasetLinkActions from './datasetLink/DatasetLinkActions'
import DatasetLinkReducer from './datasetLink/DatasetLinkReducer'

import ConnectionTableSelectors from './connectionTable/ConnectionTableSelectors'
import ConnectionTableActions from './connectionTable/ConnectionTableActions'
import ConnectionTableReducer from './connectionTable/ConnectionTableReducer'


import ConnectionTableAttributesSelectors from './connectionTableAttributes/ConnectionTableAttributesSelectors'
import ConnectionTableAttributesActions from './connectionTableAttributes/ConnectionTableAttributesActions'
import ConnectionTableAttributesReducer from './connectionTableAttributes/ConnectionTableAttributesReducer'


import CollectionLinkActions from './collectionLink/CollectionLinkActions'
import CollectionLinkReducer from './collectionLink/CollectionLinkReducer'

import UserGroupActions from './userGroup/UserGroupActions'
import getUserGroupReducer from './userGroup/UserGroupReducer'
import getUserGroupSelectors from './userGroup/UserGroupSelectors'

export default {
  AccessGroupActions,
  getAccessGroupReducer,
  getAccessGroupSelectors,

  AttributeModelActions,
  AttributeModelReducer,
  AttributeModelSelectors,

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

  DatasetLinkActions,
  DatasetLinkReducer,

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

  UserGroupActions,
  getUserGroupReducer,
  getUserGroupSelectors,

}
