/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * */
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'collection.list.action.add': 'Add',
  'collection.list.action.cancel': 'Cancel',
  'collection.list.title': 'Collections',
  'collection.list.subtitle': 'Collections are clustering of data by topic',
  'collection.list.delete.message': 'Delete the collection {name} ?',
  'collection.form.links.component.subtitle': 'Current collection links',
  'collection.form.links.remainingcollection.subtitle': 'Available collections',
  'collection.form.links.collection.subtitle': 'Collection links',
  'collection.form.links.subtitle': 'Collections are linked together to ease search',
  'collection.form.links.title': 'Update collection links',
  'collection.form.links.action.done': 'Save',
  'collection.form.links.action.cancel': 'Back',
  'collection.form.links.remainingcollection.search': 'Filter collections with their names',
  'collection.list.table.label': 'Label',
  'collection.list.table.actions': 'Actions',
  'collection.list.table.model': 'Model',
  'collection.form.action.next': 'Next',
  'collection.form.action.cancel': 'Cancel',
  'collection.form.model': 'Collection models',
  'collection.form.label': 'Label',
  'collection.form.geometry': 'Geometry',
  'collection.form.table.value': 'Fixed value',
  'collection.form.table.fragmentAndLabel': 'Fragment and attribute name',
  'collection.form.table.type': 'Type',
  'collection.form.table.input': 'Attribute value',
  'collection.form.subtitle': 'Manage collection attributes',
  'collection.edit.title': 'Edit the collection {name}',
  'collection.create.title': 'Create a collection',
  'collection.duplicate.title': 'Duplicate the collection {name}',
  'collection.stepper.links': 'Edit links with others collections',
  'collection.stepper.attributes': 'Setup collection attributes',

  'collection.form.descriptionUrl': 'Page URL describing the dataset',
  'collection.form.descriptionFileContent': 'Upload a Markdown or PDF file',
  'collection.form.descriptionFileContentReuploadToOverride': 'Upload a file containing the description if you want to overwrite the existing one',
  'collection.form.datasource': 'Data source',
  'collection.form.radio.descriptionUrl': 'Provide the URL containing the description',
  'collection.form.radio.descriptionFileContent': 'Upload a file containing the description',
  'collection.form.radio.none': 'No description',

  'collection.list.action.edit': 'Edit',
  'collection.list.action.duplicate': 'Duplicate',
  'collection.list.action.delete': 'Delete',
}, Locales.en)

export default messages
