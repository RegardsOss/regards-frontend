/*
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * PrioritizedDataStorage entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'acquisition', 'storage', 'storages-plugin']
const REDUX_ACTION_NAMESPACE = 'admin-storage/storagesPlugin'

const UP_NAMESPACE = 'admin-storage/prioritizedDataStorage/up'
const DOWN_NAMESPACE = 'admin-storage/prioritizedDataStorage/up'
const DELETE_FILES_NAMESPACE = 'admin-storage/prioritizedDataStorage/deleteFiles'

const {
  StoragesPluginActions, getStoragesPluginReducer, getStoragesPluginSelectors,
  StoragesPluginDownActions, StoragesPluginUpActions, StoragesPluginDeleteFilesActions,
} = StorageClient

export const storagesPluginReducer = getStoragesPluginReducer(REDUX_ACTION_NAMESPACE)
export const storagesPluginActions = new StoragesPluginActions(REDUX_ACTION_NAMESPACE)
export const storagesPluginSelectors = getStoragesPluginSelectors(ENTITIES_STORE_PATH)

export const storagesPluginUpActions = new StoragesPluginUpActions(UP_NAMESPACE)
export const storagesPluginDownActions = new StoragesPluginDownActions(DOWN_NAMESPACE)
export const storagesPluginDeleteFilesActions = new StoragesPluginDeleteFilesActions(DELETE_FILES_NAMESPACE)
