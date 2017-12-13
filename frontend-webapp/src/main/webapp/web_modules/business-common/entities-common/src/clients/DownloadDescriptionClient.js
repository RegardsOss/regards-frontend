/*
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
