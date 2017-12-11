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
  'account.list.table.firstName': 'Firstname',
  'account.list.table.lastName': 'Lastname',
  'account.list.table.email': 'E-mail',
  'account.list.table.status': 'Status',
  'account.list.table.status.label.PENDING': 'Waiting administrator validation',
  'account.list.table.status.label.ACTIVE': 'Active',
  'account.list.table.status.label.LOCKED': 'Locked',
  'account.list.table.status.label.INACTIVE': 'Inactive',
  'account.list.table.action': 'Actions',
  'account.list.subtitle': 'Accounts shared by all projects',
  'account.list.table.no.content.title': 'Nothing to show',
  'account.list.table.action.edit.tooltip': 'Edit',
  'account.list.table.action.accept.tooltip': 'Accept',
  'account.list.table.action.refuse.tooltip': 'Refuse',
  'account.list.table.action.delete.tooltip': 'Remove',
  'account.list.all.tab': 'All users ({count})',
  'account.list.all.subtitle': 'List of all accounts in application',
  'account.list.all.no.content.message': 'No account in the application',
  'account.list.waiting.tab': 'New accounts ({count})',
  'account.list.waiting.subtitle': 'List of accounts waiting for validation',
  'account.list.waiting.no.content.message': 'No account waiting for validation. You can view and edit accounts "All accounts" tab',
  'account.list.delete.message': 'Remove the account {name}?',
  'account.list.refuse.message': 'Refuse the request?',
  'account.list.refuse.message.detail': 'This will remove the account {name}',
  'account.list.info.why-cant-remove-account-having-project-user': 'You can\'t delete an account if it has a project user',

  'account.form.input.firstName': 'Firstname',
  'account.form.input.lastName': 'Lastname',
  'account.form.input.email': 'E-mail',
  'account.form.edit.title': 'Edit the {firstName} {lastName} account',
  'account.form.create.title': 'Create an account',
  'account.form.action.save': 'Save',
  'account.form.action.cancel': 'Cancel',
}, Locales.en)

export default messages
