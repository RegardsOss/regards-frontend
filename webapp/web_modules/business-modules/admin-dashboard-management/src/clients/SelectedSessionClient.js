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

/**
 * selected session actions client.
 * @author Théo Lasserre
 */
const SESSIONS_NAMESPACE = 'dashboard-management/selectedSession'
const SESSIONS_STORE_PATH = ['admin', 'acquisition', 'dashboard', 'selectedSession']

export const selectedSessionActions = new AdminClient.SelectedSessionActions(SESSIONS_NAMESPACE)
export const selectedSessionReducer = AdminClient.getSelectedSessionReducer(SESSIONS_NAMESPACE)
export const selectedSessionSelectors = AdminClient.getSelectedSessionSelectors(SESSIONS_STORE_PATH)
