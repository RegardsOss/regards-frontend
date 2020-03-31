/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AdminClient } from '@regardsoss/client'

/**
 * Client to request role resources.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['admin', 'ui', 'plugin', 'role']
const REDUX_ACTION_NAMESPACE = 'admin-ui-plugins-management/roles'
export const roleActions = new AdminClient.RoleActions(REDUX_ACTION_NAMESPACE)
export const roleReducer = AdminClient.getRoleReducer(REDUX_ACTION_NAMESPACE)
export const roleSelectors = AdminClient.getRoleSelectors(ENTITIES_STORE_PATH)
