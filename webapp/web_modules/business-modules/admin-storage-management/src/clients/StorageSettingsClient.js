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
import { DataManagementClient, StorageClient } from '@regardsoss/client'

/**
 * settings client.
 *
 * @author Théo Lasserre
 */
const ENTITIES_STORE_PATH = ['admin', 'acquisition', 'storage', 'settings']
const REDUX_ACTION_NAMESPACE = 'admin-storage/settings'

export const settingsActions = new DataManagementClient.SettingsActions(REDUX_ACTION_NAMESPACE)
export const settingsReducer = DataManagementClient.getSettingsReducer(REDUX_ACTION_NAMESPACE)
export const settingsSelectors = DataManagementClient.getSettingsSelectors(ENTITIES_STORE_PATH)

export const updateSettingActions = new DataManagementClient.UpdateSettingActions('admin-storage/settings-update')

const STORAGE_ENTITIES_STORE_PATH = ['admin', 'acquisition', 'storage', 'settings-storage']
const STORAGE_REDUX_ACTION_NAMESPACE = 'admin-storage/settings-storage'

export const storageSettingsActions = new StorageClient.SettingsActions(STORAGE_REDUX_ACTION_NAMESPACE)
export const storageSettingsReducer = StorageClient.getSettingsReducer(STORAGE_REDUX_ACTION_NAMESPACE)
export const storageSettingsSelectors = StorageClient.getSettingsSelectors(STORAGE_ENTITIES_STORE_PATH)

export const updateStorageSettingActions = new StorageClient.UpdateSettingActions('admin-storage/settings-storage-update')
