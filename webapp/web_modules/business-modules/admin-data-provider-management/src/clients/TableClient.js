/**
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
 **/
import { TableActions, getTableSelectors, getTableReducer } from '@regardsoss/components'

/**
 * Infinite table actions client.
 * @author Sébastien Binda
 */
const ACQUISITION_PROCESSING_CHAIN_NAMESPACE = 'data-provider-management/acquisition-processing-chain-table'
const ACQUISITION_PROCESSING_CHAIN_STORE_PATH = ['admin', 'acquisition', 'dataProvider', 'processingChainTable']

const ACQUISITION_PROCESSING_CHAIN_MONITOR_NAMESPACE = 'data-provider-management/acquisition-processing-chain-monitor-table'
const ACQUISITION_PROCESSING_CHAIN_MONITOR_STORE_PATH = ['admin', 'acquisition', 'dataProvider', 'processingChainMonitorTable']

const PRODUCT_NAMESPACE = 'data-provider-management/acquisition-product-table'
const PRODUCT_STORE_PATH = ['admin', 'acquisition', 'dataProvider', 'product']

const ACQUISITION_FILE_NAMESPACE = 'data-provider-management/acquisition-file-table'
const ACQUISITION_FILE_STORE_PATH = ['admin', 'acquisition', 'dataProvider', 'acquisitionFile']

const SESSIONS_TABLE_NAMESPACE = 'data-provider-management/sessions-table'
const SESSIONS_TABLE_STORE_PATH = ['admin', 'acquisition', 'dataProvider', 'sessionsTable']

export const tableActions = new TableActions(ACQUISITION_PROCESSING_CHAIN_NAMESPACE)
export const tableReducer = getTableReducer(ACQUISITION_PROCESSING_CHAIN_NAMESPACE)
export const tableSelectors = getTableSelectors(ACQUISITION_PROCESSING_CHAIN_STORE_PATH)

export const tableMonitorActions = new TableActions(ACQUISITION_PROCESSING_CHAIN_MONITOR_NAMESPACE)
export const tableMonitorReducer = getTableReducer(ACQUISITION_PROCESSING_CHAIN_MONITOR_NAMESPACE)
export const tableMonitorSelectors = getTableSelectors(ACQUISITION_PROCESSING_CHAIN_MONITOR_STORE_PATH)

export const tableProductActions = new TableActions(PRODUCT_NAMESPACE)
export const tableProductReducer = getTableReducer(PRODUCT_NAMESPACE)
export const tableProductSelectors = getTableSelectors(PRODUCT_STORE_PATH)

export const tableAcquisitionFileActions = new TableActions(ACQUISITION_FILE_NAMESPACE)
export const tableAcquisitionFileReducer = getTableReducer(ACQUISITION_FILE_NAMESPACE)
export const tableAcquisitionFileSelectors = getTableSelectors(ACQUISITION_FILE_STORE_PATH)

export const tableSessionsActions = new TableActions(SESSIONS_TABLE_NAMESPACE)
export const tableSessionsReducer = getTableReducer(SESSIONS_TABLE_NAMESPACE)
export const tableSessionsSelectors = getTableSelectors(SESSIONS_TABLE_STORE_PATH)
