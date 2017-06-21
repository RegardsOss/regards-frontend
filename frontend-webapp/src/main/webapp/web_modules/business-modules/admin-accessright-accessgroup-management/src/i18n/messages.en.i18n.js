import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'group.list.title': 'Manage group acces',
  'group.list.subtitle': 'A group access allows to autorize a group of user to access to dataset, partially or totaly',
  'group.list.table.name': 'Name',
  'group.list.table.nbUser': 'Number of user(s)',
  'group.list.table.actions': 'Actions',
  'group.list.action.cancel': 'Cancel',
  'group.list.action.add': 'Create',
  'group.list.delete.message': 'Are you sure you want to delete the {name} access group ?',

  'group.list.table.actions.edit': 'Edit',
  'group.list.table.actions.accessrights': 'Access rights',
  'group.list.table.actions.duplicate': 'Duplicate',
  'group.list.table.actions.delete': 'Remove',

  'group.create.title': 'Create a new group access',
  'group.edit.title': 'Edit the group access {name}',
  'group.duplicate.title': 'Duplicate the group access {name}',
  'group.form.invalid.group': 'The required group is not defined',
  'group.form.name': 'Name',
  'group.form.action.cancel': 'Cancel',
  'group.form.action.save': 'Save',
  'group.form.private': 'Restricted access',
  'invalid.max_32_carac': 'The group access name can\'t exceed 32 characters',
}, Locales.en)

export default messages
