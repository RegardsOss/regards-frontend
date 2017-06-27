import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'fragment.list.title': 'Fragments',
  'fragment.list.subtitle': 'A fragment is a consistent set of attributes',
  'fragment.list.table.name': 'Name',
  'fragment.list.table.description': 'Description',
  'fragment.list.table.actions': 'Actions',
  'fragment.list.action.add': 'Add',
  'fragment.list.action.cancel': 'Cancel',
  'fragment.list.action.edit': 'Edit',
  'fragment.list.action.delete': 'Delete',
  'fragment.list.action.export': 'Download',
  'fragment.list.delete.title': 'Delete fragment {name} ?',
  'fragment.list.delete.conditions': 'To delete a fragment, make sure it is\'t linked to any attribute by removing them in the attributes configuration UI',

  'fragment.edit.title': 'Edit fragment {name}',
  'fragment.create.title': 'Create a fragment',
  'fragment.form.name': 'Fragment name',
  'fragment.form.fragment': 'Fragment',
  'fragment.form.description': 'Description',
  'fragment.form.file': 'Send an XML file containing the fragment and its attributes',
  'fragment.form.action.cancel': 'Cancel',
  'fragment.form.action.submit': 'Save',
}, Locales.en)

export default messages
