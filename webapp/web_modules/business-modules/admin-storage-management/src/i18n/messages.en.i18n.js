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

/**
 * @author Sébastien Binda
 */
const messages = Object.assign({
  'storage.data-storage.plugins.list.title': 'Configure data storage locations',
  'storage.data-storage.plugins.list.subtitle': 'This section allows you to configure storage locations and their priority. The priority is used by the system to determine on which storage location retrieve data if they are stored on many of them.',
  'storage.data-storage.plugins.list.header.stored-file.label': 'Stored files',
  'storage.data-storage.plugins.list.header.total-size.label': 'Total size',
  'storage.data-storage.plugins.list.header.deletion-error.label': 'Deletion errors',
  'storage.data-storage.plugins.list.header.storage-error.label': 'Storage errors',
  'storage.data-storage.plugins.list.header.name.label': 'Name',
  'storage.data-storage.plugins.list.header.type.label': 'Type',
  'storage.data-storage.plugins.list.edit.button': 'Edit configuration',
  'storage.data-storage.plugins.list.copy.button': 'Copy files to another storage',
  'storage.data-storage.plugins.list.delete-files.button': 'Delete storage\'s files',
  'storage.data-storage.plugins.list.up.priority.button': 'Up priority',
  'storage.data-storage.plugins.list.down.priority.button': 'Down priority',
  'storage.data-storage.plugins.list.active.on.button': 'Enable storage',
  'storage.data-storage.plugins.list.active.off.button': 'Disable storage',
  'storage.data-storage.plugins.list.confirm.title': 'Delete storage {name} ?',
  'storage.data-storage.plugins.list.back.button': 'Back',
  'storage.data-storage.plugins.list.empty.title': 'No storage system available',
  'storage.data-storage.plugins.list.add.button': 'Create a new storage',
  'storage.data-storage.plugins.list.relaunch.storage': 'Relaunch storages errors',
  'storage.data-storage.plugins.list.relaunch.deletion': 'Relaunch deletions errors',
  'storage.data-storage.plugins.list.delete.storage': 'Delete storages errors',
  'storage.data-storage.plugins.list.delete.deletion': 'Delete deletions errors',
  'storage.data-storage.plugins.delete.confirm.title': 'Files from {name} storage will be removed',
  'storage.data-storage.plugins.errors.delete.confirm.title': 'Deleteion of {name}\'s errors ?',
  'storage.data-storage.plugins.errors.relaunch.confirm.title': 'Relaunch of {name}\'s errors ?',
  'storage.data-storage.plugins.delete.confirm.option': 'Ignore error during physical deletion ?',
  'storage.data-storage.plugins.dialogs.confirm': 'Confirm',
  'storage.data-storage.plugins.dialogs.cancel': 'Cancel',
  'storage.data-storage.plugins.copy.confirm.title': 'Copy storage {name} files to...',
  'storage.data-storage.plugins.copy.confirm.path-destination': 'Destination folder (optional)',
  'storage.data-storage.plugins.copy.confirm.path-source': 'Source folder to copy (optional)',

  'storage.data-storage.monitoring.button': 'Supervision',
  'storage.data-storage.monitoring.dialog.title': 'Launch storage\'s supervision',
  'storage.data-storage.monitoring.dialog.checkbox': 'Storage supervision allow to calculate the size occupied and the number of files for each storage',

  'storage.plugins.storage.form.create.title': 'Add new storage system',
  'storage.plugins.storage.form.edit.title': 'Edit storage system "{name}"',
  'storage.plugins.storage.form.subtitle': 'First you have to select a storage mode. When its done, you have to configure the needed parameters.',
  'storage.plugins.storage.form.type.select.title': 'Storage mode',
  'storage.plugins.storage.form.type.select.label': 'Select a mode ...',
  'storage.plugins.storage.form.invalid.id': 'Storage configuration selected does not exists anymore.',
  'storage.plugins.storage.form.back.button': 'Cancel',
  'storage.plugins.storage.form.plugin.label': 'Plugin to detect new data',
  'storage.plugins.storage.form.allocated-size.label': 'Allocated size',
  'storage.plugins.storage.form.name.label': 'Name',
  'storage.plugins.storage.form.submit.button': 'Create',
  'storage.plugins.storage.form.submit.edit.button': 'Modify',
  'invalid.name.expression': 'Name invalid, only alphanumeric, - and _ characters are allowed',

  'storage.allocation-strategy.plugins.list.title': 'Configure data allocation strategies',
  'storage.allocation-strategy.plugins.list.subtitle': 'Configure how the system will choose the data storage to use for each file acquired.',
  'storage.allocation-strategy.plugins.list.header.name.label': 'Name',
  'storage.allocation-strategy.plugins.list.header.type.label': 'Type',
  'storage.allocation-strategy.plugins.list.header.active.label': 'Active',
  'storage.allocation-strategy.plugins.list.empty.title': 'No strategy defined',
  'storage.allocation-strategy.plugins.list.edit.button': 'Edit',
  'storage.allocation-strategy.list.add.button': 'Add new strategy',
  'storage.allocation-strategy.plugins.list.confirm.delete.title': 'Delete strategy {name} ?',
  'storage.allocation-strategy.plugins.list.active.on.button': 'Enable strategy',
  'storage.allocation-strategy.plugins.list.active.off.button': 'Disable strategy',

  'storage.plugins.allocation.form.create.title': 'Add a new allocation strategy',
  'storage.plugins.allocation.form.edit.title': 'Edit allocation strategy "{name}"',
  'storage.plugins.allocation.form.create.subtitle': 'First you have to select a strategy type. When its done, you have to configure the needed parameters.',
  'storage.plugins.allocation.form.edit.subtitle': 'Please configure the strategy parameters.',
  'storage.plugins.allocation.form.type.select.title': 'Allocation strategy type',
  'storage.plugins.allocation.form.type.select.label': 'Select a type ...',
  'storage.plugins.allocation.form.invalid.id': 'Configuration selected does not exist anymore.',
  'storage.plugins.allocation.form.back.button': 'Cancel',

  'storage.security-delegation.plugins.list.title': 'Configure archived files access rights',
  'storage.security-delegation.plugins.list.subtitle': 'This section allows you to configure archived files access rights strategies used by REGARDS. Hereunder are listed different strategies types to your disposal. For each type, you can list existing configurations and create new one. Watch out, only one strategy configuration must be active.',
  'storage.security-delegation.plugins.list.header.name.label': 'Name',
  'storage.security-delegation.plugins.list.header.type.label': 'Type',
  'storage.security-delegation.plugins.list.header.active.label': 'Enable',
  'storage.security-delegation.plugins.list.empty.title': 'No strategy defined',
  'storage.security-delegation.plugins.list.edit.button': 'Edit',
  'storage.security-delegation.list.add.button': 'Add new strategy',
  'storage.security-delegation.plugins.list.confirm.delete.title': 'Delete strategy {name} ?',
  'storage.security-delegation.plugins.list.active.on.button': 'Enable strategy',
  'storage.security-delegation.plugins.list.active.off.button': 'Disable strategy',

  'storage.plugins.security.form.create.title': 'Add new access rights strategy',
  'storage.plugins.security.form.edit.title': 'Edit access rights strategy "{name}"',
  'storage.plugins.security.form.create.subtitle': 'First you have to select a strategy type. When its done, you have to configure the needed parameters.',
  'storage.plugins.security.form.edit.subtitle': 'Please configure the strategy parameters.',
  'storage.plugins.security.form.type.select.title': 'Access rights strategy type',
  'storage.plugins.security.form.type.select.label': 'Select a type ...',
  'storage.plugins.security.form.invalid.id': 'Configuration selected does not exist anymore.',
  'storage.plugins.security.form.back.button': 'Cancel',
  'storage.plugins.security.form.add.button': 'Add',

  'storage.locations.size.title': 'Data storage locations occupancy rate',
  'storage.locations.configuration.title': 'Configure data storage locations',
  'storage.locations.configuration.subtitle': 'This section allows you to configure storage locations',

  'storage.back.button': 'Back',
}, Locales.en)

export default messages
