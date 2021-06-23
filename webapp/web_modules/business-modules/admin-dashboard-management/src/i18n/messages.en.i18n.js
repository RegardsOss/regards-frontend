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
  'dashboard.table.icon.tooltip.running': 'Running',
  'dashboard.table.icon.tooltip.waiting': 'Waiting',
  'dashboard.table.icon.tooltip.errors': 'Error',

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
  'dashboard.selectedsession.dialog.delete.message': 'You are about to request the deletion of all products in the selected session. This request will be taken into account by each component of the session. It may take a while for the deletion request to be done. You can refresh the state of the session regularly to see how it has been taken into account.',
  'dashboard.selectedsession.dialog.retry.title': 'Retry errors ?',
  'dashboard.selectedsession.acquisition.title': 'Acquisition {nbIn} -> {nbOut}',
  'dashboard.selectedsession.acquisition.fp.totalRequests': 'Acquisitions : {value}',
  'dashboard.selectedsession.acquisition.fp.requestsErrors': 'Errors : {value}',
  'dashboard.selectedsession.acquisition.fp.generatedProducts': 'Generated : {value}',
  'dashboard.selectedsession.acquisition.fp.requestsRefused': 'Refused : {value}',
  'dashboard.selectedsession.acquisition.fp.properties.requests.title': 'Requests',
  'dashboard.selectedsession.acquisition.fp.properties.products.title': 'Products',
  'dashboard.selectedsession.acquisition.fp.button.see-referenced': 'See referenced',
  'dashboard.selectedsession.acquisition.fp.button.see-errors': 'See error requests',
  'dashboard.selectedsession.acquisition.fp.button.retry-errors': 'Relaunch error requests',
  'dashboard.selectedsession.acquisition.dp.filesAcquired': 'Acquired : {value}',
  'dashboard.selectedsession.acquisition.dp.incomplete': 'Incomplete : {value}',
  'dashboard.selectedsession.acquisition.dp.invalid': 'Invalid : {value}',
  'dashboard.selectedsession.acquisition.dp.productsErrors': 'Errors : {value}',
  'dashboard.selectedsession.acquisition.dp.generatedProducts': 'Generated : {value}',
  'dashboard.selectedsession.acquisition.dp.button.see-errors': 'See errors',
  'dashboard.selectedsession.acquisition.dp.button.retry-errors': 'Relaunch errors',
  'dashboard.selectedsession.acquisition.dp.dialog.title': 'Products',
  'dashboard.selectedsession.acquisition.dp.properties.files.title': 'Files',
  'dashboard.selectedsession.acquisition.dp.properties.products.title': 'Products',
  'dashboard.selectedsession.acquisition.dp.dialog.button.close': 'Close',
  'dashboard.selectedsession.acquisition.dp.dialog.table.column.name': 'Name',
  'dashboard.selectedsession.acquisition.dp.dialog.table.column.error': 'Error',
  'dashboard.selectedsession.referencing.title': 'Referencing {nbIn} -> {nbOut}',
  'dashboard.selectedsession.referencing.fem.referencingRequests': 'Referencing : {value}',
  'dashboard.selectedsession.referencing.fem.deleteRequests': 'Delete : {value}',
  'dashboard.selectedsession.referencing.fem.updateRequests': 'Update : {value}',
  'dashboard.selectedsession.referencing.fem.notifyRequests': 'Notify : {value}',
  'dashboard.selectedsession.referencing.fem.referencedProducts': 'Referenced : {value}',
  'dashboard.selectedsession.referencing.fem.deletedProducts': 'Deleted : {value}',
  'dashboard.selectedsession.referencing.fem.updatedProducts': 'Updated : {value}',
  'dashboard.selectedsession.referencing.fem.notifyProducts': 'Notified : {value}',
  'dashboard.selectedsession.referencing.fem.requestsErrors': 'Errors : {value}',
  'dashboard.selectedsession.referencing.fem.properties.requests.title': 'Requests',
  'dashboard.selectedsession.referencing.fem.properties.products.title': 'Products',
  'dashboard.selectedsession.referencing.fem.button.see-referenced': 'See referenced products',
  'dashboard.selectedsession.referencing.fem.button.see-errors': 'See errors',
  'dashboard.selectedsession.referencing.fem.button.retry-errors': 'Relaunch errors',
  'dashboard.selectedsession.referencing.ingest.totalRequests': 'Referencing : {value}',
  'dashboard.selectedsession.referencing.ingest.requestsErrors': 'Errors : {value}',
  'dashboard.selectedsession.referencing.ingest.referencedProducts': 'Referenced : {value}',
  'dashboard.selectedsession.referencing.ingest.deletedProducts': 'Deleted: {value}',
  'dashboard.selectedsession.referencing.ingest.newProductVersions': 'New versions : {value}',
  'dashboard.selectedsession.referencing.ingest.replacedProducts': 'Replaced : {value}',
  'dashboard.selectedsession.referencing.ingest.ignoredProducts': 'Ignored : {value}',
  'dashboard.selectedsession.referencing.ingest.productWaitVersionMode': 'Waiting administrator : {value}',
  'dashboard.selectedsession.referencing.ingest.properties.requests.title': 'Requests',
  'dashboard.selectedsession.referencing.ingest.properties.products.title': 'Products',
  'dashboard.selectedsession.referencing.ingest.button.see-referenced': 'See referenced products',
  'dashboard.selectedsession.referencing.ingest.button.see-waiting': 'See waiting',
  'dashboard.selectedsession.referencing.ingest.button.see-errors': 'See errors',
  'dashboard.selectedsession.referencing.ingest.button.retry-errors': 'Relaunch errors',
  'dashboard.selectedsession.storage.title': 'Storage {nbIn} -> {nbOut}',
  'dashboard.selectedsession.storage.referenceRequests': 'Referenced : {value}',
  'dashboard.selectedsession.storage.storeRequests': 'Stored : {value}',
  'dashboard.selectedsession.storage.copyRequests': 'Copy : {value}',
  'dashboard.selectedsession.storage.deleteRequests': 'Delete : {value}',
  'dashboard.selectedsession.storage.requestsRefused': 'Refused : {value}',
  'dashboard.selectedsession.storage.requestsErrors': 'Errors : {value}',
  'dashboard.selectedsession.storage.storedFiles': 'Stored : {value}',
  'dashboard.selectedsession.storage.referencedFiles': 'Referenced : {value}',
  'dashboard.selectedsession.storage.deletedFiles': 'Deleted : {value}',
  'dashboard.selectedsession.storage.properties.requests.title': 'Requests',
  'dashboard.selectedsession.storage.properties.files.title': 'Files',
  'dashboard.selectedsession.storage.button.see-stockage': 'See storages',
  'dashboard.selectedsession.storage.button.retry-errors': 'Relaunch errors',
  'dashboard.selectedsession.diffusion.title': 'Diffusion {nbIn} -> {nbOut}',
  'dashboard.selectedsession.diffusion.indexed': 'Indexed : {value}',
  'dashboard.selectedsession.diffusion.indexedError': 'Indexed error : {value}',
  'dashboard.selectedsession.diffusion.properties.products.title': 'Products',
  'dashboard.selectedsession.diffusion.button.see-detail': 'See detail',

  ...Locales.en,
}

export default messages
