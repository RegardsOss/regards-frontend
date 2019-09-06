/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { IngestDomain } from '@regardsoss/domain'

export default {
  ...Locales.en,
  ...IngestDomain.enMessages,
  'oais.aips.list.subtitle': 'List of AIPs for selected session',
  'oais.aips.list.filters.data.storage.label': 'Stored on',
  'oais.aips.list.filters.status.label': 'Status',
  'oais.aips.list.filters.providerId.label': 'Provider id',
  'oais.aips.list.filters.from.label': 'From',
  'oais.aips.list.filters.to.label': 'To',
  'oais.aips.list.filters.tag.label': 'Tags',
  'oais.aips.list.remove-tag.button': 'Delete tag',
  'oais.aips.list.add-tag.button': 'Add tag',
  'oais.aips.list.table.headers.providerId': 'Provider id',
  'oais.aips.list.table.headers.type': 'Type',
  'oais.aips.list.table.headers.state': 'State',
  'oais.aips.list.table.headers.data.storages': 'Stored on',
  'oais.aips.list.table.headers.lastUpdate': 'Last updated',
  'oais.aips.list.table.headers.nbFiles': 'Number of files',
  'oais.aips.list.aip-details.title': 'AIP details',
  'oais.aips.list.aip-retry.title': 'Retry AIP storage',
  'oais.aips.list.delete.files.on.all.storages.label': 'Full delete',
  'oais.aips.list.delete.files.on.all.storages.title': 'Delete selected AIP and its files on all storages',
  'oais.aips.list.delete.files.on.some.storages.label': 'Partial delete',
  'oais.aips.list.delete.files.on.some.storages.title': 'Delete selected AIP files on storage spaces...',
  'oais.aips.list.empty.title': 'No entities found',
  'oais.aips.list.snackbar.job-remove-tag': 'Delete tag job is running',
  'oais.aips.list.snackbar.job-remove-tag-failed': 'Delete tag job cannot be run',
  'oais.aips.list.snackbar.job-add-tag': 'Add tag job is running',
  'oais.aips.list.snackbar.job-add-tag-failed': 'Add tag job cannot be run',
  'oais.aips.list.snackbar.job-failed': 'Error : a job of the same kind is already running',
  'oais.aips.list.relaunch.button': 'Relaunch all',

  'oais.aip.confirm.delete.title': 'Delete AIP',
  'oais.aip.confirm.delete.message': 'Do you want to fully delete selected AIP on all storage spaces?',
  'oais.aip.confirm.delete.aip': 'Delete',
  'oais.aip.cancel.delete': 'Cancel',

  'oais.aip.confirm.relaunch.title': 'Relaunch AIP storage',
  'oais.aip.confirm.relaunch.message': 'Do you want to relaunch the storage of all selected AIPs ?',
  'oais.aip.confirm.relaunch.aip': 'Relaunch',
  'oais.aip.cancel.relaunch': 'Cancel',

  'oais.sip.cancel.relaunch': 'Cancel',
  'oais.sip.confirm.relaunch': 'Relaunch',
  'oais.sip.confirm.relaunch.title': 'Relaunch SIPs',
  'oais.sip.confirm.relaunch.message': 'Do you really want to relaunch selected SIPs ?',

  'oais.sip.cancel.selected.delete': 'Cancel',
  'oais.sip.confirm.selected.delete': 'Delete',
  'oais.sip.confirm.delete.selected.title': 'Delete SIPs',
  'oais.sip.confirm.delete.selected.message': 'Do you really want to delete selected SIPs ?',

  'oais.aip.delete.on.storages.title': 'Delete selected AIP files',
  'oais.aip.delete.on.storages.message': 'On which storage spaces should the selected AIP files be deleted? AIP will be deleted on checked storage spaces only if they are still available on a storage space after the operation.',
  'oais.aip.delete.on.selected.storages.messages': 'Selected AIP files will be deleted on the following data storages: {datastorages}. Perform deletion?',
  'oais.aip.delete.on.selected.storages.label.separator': ', ',
  'oais.aip.confirm.delete.on.storages': 'Delete',
  'oais.aip.cancel.delete.on.storages': 'Cancel',

  'oais.aip.details.button.close': 'Close',

  'oais.aips.session.title': 'Sessions',
  'oais.aips.session.aips.title': 'Session {session}',
  'oais.aips.session.button.back': 'Back',
  'oais.aips.session.refresh.button': 'Refresh',
  'oais.aips.session.clear.filters.button': 'Clear filters',
  'oais.aips.session.apply.filters.button': 'Apply filters',

  VALID: 'VALID',
  PENDING: 'PENDING',
  STORING_METADATA: 'STORING_METADATA',
  STORED: 'STORED',
  STORAGE_ERROR: 'STORAGE_ERROR',
  UPDATED: 'UPDATED',
  DELETED: 'DELETED',

  'oais.aips.files.modal.action.close': 'Close',
  'oais.aips.files.modal.title': 'Trace ..',
  'oais.aips.files.table.headers.name': 'Name',
  'oais.aips.files.table.headers.state': 'State',
  'oais.aips.files.table.headers.type': 'Type',
  'oais.aips.files.table.headers.filesize': 'File size',
  'oais.aips.files.table.empty.title': 'No result',
  'oais.aips.files.title': 'Files',
  'oais.aips.files.subtitle': 'List files associated with the current AIP',
  'oais.aips.files.actions.back': 'Back',
  'oais.aips.files.table.tooltip.show-stacktrace': 'Show error stacktrace',
  'oais.aips.files.table.tooltip.show-error-files': 'Show error files',

  'oais.aip.remove-tag.title': 'Deletion of tag list',
  'oais.aip.remove-tag.available': 'Click on a tag to add it to the list of tags to remove :',
  'oais.aip.remove-tag.removing': 'Tags to remove :',
  'oais.aip.remove-tag.action.cancel': 'Cancel',
  'oais.aip.remove-tag.action.delete': 'Send',
  'oais.aip.add-tag.action.cancel': 'Cancel',
  'oais.aip.add-tag.action.add': 'Add',
  'oais.aip.add-tag.title': 'Add a tag list',
  'oais.aip.add-tag.list': 'Tags list to add :',
  'oais.aip.add-tag.input': 'New tag',
  'oais.aip.add-tag.input.action.add': 'Add tag',

  'oais.sips.listsubtitle': 'List of SIPs for selected session',
  'oais.sips.listfilters.chain.label': 'Processing chain',
  'oais.sips.listfilters.providerId.label': 'Provider Identifier',
  'oais.sips.listfilters.status.label': 'Status',
  'oais.sips.listfilters.date.label': 'Since',
  'oais.sips.listtable.headers.providerId': 'Provider ID',
  'oais.sips.listtable.headers.type': 'Type',
  'oais.sips.listtable.headers.state': 'State',
  'oais.sips.listtable.headers.date': 'Last update',
  'oais.sips.listtable.headers.version': 'Version',
  'oais.sips.listsip-details.title': 'SIP details',
  'oais.sips.listsip-history.title': 'SIP History',
  'oais.sips.listempty.title': 'No entities found',
  'oais.sips.listtable.tooltip.go-to-aip-management': 'Go to aip storage monitoring to see errors.',
  'oais.sips.listtable.tooltip.go-to-datasources-management': 'Go to datasources monitoring',
  'oais.sip.list.retry.action': 'Retry sip ingest',
  'oais.sips.list.relaunch.button': 'Relaunch all',
  'oais.sips.list.delete.button': 'Delete all',

  'oais.sip.confirm.delete.title': 'Data deletion (SIP ID : {id})',
  'oais.sip.confirm.delete.message': 'Do you want to delete only the selected data or all the data with the same provider identifier ?',
  'oais.sip.confirm.delete.sips': 'Delete all',
  'oais.sip.confirm.delete.sip': 'Delete only selected one',
  'oais.sip.cancel.delete': 'Cancel',

  'oais.sip.details.button.close': 'Close',

  'oais.sip.delete.error.dialog.close': 'Close',
  'oais.sip.delete.error.title': 'Error during SIP "{id}" deletion',

  'oais.sips.session.title': 'Sessions',
  'oais.sips.session.sips.title': 'Session {session}',
  'oais.sips.session.button.back': 'Back',
  'oais.sips.session.refresh.button': 'Refresh',
  'oais.sips.session.clear.filters.button': 'Clear filters',
  'oais.sips.session.apply.filters.button': 'Apply filters',

  'oais.filters.session.title': 'Session',
  'oais.filters.source.title': 'Source',
  'oais.button.relaunch-all.label': 'Relaunch all',
  'oais.button.relaunch-all.title': 'Relaunch all selected AIPs',
  'oais.session.title': 'List of OAIS packages',
  'oais.button.switch-to.AIP': 'See AIPs',
  'oais.button.switch-to.AIP-title': 'Open AIPs panel',
  'oais.button.switch-to.SIP': 'See SIPs',
  'oais.button.switch-to.SIP-title': 'Open SIPs panel',

  'sips.submit.title': 'Data submission',
  'sips.submit.subtitle': 'This section allows you to run a data submission thought a local file (geoson format) containing entities to submit',
  'sips.submit.error.message': 'An error occured during submission of your data. Please check the format of your provided entities.',
  'sips.submit.select.file.button': 'Select file containing data to submit (SIPs)',
  'sips.submit.change.file.button': 'Change selected file',
  'sips.submit.back.button': 'Back',
  'sips.submit.submit.button': 'Submit',

  'sips.submission-summary.title': 'Data submission summary',
  'sips.submission-summary.details': 'Your data will be allocated through the {allocationStrategy} strategy to the datastorages : {storages}',
  'sips.submission-summary.subtitle': 'This summary allows you to know accepted entities by the system. If yours data are accepted, so they will be handled for storage soon.',
  'sips.submission-summary.back.button': 'Ok',

  'sips.submission.not.ready.title': 'Configuration is needed before data submission',
  'sips.submission.not.ready.information.message': 'Your system is not configured to allow data submission. Please ensure that you have well configured your data storages.',
  'sips.submission.not.ready.server.message': 'The storage service unavailability response message is : ',
  'sips.submission.not.ready.config.allocations.link.button': 'Configure allocation strategies',
  'sips.submission.not.ready.config.storages.link.button': 'Configure storage locations',
  'sips.submission.not.ready.config.catalog.security.link.button': 'Configure data access security',
  'sips.submission.not.ready.back.button': 'Back',
}
