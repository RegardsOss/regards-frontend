import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'attrmodel.list.title': 'Attribute models',
  'attrmodel.list.subtitle': 'Manage project Attribute models',
  'attrmodel.list.table.name': 'Name',
  'attrmodel.list.table.description': 'Description',
  'attrmodel.list.table.type': 'Type',
  'attrmodel.list.table.actions': 'Actions',
  'attrmodel.list.action.add': 'Add',
  'attrmodel.list.action.cancel': 'Cancel',

  'attrmodel.edit.title': 'Edit the attribute model {name}',
  'attrmodel.create.title': 'Create a new model',
  'attrmodel.form.name': 'Project name',
  'attrmodel.form.description': 'Description',
  'attrmodel.form.alterable': 'Alterable',
  'attrmodel.form.optional': 'Optionnel',
  'attrmodel.form.queryable': 'Queryable',
  'attrmodel.form.facetable': 'Facetable',
  'attrmodel.form.type': 'Type',
  'attrmodel.form.action.cancel': 'Cancel',
  'attrmodel.form.action.submit': 'Save',

  'attrmodel.form.restriction.NUMBER_RANGE.active': 'Activate a range restriction',
  'attrmodel.form.restriction.NUMBER_RANGE.min': 'Minimal value autorized',
  'attrmodel.form.restriction.NUMBER_RANGE.isMinInclusive': 'Minimal limit included in the set',
  'attrmodel.form.restriction.NUMBER_RANGE.max': 'Maximal value autorized',
  'attrmodel.form.restriction.NUMBER_RANGE.isMaxInclusive': 'Maximal limit included in the set',

  'attrmodel.form.restriction.ENUMERATION.add': 'Add a new value:',
  'attrmodel.form.restriction.ENUMERATION.value': 'Value',
  'attrmodel.form.restriction.ENUMERATION.active': 'Define the autorized value set',
  'attrmodel.form.restriction.ENUMERATION.addinput': 'New value',

  'attrmodel.form.restriction.PATTERN.pattern': 'Pattern',
  'attrmodel.form.restriction.PATTERN.active': 'Activate the pattern restriction',

  'invalid.min_3_carac': 'At least 3 characters',
  'invalid.max_32_carac': 'Max 32 characters',
  'invalid.only_1_restriction_on_the_same_time': 'You can\'t activate more than one restriction',
}, Locales.en)

export default messages
