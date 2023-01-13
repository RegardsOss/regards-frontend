/**
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
 **/
import { combineReducers } from 'redux'
import { AcquisitionProcessingChainReducer, AcquisitionProcessingChainEditReducer } from './clients/AcquisitionProcessingChainClient'
import { tableReducer, tableSessionsReducer } from './clients/TableClient'
import { searchSessionsReducer } from './clients/session/SearchSessionsClient'
import { searchSourcesReducer } from './clients/session/SearchSourcesClient'
import { sessionsReducer } from './clients/session/SessionsClient'
import { storagesListReducer } from './clients/StoragesListClient'
import { productReducer } from './clients/session/SearchProductsClient'
import { filtersReducer } from './clients/FiltersClient'
/**
 * @author Sébastien Binda
 */
const dataProviderManagementReducer = combineReducers({
  monitoredChains: AcquisitionProcessingChainReducer,
  chains: AcquisitionProcessingChainEditReducer,
  processingChainTable: tableReducer,
  sessions: sessionsReducer,
  searchSessions: searchSessionsReducer,
  searchSources: searchSourcesReducer,
  sessionsTable: tableSessionsReducer,
  storages: storagesListReducer,
  products: productReducer,
  dataProviderFilters: filtersReducer,
})

export default dataProviderManagementReducer
