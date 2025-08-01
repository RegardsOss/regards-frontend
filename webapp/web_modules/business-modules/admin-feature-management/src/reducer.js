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
import { referencesReducer, referencesReducerCount } from './clients/ReferencesClient'
import { searchSessionsReducer } from './clients/SearchSessionsClient'
import { searchSourcesReducer } from './clients/SearchSourcesClient'
import { referencesTableReducer } from './clients/ReferencesTableClient'
import { referenceDeleteReducer } from './clients/ReferencesDeleteClient'
import { requestDeleteReducer } from './clients/RequestDeleteClient'
import { requestRetryReducer } from './clients/RequestRetryClient'
import { referenceNotifyReducer } from './clients/ReferencesNotifyClient'
import { creationRequestReducer, creationRequestReducerCount } from './clients/CreationRequestsClient'
import { creationRequestsTableReducer } from './clients/CreationRequestsTableClient'
import { updateRequestReducer, updateRequestReducerCount } from './clients/UpdateRequestsClient'
import { updateRequestsTableReducer } from './clients/UpdateRequestsTableClient'
import { deleteRequestReducer, deleteRequestReducerCount } from './clients/DeleteRequestsClient'
import { deleteRequestsTableReducer } from './clients/DeleteRequestsTableClient'
import { notificationRequestReducer, notificationRequestReducerCount } from './clients/NotificationRequestsClient'
import { notificationRequestsTableReducer } from './clients/NotificationRequestsTableClient'
import { settingsReducer } from './clients/SettingsClient'
import { filtersReducer } from './clients/FiltersClient'
import { referenceRecipientsReducer } from './clients/ReferenceRecipientsClient'

/**
 * @author Théo Lasserre
 */
const featureManagementReducer = combineReducers({
  references: referencesReducer,
  referencesCount: referencesReducerCount,
  searchSessions: searchSessionsReducer,
  searchSources: searchSourcesReducer,
  referencesTable: referencesTableReducer,
  referencesDelete: referenceDeleteReducer,
  referenceNotify: referenceNotifyReducer,
  requestDelete: requestDeleteReducer,
  requestRetry: requestRetryReducer,
  creationRequests: creationRequestReducer,
  creationRequestsCount: creationRequestReducerCount,
  'creation-requests-table': creationRequestsTableReducer,
  updateRequests: updateRequestReducer,
  updateRequestsCount: updateRequestReducerCount,
  'update-requests-table': updateRequestsTableReducer,
  deleteRequests: deleteRequestReducer,
  deleteRequestsCount: deleteRequestReducerCount,
  'delete-requests-table': deleteRequestsTableReducer,
  notificationRequests: notificationRequestReducer,
  notificationRequestsCount: notificationRequestReducerCount,
  'notification-requests-table': notificationRequestsTableReducer,
  settings: settingsReducer,
  featureFilters: filtersReducer,
  referenceRecipients: referenceRecipientsReducer,
})

export default featureManagementReducer
