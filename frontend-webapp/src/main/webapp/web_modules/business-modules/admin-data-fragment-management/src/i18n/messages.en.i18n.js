import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'fragment.list.title': 'List model attribute fragments',
  'fragment.list.subtitle': 'A set of attribute (fragment) let you create a set of coherent attribute',
  'fragment.list.table.name': 'Name',
  'fragment.list.table.description': 'Description',
  'fragment.list.table.actions': 'Actions',
  'fragment.list.action.add': 'Add',
  'fragment.list.action.cancel': 'Cancel',
  'fragment.list.action.edit': 'Edit',
  'fragment.list.action.delete': 'Delete',
  'fragment.list.action.export': 'Export',
  'fragment.list.delete.title': 'Delete fragment {name} ?',
  'fragment.list.delete.conditions' : 'You can delete any fragment which is not linked to any attributes',

  'fragment.edit.title': 'Edit fragment {name}',
  'fragment.create.title': 'Create a new fragment',
  'fragment.form.name': 'Fragment name',
  'fragment.form.fragment': 'Fragment',
  'fragment.form.description': 'Description',
  'fragment.form.file': 'Send an XML file containing the fragment and its attributes',
  'fragment.form.action.cancel': 'Cancel',
  'fragment.form.action.submit': 'Save',
}, Locales.en)

export default messages
