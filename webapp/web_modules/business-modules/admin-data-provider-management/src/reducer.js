/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { combineReducers } from 'redux'
import { AcquisitionProcessingChainReducer } from './clients/AcquisitionProcessingChainClient'
import { AcquisitionProcessingChainMonitorReducer } from './clients/AcquisitionProcessingChainMonitorClient'
import { tableReducer, tableMonitorReducer } from './clients/TableClient'
import { AcquisitionFileReducer } from './clients/AcquisitionFileClient'
import { ProductReducer } from './clients/ProductClient'
/**
 * @author Sébastien Binda
 */
const dataProviderManagementReducer = combineReducers({
  acquisitionFile: AcquisitionFileReducer,
  chain: AcquisitionProcessingChainReducer,
  chainMonitor: AcquisitionProcessingChainMonitorReducer,
  processingChainTable: tableReducer,
  processingChainMonitorTable: tableMonitorReducer,
  product: ProductReducer,
})

export default dataProviderManagementReducer
