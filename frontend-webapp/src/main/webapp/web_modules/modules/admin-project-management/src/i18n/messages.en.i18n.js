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
}, Locales.en)

export default messages
