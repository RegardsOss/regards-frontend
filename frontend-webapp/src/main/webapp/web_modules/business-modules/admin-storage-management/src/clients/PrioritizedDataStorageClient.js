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
import { StorageClient } from '@regardsoss/client'
import { StorageDomain } from '@regardsoss/domain'

/**
 * PrioritizedDataStorage entities client.
 *
 * @author Sébastien Binda
 */
const ONLINE_ENTITIES_STORE_PATH = ['admin', 'acquisition', 'storage', 'prioritized-datastorage-online']
const ONLINE_REDUX_ACTION_NAMESPACE = 'admin-storage/prioritizedDataStorage/online'

const NEARLINE_ENTITIES_STORE_PATH = ['admin', 'acquisition', 'storage', 'prioritized-datastorage-nearline']
const NEARLINE_REDUX_ACTION_NAMESPACE = 'admin-storage/prioritizedDataStorage/nearline'

const UP_NAMESPACE = 'admin-storage/prioritizedDataStorage/up'
const DOWN_NAMESPACE = 'admin-storage/prioritizedDataStorage/up'

const {
  PrioritizedDataStorageActions, getPrioritizedDataStorageReducer, getPrioritizedDataStorageSelectors,
  PrioritizedDataStorageDownActions, PrioritizedDataStorageUpActions,
} = StorageClient
const onlinePrioritizedDataStorageReducer = getPrioritizedDataStorageReducer(ONLINE_REDUX_ACTION_NAMESPACE)
const onlinePrioritizedDataStorageActions = new PrioritizedDataStorageActions(ONLINE_REDUX_ACTION_NAMESPACE)
const onlinePrioritizedDataStorageSelectors = getPrioritizedDataStorageSelectors(ONLINE_ENTITIES_STORE_PATH)

const nearlinePrioritizedDataStorageReducer = getPrioritizedDataStorageReducer(NEARLINE_REDUX_ACTION_NAMESPACE)
const nearlinePrioritizedDataStorageActions = new PrioritizedDataStorageActions(NEARLINE_REDUX_ACTION_NAMESPACE)
const nearlinePrioritizedDataStorageSelectors = getPrioritizedDataStorageSelectors(NEARLINE_ENTITIES_STORE_PATH)

const prioritizedDataStorageUpActions = new PrioritizedDataStorageUpActions(UP_NAMESPACE)
const prioritizedDataStorageDownActions = new PrioritizedDataStorageDownActions(DOWN_NAMESPACE)

const getSelectors = (type) => {
  switch (type) {
    case StorageDomain.DataStorageTypeEnum.ONLINE:
      return onlinePrioritizedDataStorageSelectors
    case StorageDomain.DataStorageTypeEnum.NEARLINE:
      return nearlinePrioritizedDataStorageSelectors
    default:
      return null
  }
}

const getActions = (type) => {
  switch (type) {
    case StorageDomain.DataStorageTypeEnum.ONLINE:
      return onlinePrioritizedDataStorageActions
    case StorageDomain.DataStorageTypeEnum.NEARLINE:
      return nearlinePrioritizedDataStorageActions
    default:
      return null
  }
}

module.exports = {
  onlinePrioritizedDataStorageActions,
  onlinePrioritizedDataStorageReducer,
  onlinePrioritizedDataStorageSelectors,

  nearlinePrioritizedDataStorageActions,
  nearlinePrioritizedDataStorageReducer,
  nearlinePrioritizedDataStorageSelectors,

  prioritizedDataStorageUpActions,
  prioritizedDataStorageDownActions,

  getSelectors,
  getActions,

}
