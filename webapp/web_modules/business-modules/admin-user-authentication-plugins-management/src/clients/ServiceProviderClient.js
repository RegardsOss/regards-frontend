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
import { AuthenticationClient } from '@regardsoss/client'

/**
 * Service Provider entities client.
 *
 * @author Théo Lasserre
 */
const ENTITIES_STORE_PATH = ['admin', 'user-management', 'authentication-plugins', 'service-providers']
const REDUX_ACTION_NAMESPACE = 'admin-user-management/authentication-plugins-service-providers'

export const serviceProviderReducer = AuthenticationClient.getServiceProviderReducer(REDUX_ACTION_NAMESPACE)
export const serviceProviderActions = new AuthenticationClient.ServiceProviderActions(REDUX_ACTION_NAMESPACE)
export const serviceProviderSelectors = AuthenticationClient.getServiceProviderSelectors(ENTITIES_STORE_PATH)
