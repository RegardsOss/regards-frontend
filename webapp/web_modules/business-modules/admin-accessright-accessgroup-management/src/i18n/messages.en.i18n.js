/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'group.list.title': 'Access groups',
  'group.list.subtitle': 'An access group allows users from this group to access datasets, partially or totally',
  'group.list.table.name': 'Name',
  'group.list.table.nbUser': 'Number of user(s)',
  'group.list.table.actions': 'Actions',
  'group.list.action.cancel': 'Cancel',
  'group.list.action.add': 'Create',
  'group.list.delete.message': 'Remove access group {name}?',
  'group.list.table.all.users': 'All users',
  'group.list.table.actions.show.group.users': 'Show group users',
  'group.list.table.actions.edit': 'Edit',
  'group.list.table.actions.accessrights': 'Access rights',
  'group.list.table.actions.duplicate': 'Duplicate',
  'group.list.table.actions.delete': 'Remove',

  'group.create.title': 'Create a new access group',
  'group.edit.title': 'Edit the access group {name}',
  'group.duplicate.title': 'Duplicate the access group {name}',
  'group.form.invalid.group': 'The required access group is not defined',
  'group.form.name': 'Name',
  'group.form.action.cancel': 'Cancel',
  'group.form.action.save': 'Save',
  'group.form.public': 'Automatically link this group to all users and visitors',
  'invalid.max_32_carac': 'Use 32 characters or fewer for access groups names',
  ...Locales.en,
}

export default messages
