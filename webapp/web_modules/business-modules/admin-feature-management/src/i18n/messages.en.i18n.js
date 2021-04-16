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
 * @author Sébastien Binda
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

  // Feature Manager
  // References
  'feature.references.switch-to.references.label': 'Products ({productsNb})',
  'feature.references.switch-to.references.title': 'See products',
  'feature.references.switch-to.extraction.label': 'Extractions ({productsNb})',
  'feature.references.switch-to.extraction.title': 'See extractions',
  'feature.references.switch-to.creation.label': 'Creations ({productsNb})',
  'feature.references.switch-to.creation.title': 'See creations',
  'feature.references.switch-to.update.label': 'Updates ({productsNb})',
  'feature.references.switch-to.update.title': 'see updates',
  'feature.references.switch-to.delete.label': 'Deleted ({productsNb})',
  'feature.references.switch-to.delete.title': 'See deleted',
  'feature.references.switch-to.notification.label': 'Notifications ({productsNb})',
  'feature.references.switch-to.notification.title': 'See notifications',
  'feature.references.list.table.headers.providerId': 'Provider ID',
  'feature.references.list.table.headers.lastUpdate': 'Last updated',
  'feature.references.list.table.headers.version': 'Version',
  'feature.references.tooltip.selection.delete': 'Delete product selection',
  'feature.references.list.filters.buttons.delete': 'Delete selection',
  'feature.references.title': 'References',
  'feature.button.back': 'Back',
  'feature.close': 'Close',
  'feature.references.list.filters.source': 'Source',
  'feature.references.list.filters.session': 'Session',
  'feature.references.tooltip.providerId': 'Enter a subset of the provider ID',
  'feature.references.list.filters.providerId': 'Provider ID',
  'feature.references.list.filters.from.label': 'From',
  'feature.references.list.filters.to.label': 'To',
  'feature.references.tooltip.details': 'Show product details',
  'feature.references.tooltip.delete': 'Delete product',
  'feature.references.tooltip.notify': 'Notify product',
  'feature.references.list.filters.actions': 'Actions',
  'feature.references.empty.results': 'No product found',
  'feature.references.delete.title': 'Delete selected products and its files on all storages',
  'feature.references.delete': 'Delete',
  'feature.references.confirm.delete.message': 'Do you want to delete the selected product(s)',
  'feature.references.tooltip.selection.notify': 'Notify product selection',
  'feature.references.list.filters.buttons.notify': 'Notify selection',
  'feature.references.notify.title': 'Notify selected references',
  'feature.references.notify': 'Notify',
  'feature.references.notify.message': 'Do you want to notify selected references',

  // Requests
  'feature.requests.empty.results': 'No request found',
  'feature.requests.list.filters.state': 'State',
  'feature.requests.tooltip.selection.retry': 'Retry request selection',
  'feature.requests.list.filters.buttons.retry': 'Retry selection',
  'feature.requests.tooltip.selection.delete': 'Delete request selection',
  'feature.requests.list.filters.buttons.delete': 'Delete selection',
  'feature.requests.list.filters.providerId': 'Provider ID',
  'feature.requests.list.filters.id': 'Id',
  'feature.requests.list.filters.lastSubmission': 'Last submission',
  'feature.requests.list.filters.actions': 'Actions',
  'feature.requests.retry.title': 'Retry request',
  'feature.requests.delete.title': 'Delete request',
  'feature.requests.retry': 'Retry',
  'feature.request.retry.title': 'Retry',
  'feature.requests.confirm.retry.message': 'Do you want to retry the selected request(s)',
  'feature.requests.status.any': 'Any status',
  'feature.requests.status.GRANTED': 'GRANTED',
  'feature.requests.status.DENIED': 'DENIED',
  'feature.requests.status.ERROR': 'ERROR',
  'feature.requests.confirmDeleteDialog.title': 'Deletion request made',
  'feature.requests.confirmDeleteDialog.message.ok': 'Deletion of selected requests successfully completed.',
  'feature.requests.confirmDeleteDialog.message.not-ok': 'The maximum number of requests to delete has been exceeded. {totalHandled} request(s) deleted. Rerun the deletion of the remaining requests.',
  'feature.requests.confirmRetryDialog.title': 'Retry request made',
  'feature.requests.confirmRetryDialog.message.ok': 'Relaunch of selected requests successfully completed.',
  'feature.requests.confirmRetryDialog.message.not-ok': 'The maximum number of requests to relaunch has been exceeded. {totalHandled} request(s) restarted. Relaunch the remaining requests.',
  'feature.request.error.title': 'Errors',

  ...Locales.en,
}

export default messages
