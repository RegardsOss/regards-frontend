import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'group.list.title': 'Access groups',
  'group.list.subtitle': 'An access group allows users from this group to access datasets, partially or totaly',
  'group.list.table.name': 'Name',
  'group.list.table.nbUser': 'Number of user(s)',
  'group.list.table.actions': 'Actions',
  'group.list.action.cancel': 'Cancel',
  'group.list.action.add': 'Create',
  'group.list.delete.message': 'Remove access group {name}?',

  'group.list.table.actions.edit': 'Edit',
  'group.list.table.actions.accessrights': 'Access rights',
  'group.list.table.actions.duplicate': 'Duplicate',
  'group.list.table.actions.delete': 'Remove',

  'group.create.title': 'Create a new access group',
  'group.edit.title': 'Edit the access group {name}',
  'group.duplicate.title': 'Duplicate the access group {name}',
  'group.form.invalid.group': 'The required access group is not defined',
  'group.form.name': 'Name',
  'group.form.action.cancel': 'Cancel',
  'group.form.action.save': 'Save',
  'group.form.public': 'Automatically link this group to all users and visitors',
  'invalid.max_32_carac': 'Use 32 characters or fewer for access groups names',
}, Locales.en)

export default messages
