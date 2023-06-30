/*
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { FeatureManagementClient } from '@regardsoss/client'

/**
 * Request entities client.
 *
 * @author Théo Lasserre
 */
const ENTITIES_STORE_PATH = ['admin', 'acquisition', 'feature', 'creationRequests']
const REDUX_ACTION_NAMESPACE = 'admin-feature-management/creation-requests'

export const creationRequestActions = new FeatureManagementClient.RequestActions(REDUX_ACTION_NAMESPACE)
export const creationRequestReducer = FeatureManagementClient.getRequestReducer(REDUX_ACTION_NAMESPACE)
export const creationRequestSelectors = FeatureManagementClient.getRequestSelectors(ENTITIES_STORE_PATH)

// We separate count store from entities store to ensure count is always right
const ENTITIES_STORE_PATH_COUNT = ['admin', 'acquisition', 'feature', 'creationRequestsCount']
const REDUX_ACTION_NAMESPACE_COUNT = 'admin-feature-management/creation-requests-count'

export const creationRequestActionsCount = new FeatureManagementClient.RequestActions(REDUX_ACTION_NAMESPACE_COUNT)
export const creationRequestReducerCount = FeatureManagementClient.getRequestReducer(REDUX_ACTION_NAMESPACE_COUNT)
export const creationRequestSelectorsCount = FeatureManagementClient.getRequestSelectors(ENTITIES_STORE_PATH_COUNT)
