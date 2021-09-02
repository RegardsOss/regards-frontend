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

  // Feature Manager
  // References
  'feature.references.switch-to.REFERENCES.label': 'Products ({productsNb})',
  'feature.references.switch-to.REFERENCES.label.loading': 'Products',
  'feature.references.switch-to.REFERENCES.title': 'See products',
  'feature.references.switch-to.EXTRACTION.label': 'Extractions ({productsNb})',
  'feature.references.switch-to.EXTRACTION.label.loading': 'Extractions',
  'feature.references.switch-to.EXTRACTION.title': 'See extractions',
  'feature.references.switch-to.CREATION.label': 'Creations ({productsNb})',
  'feature.references.switch-to.CREATION.label.loading': 'Creations',
  'feature.references.switch-to.CREATION.title': 'See creations',
  'feature.references.switch-to.UPDATE.label': 'Updates ({productsNb})',
  'feature.references.switch-to.UPDATE.label.loading': 'Updates',
  'feature.references.switch-to.UPDATE.title': 'see updates',
  'feature.references.switch-to.DELETION.label': 'Deleted ({productsNb})',
  'feature.references.switch-to.DELETION.label.loading': 'Deleted',
  'feature.references.switch-to.DELETION.title': 'See deleted',
  'feature.references.switch-to.NOTIFICATION.label': 'Notifications ({productsNb})',
  'feature.references.switch-to.NOTIFICATION.label.loading': 'Notifications',
  'feature.references.switch-to.NOTIFICATION.title': 'See notifications',
  'feature.references.list.table.headers.providerId': 'Provider ID',
  'feature.references.list.table.headers.lastUpdate': 'Last updated',
  'feature.references.list.table.headers.version': 'Version',
  'feature.references.tooltip.selection.delete': 'Delete product selection',
  'feature.references.list.filters.buttons.delete': 'Delete selection',
  'feature.references.title': 'Products (GeoJson)',
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
  'feature.references.loading.results': 'Loading products ...',
  'feature.references.delete.title': 'Delete selected products and its files on all storages',
  'feature.references.delete': 'Delete',
  'feature.references.confirm.delete.message': 'This processing is asynchronous, it will be effective after a certain delay. Once done, this processing will create deletion requests that you can follow in the Delete tab. Do you want to delete the selected product (s)',
  'feature.references.tooltip.selection.notify': 'Notify product selection',
  'feature.references.list.filters.buttons.notify': 'Notify selection',
  'feature.references.notify.title': 'Notify selected products',
  'feature.references.notify': 'Notify',
  'feature.references.notify.message': 'Do you want to notify the selected products to all configured recipients. These recipients are configured on the rs-notifier service, the configuration of which you can retrieve from the Microservice function of this UI.',
  'feature.references.detail.title': 'Detail',

  // Requests
  'feature.requests.empty.results': 'No request found',
  'feature.requests.loading.results': 'Loading requests ...',
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
  'feature.request.state.GRANTED': 'Granted',
  'feature.request.state.DENIED': 'Denied',
  'feature.request.state.SUCCESS': 'Success',
  'feature.request.state.ERROR': 'Erreor',
  'feature.request.step.LOCAL_DENIED': '',
  'feature.request.step.LOCAL_DELAYED': 'Delayed',
  'feature.request.step.LOCAL_SCHEDULED': 'Scheduled',
  'feature.request.step.LOCAL_ERROR': 'Local error',
  'feature.request.step.REMOTE_STORAGE_DELETION_REQUESTED': 'Deletion requested',
  'feature.request.step.REMOTE_STORAGE_REQUESTED': 'Storage requested',
  'feature.request.step.LOCAL_TO_BE_NOTIFIED': 'To be notified',
  'feature.request.step.REMOTE_NOTIFICATION_REQUESTED': 'Notification requested',
  'feature.request.step.REMOTE_NOTIFICATION_SUCCESS': 'Notification success',
  'feature.request.step.REMOTE_NOTIFICATION_ERROR': 'Notification error',
  'feature.request.step.REMOTE_CREATION_REQUESTED': 'Creation requested',
  'feature.request.step.REMOTE_CREATION_ERROR': 'Creation error',
  'feature.request.step.REMOTE_STORAGE_ERROR': 'Storage error',

  // Settings
  'feature.settings.title': 'GeoJson product manager settings',
  'feature.settings.subtitle': 'Configure settings',
  'feature.settings.field.activeNotifications': 'Enable notifications',
  'feature.settings.fieldgroup.dumpParameters': 'Dump parameters',
  'feature.settings.fieldgroup.dumpParameters.isActiveModule': 'Enable module',
  'feature.settings.fieldgroup.dumpParameters.cronTrigger': 'Cron trigger',
  'feature.settings.fieldgroup.dumpParameters.dumpLocation': 'Dump location',
  'feature.settings.field.lastDumpReqDate': 'Last dump request date',
  'feature.settings.action.confirm': 'Confirm',
  'feature.settings.action.cancel': 'Back',
  'feature.settings.field.cron.help.message':
  'The pattern is a list of six single space-separated fields: representing second, minute, hour, day, month, weekday. Month and weekday names can be given as the first three letters of the English names. Example patterns : ',
  'feature.settings.field.cron.help.message.example': '<ul>'
  + '<li> "0 0 * * * *" = the top of every hour of every day.</li>'
  + '<li> "*/10 * * * * *" = every ten seconds.</li>'
  + '<li> "0 0 8-10 * * *" = 8, 9 and 10 o\'clock of every day.</li>'
  + '<li> "0 0 6,19 * * *" = 6:00 AM and 7:00 PM every day.</li>'
  + '<li> "0 0/30 8-10 * * *" = 8:00, 8:30, 9:00, 9:30, 10:00 and 10:30 every day.</li>'
  + '<li> "0 0 9-17 * * MON-FRI" = on the hour nine-to-five weekdays.</li>'
  + '<li> "0 0 0 25 12 ?" = every Christmas Day at midnight.</li>'
  + '</ul>',
  'feature.settings.dialog.title': 'About this field',
  'feature.settings.dialog.close': 'Close',

  ...Locales.en,
}

export default messages
