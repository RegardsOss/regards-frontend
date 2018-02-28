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
/**
 * @author Sébastien Binda
 */
const messages = Object.assign({
  'storage.data-storage.plugins.list.title': 'Configure data storage locations',
  'storage.data-storage.plugins.list.subtitle': 'This section allows you to configure storage locations and their prority. The priority is used by the system to determine on which storage location retrieve datas if they are stored on many of them.',
  'storage.data-storage.plugins.list.add.button': 'Add new storage location',
  'storage.data-storage.plugins.list.back.button': 'Back',

  'storage.data-storage.plugins.form.create.title': 'Add new storage system',
  'storage.data-storage.plugins.form.edit.title': 'Edit storage system "{name}"',
  'storage.data-storage.plugins.form.create.subtitle': 'First you have to select a storage type. When its done, you have to configure the needed parameters.',
  'storage.data-storage.plugins.form.edit.subtitle': 'Please configure the storage parameters.',
  'storage.data-storage.plugins.form.type.select.title': 'Storage type',
  'storage.data-storage.plugins.form.type.select.label': 'Select a type ...',
  'storage.data-storage.plugins.form.parameters.title': 'Configuration parameters',

  'storage.locations.size.title': 'Data storage locations occupancy rate',
  'storage.locations.configuration.title': 'Configure data storage locations',
  'storage.locations.configuration.subtitle': 'This section allows you to configure storage locations',
  'storage.allocations.configuration.title': 'Configure data storage allocation stategy',
  'storage.allocations.configuration.subtitle': 'This section allows you to configure the system strategies to define which configured storage location use.',
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
