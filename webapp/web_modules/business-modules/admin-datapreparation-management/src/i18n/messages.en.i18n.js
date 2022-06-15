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
  'datapreparation.card.title': 'Workers supervision',
  'datapreparation.card.action.cancel': 'Back',

  // Dialogs
  'datapreparation.table.actions.delete.title': 'Remove request(s) ?',
  'datapreparation.table.actions.retry.title': 'Retry request(s)  ?',

  // Table Header
  'datapreparation.table.header.source': 'Source',
  'datapreparation.table.header.session': 'Session',
  'datapreparation.table.header.contentType': 'Content types',
  'datapreparation.table.header.creationDate': 'Creation date',
  'datapreparation.table.header.workerType': 'Worker',
  'datapreparation.table.header.status': 'Status',
  'datapreparation.table.header.actions': 'Actions',

  // Table actions
  'datapreparation.table.actions.delete.tooltip': 'Remove',
  'datapreparation.table.actions.retry.tooltip': 'Retry',

  // Global actions
  'datapreparation.actions.refresh': 'Refresh',
  'datapreparation.actions.retry.title': 'Retry request selection',
  'datapreparation.actions.retry.label': 'Retry selection',
  'datapreparation.actions.delete.title': 'Remove request selection',
  'datapreparation.actions.delete.label': 'Remove selection',

  // Table Infos
  'datapreparation.table.info.nb.requests': '{value} result(s)',
  'datapreparation.table.no.content.title': 'Nothing to show',
  'datapreparation.table.no.content.message': 'No requests',
  'datapreparation.table.loading.content.title': 'Loading...',

  // Filters
  'datapreparation.filters.creationDate.label': 'Creation date :',
  'datapreparation.filters.creationDate.after.label': 'From',
  'datapreparation.filters.creationDate.before.label': 'To',
  'datapreparation.filters.source.label': 'Source',
  'datapreparation.filters.session.label': 'Session',
  'datapreparation.filters.workerType.label': 'Worker type',
  'datapreparation.filters.contentTypes.label': 'Content types',
  'datapreparation.filters.status.label.title': 'Status',
  'datapreparation.filters.clear': 'Reset filters',

  // Dialogs
  'datapreparation.dialogs.errors.title': 'Errors',
  'datapreparation.dialogs.close': 'Close',

  // Settings
  'datapreparation.settings.card.title': 'Worker manager settings',
  'datapreparation.settings.card.subtitle': 'Manage configuration parameters of the worker manager',
  'datapreparation.settings.contentTypes.title': 'Content types to ignore by the worker manager',
  'datapreparation.settings.contentTypes.warn': 'Confirm to add content type',
  'datapreparation.settings.contentTypes.exist': 'Already exists',
  'datapreparation.settings.contentTypes.text': 'Insert a content type',
  'datapreparation.settings.action.confirm': 'Confirm',
  'datapreparation.settings.action.cancel': 'Cancel',

  ...Locales.en,
}

export default messages
