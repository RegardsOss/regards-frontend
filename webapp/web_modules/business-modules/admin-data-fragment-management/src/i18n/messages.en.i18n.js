/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'fragment.list.title': 'Fragments',
  'fragment.list.subtitle': 'A fragment is a cluster of various attributes in a consistent set',
  'fragment.list.table.name': 'Name',
  'fragment.list.table.description': 'Description',
  'fragment.list.table.actions': 'Actions',
  'fragment.list.action.add': 'Add',
  'fragment.list.action.cancel': 'Cancel',
  'fragment.list.action.edit': 'Edit',
  'fragment.list.action.delete': 'Delete',
  'fragment.list.action.export': 'Download',
  'fragment.list.delete.title': 'Delete fragment {name} ?',
  'fragment.list.delete.conditions': 'To delete a fragment, make sure it is\'nt linked to any attribute by removing them in their configuration UI',

  'fragment.edit.title': 'Edit fragment {name}',
  'fragment.create.title': 'Create a fragment',
  'fragment.form.name': 'Fragment name',
  'fragment.form.fragment': 'Fragment',
  'fragment.form.description': 'Description',
  'fragment.form.file': 'Send an XML file containing the fragment and its attributes',
  'fragment.form.action.cancel': 'Cancel',
  'fragment.form.action.submit': 'Save',
  ...Locales.en,
}

export default messages
