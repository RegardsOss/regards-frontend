/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/
import { StorageClient } from '@regardsoss/client'

/**
 * Redux AIP middleware instance to fetch AIP deletion on some storage spaces
 * @author Raphaël Mechali
 */

const namespace = 'admin-ingest-aip-management/delete-aip-on-some-storages'
export const deleteAIPssOnSomeStoragesClientActions = new StorageClient.DeleteAIPsOnSomeStoragesActions(namespace)
export const deleteAIPsOnSomeStoragesClientReducer = StorageClient.getDeleteAIPsOnSomeStoragesReducer(namespace)
export const deleteAIPsOnSomeStoragesClientSelectors = StorageClient.getDeleteAIPsOnSomeStoragesSelectors(['admin', 'acquisition', 'aip', 'delete-aip-on-some-storages'])