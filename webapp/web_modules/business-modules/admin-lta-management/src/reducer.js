/**
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
 **/
import { combineReducers } from 'redux'
import { modelReducer } from './clients/ModelClient'
import { requestReducer } from './clients/LTAClient'
import { tableReducer } from './clients/TableClient'
import { settingsReducer } from './clients/SettingsClient'
import { filtersReducer } from './clients/FiltersClient'
import { searchSessionsReducer } from './clients/SearchSessionsClient'
import { searchSourcesReducer } from './clients/SearchSourcesClient'
import { requestDeleteReducer } from './clients/RequestDeleteClient'

/**
 * @author Théo Lasserre
 */
const reducer = combineReducers({
  requests: requestReducer,
  requestsTable: tableReducer,
  settings: settingsReducer,
  model: modelReducer,
  ltaFilters: filtersReducer,
  searchSessions: searchSessionsReducer,
  searchSources: searchSourcesReducer,
  requestDelete: requestDeleteReducer,
})

export default reducer
