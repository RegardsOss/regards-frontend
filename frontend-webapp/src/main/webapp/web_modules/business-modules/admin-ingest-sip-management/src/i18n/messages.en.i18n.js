/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

  'sips.button.filter': 'Filter',
  'sips.button.back': 'Back',
  'sips.list.subtitle': 'List of SIPs for selected session',
  'sips.list.filters.chain.label': 'Processing chain',
  'sips.list.filters.sipid.label': 'SIP Identifier',
  'sips.list.filters.chain.all': 'All chains',
  'sips.list.filters.status.label': 'Status',
  'sips.list.filters.status.all': 'All statuses',
  'sips.list.filters.status.errors': 'Errors',
  'sips.list.filters.status.errors.rsingest': 'rs-ingest errors',
  'sips.list.filters.status.errors.rsstorage': 'rs-storage errors',
  'sips.list.filters.status.done': 'Done',
  'sips.list.filters.date.label': 'Since',
  'sips.list.filters.my-sips.label': 'Only my SIPs',
  'sips.list.table.headers.sip-id': 'SIP ID',
  'sips.list.table.headers.type': 'Type',
  'sips.list.table.headers.state': 'State',
  'sips.list.table.headers.date': 'Date',
  'sips.list.table.headers.version': 'Version',
  'sips.list.table.headers.actions': 'Actions',
  'sips.list.table.actions.delete': 'Delete session',
  'sips.list.table.actions.original-sip': 'View original SIP',
  'sips.list.table.actions.original-aip': 'View generated AIP',
  'sips.list.table.actions.retry': 'Retry',
  'sips.list.sip-details.title': 'SIP details',
  'sips.list.sip-history.title': 'SIP History',
  'sips.list.empty.title': 'No entities found',
  'sips.stepper.list': 'View SIPs',
  'sips.stepper.session': 'Select session',

  'sip.confirm.delete.title': 'Data deletion (SIP ID : {id})',
  'sip.confirm.delete.message': 'Do you want to delete only the selected data or all the data with the same SIP ID ?',
  'sip.confirm.delete.sips': 'Delete all',
  'sip.confirm.delete.sip': 'Delete only selected one',
  'sip.cancel.delete': 'Cancel',

  'sip.details.button.close': 'Close',

  'sips.session.title': 'Sessions',
  'sips.session.sips.title': 'Session {session}',
  'sips.session.subtitle': 'Select the session associated to the SIPs you want to view',
  'sips.session.filter.name': 'Session Name : ',
  'sips.session.filter.name.label': 'Name',
  'sips.session.filter.date': 'Temporal filter : ',
  'sips.session.filter.from.label': 'From',
  'sips.session.filter.to.label': 'to',
  'sips.session.table.headers.id': 'Name',
  'sips.session.table.headers.generated': 'Generation',
  'sips.session.table.headers.stored': 'Storage',
  'sips.session.table.headers.indexed': 'Indexation',
  'sips.session.table.headers.errors': 'Number of errors',
  'sips.session.table.headers.date': 'Date',
  'sips.session.table.headers.actions': 'Actions',
  'sips.session.table.actions.errors': 'List associated SIPs in error',
  'sips.session.table.actions.delete': 'Delete associated SIPs',
  'sips.session.table.actions.list': 'List associated SIPs',
  'sips.session.button.back': 'Back',
  'sips.session.refresh.button': 'Refresh',
  'sips.session.clear.filters.button': 'Clear filters',
  'sips.session.apply.filters.button': 'Apply filters',
  'sips.session.delete.confirm.title': 'Delete session {id}?',

  'sips.submit.title': 'Data submission',
  'sips.submit.subtitle': 'This section allows you to run a data submission thought a local file (geoson format) containing entities to submit',
  'sips.submit.error.message': 'An error occured during submission of your data. Please check the format of your provided entities.',
  'sips.submit.select.file.button': 'Select file containing data to submit (SIPs)',
  'sips.submit.change.file.button': 'Change selected file',
  'sips.submit.back.button': 'Back',
  'sips.submit.submit.button': 'Submit',

  'sips.submition-summary.title': 'Data submission summary',
  'sips.submition-summary.subtitle': 'This summary allows you know accepted entities by the system. If yours data are accepted, so they will be handled for storage soon.',
  'sips.submition-summary.back.button': 'Ok',

  'sips.submission.not.ready.title': 'Configuration is needed before data submission',
  'sips.submission.not.ready.information.message': 'Your system is not configured to allows data submission. Please ensure that you have well configured your data storages.',
  'sips.submission.not.ready.server.message': 'The storage service unavaibility response message is : ',
  'sips.submission.not.ready.config.allocations.link.button': 'Configure allocation strategies',
  'sips.submission.not.ready.config.storages.link.button': 'Configure storage locations',
  'sips.submission.not.ready.back.button': 'Back',

  CREATED: 'CREATED',
  REJECTED: 'REJECTED',
  QUEUED: 'QUEUED',
  VALID: 'VALID',
  INVALID: 'INVALID',
  AIP_GEN_ERROR: 'AIP_GEN_ERROR',
  AIP_CREATED: 'AIP_CREATED',
  STORED: 'STORED',
  STORE_ERROR: 'STORE_ERROR',
  INDEXED: 'INDEXED',
  INCOMPLETE: 'INCOMPLETE',
}, Locales.en)

export default messages
