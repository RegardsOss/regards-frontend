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
 * i18n messages English language
 * @author Sébastien Binda
 */
const messages = {
  'plugin.form.title.create': 'Add a plugin',
  'plugin.form.title.update': 'Edit existing plugin {name}',
  'plugin.form.subtitle': 'Enter the path to your plugin JavaScript file and click search to valid it',
  'plugin.form.name': 'Name',
  'plugin.form.type': 'Type',
  'plugin.form.role': 'Role',
  'plugin.form.sourcesPath': 'Path to the main JavaScript file of the plugin',
  'plugin.form.invalid.source.path': 'The plugin path must point to a JavaScript file (.js extension required)',
  'plugin.form.icon': 'Plugin icon (Https link)',
  'plugin.form.submit.button': 'Add plugin',
  'plugin.form.update.button': 'Update plugin',
  'plugin.form.cancel.button': 'Cancel',
  'plugin.form.submit.error.invalid.plugin': ' The given plugin is not a valid plugin',
  'plugin.form.submit.error': 'Error saving new plugin to server',
  'plugin.form.delete': 'Remove',
  'plugin.form.edit': 'Edit',
  'plugins.list.delete.message': 'Remove plugin {name}?',
  'plugins.list.title': 'Plugins',
  'plugins.list.subtitle': 'Define search criteria or services with those plugins',
  'plugins.list.table.name': 'Name',
  'plugins.list.table.actions': 'Actions',
  'plugins.list.action.add': 'Add a plugin',
  'plugins.list.action.cancel': 'Back',
  'plugin.description.url': 'Access to plugin description',

  'role.name.PUBLIC': 'Public',
  'role.name.REGISTERED_USER': 'Registered user',
  'role.name.EXPLOIT': 'Operator',
  'role.name.ADMIN': 'Administrator',
  'role.name.PROJECT_ADMIN': 'Super Administrator',
  'role.name.empty': ' - ',
  ...Locales.en,
}

export default messages
