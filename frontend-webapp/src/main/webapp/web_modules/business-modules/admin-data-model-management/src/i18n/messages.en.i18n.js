import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'model.list.title': 'Projects',
  'model.list.subtitle': 'Manage REGARDS Projects',
  'model.list.table.name': 'Name',
  'model.list.table.description': 'Description',
  'model.list.table.type': 'Type',
  'model.list.table.actions': 'Actions',
  'model.list.action.add': 'Add',
  'model.list.action.cancel': 'Annuler',
  'model.list.action.export': 'Export',
  'model.list.action.bind': 'Link this model with its attributes',
  'model.list.action.edit': 'Edit',
  'model.list.action.duplicate': 'Duplicate',
  'model.list.action.delete': 'Delete',
  'model.list.delete.title': 'Delete model {name} ?',

  'model.type.dataset': 'Dataset',
  'model.type.data': 'Data',
  'model.type.collection': 'Collection',
  'model.type.document': 'Document',

  'model.edit.title': 'Edit the model {name}',
  'model.create.title': 'Create a new model',
  'model.duplicate.title': 'Duplicate the model {name}',
  'model.form.name': 'Project name',
  'model.form.description': 'Description',
  'model.form.type': 'Type',
  'model.form.file': 'Or send an XML file containing the model, fragments and its attributes:',
  'model.form.action.cancel': 'Cancel',
  'model.form.action.submit': 'Save',
  'invalid.too_short': 'Must be at least 3 caractères',

  'table.actions.more': 'More actions',
}, Locales.en)

export default messages
