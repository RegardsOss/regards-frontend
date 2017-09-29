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
  'model.list.title': 'Models',
  'model.list.subtitle': 'All data models of the project',
  'model.list.table.name': 'Name',
  'model.list.table.description': 'Description',
  'model.list.table.type': 'Type',
  'model.list.table.actions': 'Actions',
  'model.list.action.add': 'Add',
  'model.list.action.cancel': 'Annuler',
  'model.list.action.export': 'Dowload',
  'model.list.action.bind': 'Link attributes',
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
  'model.form.name': 'Name',
  'model.form.description': 'Description',
  'model.form.type': 'Type',
  'model.form.file': 'Or send an XML file containing the model, fragments and its attributes',
  'model.form.action.cancel': 'Cancel',
  'model.form.action.submit': 'Save',

}, Locales.en)

export default messages
