/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const messages = {

  /* Processing */
  'processing.management.list.title': 'Processing',
  'processing.management.list.subtitle': 'List of current and done project processing',
  'processing.management.list.cancel.button': 'Cancel',
  'processing.management.list.delete.title': 'Delete the processing {name} ?',
  'processing.management.list.no.processing.subtitle': 'Create your first process',
  'processing.management.list.no.processing.title': 'No processing',
  'processing.management.table.filter.processing.label': 'Processing',
  'processing.management.table.filter.clear.button': 'Clear',
  'processing.management.table.filter.button': 'Apply',
  'processing.management.table.refresh.button': 'Refresh',
  'processing.management.list.add.button': 'Create',
  'processing.management.list.edit.button': 'Edit',
  'processing.management.list.delete.button': 'Delete',

  /* Processing Monitoring */
  'processing.monitoring.list.empty.title': 'No processing available',
  'processing.monitoring.refresh.button': 'Refresh',
  'processing.monitoring.list.header.name.label': 'Process Name',
  'processing.monitoring.list.header.created.label': 'Created',
  'processing.monitoring.list.header.username.label': 'User',
  'processing.monitoring.list.header.status': 'Status',
  'processing.monitoring.list.header.userRole': 'Role',
  'processing.monitoring.list.header.option': 'Options',
  'processing.monitoring.list.tooltip.info.button': 'Details',
  'processing.monitoring.list.tooltip.info.close': 'Close',
  'processing.monitoring.list.tooltip.info.title': 'Informations about processing {name}',
  'processing.monitoring.list.tooltip.no.info.title': 'No informations about {name}',
  'processing.monitoring.list.tooltip.info.message.label': 'Message:',
  'processing.monitoring.filters.processName-hint': 'Processing',
  'processing.monitoring.filters.userName-hint': 'User',
  'processing.monitoring.filters.from.label': 'From',
  'processing.monitoring.filters.to.label': 'To',
  'processing.monitoring.filters.reset': 'Clear Filters',
  'processing.monitoring.filters.apply': 'Apply Filters',
  'processing.monitoring.filters.status': 'Status',
  'processing.monitoring.filters.all-status': 'All Status',
  'processing.monitoring.filters.success-status': 'Success',
  'processing.monitoring.filters.failure-status': 'Failure',
  'processing.monitoring.filters.cancelled-status': 'Cancelled',
  'processing.monitoring.filters.timed-out-status': 'TimedOut',
  'processing.monitoring.filters.clean-up-status': 'CleanUp',
  'processing.monitoring.filters.running-status': 'Running',
  'processing.monitoring.filters.prepare-status': 'Prepare',
  'processing.monitoring.filters.registered-status': 'Registered',
  'processing.monitoring.table.clear.button': 'Clear',
  'processing.monitoring.table.filter.button': 'Apply',
  'processing.monitoring.list.refresh.button': 'Refresh',

  /* Processing Form */
  'processing.form.edit.title': 'Edit processing "{name}"',
  'processing.form.create.title': 'Add new processing',
  'processing.form.submit.edit.button': 'Modify',
  'processing.form.submit.button': 'Create',
  'processing.form.subtitle': 'First you have to select a processing. When its done, you have to configure the needed parameters.',
  'processing.form.back.button': 'Cancel',
  'processing.form.plugin.label': 'Processing plugin',
  'processing.form.invalid.id': 'Invalid ID',
  'processing.form.select.role': 'Select a role',
  'processing.form.select.role.help': 'The MINIMUM role of processing use can be selected. Default: PUBLIC',
  'processing.form.list.tooltip.info.button': 'Details',
  'processing.form.list.tooltip.info.close': 'Close',

  ...Locales.en,
}

export default messages
