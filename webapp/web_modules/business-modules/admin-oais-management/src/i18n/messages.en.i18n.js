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

  'oais.packages.list.filters.providerId': 'Identifier',
  'oais.packages.list.filters.type': 'Type',
  'oais.packages.list.filters.state': 'State',
  'oais.packages.list.filters.session': 'Session',
  'oais.packages.list.filters.storage': 'Storage',
  'oais.packages.list.filters.actions': 'Actions',
  'oais.packages.list.filters.version': 'Version',
  'oais.packages.list.filters.source': 'Source',
  'oais.packages.list.filters.lastUpdate': 'Last updated',
  'oais.packages.list.filters.buttons.apply': 'Apply filters',
  'oais.packages.list.filters.buttons.modify': 'Modify selection',
  'oais.packages.list.filters.buttons.delete': 'Delete selection',
  'oais.packages.list.filters.buttons.dropdown.aip': 'AIP',
  'oais.packages.list.filters.buttons.dropdown.sip': 'SIP',
  'oais.packages.confirm.delete.close': 'Close',
  'oais.packages.confirm.delete.irrevocably': 'Delete irrevocably',
  'oais.packages.confirm.delete.by_state': 'Mark as deleted',
  'oais.packages.confirm.delete.title': 'Delete selected AIP and its files on all storages',
  'oais.packages.confirm.delete.message': 'Do you want to fully delete selected AIP and related SIPs on all storage spaces?',
  'oais.packages.confirm.modify.close': 'Close',
  'oais.packages.confirm.modify.tags': 'Add new tag',
  'oais.packages.confirm.modify.categories': 'Add new category',
  'oais.packages.confirm.modify.by_state': 'Mark as deleted',
  'oais.packages.confirm.modify.title': 'Modify selected AIP',
  'oais.packages.confirm.modify.storages': 'Modify storages',
  'oais.packages.confirm.modify.message': 'Do you want to fully delete selected AIP and related SIPs on all storage spaces?',

  'oais.requests.list.filters.providerId': 'Identifier',
  'oais.requests.list.filters.type': 'Type',
  'oais.requests.list.filters.state': 'State',
  'oais.requests.list.filters.actions': 'Actions',
  'oais.requests.list.filters.lastSubmission': 'Last submitted',
  'oais.requests.list.filters.buttons.validate': 'Validate selection',
  'oais.requests.list.filters.buttons.relaunch': 'Relaunch selection',
  'oais.requests.list.filters.buttons.delete': 'Delete selection',
  'oais.requests.confirm.delete': 'Delete',
  'oais.requests.confirm.delete.close': 'Close',
  'oais.requests.confirm.delete.title': 'Delete selected Request',
  'oais.requests.confirm.delete.message': 'Do you want to fully delete selected Request',
  'oais.requests.confirm.relaunch': 'Relaunch',
  'oais.requests.confirm.relaunch.close': 'Close',
  'oais.requests.confirm.relaunch.title': 'relaunch selected Request',
  'oais.requests.confirm.relaunch.message': 'Do you want to relaunch selected Request',
  'oais.requests.confirm.validate': 'Relaunch',
  'oais.requests.confirm.validate.close': 'Close',
  'oais.requests.confirm.validate.title': 'Validate selected Request',
  'oais.requests.confirm.validate.message': 'Do you want to validate selected Request',
  'oais.request.details.button.close': 'Close',

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
  'oais.aips.list.table.headers.version': 'Version',
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

  STORED: 'STORED',
  DELETED: 'DELETED',
  ERROR: 'ERROR',
  GENERATED: 'GENERATED',

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
  'oais.filters.id.title': 'Identifier',
  'oais.button.relaunch-all.label': 'Relaunch all',
  'oais.button.relaunch-all.title': 'Relaunch all selected AIPs',
  'oais.session.title': 'List of OAIS features',
  'oais.button.switch-to.AIP': 'See AIPs',
  'oais.button.switch-to.AIP-title': 'Open AIPs panel',
  'oais.button.switch-to.SIP': 'See SIPs',
  'oais.button.switch-to.SIP-title': 'Open SIPs panel',
  'oais.button.switch-to.requests': 'See requests',
  'oais.button.switch-to.requests-title': 'Open OAIS request panel',
  'oais.button.switch-to.packages': 'See packages',
  'oais.button.switch-to.packages-title': 'Open OAIS packages panel',

  'sips.submit.title': 'Data submission',
  'sips.submit.subtitle': 'This section allows you to run a data submission thought a local file (geoson format) containing entities to submit',
  'sips.submit.error.message': 'An error occured during submission of your data. Please check the format of your provided entities.',
  'sips.submit.select.file.button': 'Select file containing data to submit (SIPs)',
  'sips.submit.change.file.button': 'Change selected file',
  'sips.submit.back.button': 'Back',
  'sips.submit.submit.button': 'Submit',

  'sips.submission-summary.title': 'Data submission summary',
  'sips.submission-summary.subtitle': 'This summary allows you to know accepted entities by the system. If yours data are accepted, so they will be handled for storage soon.',
  'sips.submission-summary.granted.count.message': `{count, plural,
    =0 {No feature was submitted.}
    one {# feature was submitted.}
    other {# features were submitted.}
  }`,
  'sips.submission-summary.denied.count.message': `{count, plural,
    one {The following feature was refused:}
    other {The # following features were refused:}
  }`,
  'sip.submission-summary.denied.feature.message': '- {label}: {reason}',
  'sips.submission-summary.back.button': 'Ok',
}
