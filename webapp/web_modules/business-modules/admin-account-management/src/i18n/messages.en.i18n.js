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
  'accounts.title': 'Accounts',
  'accounts.subtitle': 'Manage user accounts',
  'account.list.table.firstname': 'First name',
  'account.list.table.lastname': 'Last name',
  'account.list.table.email': 'E-mail',
  'account.list.table.status': 'Status',
  'account.list.table.status.PENDING': 'Pending',
  'account.list.table.status.ACTIVE': 'Active',
  'account.list.table.status.LOCKED': 'Locked',
  'account.list.table.status.INACTIVE': 'Inactive',
  'account.list.table.status.INACTIVE_PASSWORD': 'Password expired',
  'account.list.table.origin': 'Origin',
  'account.list.table.projects': 'Projects',
  'account.list.table.filters.firstName.label': 'First name',
  'account.list.table.filters.lastName.label': 'Last name',
  'account.list.table.filters.email.label': 'E-mail',
  'account.list.table.filters.status.label': 'Status',
  'account.list.table.filters.status.any': 'All status',
  'account.list.table.filters.status.PENDING': 'Pending',
  'account.list.table.filters.status.ACTIVE': 'Active',
  'account.list.table.filters.status.LOCKED': 'Locked',
  'account.list.table.filters.status.INACTIVE': 'Inactive',
  'account.list.table.filters.origin.label': 'Origin',
  'account.list.table.filters.origin.any': 'All origins',
  'account.list.table.filters.project.label': 'Project',
  'account.list.table.filters.projects.any': 'All projects',
  'account.list.table.filters.clear': 'Clear filters',
  'account.list.table.status.label.PENDING': 'Waiting administrator validation',
  'account.list.table.status.label.ACTIVE': 'Active',
  'account.list.table.status.label.LOCKED': 'Locked',
  'account.list.table.status.label.INACTIVE': 'Inactive',
  'account.list.table.status.label.INACTIVE_PASSWORD': 'Password expired',
  'account.list.table.action': 'Actions',
  'account.list.subtitle': 'Accounts shared by all projects',
  'account.list.table.no.content.title': 'Nothing to show',
  'account.list.table.content.loading': 'Loading...',
  'account.list.table.action.edit.tooltip': 'Edit',
  'account.list.table.action.accept.tooltip': 'Accept account',
  'account.list.table.action.refuse.tooltip': 'Refuse account',
  'account.list.table.action.enable.tooltip': 'Enable account',
  'account.list.table.action.delete.tooltip': 'Remove',
  'account.list.all.tab': 'All users ({count})',
  'account.list.all.no.content.message': 'No account in the application',
  'account.list.waiting.tab': 'New accounts ({count})',
  'account.list.waiting.no.content.message': 'No account waiting for validation. You can view and edit accounts "All accounts" tab',
  'account.list.delete.message': 'Remove the account {name}?',
  'account.list.refuse.message': 'Refuse the request?',
  'account.list.refuse.message.detail': 'This will remove the account {name}',
  'account.list.info.why-cant-remove-account-having-project-user': 'You can\'t delete an account if it has a project user',
  'account.list.info.nb.accounts': '{value} results',
  'account.list.refresh': 'Refresh',
  'account.list.info.nb.waiting.accounts': '{value} waiting accounts',
  'account.list.info.nb.waiting.accounts.filter': 'Waiting accounts',
  'account.list.action.cancel': 'Cancel',
  'account.list.action.filter': 'Filter',

  'account.form.input.firstName': 'First name',
  'account.form.input.lastName': 'Last name',
  'account.form.input.email': 'E-mail',
  'account.form.edit.title': 'Edit the {firstName} {lastName} account',
  'account.form.create.title': 'Create an account',
  'account.form.action.save': 'Save',
  'account.form.action.cancel': 'Cancel',

  'account.settings.title': 'Account settings',
  'account.settings.subtitle': 'Manage common user accounts settings',
  'account.settings.mode.field': 'Validation mode',
  'account.settings.mode.MANUAL': 'Manual: each account creation request must be acknowledged by the administrator',
  'account.settings.mode.AUTO': 'Automatic: account creation requests are automatically acknowledged',
  'account.settings.action.confirm': 'Confirm',
  'account.settings.action.cancel': 'Cancel',

  'account.fetch.origin.error': 'Unable to retrieve authentication system list',
  ...Locales.en,
}

export default messages
