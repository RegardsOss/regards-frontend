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
  'project.list.value.isPublic': 'Public',
  'project.list.value.isPrivate': 'Private',
  'project.list.value.isAccessible': 'Visible',
  'project.list.value.isNotAccessible': 'Hidden',
  'project.list.value.isDeleted': 'Deleted',
  'project.list.title': 'Projects',
  'project.list.subtitle': 'Manage REGARDS Projects',
  'project.list.table.icon': 'Icon',
  'project.list.table.name': 'Name',
  'project.list.table.description': 'Description',
  'project.list.table.isPublic': 'Visibility',
  'project.list.table.isAccessible': 'Accessibility',
  'project.list.table.isDeleted': 'Deleted',
  'project.list.table.actions': 'Actions',
  'project.list.action.add': 'Add',
  'project.list.action.edit.connections.button': 'Configure database connections',
  'project.list.action.openbutton': 'Open',
  'project.list.action.editbutton': 'Edit',
  'project.list.action.licenseUpdateButton': 'License changed',
  'project.list.dialog.title.update.license': 'License changed?',
  'project.list.dialog.message.update.license': 'When you notify a license change, every project user will be prompted to accept the new licenses',
  'project.list.action.deletebutton': 'Remove',
  'project.list.dialog.title.delete': 'Remove this project?',

  'project.list.action.open': 'Login on that project admin dashboard',
  'project.edit.title': 'Edit the project {name}',
  'project.create.title': 'Create a new project',
  'project.form.name': 'Project name *',
  'project.form.label': 'Project label *',
  'project.form.hint.label': 'Use in all user interfaces to refer to the project.',
  'project.form.description': 'Description',
  'project.form.isPublic': 'Public project',
  'project.form.isAccessible': 'Accessible project',
  'project.form.icon': 'HTTP link to the icon',
  'project.form.license': 'HTTP link to the project license description file',
  'project.form.host': 'REGARDS gateway public address *',
  'project.form.crs': 'Define Geometries Coordinate reference system',
  'project.form.crs.WGS_84': 'Earth - WGS_84',
  'project.form.crs.MARS_49900': 'Mars - MARS_49900',
  'project.form.crs.ASTRO': 'Celestial vault',
  'project.form.isPoleToBeManaged': 'Do you need to handle polar cap polygons? If enabled, all polygons must follow geojson RFC 7946 (in particular right hand rule for exterior ring)',
  'project.form.action.cancel': 'Cancel',
  'project.form.action.submit': 'Save',

  'invalid.only_alphanumeric': 'User alphanumeric characters',

  // Database connections
  'project.connection.list.title': 'Configure databases accesses for project {project}',
  'project.connection.list.subtitle': 'Define the databases configurations for each microservice',
  'project.connection.list.microservice': 'Microservice name',
  'project.connection.list.status': 'Configuration status',
  'project.connection.list.actions': 'Actions',
  'project.connection.list.action.back': 'Back',
  'project.connection.is.configured': 'Active',
  'project.connection.is.not.valid': 'Failed while connecting:',
  'project.connection.is.disabled': 'Waiting for connection...',
  'project.connection.is.connecting': 'Testing connection...',
  'project.connection.is.not.defined': 'No connection defined',
  'project.connection.form.error.server': 'Error sending new connection for project',

  'database.connectionTester.default.tooltip': 'Test connection',
  'database.connectionTester.success.tooltip': 'Previous test successful. Test connection again',
  'database.connectionTester.warn.tooltip': 'Previous test finished with warning. Test connection again',
  'database.connectionTester.error.tooltip': 'Previous test finished with error. Test connection again',
  'database.connectionTester.start': 'Test',
  'database.connectionTester.restart': 'Restart',
  'database.connectionTester.connected': 'Connected',
  'database.connectionTester.warning': 'Connected',
  'database.connectionTester.notConnected': 'Not connected',
  'database.connectionTester.pending': 'Testing connection...',
  'database.connection.edit.tooltip': 'Edit connection',

  'database.list.test': 'Test the connection',
  'database.list.access.guided.configuration': 'Step-by-step configuration',

  'database.project.configuration.title': 'Configure database connections for project {project}',

  'database.form.edit.title': 'Connect {microservice} to a database for project {project}',
  'database.form.input.driverClassName': 'Driver',
  'database.form.input.address': 'Data base ip address',
  'database.form.input.port': 'Data base port',
  'database.form.input.db_name': 'Data base name',
  'database.form.input.userName': 'User',
  'database.form.input.password': 'Password',
  'database.form.reset': 'Reset',
  'database.form.action.save': 'Save',
  'database.form.action.next': 'Next',
  'database.form.action.previous': 'Previous',
  'database.form.action.cancel': 'Cancel',
  'database.form.input.cange.configuration.mode': 'Use this configuration for all microservices of the project',
  ...Locales.en,
}

export default messages
