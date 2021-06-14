/**
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
 **/
import { combineReducers } from 'redux'
import { aipReducer } from './clients/AIPClient'
import { aipCategorySearchReducer } from './clients/AIPCategorySearchClient'
import { aipStorageSearchReducer } from './clients/AIPStorageSearchClient'
import { aipTagSearchReducer } from './clients/AIPTagSearchClient'
import { sipTableReducer } from './clients/SIPTableClient'
import { aipTableReducer } from './clients/AIPTableClient'
import { searchSessionsReducer } from './clients/SearchSessionsClient'
import { searchSourcesReducer } from './clients/SearchSourcesClient'
import { sipReducer } from './clients/SIPClient'
import { sipImportReducer } from './clients/SIPImportClient'
import { processingChainReducer } from './clients/ProcessingChainClient'
import { aipCountReducer } from './clients/AIPCountClient'
import { requestCountReducer } from './clients/RequestCountClient'
import { requestReducer } from './clients/RequestClient'
import { requestTableReducer } from './clients/RequestTableClient'
import { aipDeleteReducer } from './clients/AIPDeleteClient'
import { requestSelectVersionModeReducer } from './clients/RequestSelectVersionModeClient'
import { requestRetryReducer } from './clients/RequestRetryClient'
import { requestDeleteReducer } from './clients/RequestDeleteClient'
import { settingsReducer } from './clients/SettingsClient'

const oaisManagementReducer = combineReducers({
  aip: aipReducer,
  'aip-count': aipCountReducer,
  'aip-table': aipTableReducer,
  'aip-search-category': aipCategorySearchReducer,
  'aip-search-storage': aipStorageSearchReducer,
  'aip-search-tag': aipTagSearchReducer,
  request: requestReducer,
  'request-count': requestCountReducer,
  'request-table': requestTableReducer,
  'request-select-version-mode': requestSelectVersionModeReducer,
  'request-retry': requestRetryReducer,
  'request-delete': requestDeleteReducer,
  sip: sipReducer,
  'sip-table': sipTableReducer,
  'aip-delete': aipDeleteReducer,
  sipImport: sipImportReducer,
  chain: processingChainReducer,
  searchSessions: searchSessionsReducer,
  searchSources: searchSourcesReducer,
  settings: settingsReducer,
})

export default oaisManagementReducer
