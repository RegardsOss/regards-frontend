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
import { BasicPartitionActions, BasicPartitionReducers, BasicPartitionSelectors } from '@regardsoss/store-utils'

/**
 * UI Plugin Definition partitions client: stores the current loading state for each definition
 *
 * @author Raphaël Mechali
 */
const ENTITIES_STORE_PATH = ['common', 'plugins', 'definitionsPartitions']
const REDUX_ACTION_NAMESPACE = 'common/plugins/definitionsPartitions'

export const pluginDefPartitionsActions = new BasicPartitionActions({ namespace: REDUX_ACTION_NAMESPACE })
const reducer = new BasicPartitionReducers(pluginDefPartitionsActions)
export const pluginDefPartitionsReducer = (state, action) => reducer.reduce(state, action)
export const pluginDefPartitionsSelectors = new BasicPartitionSelectors(ENTITIES_STORE_PATH)
