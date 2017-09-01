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
 **/
import { Locales } from '@regardsoss/form-utils'

const messages = Object.assign({
  'document.list.action.add': 'Add',
  'document.list.action.cancel': 'Cancel',
  'document.list.title': 'Documents',
  'document.list.subtitle': 'Documents are entities carrying files',
  'document.list.delete.message': 'Delete the document {name} ?',

  'document.list.action.edit': 'Edit',
  'document.list.action.duplicate': 'Duplicate',
  'document.list.action.delete': 'Delete',

  'document.list.table.label': 'Label',
  'document.list.table.actions': 'Actions',
  'document.list.table.model': 'Model',

  'document.no.dataset.title': 'No document',

  'document.form.links.component.subtitle': 'Current document links',
  'document.form.links.remainingdocument.subtitle': 'Available documents',
  'document.form.links.document.subtitle': 'Document links',
  'document.form.links.subtitle': 'Documents are linked together to ease search',
  'document.form.links.title': 'Update document links',
  'document.form.links.action.done': 'Save',
  'document.form.links.action.cancel': 'Back',
  'document.form.links.remainingdocument.search': 'Filter documents with their names',

  'document.form.action.next': 'Next',
  'document.form.action.cancel': 'Cancel',
  'document.form.model': 'Document models',
  'document.form.label': 'Label',
  'document.form.geometry': 'Geometry',
  'document.form.table.value': 'Fixed value',
  'document.form.table.fragmentAndLabel': 'Fragment and attribute name',
  'document.form.table.type': 'Type',
  'document.form.table.input': 'Attribute value',
  'document.form.subtitle': 'Manage document attributes',
  'document.edit.title': 'Edit the document {name}',
  'document.create.title': 'Create a document',
  'document.duplicate.title': 'Duplicate the document {name}',
  'invalid.max_128_carac': 'Document label can\'t exceed 128 characters',

  'document.stepper.links': 'Edit links with others documents',
  'document.stepper.attributes': 'Setup document attributes',
  'document.stepper.files': 'Associated files',

  'document.form.files.docFiles.subtitle': 'Associated files list',
  'document.form.files.addFile.subtitle': 'Add files',
}, Locales.en)

export default messages
