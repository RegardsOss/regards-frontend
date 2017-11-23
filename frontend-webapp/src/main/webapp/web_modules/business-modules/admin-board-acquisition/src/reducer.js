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
import { combineReducers } from 'redux'
import { connectionDataManagementReducer } from '@regardsoss/admin-data-connection-management'
import { datasourceDataManagementReducer } from '@regardsoss/admin-data-datasource-management'
import { documentDataManagementReducer } from '@regardsoss/admin-data-document-management'
import { processingChainManagementReducer } from '@regardsoss/admin-ingest-processing-chain-management'
import { sipManagementReducer } from '@regardsoss/admin-ingest-sip-management'

const acquisitionReducers = combineReducers({
  connection: connectionDataManagementReducer,
  datasource: datasourceDataManagementReducer,
  document: documentDataManagementReducer,
  'processing-chain-management': processingChainManagementReducer,
  'sip-management': sipManagementReducer,
})


export default acquisitionReducers
