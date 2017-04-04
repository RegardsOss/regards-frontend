import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'project.list.value.isPublic': 'Public',
  'project.list.value.isPrivate': 'Private',
  'project.list.value.isAccessible': 'Accessible',
  'project.list.value.isNotAccessible': 'Not accessible',
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
  'project.list.dialog.title.delete': 'Remove that project?',

  'project.list.action.open': 'Login on that project admin dashboard',
  'project.edit.title': 'Edit the project {name}',
  'project.create.title': 'Create a new project',
  'project.form.name': 'Project name',
  'project.form.description': 'Description',
  'project.form.isPublic': 'Public project',
  'project.form.isAccessible': 'Accessible project',
  'project.form.icon': 'Icon',
  'project.form.license': 'License',
  'project.form.action.cancel': 'Cancel',
  'project.form.action.submit': 'Save',

  'invalid.only_alphanumeric': 'Only alphanumeric caracters are allowed',

  // Database connections
  'project.connection.list.title': 'Configure databases accesses for project {project}',
  'project.connection.list.subtitle': 'Here under you can define the databases configurations for each microservice',
  'project.connection.list.microservice': 'Microservice name',
  'project.connection.list.status': 'Configuration status',
  'project.connection.list.actions': 'Actions',
  'project.connection.is.configured': 'Valid',
  'project.connection.is.not.configured': 'Not valid',

  'database.connectionTester.start': 'Test',
  'database.connectionTester.restart': 'Restart',
  'database.connectionTester.connected': 'Connected',
  'database.connectionTester.warning': 'Connected',
  'database.connectionTester.notConnected': 'Not connected',
  'database.connectionTester.pending': 'Testing connection...',

  'database.connectionTester.snackbar.connected': '{microservice} is properly configured for {driverClassName}.',
  'database.connectionTester.snackbar.warning': 'TODO',
  'database.connectionTester.snackbar.notConnected': '{microservice} could not establish connection with {driverClassName}.',

  'database.list.test': 'Test the connection',
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
