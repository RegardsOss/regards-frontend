import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'projectUser.list.table.lastupdate': 'Last update',
  'projectUser.list.table.role': 'Role',
  'projectUser.list.table.email': 'E-mail',
  'projectUser.list.table.status': 'Status',
  'projectUser.list.table.lastconnection': 'Last connection',
  'projectUser.list.table.action': 'Actions',

  // by tab
  'projectUser.list.all.subtitle': 'List of all project users',
  'projectUser.list.all.action.create': 'Add',
  'projectUser.list.all.action.cancel': 'Cancel',
  'projectUser.list.all.tab': 'All users',

  'projectUser.list.waiting.subtitle': 'List of new project users waiting for access validation',
  'projectUser.list.waiting.tab': 'New users',

  'projectUser.create.title': 'Create a new user',
  'projectUser.create.input.role': 'Role',
  'projectUser.create.input.email': 'E-mail',
  'projectUser.create.input.firstName': 'Firstname',
  'projectUser.create.input.lastName': 'Lastname',
  'projectUser.create.input.password': 'Password',
  'projectUser.create.input.status': 'Status',
  'projectUser.create.action.create': 'Create',
  'projectUser.create.action.cancel': 'Cancel',
}, Locales.en)

export default messages
