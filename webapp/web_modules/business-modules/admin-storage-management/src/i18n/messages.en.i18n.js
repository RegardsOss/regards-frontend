/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
const messages = {
  'storage.location.list.title': 'Configure data storage locations',
  'storage.location.list.subtitle': 'This section allows you to configure storage locations and their priority. The priority is used by the system to determine on which storage location retrieve data if they are stored on many of them.',
  'storage.location.form.help-message': 'Allocated size : This is the file storage size limit. If the storage is almost full, the service switch to a maintenance state. To disable this operation, do no enter an allocated size.',
  'storage.location.type.online.name': 'Online   : ',
  'storage.location.type.nearline.name': 'Nearline : ',
  'storage.location.type.offline.name': 'Offline  : ',
  'storage.location.type.cache.name': 'Cache    : ',
  'storage.location.type.online.description': 'Online storages. Files stored on this storage type are immediatly available for download.',
  'storage.location.type.nearline.description': 'Nearline storages. Files stored on this storage must be retrieved in cache system before being available for download.',
  'storage.location.type.offline.description': 'Offline storages. Files referenced on this storage are not availables.',
  'storage.location.type.cache.description': 'Unique storage type used to retrieve files from nearline storages. Only one action is possible on this storage, delete expired files.',
  'storage.location.list.header.stored-file.label': 'Stored files',
  'storage.location.list.header.total-size.label': 'Total size',
  'storage.location.list.header.deletion-error.label': 'Deletion errors',
  'storage.location.list.header.storage-error.label': 'Storage errors',
  'storage.location.list.header.name.label': 'Name',
  'storage.location.list.header.type.label': 'Type',
  'storage.location.list.header.activity': 'Activity',
  'storage.location.list.size.no.quota': 'No quota defined',
  'storage.location.list.activity.none': 'None',
  'storage.location.list.activity.storing': 'Storing files ...',
  'storage.location.list.activity.deleting': 'Deletion is running ...',
  'storage.location.list.activity.copying': 'Copy is running ...',
  'storage.location.list.errors.count': `{errorsCount, plural, 
    =0 {-}
    other {#}
  }`,
  'storage.location.list.edit.button': 'Edit configuration',
  'storage.location.list.copy.button': 'Copy files to another storage',
  'storage.location.list.delete-files.button': 'Delete storage\'s files',
  'storage.location.list.up.priority.button': 'Up priority',
  'storage.location.list.down.priority.button': 'Down priority',
  'storage.location.list.confirm.title': 'Delete storage {name} ?',
  'storage.location.list.back.button': 'Back',
  'storage.location.list.empty.title': 'No storage system available',
  'storage.location.list.add.button': 'Create a new storage',
  'storage.location.list.relaunch.storage': 'Relaunch storage errors',
  'storage.location.list.relaunch.deletion': 'Relaunch deletion errors',
  'storage.location.list.delete.storage': 'Delete storage errors',
  'storage.location.list.view.storage': 'View storage errors',
  'storage.location.list.delete.deletion': 'Delete deletion errors',
  'storage.location.list.view.deletion': 'View deletion errors',
  'storage.location.delete.confirm.title': 'Files from {name} storage will be removed',
  'storage.location.errors.delete.confirm.title': 'Deleteion of {name}\'s errors ?',
  'storage.location.errors.relaunch.confirm.title': 'Relaunch of {name}\'s errors ?',
  'storage.location.delete.confirm.message.option': 'This storage allows the deletion of physical files. Would you like to :',
  'storage.location.delete.confirm.option': 'Ignore error during physical deletion ?',
  'storage.location.delete.message.warning.option': 'Warning : ',
  'storage.location.delete.message.option': 'this storage is configured to not to delete the physical files. This action will only remove information related to those files from the database.',
  'storage.location.dialogs.confirm': 'Confirm',
  'storage.location.dialogs.cancel': 'Cancel',
  'storage.location.copy.confirm.title': 'Copy storage {name} files to...',
  'storage.location.copy.confirm.path-destination': 'Destination folder (optional)',
  'storage.location.copy.confirm.path-source': 'Source folder to copy (optional)',

  'storage.location.errors.view.title': 'Requests errors on <{name}>',
  'storage.location.errors.view.table.label': 'File',
  'storage.location.errors.view.table.error': 'Error cause',

  'storage.data-storage.monitoring.button': 'Recalculate occupations',
  'storage.data-storage.refresh.button': 'Refresh',
  'storage.data-storage.stop.button': 'Force stop all pending requests',
  'storage.location.stop.confirm.title': 'Force stop all pending requests ?',
  'storage.location.stop.confirm.message': 'This action will stop all running process and set them in error status.',
  'storage.data-storage.monitoring.dialog.title': 'Launch storage\'s supervision',
  'storage.data-storage.monitoring.dialog.checkbox': 'Storage supervision allow to calculate the size occupied and the number of files for each storage',

  'storage.location.form.create.title': 'Add new storage system',
  'storage.location.form.edit.title': 'Edit storage system "{name}"',
  'storage.location.form.subtitle': 'First you have to select a storage mode. When its done, you have to configure the needed parameters.',
  'storage.location.form.type.select.title': 'Storage mode',
  'storage.location.form.type.select.label': 'Select a mode ...',
  'storage.location.form.invalid.id': 'Storage configuration selected does not exists anymore.',
  'storage.location.form.back.button': 'Cancel',
  'storage.location.form.plugin.label': 'Data access plugin',
  'storage.location.form.allocated-size.label': 'Allocated size',
  'storage.location.form.name.label': 'Name',
  'storage.location.form.submit.button': 'Create',
  'storage.location.form.submit.edit.button': 'Modify',
  'invalid.name.expression': 'Name invalid, only alphanumeric, - and _ characters are allowed',

  'storage.location.copy.from.label': 'From : ',
  'storage.location.copy.to.label': 'To : ',
  'storage.location.copy.submit': 'Copy files',

  'storage.locations.size.title': 'Data storage locations occupancy rate',
  'storage.locations.configuration.title': 'Configure data storage locations',
  'storage.locations.configuration.subtitle': 'This section allows you to configure storage locations',

  'storage.back.button': 'Back',

  'storage.type.ONLINE': 'Online',
  'storage.type.OFFLINE': 'Offline',
  'storage.type.NEARLINE': 'Nearline',
  'storage.type.CACHE': 'Cache',
  'storage.type.NONE': 'None',

  'storage.settings.title': 'Storage settings',
  'storage.settings.subtitle': 'Configure settings',
  'storage.settings.fieldgroup.file.title': 'Storage settings for datasets and collections uploaded files',
  'storage.settings.fieldgroup.cache.title': 'Cache settings',
  'storage.settings.field.storeFiles': 'Save files',
  'storage.settings.field.cacheMaxSize': 'Cache max size (kB)',
  'storage.settings.field.tenantCachePath': 'Cache path',
  'storage.settings.field.storageLocation': 'Location',
  'storage.settings.field.storageSubdirectory': 'Sub directory',
  'storage.settings.action.confirm': 'Confirm',
  'storage.settings.action.cancel': 'Cancel',
  ...Locales.en,
}

export default messages
