/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'storage.data-storage.plugins.list.subtitle': 'This section allows you to configure storage locations and their prority. The priority is used by the system to determine on which storage location retrieve datas if they are stored on many of them.',
  'storage.data-storage.plugins.list.header.priority.label': 'Priority',
  'storage.data-storage.plugins.list.header.id.label': 'Identifier',
  'storage.data-storage.plugins.list.header.name.label': 'Label',
  'storage.data-storage.plugins.list.header.type.label': 'Storage mode',
  'storage.data-storage.plugins.list.header.active.label': 'Enable/Disable',
  'storage.data-storage.plugins.list.edit.button': 'Edit configuration',
  'storage.data-storage.plugins.list.duplicate.button': 'Duplicate configuration',
  'storage.data-storage.plugins.list.up.priority.button': 'Up priority',
  'storage.data-storage.plugins.list.down.priority.button': 'Down priority',
  'storage.data-storage.plugins.list.active.on.button': 'Enable sotrage',
  'storage.data-storage.plugins.list.active.off.button': 'Desable storage',
  'storage.data-storage.plugins.list.confirm.title': 'Delete storage {name} ?',
  'storage.data-storage.plugins.list.back.button': 'Back',
  'storage.data-storage.plugins.list.empty.title': 'No storage system available',
  'storage.data-storage.plugins.list.add.button': 'Create a new storage',
  'storage.data-storage.plugins.online.list.title': 'Online storages',
  'storage.data-storage.plugins.online.list.subtitle': 'Online storages are storage systems where datas are directly available. So, datas stored on those systems are downloadable.',
  'storage.data-storage.plugins.online.list.add.button': 'Add an online storage',
  'storage.data-storage.plugins.nearline.list.title': 'Nearline storages',
  'storage.data-storage.plugins.nearline.list.subtitle': 'Nearline storages are storage systems where retrieve datas can take a few time. So, datas stored on those systems are not donwloadable.',
  'storage.data-storage.plugins.nearline.list.add.button': 'Add a nearline storage',

  'storage.plugins.storage.form.create.title': 'Add new storage system',
  'storage.plugins.storage.form.edit.title': 'Edit storage system "{name}"',
  'storage.plugins.storage.form.create.subtitle': 'First you have to select a storage type. When its done, you have to configure the needed parameters.',
  'storage.plugins.storage.form.edit.subtitle': 'Please configure the storage parameters.',
  'storage.plugins.storage.form.type.select.title': 'Storage type',
  'storage.plugins.storage.form.type.select.label': 'Select a type ...',
  'storage.plugins.storage.form.invalid.id': 'Storage configuration selected does not exists anymore.',
  'storage.plugins.storage.form.back.button': 'Cancel',

  'storage.allocation-strategy.plugins.list.title': 'Configure data allocation strategies',
  'storage.allocation-strategy.plugins.list.subtitle': 'This section allows you to configure how the system will choose the data storage to use for each file acquired.',
  'storage.allocation-strategy.plugins.list.header.name.label': 'Name',
  'storage.allocation-strategy.plugins.list.header.type.label': 'Type',
  'storage.allocation-strategy.plugins.list.header.active.label': 'Enable',
  'storage.allocation-strategy.plugins.list.empty.title': 'No strategy defined',
  'storage.allocation-strategy.plugins.list.edit.button': 'Edit',
  'storage.allocation-strategy.list.add.button': 'Add new stategy',
  'storage.allocation-strategy.plugins.list.confirm.delete.title': 'Delete strategy {name} ?',
  'storage.allocation-strategy.plugins.list.active.on.button': 'Enable strategy',
  'storage.allocation-strategy.plugins.list.active.off.button': 'Disable strategy',

  'storage.plugins.allocation.form.create.title': 'Add a new allocation strategy',
  'storage.plugins.allocation.form.edit.title': 'Edit allocation strategy "{name}"',
  'storage.plugins.allocation.form.create.subtitle': 'First you have to select a strategy type. When its done, you have to configure the needed parameters.',
  'storage.plugins.allocation.form.edit.subtitle': 'Please configure the storage parameters.',
  'storage.plugins.allocation.form.type.select.title': 'Allocation strategy type',
  'storage.plugins.allocation.form.type.select.label': 'Select a type ...',
  'storage.plugins.allocation.form.invalid.id': 'Configuration selected does not exists anymore.',
  'storage.plugins.allocation.form.back.button': 'Cancel',

  'storage.locations.size.title': 'Data storage locations occupancy rate',
  'storage.locations.configuration.title': 'Configure data storage locations',
  'storage.locations.configuration.subtitle': 'This section allows you to configure storage locations',
  'storage.security.configuration.title': 'Configure archived files access rights',
  'storage.security.configuration.subtitle': 'This section allows you to configure archived files access rights strategies used by REGARDS. Hereunder are listed differents strategies types to your disposal. For each type, you can list existing configurations and create new one. Watch out, only one strategy configuration must be active.',
  'storage.security.no.plugin.title': 'There is no access rights strategy active',
  'storage.security.no.plugin.subtitle': 'Until any plugin is define and active, archived files will not be accessible',
  'storage.security.plugin.defined.title': 'The access to archived files is configured',
  'storage.security.plugin.defined.subtitle': ' ',
  'storage.security.too.many.plugin.title': 'Several access right strategies are actives',
  'storage.security.too.many.plugin.subtitle': 'Until more than one plugin are actives, archived files will not be accessible',
  'storage.plugin.list.configurations': 'List configurations',
  'storage.plugin.configuration.list.add': 'Add new configuration',
  'storage.back.button': 'Back',
}, Locales.en)

export default messages
