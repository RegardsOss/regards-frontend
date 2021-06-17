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
import { Locales } from '@regardsoss/form-utils'

/**
 * @author Théo Lasserre
 */
const messages = {
  'dashboard.title': 'Dashboard',
  'dashboard.refresh': 'Refresh',
  'dashboard.back': 'Back',

  // Sources
  'dashboard.sources.table.column.sourceName': 'Name',
  'dashboard.sources.table.column.referencedProducts': 'Referenced products',
  'dashboard.sources.table.column.diffusedProducts': 'Diffused products',
  'dashboard.sources.title': 'Sources',
  'dashboard.sources.filter.name': 'Search a name...',
  'dashboard.sources.filter.status': 'Status',
  'dashboard.sources.filter.status.all': 'All',
  'dashboard.sources.filter.status.ok': 'Ok',
  'dashboard.sources.filter.status.errors': 'Error',
  'dashboard.sources.filter.status.running': 'Running',
  'dashboard.sources.filter.status.waiting': 'Waiting',
  'dashboard.sources.table.empty': 'No source found',
  'dashboard.sources.table.option.select': 'Select the source',

  // Sessions
  'dashboard.sessions.table.empty': 'No session found',
  'dashboard.sessions.table.column.sessionName': 'Name',
  'dashboard.sessions.table.column.referencedProducts': 'Referenced products',
  'dashboard.sessions.table.column.diffusedProducts': 'Diffused products',
  'dashboard.sessions.title': 'Sessions',
  'dashboard.sessions.filter.name': 'Search a name...',
  'dashboard.sessions.filter.status': 'Status',
  'dashboard.sessions.table.option.select': 'Select the session',

  // Selected Session
  'dashboard.selectedsession.title': '{source} / {session}',
  'dashboard.selectedsession.close': 'Close',
  'dashboard.selectedsession.delete': 'Delete products',
  'dashboard.selectedsession.refresh': 'Refresh',
  'dashboard.selectedsession.dialog.delete.title': 'Delete session {sessionName} products ?',
  'dashboard.selectedsession.dialog.retry.title': 'Retry errors ?',
  'dashboard.selectedsession.acquisition.title': 'Acquisition {nbIn}/{nbOut}',
  'dashboard.selectedsession.acquisition.fp.totalRequests': 'Total requests : {value}',
  'dashboard.selectedsession.acquisition.fp.requestsErrors': 'Requests errors : {value}',
  'dashboard.selectedsession.acquisition.fp.generatedProducts': 'Generated products : {value}',
  'dashboard.selectedsession.acquisition.fp.requestsRefused': 'Refused requests : {value}',
  'dashboard.selectedsession.acquisition.fp.button.see-referenced': 'See referenced',
  'dashboard.selectedsession.acquisition.fp.button.see-errors': 'See error requests',
  'dashboard.selectedsession.acquisition.fp.button.retry-errors': 'Relaunch error requests',
  'dashboard.selectedsession.acquisition.dp.filesAcquired': 'Files acquired : {value}',
  'dashboard.selectedsession.acquisition.dp.incomplete': 'Incomplete : {value}',
  'dashboard.selectedsession.acquisition.dp.invalid': 'Invalid products : {value}',
  'dashboard.selectedsession.acquisition.dp.productsErrors': 'Products errors : {value}',
  'dashboard.selectedsession.acquisition.dp.generatedProducts': 'Generated produccts : {value}',
  'dashboard.selectedsession.acquisition.dp.button.see-errors': 'See errors',
  'dashboard.selectedsession.acquisition.dp.button.retry-errors': 'Relaunch errors',
  'dashboard.selectedsession.acquisition.dp.dialog.title': 'Products',
  'dashboard.selectedsession.acquisition.dp.dialog.button.close': 'Close',
  'dashboard.selectedsession.acquisition.dp.dialog.table.column.name': 'Name',
  'dashboard.selectedsession.acquisition.dp.dialog.table.column.error': 'Error',
  'dashboard.selectedsession.referencing.title': 'Referencing {nbIn}/{nbOut}',
  'dashboard.selectedsession.referencing.fem.referencingRequests': 'Referencing requests : {value}',
  'dashboard.selectedsession.referencing.fem.deleteRequests': 'Delete requests : {value}',
  'dashboard.selectedsession.referencing.fem.updateRequests': 'Update requests : {value}',
  'dashboard.selectedsession.referencing.fem.notifyRequests': 'Notify requests : {value}',
  'dashboard.selectedsession.referencing.fem.referencedProducts': 'Referenced products : {value}',
  'dashboard.selectedsession.referencing.fem.deletedProducts': 'Deleted products : {value}',
  'dashboard.selectedsession.referencing.fem.updatedProducts': 'Updated products : {value}',
  'dashboard.selectedsession.referencing.fem.notifyProducts': 'Notify products : {value}',
  'dashboard.selectedsession.referencing.fem.requestsErrors': 'Requests errors : {value}',
  'dashboard.selectedsession.referencing.fem.button.see-referenced': 'See referenced products',
  'dashboard.selectedsession.referencing.fem.button.see-errors': 'See errors',
  'dashboard.selectedsession.referencing.fem.button.retry-errors': 'Relaunch errors',
  'dashboard.selectedsession.referencing.ingest.totalRequests': 'Referencing requests : {value}',
  'dashboard.selectedsession.referencing.ingest.requestsErrors': 'Error requests : {value}',
  'dashboard.selectedsession.referencing.ingest.referencedProducts': 'Referenced products : {value}',
  'dashboard.selectedsession.referencing.ingest.newProductVersions': 'New versions : {value}',
  'dashboard.selectedsession.referencing.ingest.replacedProducts': 'Replaced : {value}',
  'dashboard.selectedsession.referencing.ingest.ignoredProducts': 'Ignored : {value}',
  'dashboard.selectedsession.referencing.ingest.productWaitVersionMode': 'Waiting administrator : {value}',
  'dashboard.selectedsession.referencing.ingest.button.see-referenced': 'See referenced products',
  'dashboard.selectedsession.referencing.ingest.button.see-waiting': 'See waiting',
  'dashboard.selectedsession.referencing.ingest.button.see-errors': 'See errors',
  'dashboard.selectedsession.referencing.ingest.button.retry-errors': 'Relaunch errors',
  'dashboard.selectedsession.storage.title': 'Storage {nbIn}/{nbOut}',
  'dashboard.selectedsession.storage.referenceRequests': 'Referenced requests : {value}',
  'dashboard.selectedsession.storage.storeRequests': 'Stored requests : {value}',
  'dashboard.selectedsession.storage.copyRequests': 'Copy requests : {value}',
  'dashboard.selectedsession.storage.deleteRequests': 'Delete requests : {value}',
  'dashboard.selectedsession.storage.requestsRefused': 'Requests refused : {value}',
  'dashboard.selectedsession.storage.requestsErrors': 'Requests errors : {value}',
  'dashboard.selectedsession.storage.storedFiles': 'Stored files : {value}',
  'dashboard.selectedsession.storage.referencedFiles': 'Referenced files : {value}',
  'dashboard.selectedsession.storage.deletedFiles': 'Deleted files : {value}',
  'dashboard.selectedsession.storage.button.see-stockage': 'See storages',
  'dashboard.selectedsession.diffusion.title': 'Diffusion {nbIn}/{nbOut}',
  'dashboard.selectedsession.diffusion.indexed': 'Indexed : {value}',
  'dashboard.selectedsession.diffusion.indexedError': 'Indexed error : {value}',
  'dashboard.selectedsession.diffusion.button.see-detail': 'See detail',

  ...Locales.en,
}

export default messages
