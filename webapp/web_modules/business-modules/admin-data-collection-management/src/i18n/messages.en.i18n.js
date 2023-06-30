/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const messages = {
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
  'collection.form.links.remainingcollection.search': 'Filter collections with their name',
  'collection.list.table.label': 'Label',
  'collection.list.table.actions': 'Actions',
  'collection.list.table.model': 'Model',
  'collection.form.action.next': 'Next',
  'collection.form.action.cancel': 'Cancel',
  'collection.form.providerId': 'Supplier identifier (*)',
  'collection.form.model': 'Collection models',
  'collection.form.label': 'Label (*)',
  'collection.form.geometry': 'Geometry',
  'collection.form.table.value': 'Fixed value',
  'collection.form.table.fragmentAndLabel': 'Fragment and attribute name',
  'collection.form.table.type': 'Type',
  'collection.form.table.input': 'Attribute value',
  'collection.form.subtitle': 'Manage collection attributes',
  'collection.form.duplicate.warning.subtitle': 'Manage collection attributes. Warning: original collection files will not be copied.',
  'collection.edit.title': 'Edit the collection {name}',
  'collection.create.title': 'Create a collection',
  'collection.duplicate.title': 'Duplicate the collection {name}',
  'collection.stepper.links': 'Edit links with others collections',
  'collection.stepper.files': 'Associated files',
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
  'collection.list.tooltip.info.button': 'Details',
  'collection.list.tooltip.copy.button': 'Copy reference to clipboard',
  'collection.table.filter.collection.label': 'Collection',
  'collection.table.filter.clear.button': 'Clear',
  'collection.table.filter.button': 'Apply',
  'collection.table.refresh.button': 'Refresh',
  'collection.no.collection.title': 'No collections',
  'collection.no.collection.subtitle': 'Create your first collection',

  'collection.form.files.action.cancel': 'Back',
  'collection.form.files.action.next': 'Next',
  'collection.form.files.subtitle': 'Add one or more description file(s) to the collection to explain its content. Three file formats are allowed : HTML, PDF and Markdown.',
  'collection.form.files.title': 'Manage files associated with the collection',

  'collection.form.links.tag.remove.button': 'Remove',
  'collection.form.links.tag.add.button': 'Add',
  'collection.form.links.tag.add': 'New tag',
  'collection.form.links.tag.subtitle': 'Associate with tags',
  'collection.form.links.collection.none': 'No collection linked',

  'collection.info.urn.label': 'Unique reference (ipId) : ',
  'collection.info.creationdate.label': 'Creation date : ',
  'collection.info.model.label': 'Collection model : ',
  'collection.info.close': 'Close',
  'collection.info.title': 'Information about collection {name}',
  ...Locales.en,
}

export default messages
