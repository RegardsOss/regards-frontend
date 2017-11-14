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
import { DataManagementClient } from '@regardsoss/client'

/**
 * Model entities client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'acquisition', 'datasource', 'connection-table']
const REDUX_ACTION_NAMESPACE = 'admin-data-datasource-management/connection-table'

const connectionTableReducer = DataManagementClient.ConnectionTableReducer(REDUX_ACTION_NAMESPACE)
const connectionTableActions = new DataManagementClient.ConnectionTableActions(REDUX_ACTION_NAMESPACE)
const connectionTableSelectors = DataManagementClient.ConnectionTableSelectors(ENTITIES_STORE_PATH)


export default {
  connectionTableReducer,
  connectionTableActions,
  connectionTableSelectors,
}
