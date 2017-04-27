/**
* LICENSE_PLACEHOLDER
**/
import { CatalogEntityTypes } from '@regardsoss/model'
import DownloadEntityDescriptionActions from './DownloadEntityDescriptionActions'
import DownloadEntityDescriptionSelectors from './DownloadEntityDescriptionSelectors'
import getReduceMethod from './DownloadEntityDescriptionReducers'


/**
 * Bundles download description file client: actions / reducers / selectors for collection and dataset,
 * in the given constructor configuration.
 * Exposes reducer path, actions, selectors,
 */
export default class DownloadDescriptionClient {

  /** dataset reducer branch path element in store (relative to parentStorePathArray) */
  static LAST_DATASET_REDUCER_PATH_ELT = 'dataset'

  /** dataset reducer branch path element in store (relative to parentStorePathArray) */
  static LAST_COLLECTION_REDUCER_PATH_ELT = 'collection'

  /**
   * constructor
   * @param {String} actionsNamespacePrefix actions namespace prefix
   * @param {Array[String]} parentStorePathArray path to module store root as array
   */
  constructor(actionsNamespacePrefix = 'common', parentStorePathArray) {
    this.downloadDatasetDescriptionActions = new DownloadEntityDescriptionActions(CatalogEntityTypes.DATASET, actionsNamespacePrefix)
    this.reduceDownloadDatasetDescription = getReduceMethod(this.downloadDatasetDescriptionActions)
    this.downloadDatasetDescriptionSelectors = new DownloadEntityDescriptionSelectors(
      [...parentStorePathArray, DownloadDescriptionClient.LAST_DATASET_REDUCER_PATH_ELT])

    this.downloadCollectionDescriptionActions = new DownloadEntityDescriptionActions(CatalogEntityTypes.COLLECTION, actionsNamespacePrefix)
    this.reduceDownloadCollectionDescription = getReduceMethod(this.downloadCollectionDescriptionActions)
    this.downloadCollectionDescriptionSelectors = new DownloadEntityDescriptionSelectors(
      [...parentStorePathArray, DownloadDescriptionClient.LAST_COLLECTION_REDUCER_PATH_ELT])
  }

}
