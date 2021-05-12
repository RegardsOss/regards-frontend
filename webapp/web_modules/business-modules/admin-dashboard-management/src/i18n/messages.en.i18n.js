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
  'dashboard.selectedsession.acquisition.title': 'Acquisition',
  'dashboard.selectedsession.acquisition.fem.in': 'Acquisition requests : {nbIn}',
  'dashboard.selectedsession.acquisition.fem.refused': 'Requests refused : {nbRefused}',
  'dashboard.selectedsession.acquisition.fem.error': 'Requests error : {nbError}',
  'dashboard.selectedsession.acquisition.fem.acquired': 'Products acquired : {nbAcquired}',
  'dashboard.selectedsession.acquisition.fem.button.see-errors': 'See error requests',
  'dashboard.selectedsession.acquisition.fem.button.retry-errors': 'Relaunch error requests',
  'dashboard.selectedsession.acquisition.dp.in': 'Detected files : {nbIn}',
  'dashboard.selectedsession.acquisition.dp.incomplete': 'Incomplete products: {nbIncomplete}',
  'dashboard.selectedsession.acquisition.dp.invalid': 'Invalid products: {nbInvalid}',
  'dashboard.selectedsession.acquisition.dp.error': 'Errors: {nbError}',
  'dashboard.selectedsession.acquisition.dp.acquired': 'Acquired products: {nbAcquired}',
  'dashboard.selectedsession.acquisition.dp.button.see-errors': 'See errors',
  'dashboard.selectedsession.acquisition.dp.button.retry-errors': 'Relaunch errors',
  'dashboard.selectedsession.acquisition.dp.dialog.title': 'Products',
  'dashboard.selectedsession.acquisition.dp.dialog.button.close': 'Close',
  'dashboard.selectedsession.acquisition.dp.dialog.table.column.name': 'Name',
  'dashboard.selectedsession.acquisition.dp.dialog.table.column.error': 'Error',
  'dashboard.selectedsession.referencing.title': 'Referencing',
  'dashboard.selectedsession.referencing.fem.in': 'Referencing requests : {nbIn}',
  'dashboard.selectedsession.referencing.fem.suppress': 'Suppression requests : {nbSuppress}',
  'dashboard.selectedsession.referencing.fem.maj': 'Update requests : {nbMaj}',
  'dashboard.selectedsession.referencing.fem.error': 'Error requests : {nbError}',
  'dashboard.selectedsession.referencing.fem.refused': 'Refused requests : {nbRefused}',
  'dashboard.selectedsession.referencing.fem.referenced': 'Referenced products : {nbReferenced}',
  'dashboard.selectedsession.referencing.fem.button.see-referenced': 'See referenced products',
  'dashboard.selectedsession.referencing.fem.button.see-errors': 'See errors',
  'dashboard.selectedsession.referencing.fem.button.retry-errors': 'Relaunch errors',
  'dashboard.selectedsession.referencing.dp.totalRequests': 'Referencing requests : {value}',
  'dashboard.selectedsession.referencing.dp.requestsErrors': 'Error requests : {value}',
  'dashboard.selectedsession.referencing.dp.generatedProducts': 'Referenced products : {value}',
  'dashboard.selectedsession.referencing.dp.newProductVersions': 'New versions : {value}',
  'dashboard.selectedsession.referencing.dp.replacedProducts': 'Replaced : {value}',
  'dashboard.selectedsession.referencing.dp.ignoredProducts': 'Ignored : {value}',
  'dashboard.selectedsession.referencing.dp.productWaitVersionMode': 'Waiting administrator : {value}',
  'dashboard.selectedsession.referencing.dp.button.see-referenced': 'See referenced products',
  'dashboard.selectedsession.referencing.dp.button.see-waiting': 'See waiting',
  'dashboard.selectedsession.referencing.dp.button.see-errors': 'See errors',
  'dashboard.selectedsession.referencing.dp.button.retry-errors': 'Relaunch errors',
  'dashboard.selectedsession.storage.title': 'Storage',
  'dashboard.selectedsession.storage.dp.in': 'Storage requests : {nbIn}',
  'dashboard.selectedsession.storage.dp.error': 'Error requests : {nbError}',
  'dashboard.selectedsession.storage.dp.stored': 'Stored products : {nbStored}',
  'dashboard.selectedsession.storage.dp.button.see-stockage': 'See storages',
  'dashboard.selectedsession.diffusion.title': 'Diffusion',
  'dashboard.selectedsession.diffusion.out': 'Diffused produtcs : {nbOut}',
  'dashboard.selectedsession.diffusion.dp.error': 'Errors : {nbError}',
  'dashboard.selectedsession.diffusion.button.see-detail': 'See detail',

  ...Locales.en,
}

export default messages
