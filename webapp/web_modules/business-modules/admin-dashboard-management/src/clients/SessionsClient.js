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

import { AdminClient, FeatureManagementClient } from '@regardsoss/client'

/**
 * sessions actions client.
 * @author Théo Lasserre
 */
const SESSIONS_NAMESPACE = 'dashboard-management/sessions'
const SESSIONS_STORE_PATH = ['admin', 'acquisition', 'dashboard', 'sessions']

export const sessionsActions = new AdminClient.SessionsActions(SESSIONS_NAMESPACE)
export const sessionsReducer = AdminClient.getSessionsReducer(SESSIONS_NAMESPACE)
export const sessionsSelectors = AdminClient.getSessionsSelectors(SESSIONS_STORE_PATH)

export const sessionsRelaunchProductActions = new AdminClient.SessionsRelaunchProductActions(`${SESSIONS_NAMESPACE}/relaunch-products`)
export const sessionsRelaunchAIPActions = new AdminClient.SessionsRelaunchAIPActions(`${SESSIONS_NAMESPACE}/relaunch-aip`)
export const sessionDeleteActions = new AdminClient.SessionsDeleteActions(`${SESSIONS_NAMESPACE}/delete-session`)
export const storagesRelaunchActions = new AdminClient.SessionsRelaunchStoragesActions(`${SESSIONS_NAMESPACE}/relaunch-storages`)
export const fProviderRetryErrorsActions = new FeatureManagementClient.ExtractionRequestRetryActions(`${SESSIONS_NAMESPACE}/relaunch-featureProvider`)
export const requestRetryActions = new FeatureManagementClient.RequestRetryActions(`${SESSIONS_NAMESPACE}/relaunch-featureManager`)
