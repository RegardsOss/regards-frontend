/*
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
import { StorageClient } from '@regardsoss/client'

/**
 * StorageLocation entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'acquisition', 'storage', 'storage-location']
const REDUX_ACTION_NAMESPACE = 'admin-storage/storageLocation'

const UP_NAMESPACE = 'admin-storage/storageLocation/up'
const DOWN_NAMESPACE = 'admin-storage/storageLocation/up'
const DELETE_FILES_NAMESPACE = 'admin-storage/storageLocation/deleteFiles'
const COPY_FILES_NAMESPACE = 'admin-storage/storageLocation/copyFiles'
const ERRORS_RETRY_NAMESPACE = 'admin-storage/storageLocation/errorsRetry'
const RELAUNCH_MONITORING_NAMESPACE = 'admin-storage/storageLocation/relaunchMonitoring'

const {
  StorageLocationActions, getStorageLocationReducers, getStorageLocationSelectors,
  StorageLocationPriorityDownActions, StorageLocationPriorityUpActions, StorageLocationDeleteFilesActions,
  StorageLocationCopyFilesActions, StorageLocationErrorsRetryActions, StorageLocationMonitoringActions,
} = StorageClient

export const storageLocationReducer = getStorageLocationReducers(REDUX_ACTION_NAMESPACE)
export const storageLocationActions = new StorageLocationActions(REDUX_ACTION_NAMESPACE)
export const storageLocationSelectors = getStorageLocationSelectors(ENTITIES_STORE_PATH)

export const storageLocationPriorityUpActions = new StorageLocationPriorityUpActions(UP_NAMESPACE)
export const storageLocationPriorityDownActions = new StorageLocationPriorityDownActions(DOWN_NAMESPACE)
export const storageLocationDeleteFilesActions = new StorageLocationDeleteFilesActions(DELETE_FILES_NAMESPACE)
export const storageLocationCopyFilesActions = new StorageLocationCopyFilesActions(COPY_FILES_NAMESPACE)

export const storageLocationErrorsRetryActions = new StorageLocationErrorsRetryActions(ERRORS_RETRY_NAMESPACE)

export const storageLocationMonitoringActions = new StorageLocationMonitoringActions(RELAUNCH_MONITORING_NAMESPACE)
