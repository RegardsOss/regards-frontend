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
 */
import AccessInstanceClient from './rs-access-instance/main'
import AccessProjectClient from './rs-access-project/main'
import AdminClient from './rs-admin'
import AuthenticationClient from './rs-authentication'
import CatalogClient from './rs-catalog'
import CommonClient from './rs-common'
import DataManagementClient from './rs-dam'
import DataProviderClient from './rs-data-provider'
import OrderClient from './rs-order'
import StorageClient from './rs-storage'
import IngestClient from './rs-ingest'


/**
 * Module Client exports all the common REST API Client to request informations from REGARDS backend server.
 * One client is created per microservice.
 * A client is composed with 3 components :
 * - Actions : allow to submit redux api actions to request informations from server.
 * - Reducers : allow to add into the redux store the results of the actions.
 * - Selectors : allow to retrieve from the redux store the results of the actions.
 *
 * The reducers are normally only used to initialize the global application Redux Store.
 * From the other modules of this application ou should only use Actions and Selectors.
 *
 */
module.exports = {
  AccessInstanceClient,
  AccessProjectClient,
  AuthenticationClient,
  AdminClient,
  CatalogClient,
  CommonClient,
  DataManagementClient,
  DataProviderClient,
  OrderClient,
  StorageClient,
  IngestClient,
}

