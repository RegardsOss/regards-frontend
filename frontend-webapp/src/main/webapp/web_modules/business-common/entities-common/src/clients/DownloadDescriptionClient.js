/**
* LICENSE_PLACEHOLDER
**/
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { DataManagementClient } from '@regardsoss/client'


/**
 * Bundles download description file client: actions / reducers / selectors for collection and dataset,
 * in the given constructor configuration.
 * Exposes reducer path, actions, selectors,
 */
export default class DownloadDescriptionClient {
  /** dataset reducer branch path element in store (relative to parentStorePathArray) */
  static LAST_DATASET_REDUCER_PATH_ELT = 'dataset-description'

  /** dataset reducer branch path element in store (relative to parentStorePathArray) */
  static LAST_COLLECTION_REDUCER_PATH_ELT = 'collection-description'

  /**
   * constructor
   * @param {String} actionsNamespacePrefix actions namespace prefix
   * @param {Array[String]} parentStorePathArray path to module store root as array
   */
  constructor(actionsNamespacePrefix = 'common', parentStorePathArray) {
    this.downloadDatasetDescriptionActions = new DataManagementClient.DownloadEntityDescriptionActions(ENTITY_TYPES_ENUM.DATASET, actionsNamespacePrefix)
    this.reduceDownloadDatasetDescription = DataManagementClient.DownloadEntityDescriptionReducer(this.downloadDatasetDescriptionActions)
    this.downloadDatasetDescriptionSelectors = new DataManagementClient.DownloadEntityDescriptionSelectors([...parentStorePathArray, DownloadDescriptionClient.LAST_DATASET_REDUCER_PATH_ELT])

    this.downloadCollectionDescriptionActions = new DataManagementClient.DownloadEntityDescriptionActions(ENTITY_TYPES_ENUM.COLLECTION, actionsNamespacePrefix)
    this.reduceDownloadCollectionDescription = DataManagementClient.DownloadEntityDescriptionReducer(this.downloadCollectionDescriptionActions)
    this.downloadCollectionDescriptionSelectors = new DataManagementClient.DownloadEntityDescriptionSelectors([...parentStorePathArray, DownloadDescriptionClient.LAST_COLLECTION_REDUCER_PATH_ELT])
  }
}
