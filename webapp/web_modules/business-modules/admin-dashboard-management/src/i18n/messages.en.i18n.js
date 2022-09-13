/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'dashboard.sessions.fetch.error': 'Unabled to retrieve session {selectedSessionId}',
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
  'dashboard.selectedsession.refresh': 'Refresh',
  'dashboard.selectedsession.dialog.confirm.action.message': 'Your request has been taken into account.',
  'dashboard.selectedsession.ACQUISITION.title': 'Acquisition',
  'dashboard.selectedsession.ACQUISITION.scan.title': 'Data Provider',
  'dashboard.selectedsession.ACQUISITION.workers.title': 'Worker Manager',
  'dashboard.selectedsession.ACQUISITION.subtitle': '{nbIn} -> {nbOut}',
  'dashboard.selectedsession.ACQUISITION.dp.filesAcquired': 'Acquired : {value}',
  'dashboard.selectedsession.ACQUISITION.dp.filesInvalid': 'Invalid : {value}',
  'dashboard.selectedsession.ACQUISITION.dp.incomplete': 'Incomplete : {value}',
  'dashboard.selectedsession.ACQUISITION.dp.invalid': 'Invalid : {value}',
  'dashboard.selectedsession.ACQUISITION.dp.productsErrors': 'Errors : {value}',
  'dashboard.selectedsession.ACQUISITION.dp.productsCanceled': 'Canceled : {value}',
  'dashboard.selectedsession.ACQUISITION.dp.generatedProducts': 'Generated : {value}',
  'dashboard.selectedsession.ACQUISITION.dp.filesAcquired.tooltip': '{value} file(s) detected',
  'dashboard.selectedsession.ACQUISITION.dp.filesInvalid.tooltip': '{value} file(s) invalid',
  'dashboard.selectedsession.ACQUISITION.dp.incomplete.tooltip': '{value} product(s) incomplete',
  'dashboard.selectedsession.ACQUISITION.dp.invalid.tooltip': '{value} product(s) invalid',
  'dashboard.selectedsession.ACQUISITION.dp.productsErrors.tooltip': '{value} product(s) in error',
  'dashboard.selectedsession.ACQUISITION.dp.generatedProducts.tooltip': '{value} product(s) generated',
  'dashboard.selectedsession.ACQUISITION.dp.productsCanceled.tooltip': '{value} product(s) canceled',
  'dashboard.selectedsession.ACQUISITION.dp.button.see-errors': 'See errors',
  'dashboard.selectedsession.ACQUISITION.dp.button.retry-errors': 'Relaunch errors',
  'dashboard.selectedsession.ACQUISITION.dp.dialog.title': 'Products with errors',
  'dashboard.selectedsession.ACQUISITION.dp.properties.input.title': 'Files',
  'dashboard.selectedsession.ACQUISITION.dp.properties.output.title': 'Products',
  'dashboard.selectedsession.ACQUISITION.dp.dialog.button.close': 'Close',
  'dashboard.selectedsession.ACQUISITION.dp.dialog.table.column.name': 'Name',
  'dashboard.selectedsession.ACQUISITION.dp.dialog.table.column.error': 'Error',
  'dashboard.selectedsession.ACQUISITION.dp.dialog.retry.title': 'Retry errors ?',
  'dashboard.selectedsession.ACQUISITION.dp.dialog.retry.message': 'You are about to restart the generation of the products in error. This action may take some time, you can see the progress of this relaunch by refreshing this page regularly.',
  'dashboard.selectedsession.ACQUISITION.workers.requests': 'Total : {value}',
  'dashboard.selectedsession.ACQUISITION.workers.no_worker_available': 'Waiting : {value}',
  'dashboard.selectedsession.ACQUISITION.workers.running': 'Running : {value}',
  'dashboard.selectedsession.ACQUISITION.workers.error': 'Errors: {value}',
  'dashboard.selectedsession.ACQUISITION.workers.done': 'Done : {value}',
  'dashboard.selectedsession.ACQUISITION.workers.running.tooltip': '{value} request(s) running',
  'dashboard.selectedsession.ACQUISITION.workers.error.tooltip': '{value} request(s) in error',
  'dashboard.selectedsession.ACQUISITION.workers.done.tooltip': '{value} request(s) done',
  'dashboard.selectedsession.ACQUISITION.workers.requests.tooltip': '{value} processing requests',
  'dashboard.selectedsession.ACQUISITION.workers.no_worker_available.tooltip': '{value} waiting requests',
  'dashboard.selectedsession.ACQUISITION.workers.button.see-errors': 'See errors',
  'dashboard.selectedsession.ACQUISITION.workers.button.retry-errors': 'Relaunch errors',
  'dashboard.selectedsession.ACQUISITION.workers.dialog.retry.title': 'Retry errors ?',
  'dashboard.selectedsession.ACQUISITION.workers.dialog.retry.message': 'You are about to re-launch all the requests in error. This action may take some time, you will be able to see the progress of this relaunch by refreshing this page regularly.',
  'dashboard.selectedsession.ACQUISITION.workers.properties.input.title': 'Requests',
  'dashboard.selectedsession.ACQUISITION.workers.properties.workers.title': '{value} (Requests)',
  'dashboard.selectedsession.REFERENCING.title': 'Referencing',
  'dashboard.selectedsession.REFERENCING.oais.title': 'Ingest',
  'dashboard.selectedsession.REFERENCING.feature.title': 'Feature Manager',
  'dashboard.selectedsession.REFERENCING.subtitle': '{nbIn} -> {nbOut}',
  'dashboard.selectedsession.REFERENCING.fem.referencingRequests': 'Referencing : {value}',
  'dashboard.selectedsession.REFERENCING.fem.deleteRequests': 'Delete : {value}',
  'dashboard.selectedsession.REFERENCING.fem.deniedReferencingRequests': 'Denied : {value}',
  'dashboard.selectedsession.REFERENCING.fem.updateRequests': 'Update : {value}',
  'dashboard.selectedsession.REFERENCING.fem.notifyRequests': 'Notify : {value}',
  'dashboard.selectedsession.REFERENCING.fem.referencedProducts': 'Referenced : {value}',
  'dashboard.selectedsession.REFERENCING.fem.deletedProducts': 'Deleted : {value}',
  'dashboard.selectedsession.REFERENCING.fem.updatedProducts': 'Updated : {value}',
  'dashboard.selectedsession.REFERENCING.fem.notifyProducts': 'Notified : {value}',
  'dashboard.selectedsession.REFERENCING.fem.requestsErrors': 'Errors : {value}',
  'dashboard.selectedsession.REFERENCING.fem.referencingRequests.tooltip': '{value} REFERENCING request(s) received',
  'dashboard.selectedsession.REFERENCING.fem.deleteRequests.tooltip': '{value} deletion request(s) received',
  'dashboard.selectedsession.REFERENCING.fem.deniedReferencingRequests.tooltip': '{value} request(s) denied',
  'dashboard.selectedsession.REFERENCING.fem.updateRequests.tooltip': '{value} update request(s) received',
  'dashboard.selectedsession.REFERENCING.fem.notifyRequests.tooltip': '{value} notification request(s) received',
  'dashboard.selectedsession.REFERENCING.fem.referencedProducts.tooltip': '{value} product(s) referenced',
  'dashboard.selectedsession.REFERENCING.fem.deletedProducts.tooltip': '{value} product(s) deleted',
  'dashboard.selectedsession.REFERENCING.fem.updatedProducts.tooltip': '{value} product(s) updated',
  'dashboard.selectedsession.REFERENCING.fem.notifyProducts.tooltip': '{value} product(s) notified',
  'dashboard.selectedsession.REFERENCING.fem.requestsErrors.tooltip': '{value} request(s) in error',
  'dashboard.selectedsession.REFERENCING.fem.properties.input.title': 'Requests',
  'dashboard.selectedsession.REFERENCING.fem.properties.output.title': 'Products',
  'dashboard.selectedsession.REFERENCING.fem.button.see-referenced': 'See referenced products',
  'dashboard.selectedsession.REFERENCING.fem.button.see-errors': 'See errors',
  'dashboard.selectedsession.REFERENCING.fem.button.retry-errors': 'Relaunch errors',
  'dashboard.selectedsession.REFERENCING.fem.dialog.retry.title': 'Retry errors ?',
  'dashboard.selectedsession.REFERENCING.fem.dialog.retry.message': 'You are about to re-launch all the requests in error (referrer / Deletions / update and notification). This action may take some time, you will be able to see the progress of this relaunch by refreshing this page regularly.',
  'dashboard.selectedsession.REFERENCING.ingest.totalRequests': 'Referencing : {value}',
  'dashboard.selectedsession.REFERENCING.ingest.requestsErrors': 'Errors : {value}',
  'dashboard.selectedsession.REFERENCING.ingest.referencedProducts': 'Referenced : {value}',
  'dashboard.selectedsession.REFERENCING.ingest.deletedProducts': 'Deleted: {value}',
  'dashboard.selectedsession.REFERENCING.ingest.newProductVersions': 'New versions : {value}',
  'dashboard.selectedsession.REFERENCING.ingest.replacedProducts': 'Replaced : {value}',
  'dashboard.selectedsession.REFERENCING.ingest.ignoredProducts': 'Ignored : {value}',
  'dashboard.selectedsession.REFERENCING.ingest.productWaitVersionMode': 'Waiting administrator : {value}',
  'dashboard.selectedsession.REFERENCING.ingest.totalRequests.tooltip': '{value} REFERENCING request(s) received',
  'dashboard.selectedsession.REFERENCING.ingest.requestsErrors.tooltip': '{value} REFERENCING request(s) in error',
  'dashboard.selectedsession.REFERENCING.ingest.referencedProducts.tooltip': '{value} product(s) referenced',
  'dashboard.selectedsession.REFERENCING.ingest.deletedProducts.tooltip': '{value} product(s) deleted',
  'dashboard.selectedsession.REFERENCING.ingest.newProductVersions.tooltip': '{value} product(s) with a new version',
  'dashboard.selectedsession.REFERENCING.ingest.replacedProducts.tooltip': '{value} product(s) remplaced',
  'dashboard.selectedsession.REFERENCING.ingest.ignoredProducts.tooltip': '{value} product(s) ignored',
  'dashboard.selectedsession.REFERENCING.ingest.productWaitVersionMode.tooltip': '{value} product(s) waiting for admin',
  'dashboard.selectedsession.REFERENCING.ingest.properties.input.title': 'Requests',
  'dashboard.selectedsession.REFERENCING.ingest.properties.output.title': 'Products',
  'dashboard.selectedsession.REFERENCING.ingest.button.see-referenced': 'See referenced products',
  'dashboard.selectedsession.REFERENCING.ingest.button.see-errors': 'See errors',
  'dashboard.selectedsession.REFERENCING.ingest.button.retry-errors': 'Relaunch errors',
  'dashboard.selectedsession.REFERENCING.ingest.dialog.retry.title': 'Retry errors ?',
  'dashboard.selectedsession.REFERENCING.ingest.dialog.retry.message': 'You are about to relaunch the generation of the products in errors and / or the STORAGE.archival / reference of the associated files. This action may take some time, you can see the progress of this relaunch by refreshing this page regularly.',
  'dashboard.selectedsession.STORAGE.title': 'Storage',
  'dashboard.selectedsession.STORAGE.storage.title': 'Storage',
  'dashboard.selectedsession.STORAGE.subtitle': '{nbIn} -> {nbOut}',
  'dashboard.selectedsession.STORAGE.archival.referenceRequests': 'Referenced : {value}',
  'dashboard.selectedsession.STORAGE.archival.storeRequests': 'Stored : {value}',
  'dashboard.selectedsession.STORAGE.archival.copyRequests': 'Copy : {value}',
  'dashboard.selectedsession.STORAGE.archival.deleteRequests': 'Delete : {value}',
  'dashboard.selectedsession.STORAGE.archival.requestsRefused': 'Refused : {value}',
  'dashboard.selectedsession.STORAGE.archival.requestsErrors': 'Errors : {value}',
  'dashboard.selectedsession.STORAGE.archival.storedFiles': 'Stored : {value}',
  'dashboard.selectedsession.STORAGE.archival.referencedFiles': 'Referenced : {value}',
  'dashboard.selectedsession.STORAGE.archival.deletedFiles': 'Deleted : {value}',
  'dashboard.selectedsession.STORAGE.archival.referenceRequests.tooltip': '{value} REFERENCING request(s)',
  'dashboard.selectedsession.STORAGE.archival.storeRequests.tooltip': '{value} archival request(s)',
  'dashboard.selectedsession.STORAGE.archival.copyRequests.tooltip': '{value} copy request(s)',
  'dashboard.selectedsession.STORAGE.archival.deleteRequests.tooltip': '{value} deletion request(s)',
  'dashboard.selectedsession.STORAGE.archival.requestsRefused.tooltip': '{value} refused request(s)',
  'dashboard.selectedsession.STORAGE.archival.requestsErrors.tooltip': '{value} request(s) in error',
  'dashboard.selectedsession.STORAGE.archival.storedFiles.tooltip': '{value} stored file(s) in archival',
  'dashboard.selectedsession.STORAGE.archival.referencedFiles.tooltip': '{value} referenced files in archival',
  'dashboard.selectedsession.STORAGE.archival.deletedFiles.tooltip': '{value} fichier(s) deleted files in archival',
  'dashboard.selectedsession.STORAGE.archival.properties.input.title': 'Requests',
  'dashboard.selectedsession.STORAGE.archival.properties.output.title': 'Files',
  'dashboard.selectedsession.STORAGE.archival.button.retry-errors': 'Relaunch errors',
  'dashboard.selectedsession.STORAGE.archival.dialog.retry.title': 'Retry errors ?',
  'dashboard.selectedsession.STORAGE.archival.dialog.retry.message': 'You are about to rerun all failed requests (store / reference / deletes and copies). This action may take some time, you can see the progress of this relaunch by refreshing this page regularly.',
  'dashboard.selectedsession.DISSEMINATION.title': 'Notification',
  'dashboard.selectedsession.DISSEMINATION.catalog.title': 'Internal',
  'dashboard.selectedsession.DISSEMINATION.subtitle': '{nbIn} -> {nbOut}',
  'dashboard.selectedsession.DISSEMINATION.diffusion.indexed': 'Indexed : {value}',
  'dashboard.selectedsession.DISSEMINATION.diffusion.indexedError': 'Indexed error : {value}',
  'dashboard.selectedsession.DISSEMINATION.diffusion.indexed.tooltip': '{value} product(s) diffused',
  'dashboard.selectedsession.DISSEMINATION.diffusion.indexedError.tooltip': '{value} product(s) could not be diffused',
  'dashboard.selectedsession.DISSEMINATION.fem_dissemination.properties.input.title': 'Requests',
  'dashboard.selectedsession.DISSEMINATION.diffusion.properties.output.title': 'Products',
  'dashboard.selectedsession.DISSEMINATION.fem_dissemination.title': 'External',
  'dashboard.selectedsession.DISSEMINATION.fem_dissemination.table.column.name': 'Recipient',
  'dashboard.selectedsession.DISSEMINATION.fem_dissemination.table.column.pending': 'Pending',
  'dashboard.selectedsession.DISSEMINATION.fem_dissemination.table.column.done': 'Done',

  ...Locales.en,
}

export default messages
