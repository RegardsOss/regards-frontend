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
import { AccessProjectClient } from '@regardsoss/client'

/**
 * Dataprovider product entities client.
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['admin', 'acquisition', 'dataProvider', 'sessions']
const REDUX_ACTION_NAMESPACE = 'admin-data-provider-management/sessions'

export const sessionsActions = new AccessProjectClient.SessionsActions(REDUX_ACTION_NAMESPACE)
export const sessionsReducer = AccessProjectClient.getSessionsReducer(REDUX_ACTION_NAMESPACE)
export const sessionsSelectors = AccessProjectClient.getSessionsSelectors(ENTITIES_STORE_PATH)

export const sessionsRelaunchProductActions = new AccessProjectClient.SessionsRelaunchProductActions(REDUX_ACTION_NAMESPACE)
export const sessionsRelaunchSIPActions = new AccessProjectClient.SessionsRelaunchSIPActions(REDUX_ACTION_NAMESPACE)
export const sessionsRelaunchAIPActions = new AccessProjectClient.SessionsRelaunchAIPActions(REDUX_ACTION_NAMESPACE)

export const SESSION_ENDPOINT = AccessProjectClient.SessionsActions.ENDPOINT
export const SESSION_ENTITY_ID = AccessProjectClient.SessionsActions.ENTITY_ID
