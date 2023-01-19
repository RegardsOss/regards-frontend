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
  // Card
  'lta.card.title': 'LTA Manager',
  'lta.card.action.cancel': 'Back',
  'lta.card.action.filter': 'Filter',

  // Dialogs
  // 'lta.table.actions.delete.title': 'Remove request(s) ?',
  // 'lta.table.actions.retry.title': 'Retry request(s)  ?',

  // Table Header
  // 'lta.table.header.source': 'Source',
  // 'lta.table.header.session': 'Session',
  // 'lta.table.header.contentType': 'Content types',
  // 'lta.table.header.creationDate': 'Creation date',
  // 'lta.table.header.workerType': 'Worker',
  // 'lta.table.header.status': 'Status',
  // 'lta.table.header.actions': 'Actions',

  // Table actions
  // 'lta.table.actions.delete.tooltip': 'Remove',
  // 'lta.table.actions.retry.tooltip': 'Retry',

  // Global actions
  // 'lta.actions.refresh': 'Refresh',
  // 'lta.actions.retry.title': 'Retry request selection',
  // 'lta.actions.retry.label': 'Retry selection',
  // 'lta.actions.delete.title': 'Remove request selection',
  // 'lta.actions.delete.label': 'Remove selection',

  // Table Infos
  // 'lta.table.info.nb.requests': '{value} result(s)',
  // 'lta.table.no.content.title': 'Nothing to show',
  // 'lta.table.no.content.message': 'No requests',
  // 'lta.table.loading.content.title': 'Loading...',

  // Filters
  // 'lta.filters.creationDate.label': 'Creation date :',
  // 'lta.filters.creationDate.after.label': 'From',
  // 'lta.filters.creationDate.before.label': 'To',
  // 'lta.filters.source.label': 'Source',
  // 'lta.filters.source.label.title': 'Source :',
  // 'lta.filters.session.label': 'Session',
  // 'lta.filters.session.label.title': 'Session :',
  // 'lta.filters.workerType.label': 'Worker type',
  // 'lta.filters.workerType.label.title': 'Worker type :',
  // 'lta.filters.contentTypes.label': 'Content types (ex: type1, type2, ...)',
  // 'lta.filters.contentTypes.label.title': 'Content types :',
  // 'lta.filters.status.label': 'Status',
  // 'lta.filters.status.label.title': 'Status :',

  // Dialogs
  // 'lta.dialogs.errors.title': 'Errors',
  // 'lta.dialogs.close': 'Close',

  // Settings
  'lta.settings.card.title': 'LTA manager settings',
  'lta.settings.card.subtitle': 'Manage configuration parameters of the LTA manager',
  'lta.settings.field.storage': 'Storage name',
  'lta.settings.field.successExpirationInHours': 'Life time of succedeed requests in hours',
  'lta.settings.field.datatypes.new': 'New datatype',
  'lta.settings.field.datatypes': 'Datatypes',
  'lta.settings.field.datatypes.name': 'Label',
  'lta.settings.field.datatypes.model': 'Model',
  'lta.settings.field.datatypes.storePath': 'Store path',
  'lta.settings.action.confirm': 'Confirm',
  'lta.settings.action.cancel': 'Cancel',

  ...Locales.en,
}

export default messages
