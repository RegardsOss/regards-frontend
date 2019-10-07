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
import { combineReducers } from 'redux'
import { aipReducer } from './clients/AIPClient'
import { aipTagReducer } from './clients/AIPTagClient'
import { tableReducer } from './clients/TableClient'
import { sipTableReducer } from './clients/SIPTableClient'
import { aipFileReducer } from './clients/AIPFileClient'
import { deleteAIPsOnSomeStoragesClientReducer } from './clients/DeleteAIPOnSomeStoragesClient'
import { deleteAIPsOnAllStoragesClientReducer } from './clients/DeleteAIPOnAllStoragesClient'
import { relaunchAIPsStorageReducer } from './clients/RelaunchAIPStorageClient'
import { relaunchSIPsReducer } from './clients/RelaunchSIPClient'
import { deleteSIPsReducer } from './clients/DeleteSIPClient'
import { searchSessionsReducer } from './clients/session/SearchSessionsClient'
import { searchSourcesReducer } from './clients/session/SearchSourcesClient'
import { sipReducer } from './clients/SIPClient'
import { sipSignalReducer } from './clients/SIPSignalClient'
import { sipImportReducer } from './clients/SIPImportClient'
import { sessionReducer } from './clients/SessionClient'
import { processingChainReducer } from './clients/ProcessingChainClient'

const oaisManagementReducer = combineReducers({
  aip: aipReducer,
  'aip-tag': aipTagReducer,
  'aip-file': aipFileReducer,
  'aip-table': tableReducer,
  'delete-aip-on-some-storages': deleteAIPsOnSomeStoragesClientReducer,
  'delete-aip-on-all-storages': deleteAIPsOnAllStoragesClientReducer,
  'relaunch-aip': relaunchAIPsStorageReducer,
  'sip-table': sipTableReducer,
  'relaunch-sip': relaunchSIPsReducer,
  'delete-sip': deleteSIPsReducer,
  sip: sipReducer,
  sipImport: sipImportReducer,
  sipSignal: sipSignalReducer,
  session: sessionReducer,
  chain: processingChainReducer,
  searchSessions: searchSessionsReducer,
  searchSources: searchSourcesReducer,
})

export default oaisManagementReducer
