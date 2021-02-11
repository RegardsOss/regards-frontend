/**
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
 **/
import { AdminClient } from '@regardsoss/client'

export const REDUCER_PATH = 'accountPassword'

/**
 * Server password signals client
 */
const ENTITIES_STORE_PATH = ['modules.authentication', REDUCER_PATH]
const REDUX_ACTION_NAMESPACE = 'authentication/accountPassword'

export const accountPasswordActions = new AdminClient.AccountPasswordActions(REDUX_ACTION_NAMESPACE)
export const accountPasswordReducer = AdminClient.getAccountPasswordReducer(REDUX_ACTION_NAMESPACE)
export const accountPasswordSelectors = AdminClient.getAccountPasswordSelectors(ENTITIES_STORE_PATH)
