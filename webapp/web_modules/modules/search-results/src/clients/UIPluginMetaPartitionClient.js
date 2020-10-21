/*
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
 */

import { BasicPartitionActions, BasicPartitionReducers } from '@regardsoss/store-utils'
import BasicPartitionSelector from '@regardsoss/store-utils/src/partition/BasicPartitionSelectors'

/**
 * UI Plugin Definition entities client.
 *
 * @author Raphaël Mechali
 */
const ENTITIES_STORE_PATH = ['modules.search-results', 'pluginsMetaPartitions']
const REDUX_ACTION_NAMESPACE = 'search-results/plugins-meta-partitions'

export const uiPluginMetaPartitionActions = new BasicPartitionActions({ namespace: REDUX_ACTION_NAMESPACE })
const reducer = new BasicPartitionReducers(uiPluginMetaPartitionActions)
export const uiPluginMetaPartitionReducer = (state, action) => reducer.reduce(state, action)
export const uiPluginMetaPartitionSelectors = new BasicPartitionSelector(ENTITIES_STORE_PATH)
