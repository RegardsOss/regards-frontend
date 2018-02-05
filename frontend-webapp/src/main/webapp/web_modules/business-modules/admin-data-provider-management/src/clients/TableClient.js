/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
const ACQUISITION_PROCESSING_CHAIN_NAMESPACE = 'admin-ingest-management/acquisition-processing-chain-table'
const ACQUISITION_PROCESSING_CHAIN_STORE_PATH = ['admin', 'acquisition', 'dataProvider', 'processingChainTable']

const ACQUISITION_PROCESSING_CHAIN_MONITOR_NAMESPACE = 'admin-ingest-management/acquisition-processing-chain-monitor-table'
const ACQUISITION_PROCESSING_CHAIN_MONITOR_STORE_PATH = ['admin', 'acquisition', 'dataProvider', 'processingChainMonitorTable']
module.exports = {
  tableActions: new TableActions(ACQUISITION_PROCESSING_CHAIN_NAMESPACE),
  tableReducer: getTableReducer(ACQUISITION_PROCESSING_CHAIN_NAMESPACE),
  tableSelectors: getTableSelectors(ACQUISITION_PROCESSING_CHAIN_STORE_PATH),

  tableMonitorActions: new TableActions(ACQUISITION_PROCESSING_CHAIN_MONITOR_NAMESPACE),
  tableMonitorReducer: getTableReducer(ACQUISITION_PROCESSING_CHAIN_MONITOR_NAMESPACE),
  tableMonitorSelectors: getTableSelectors(ACQUISITION_PROCESSING_CHAIN_MONITOR_STORE_PATH),
}
