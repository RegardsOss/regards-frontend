import { Locales } from '@regardsoss/form-utils'
import { Locales as MetadataLocales } from '@regardsoss/user-metadata-common'

const messages = {
  'projectUser.list.table.no.content.title': 'Nothing to show',
  'projectUser.list.table.lastupdate': 'Last update',
  'projectUser.list.table.role': 'Role',
  'projectUser.list.table.email': 'E-mail',
  'projectUser.list.table.status': 'Status',
  'projectUser.list.table.status.label.WAITING_ACCESS': 'Waiting project access',
  'projectUser.list.table.status.label.ACCESS_GRANTED': 'Project access granted',
  'projectUser.list.table.status.label.ACCESS_DENIED': 'Project access denied',
  'projectUser.list.table.status.label.ACCESS_INACTIVE': 'Inactive',
  'projectUser.list.table.lastConnection': 'Last connection',
  'projectUser.list.table.action': 'Actions',
  'projectUser.list.table.action.edit.tooltip': 'Edit user',
  'projectUser.list.table.action.accept.tooltip': 'Accept user access',
  'projectUser.list.table.action.deny.tooltip': 'Deny user access',
  'projectUser.list.table.action.delete.tooltip': 'Delete user',
  'projectUser.list.action.cancel': 'Cancel',
  'projectUser.list.all.tab': 'All users ({count})',
  'projectUser.list.all.subtitle': 'List of all project users',
  'projectUser.list.all.action.create': 'Add',
  'projectUser.list.all.no.content.message': 'There is no user to show in project',
  'projectUser.list.waiting.tab': 'New users ({count})',
  'projectUser.list.waiting.subtitle': 'List of new project users waiting for access validation',
  'projectUser.list.waiting.accept.all': 'Accept all',
  'projectUser.list.waiting.no.content.message': 'There is no user waiting for project access. You can view and modify users list in "all users" tab',
  'projectUser.list.delete.message': 'Confirm deletion of user {name} ?',

  'projectUser.edit.title': 'Edit the user {email}',
  'projectUser.edit.action.save': 'Save',
  'projectUser.create.using.existing.account': 'The user already have a REGARDS user account',
  'projectUser.create.title': 'Create a new user',
  'projectUser.create.input.role': 'Role',
  'projectUser.create.input.email': 'E-mail',
  'projectUser.create.input.firstName': 'Firstname',
  'projectUser.create.input.lastName': 'Lastname',
  'projectUser.create.input.password': 'Password',
  'projectUser.create.input.status': 'Status',
  'projectUser.create.input.groups': 'Groups',
  'projectUser.create.action.create': 'Create',
  'projectUser.create.action.cancel': 'Cancel',

  ...Locales.en,
  ...MetadataLocales.en,
}

export default messages
