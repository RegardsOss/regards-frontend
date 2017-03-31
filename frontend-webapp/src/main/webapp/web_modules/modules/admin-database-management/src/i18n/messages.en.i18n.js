/*
 * LICENSE_PLACEHOLDER
 */
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'database.connectionTester.start': 'Test',
  'database.connectionTester.restart': 'Restart',
  'database.connectionTester.connected': 'Connected',
  'database.connectionTester.warning': 'Connected',
  'database.connectionTester.notConnected': 'Not connected',
  'database.connectionTester.pending': 'Testing connection...',

  'database.connectionTester.snackbar.connected': '{microservice} is properly configured for {driverClassName}.',
  'database.connectionTester.snackbar.warning': 'TODO',
  'database.connectionTester.snackbar.notConnected': '{microservice} could not establish connection with {driverClassName}.',

  'database.list.title': 'Databases',
  'database.list.subtitle': 'List of all microservice connections to a database for all existing projects',
  'database.list.microservice': 'Microservice',
  'database.list.project': 'Project',
  'database.list.test': 'Test the connection',
  'database.list.action': 'Actions',
  'database.list.access.guided.configuration': 'Step-by-step configuration',

  'database.project.configuration.title': 'Configure database connections for project {project}',

  'database.form.edit.title': 'Connect {microservice} to a database for project {project}',
  'database.form.input.driverClassName': 'Driver',
  'database.form.input.url': 'Url',
  'database.form.input.userName': 'User',
  'database.form.input.password': 'Password',
  'database.form.reset': 'Reset',
  'database.form.action.save': 'Save',
  'database.form.action.next': 'Next',
  'database.form.action.previous': 'Previous',
  'database.form.action.cancel': 'Cancel',

}, Locales.en)

export default messages
