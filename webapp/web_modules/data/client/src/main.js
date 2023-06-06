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
 */

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
import * as AccessInstanceCl from './rs-access-instance'
import * as AccessProjectCl from './rs-access-project'
import * as AdminCl from './rs-admin'
import * as AdminInstanceCl from './rs-admin-instance'
import * as AuthenticationCl from './rs-authentication'
import * as CatalogCl from './rs-catalog'
import * as CommonCl from './rs-common'
import * as FeatureManagementCl from './rs-fem'
import * as DataManagementCl from './rs-dam'
import * as DataProviderCl from './rs-data-provider'
import * as IngestCl from './rs-ingest'
import * as OrderCl from './rs-order'
import * as NotifierCl from './rs-notifier'
import * as ProcessingCl from './rs-processing'
import * as StorageCl from './rs-storage'
import * as UICl from './ui'
import * as WorkerCl from './rs-worker'
import * as LTACl from './rs-lta'

export const AccessInstanceClient = AccessInstanceCl
export const AccessProjectClient = AccessProjectCl
export const AdminClient = AdminCl
export const AdminInstanceClient = AdminInstanceCl
export const AuthenticationClient = AuthenticationCl
export const CatalogClient = CatalogCl
export const CommonClient = CommonCl
export const FeatureManagementClient = FeatureManagementCl
export const DataManagementClient = DataManagementCl
export const DataProviderClient = DataProviderCl
export const IngestClient = IngestCl
export const OrderClient = OrderCl
export const NotifierClient = NotifierCl
export const ProcessingClient = ProcessingCl
export const StorageClient = StorageCl
export const UIClient = UICl
export const WorkerClient = WorkerCl
export const LTAClient = LTACl
