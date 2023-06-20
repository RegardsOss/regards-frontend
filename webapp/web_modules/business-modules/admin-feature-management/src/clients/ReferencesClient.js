/*
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Model attributes entities client.
 *
 * @author Théo Lasserre
 */
const ENTITIES_STORE_PATH = ['admin', 'acquisition', 'feature', 'references']
const REDUX_ACTION_NAMESPACE = 'admin-feature-management/references'

export const referencesActions = new FeatureManagementClient.ReferenceActions(REDUX_ACTION_NAMESPACE)
export const referencesReducer = FeatureManagementClient.getReferenceReducer(REDUX_ACTION_NAMESPACE)
export const referencesSelectors = FeatureManagementClient.getReferenceSelectors(ENTITIES_STORE_PATH)

// We separate count store from entities store to ensure count is always right
const ENTITIES_STORE_PATH_COUNT = ['admin', 'acquisition', 'feature', 'referencesCount']
const REDUX_ACTION_NAMESPACE_COUNT = 'admin-feature-management/references-count'

export const referencesActionsCount = new FeatureManagementClient.ReferenceActions(REDUX_ACTION_NAMESPACE_COUNT)
export const referencesReducerCount = FeatureManagementClient.getReferenceReducer(REDUX_ACTION_NAMESPACE_COUNT)
export const referencesSelectorsCount = FeatureManagementClient.getReferenceSelectors(ENTITIES_STORE_PATH_COUNT)
