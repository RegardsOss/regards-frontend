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


import CollectionLinkActions from './collectionLink/CollectionLinkActions'
import CollectionLinkReducer from './collectionLink/CollectionLinkReducer'


export default {
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

}
