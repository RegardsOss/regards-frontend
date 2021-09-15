/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { Locales } from '@regardsoss/form-utils'
import DEFAULT_FRAGMENT_NAME from '../DefaultFragmentName'

const messages = {
  'attrmodel.list.delete.conditions': 'You can delete attributes which are not associated to a model.',
  'attrmodel.list.title': 'Attribute models',
  'attrmodel.list.subtitle': 'All attribute models for the project',
  'attrmodel.list.table.fragment': 'Fragment',
  'attrmodel.list.table.name': 'Name',
  'attrmodel.list.table.label': 'Label',
  'attrmodel.list.table.description': 'Description',
  'attrmodel.list.table.type': 'Type',
  'attrmodel.list.table.actions': 'Actions',
  'attrmodel.list.action.add': 'Add',
  'attrmodel.list.action.cancel': 'Cancel',
  'attrmodel.list.action.edit': 'Edit',
  'attrmodel.list.action.delete': 'Delete',
  'attrmodel.list.delete.title': 'Delete the attribute {name} ?',
  'attrmodel.list.empty.title': 'No attribute model defined',
  'attrmodel.list.filter.name': 'Filter by attribute name',

  'attrmodel.edit.title': 'Edit the attribute model {name}',
  'attrmodel.create.title': 'Create a model',
  'attrmodel.form.name': 'Attribute name',
  'attrmodel.form.label': 'Attribute label',
  'attrmodel.form.unit': 'Unit',
  'attrmodel.form.fragment': 'Fragment',
  'attrmodel.form.description': 'Description',
  'attrmodel.form.arraysize': 'Array size',
  'attrmodel.form.precision': 'Precision',
  'attrmodel.form.alterable': 'Alterable',
  'attrmodel.form.optional': 'Optional',
  'attrmodel.form.esmapping': 'ElasticSearch Mapping',
  'attrmodel.form.type': 'Type',
  'attrmodel.form.action.cancel': 'Cancel',
  'attrmodel.form.action.submit': 'Save',

  'attrmodel.form.unit.description.dialog.title': 'Attribute parameter unit',
  'attrmodel.form.unit.description.dialog.content':
    'Select here the attributes values unit, following the IEEE 1541 specification.<br />'
    + 'Allowed units are : <ul>'
    + '<li> - bytes, byte, B, kB, mB, gB, tB, pB, eB</li>'
    + '<li> - bit, bits, b, kb, mb, gb, tb, pb, eb</li>'
    + '</ul>',
  'attrmodel.form.unit.description.dialog.close': 'Close',

  'attrmodel.form.restriction.NUMBER_RANGE.active': 'Activate a range restriction',
  'attrmodel.form.restriction.NUMBER_RANGE.min': 'Minimal value authorized',
  'attrmodel.form.restriction.NUMBER_RANGE.isMinInclusive': 'Minimal limit included in the set',
  'attrmodel.form.restriction.NUMBER_RANGE.max': 'Maximal value authorized',
  'attrmodel.form.restriction.NUMBER_RANGE.isMaxInclusive': 'Maximal limit included in the set',

  'attrmodel.form.restriction.ENUMERATION.add': 'Add a value:',
  'attrmodel.form.restriction.ENUMERATION.value': 'Value',
  'attrmodel.form.restriction.ENUMERATION.active': 'Define the authorized value set',
  'attrmodel.form.restriction.ENUMERATION.addinput': 'New value',

  'attrmodel.form.restriction.PATTERN.pattern': 'Pattern',
  'attrmodel.form.restriction.PATTERN.active': 'Activate the pattern restriction',

  'attrmodel.form.restriction.JSON_SCHEMA.schema': 'Json schema',

  'attrmodel.form.info.what-happens-when-you-add-an-attribute-to-fragment-already-used': 'Adding a new mandatory attribute to a fragment already used by models can cause issues during future ingestion and data updates',

  'invalid.only_1_restriction_on_the_same_time': 'You can\'t activate more than one restriction',
  ...Locales.en,
}
messages[`attrmodel.form.fragment.${DEFAULT_FRAGMENT_NAME}`] = 'No fragment'

export default messages
