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
  'processing.management.list.delete.error': 'Error during process deletion.',

  /* Processing Monitoring */
  'processing.monitoring.list.empty.title': 'No processing available',
  'processing.monitoring.list.loading.title': 'Loading...',
  'processing.monitoring.refresh.button': 'Refresh',
  'processing.monitoring.filter.button': 'Filter',
  'processing.monitoring.back.button': 'Back',
  'processing.monitoring.list.header.name.label': 'Process Name',
  'processing.monitoring.list.header.userRole': 'Role',
  'processing.monitoring.list.header.created.label': 'Created',
  'processing.monitoring.list.header.username.label': 'User',
  'processing.monitoring.list.header.status': 'Status',
  'processing.monitoring.list.header.option': 'Options',
  'processing.monitoring.list.tooltip.info.button': 'Details',
  'processing.monitoring.list.tooltip.info.title': 'Informations about processing {name}',
  'processing.monitoring.list.tooltip.no.info.title': 'No informations about {name}',
  'processing.monitoring.filters.processBusinessId.label': 'Processing',
  'processing.monitoring.filters.creationDate.label': 'Creation date',
  'processing.monitoring.filters.userEmail.label': 'User',
  'processing.monitoring.filters.userEmail.hint': 'Email',
  'processing.monitoring.filters.status.label': 'Status',
  'processing.monitoring.filters.status.SUCCESS': 'Success',
  'processing.monitoring.filters.status.FAILURE': 'Failure',
  'processing.monitoring.filters.status.CANCELLED': 'Cancelled',
  'processing.monitoring.filters.status.TIMED_OUT': 'TimedOut',
  'processing.monitoring.filters.status.CLEANUP': 'CleanUp',
  'processing.monitoring.filters.status.RUNNING': 'Running',
  'processing.monitoring.filters.status.PREPARE': 'Prepare',
  'processing.monitoring.filters.status.REGISTERED': 'Registered',

  /* Processing Form */
  'processing.form.edit.title': 'Edit processing "{name}"',
  'processing.form.create.title': 'Add new processing',
  'processing.form.submit.edit.button': 'Modify',
  'processing.form.submit.create.button': 'Create',
  'processing.form.subtitle': 'First you have to select a processing. When its done, you have to configure the needed parameters.',
  'processing.form.back.button': 'Cancel',
  'processing.form.plugin.label': 'Processing plugin',
  'processing.form.invalid.id': 'Invalid ID',
  'processing.form.select.role': 'Select a role',
  'processing.form.select.isLinkedToAllDatasets': 'Associate this process to all datasets',
  'processing.form.select.role.help': 'The MINIMUM role of processing use can be selected. Default: PUBLIC',
  'processing.form.list.tooltip.info.button': 'Details',
  'processing.form.list.tooltip.info.close': 'Close',

  ...Locales.en,
}

export default messages
