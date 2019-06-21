/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const messages = Object.assign({
  'aips.list.subtitle': 'List of AIPs for selected session',
  'aips.list.filters.data.storage.label': 'Stored on',
  'aips.list.filters.status.label': 'Status',
  'aips.list.filters.providerId.label': 'Provider id',
  'aips.list.filters.from.label': 'From',
  'aips.list.filters.to.label': 'To',
  'aips.list.filters.tag.label': 'Tags',
  'aips.list.remove-tag.button': 'Delete tag',
  'aips.list.add-tag.button': 'Add tag',
  'aips.list.table.headers.providerId': 'Provider id',
  'aips.list.table.headers.type': 'Type',
  'aips.list.table.headers.state': 'State',
  'aips.list.table.headers.data.storages': 'Stored on',
  'aips.list.table.headers.lastUpdate': 'Last updated',
  'aips.list.table.headers.nbFiles': 'Number of files',
  'aips.list.aip-details.title': 'AIP details',
  'aips.list.aip-history.title': 'AIP History',
  'aips.list.aip-retry.title': 'Retry AIP storage',
  'aips.list.delete.files.on.all.storages.label': 'Full delete',
  'aips.list.delete.files.on.all.storages.title': 'Delete selected AIP and its files on all storages',
  'aips.list.delete.files.on.some.storages.label': 'Partial delete',
  'aips.list.delete.files.on.some.storages.title': 'Delete selected AIP files on storage spaces...',
  'aips.list.empty.title': 'No entities found',
  'aips.list.snackbar.job-remove-tag': 'Delete tag job is running',
  'aips.list.snackbar.job-remove-tag-failed': 'Delete tag job cannot be run',
  'aips.list.snackbar.job-add-tag': 'Add tag job is running',
  'aips.list.snackbar.job-add-tag-failed': 'Add tag job cannot be run',
  'aips.list.snackbar.job-failed': 'Error : a job of the same kind is already running',

  'aip.confirm.delete.title': 'Delete AIP',
  'aip.confirm.delete.message': 'Do you want to fully delete selected AIP on all storage spaces?',
  'aip.confirm.delete.aip': 'Delete',
  'aip.cancel.delete': 'Cancel',

  'aip.delete.on.storages.title': 'Delete selected AIP files',
  'aip.delete.on.storages.message': 'On which storage spaces should the selected AIP files be deleted? AIP will be deleted on checked storage spaces only if they are still available on a storage space after the operation.',
  'aip.delete.on.selected.storages.messages': 'Selected AIP files will be deleted on the following data storages: {datastorages}. Perform deletion?',
  'aip.delete.on.selected.storages.label.separator': ', ',
  'aip.confirm.delete.on.storages': 'Delete',
  'aip.cancel.delete.on.storages': 'Cancel',

  'aip.details.button.close': 'Close',

  'aips.session.title': 'Sessions',
  'aips.session.aips.title': 'Session {session}',
  'aips.session.subtitle': 'Select the session associated to the AIPs you want to view.',
  'aips.session.filter.name.label': 'Name',
  'aips.session.filter.from.label': 'From',
  'aips.session.filter.to.label': 'To',
  'aips.session.table.headers.id': 'Name',
  'aips.session.table.headers.storedDataFilesCount': 'Files stored',
  'aips.session.table.headers.queued': 'Queued',
  'aips.session.table.headers.stored': 'AIPs stored',
  'aips.session.table.headers.errors': 'Number of errors',
  'aips.session.table.headers.date': 'Date',
  'aips.session.table.actions.errors': 'Show asscoiated AIPs in error',
  'aips.session.table.actions.list': 'Show associated AIPs',
  'aips.session.button.back': 'Back',
  'aips.session.refresh.button': 'Refresh',
  'aips.session.clear.filters.button': 'Clear filters',
  'aips.session.apply.filters.button': 'Apply filters',
  'aips.session.delete.confirm.title': 'Delete session {id}?',
  'aips.session.delete.confirm.message': 'Once validated, the suppression will be completed in an asynchronous job. You will be able to follow the progression by refreshing the session list.',
  'aips.session.delete.tooltip': 'Removed associated AIPs',

  VALID: 'VALID',
  PENDING: 'PENDING',
  STORING_METADATA: 'STORING_METADATA',
  STORED: 'STORED',
  STORAGE_ERROR: 'STORAGE_ERROR',
  UPDATED: 'UPDATED',
  DELETED: 'DELETED',

  'aips.files.modal.action.close': 'Close',
  'aips.files.modal.title': 'Trace ..',
  'aips.files.table.headers.name': 'Name',
  'aips.files.table.headers.state': 'State',
  'aips.files.table.headers.type': 'Type',
  'aips.files.table.headers.filesize': 'File size',
  'aips.files.table.empty.title': 'No result',
  'aips.files.title': 'Files',
  'aips.files.subtitle': 'List files associated with the current AIP',
  'aips.files.actions.back': 'Back',
  'aips.files.table.tooltip.show-stacktrace': 'Show error stacktrace',
  'aips.files.table.tooltip.show-error-files': 'Show error files',

  'aip.remove-tag.title': 'Deletion of tag list',
  'aip.remove-tag.available': 'Click on a tag to add it to the list of tags to remove :',
  'aip.remove-tag.removing': 'Tags to remove :',
  'aip.remove-tag.action.cancel': 'Cancel',
  'aip.remove-tag.action.delete': 'Send',
  'aip.add-tag.action.cancel': 'Cancel',
  'aip.add-tag.action.add': 'Add',
  'aip.add-tag.title': 'Add a tag list',
  'aip.add-tag.list': 'Tags list to add :',
  'aip.add-tag.input': 'New tag',
  'aip.add-tag.input.action.add': 'Add tag',
}, Locales.en)

export default messages
