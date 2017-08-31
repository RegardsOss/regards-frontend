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
 * */
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'connection.create.title': 'Create an external connection',
  'connection.edit.title': 'Edit connection {name}',
  'connection.form.subtitle': 'Connections allow the REGARDS server to connect to the datasource you wish to share',
  'connection.form.label': 'Connection name',
  'connection.form.version': 'Version',
  'connection.form.priorityOrder': 'Connection priority',
  'connection.form.pluginClassName': 'Connection plugin',
  'connection.form.user': 'User for connecting to the database',
  'connection.form.password': 'Password for connecting to the database',
  'connection.form.dbProtocol': 'Communication protocol (ex: jdbc:postgresql)',
  'connection.form.dbHost': 'Database address',
  'connection.form.dbPort': 'Port',
  'connection.form.dbName': 'Database name',
  'connection.form.driver': 'Database type',
  'connection.form.maxPoolSize': 'Maximum number of simultaneous connections (maxPoolSize)',
  'connection.form.minPoolSize': 'Number of simultaneous connections continuously maintained (minPoolSize)',
  'connection.form.isActive': 'Connection is active',
  'connection.form.action.save': 'Save',
  'connection.form.action.cancel': 'Cancel',
  'connection.list.title': 'External connections',
  'connection.list.subtitle': 'Connections allow the REGARDS server to connect to the datasource you wish to share',
  'connection.list.table.label': 'Connection name',
  'connection.list.table.isActive': 'Connection status',
  'connection.list.isActive.false': 'Disabled',
  'connection.list.isActive.true': 'Activated',
  'connection.list.table.test': 'Test connection',
  'connection.list.table.actions': 'Actions',
  'connection.list.action.add': 'Add',
  'connection.list.action.cancel': 'Previous',
  'connection.list.action.edit': 'Edit',
  'connection.list.action.delete': 'Delete',
  'connection.list.delete.title': 'Delete the connection {name} ?',

  'database.connectionTester.start': 'Check the connection',
  'connection.connectionTester.snackbar.success': 'Connection to {label} is working',
  'connection.connectionTester.snackbar.error': 'Connection to {label} failed',
  'connection.connectionTester.pending': 'Trying to connect...',
  'invalid.maxPoolSizeGreaterThanMinPoolSize': 'The maximum number of connections must be greater than the minimum',
}, Locales.en)

export default messages
