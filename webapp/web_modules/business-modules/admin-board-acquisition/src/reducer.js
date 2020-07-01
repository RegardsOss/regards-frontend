/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { processingChainManagementReducer } from '@regardsoss/admin-ingest-processing-chain-management'
import { storageManagementReducer } from '@regardsoss/admin-storage-management'
import { dataProviderManagementReducer } from '@regardsoss/admin-data-provider-management'
import { oaisManagementReducer } from '@regardsoss/admin-oais-management'

const acquisitionReducers = combineReducers({
  connection: connectionDataManagementReducer,
  dataProvider: dataProviderManagementReducer,
  datasource: datasourceDataManagementReducer,
  processingChain: processingChainManagementReducer,
  storage: storageManagementReducer,
  oais: oaisManagementReducer,
})

export default acquisitionReducers
