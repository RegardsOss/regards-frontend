/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'lta.card.title': 'LTA requests',
  'lta.card.action.cancel': 'Back',
  'lta.card.action.filter': 'Filter',
  'lta.card.action.refresh': 'Refresh',

  // Dialogs
  'lta.table.actions.delete.title': 'Remove request(s) ?',
  'lta.table.actions.delete.message': 'Only requests that are not being processed will be deleted.',
  'lta.table.actions.view.message.tooltip': 'See message',
  'lta.table.actions.view.product.tooltip': 'See request product',
  'lta.table.actions.view.product.title': 'Request product',

  // Table Header
  'lta.table.header.requestId': 'ID',
  'lta.table.header.owner': 'Source',
  'lta.table.header.status': 'Status',
  'lta.table.header.session': 'Session',
  'lta.table.header.statusDate': 'Last update',
  'lta.table.header.datatype': 'Datatype',
  'lta.table.header.creationDate': 'Creation date',
  'lta.table.header.message': 'Message',
  'lta.table.header.model': 'Model',
  'lta.table.header.product': 'Product',
  'lta.table.header.actions': 'Actions',

  // Table actions
  'lta.table.actions.delete.tooltip': 'Remove',

  // Table columns
  'lta.table.column.status.VALIDATED': 'Validated',
  'lta.table.column.status.GENERATION_PENDING': 'Generation pending',
  'lta.table.column.status.GENERATED': 'Generated',
  'lta.table.column.status.GENERATION_ERROR': 'Generation error',
  'lta.table.column.status.INGESTION_PENDING': 'Ingestion pending',
  'lta.table.column.status.DONE': 'Done',
  'lta.table.column.status.INGESTION_ERROR': 'Ingestion error',

  // Global actions
  'lta.actions.delete.title': 'Remove request selection',
  'lta.actions.delete.label': 'Remove selection',

  // Table Infos
  'lta.table.info.nb.requests': '{value} result(s)',
  'lta.table.no.content.title': 'Nothing to show',
  'lta.table.no.content.message': 'No requests',
  'lta.table.loading.content.title': 'Loading...',

  // Filters
  'lta.filters.session.label': 'Session',
  'lta.filters.owner.label': 'Source',
  'lta.filters.datatype.label': 'Datatype',
  'lta.filters.creationDate.label': 'Creation date',
  'lta.filters.statusDate.label': 'Last update',
  'lta.filters.statuses.label': 'Statuses',

  // Settings
  'lta.settings.card.title': 'LTA manager settings',
  'lta.settings.card.subtitle': 'Manage configuration parameters of the LTA manager',
  'lta.settings.field.storage': 'Storage name',
  'lta.settings.field.successExpirationInHours': 'Life time of succedeed requests in hours',
  'lta.settings.field.datatypes.new': 'New datatype',
  'lta.settings.field.datatypes': 'Datatypes',
  'lta.settings.field.datatypes.model': 'Model',
  'lta.settings.field.datatypes.storePath': 'Store path',
  'lta.settings.action.confirm': 'Confirm',
  'lta.settings.action.cancel': 'Cancel',

  ...Locales.en,
}

export default messages
