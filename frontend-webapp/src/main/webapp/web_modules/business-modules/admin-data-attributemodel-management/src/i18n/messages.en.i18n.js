import { Locales } from '@regardsoss/form-utils'
import DEFAULT_FRAGMENT_NAME from '../DefaultFragmentName'

const messages = Object.assign({
  'attrmodel.list.title': 'Attribute models',
  'attrmodel.list.subtitle': 'Manage project attribute models',
  'attrmodel.list.table.fragment': 'Fragment',
  'attrmodel.list.table.name': 'Name',
  'attrmodel.list.table.description': 'Description',
  'attrmodel.list.table.type': 'Type',
  'attrmodel.list.table.actions': 'Actions',
  'attrmodel.list.action.add': 'Add',
  'attrmodel.list.action.cancel': 'Cancel',
  'attrmodel.list.action.edit': 'Edit',
  'attrmodel.list.action.delete': 'Delete',
  'attrmodel.list.delete.title': 'Delete the attribute {name} ?',

  'attrmodel.edit.title': 'Edit the attribute model {name}',
  'attrmodel.create.title': 'Create a model',
  'attrmodel.form.name': 'Attribute name',
  'attrmodel.form.label': 'Attribute label',
  'attrmodel.form.fragment': 'Fragment',
  'attrmodel.form.description': 'Description',
  'attrmodel.form.alterable': 'Alterable',
  'attrmodel.form.optional': 'Optionnel',
  'attrmodel.form.type': 'Type',
  'attrmodel.form.action.cancel': 'Cancel',
  'attrmodel.form.action.submit': 'Save',

  'attrmodel.form.restriction.NUMBER_RANGE.active': 'Activate a range restriction',
  'attrmodel.form.restriction.NUMBER_RANGE.min': 'Minimal value autorized',
  'attrmodel.form.restriction.NUMBER_RANGE.isMinInclusive': 'Minimal limit included in the set',
  'attrmodel.form.restriction.NUMBER_RANGE.max': 'Maximal value autorized',
  'attrmodel.form.restriction.NUMBER_RANGE.isMaxInclusive': 'Maximal limit included in the set',

  'attrmodel.form.restriction.ENUMERATION.add': 'Add a value:',
  'attrmodel.form.restriction.ENUMERATION.value': 'Value',
  'attrmodel.form.restriction.ENUMERATION.active': 'Define the autorized value set',
  'attrmodel.form.restriction.ENUMERATION.addinput': 'New value',

  'attrmodel.form.restriction.PATTERN.pattern': 'Pattern',
  'attrmodel.form.restriction.PATTERN.active': 'Activate the pattern restriction',

  'attrmodel.form.info.what-happens-when-you-add-an-attribute-to-fragment-already-used': 'Adding a new mandatory attribute to a fragment already used by models can cause issues during future ingestions and data updates',

  'invalid.min_3_carac': 'At least 3 characters',
  'invalid.max_32_carac': 'Max 32 characters',
  'invalid.only_1_restriction_on_the_same_time': 'You can\'t activate more than one restriction',
}, Locales.en)
messages[`attrmodel.form.fragment.${DEFAULT_FRAGMENT_NAME}`] = 'No fragment'

export default messages
