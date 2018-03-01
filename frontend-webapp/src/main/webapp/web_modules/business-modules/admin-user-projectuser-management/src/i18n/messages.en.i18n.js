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
import { Locales as MetadataLocales } from '@regardsoss/user-metadata-common'

const messages = {
  'projectUser.list.table.no.content.title': 'Nothing to show',
  'projectUser.list.table.lastupdate': 'Last update',
  'projectUser.list.table.role': 'Role',
  'projectUser.list.table.email': 'E-mail',
  'projectUser.list.table.status': 'Status',
  'projectUser.list.table.status.label.WAITING_ACCOUNT_ACTIVE': 'Waiting instance validation',
  'projectUser.list.table.status.label.WAITING_ACCESS': 'Waiting project access',
  'projectUser.list.table.status.label.WAITING_EMAIL_VERIFICATION': 'Waiting for email verification',
  'projectUser.list.table.status.label.ACCESS_GRANTED': 'Project access granted',
  'projectUser.list.table.status.label.ACCESS_DENIED': 'Project access denied',
  'projectUser.list.table.status.label.ACCESS_INACTIVE': 'Access deactivated',
  'projectUser.list.table.lastConnection': 'Last connection',
  'projectUser.list.table.action': 'Actions',
  'projectUser.list.table.action.edit.tooltip': 'Edit',
  'projectUser.list.table.action.accept.tooltip': 'Accept access',
  'projectUser.list.table.action.deny.tooltip': 'Deny access',
  'projectUser.list.table.action.active.tooltip': 'Enable access',
  'projectUser.list.table.action.inactive.tooltip': 'Disable access',
  'projectUser.list.table.action.delete.tooltip': 'Remove',
  'projectUser.list.action.cancel': 'Cancel',
  'projectUser.list.all.tab': 'All users ({count})',
  'projectUser.list.all.subtitle': 'List of all project users',
  'projectUser.list.all.action.create': 'Add',
  'projectUser.list.all.no.content.message': 'No user for this project',
  'projectUser.list.waiting.tab': 'New users ({count})',
  'projectUser.list.waiting.subtitle': 'New users waiting for access validation',
  'projectUser.list.waiting.accept.all': 'Accept all',
  'projectUser.list.waiting.no.content.message': 'No user waiting for an access. You can view and modify users list in "All users" tab',
  'projectUser.list.delete.message': 'Remove user {name}?',

  'projectUser.edit.title': 'Edit the user {email}',
  'projectUser.edit.action.save': 'Save',
  'projectUser.create.using.existing.account': 'The user already has a REGARDS user account',
  'projectUser.create.title': 'Create a user',
  'projectUser.create.message': 'Create a user for the project. {passwordRules}',
  'projectUser.create.input.role': 'Role',
  'projectUser.create.input.email': 'E-mail',
  'projectUser.create.input.firstName': 'Firstname',
  'projectUser.create.input.lastName': 'Lastname',
  'projectUser.create.input.password': 'Password',
  'projectUser.create.input.password.confirm': 'Confirm password',
  'projectUser.create.input.status': 'Status',
  'projectUser.create.input.groups': 'Groups',
  'projectUser.create.action.add': 'Add',
  'projectUser.create.action.create': 'Create',
  'projectUser.create.action.cancel': 'Cancel',

  ...Locales.en,
  ...MetadataLocales.en,
}

export default messages
