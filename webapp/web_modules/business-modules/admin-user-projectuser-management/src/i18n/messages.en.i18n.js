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
import { Locales as MetadataLocales } from '@regardsoss/user-metadata-common'

const messages = {
  'projectUser.list.card.title': 'Users',
  'projectUser.list.card.subtitle': 'Created project users list',
  'projectUser.list.card.selectField.account': 'Visualisation mode : User',
  'projectUser.list.card.selectField.quota': 'Visualisation mode : Quota',
  'projectUser.list.card.selectField.accessRight': 'Visualisation mode : Access right',

  'projectUser.list.users.count': `{count, plural, 
    =0 {No user}
    one {# user}
    other {# users}
  }{waitingUsersCount, plural,
    =0 {}
    one { (# new account)}
    other { (# new accounts)}
  }`,
  'projectUser.list.only.waiting.users': 'waiting users',
  'projectUser.list.only.low.quota': 'Low quota users',
  'projectUser.list.filter.label': 'Filter: {groupFilter}',
  'projectUser.list.filter.none': 'none',
  'projectUser.list.filter.title': 'Filter users by access group',
  'projectUser.list.table.no.content.title': 'No user',
  'projectUser.list.table.loading.content.title': 'Loading...',
  'projectUser.list.table.no.content.without.filter.message': 'There is no user in current project',
  'projectUser.list.table.no.content.with.filter.message': 'There is no user matching current filters in project',
  'projectUser.list.table.lastupdate': 'Last update',
  'projectUser.list.table.role.label': 'Role',
  'projectUser.list.table.role.PUBLIC': 'Public',
  'projectUser.list.table.role.REGISTERED_USER': 'Registered user',
  'projectUser.list.table.role.EXPLOIT': 'Operator',
  'projectUser.list.table.role.ADMIN': 'Administrator',
  'projectUser.list.table.role.PROJECT_ADMIN': 'Super Administrator',
  'projectUser.list.table.role.INSTANCE_ADMIN': 'Instance Administrator',
  'projectUser.list.table.role.any': 'All roles',
  'projectUser.list.table.email.label': 'E-mail',
  'projectUser.list.table.lastName.label': 'Lastname',
  'projectUser.list.table.firstName.label': 'Firstname',
  'projectUser.list.table.status.label': 'Status',
  'projectUser.list.table.status.WAITING_ACCOUNT_ACTIVE': 'Waiting instance validation',
  'projectUser.list.table.status.WAITING_ACCESS': 'Waiting project access',
  'projectUser.list.table.status.WAITING_EMAIL_VERIFICATION': 'Waiting for email verification',
  'projectUser.list.table.status.ACCESS_GRANTED': 'Project access granted',
  'projectUser.list.table.status.ACCESS_DENIED': 'Project access denied',
  'projectUser.list.table.status.ACCESS_INACTIVE': 'Access deactivated',
  'projectUser.list.table.origin.label': 'Origin',
  'projectUser.list.table.origin.any': 'All origins',
  'projectUser.list.table.created': 'Creation date',
  'projectUser.list.table.lastConnection': 'Last connection',
  'projectUser.list.table.actions': 'Actions',
  'projectUser.list.table.quota': 'Quota',
  'projectUser.list.table.quotaWarningCount.label': 'Low quota',
  'projectUser.list.table.accessGroup.label': 'Groups',
  'projectUser.list.table.unlimited.quota.message': 'Unlimited',
  'projectUser.list.table.current.quota.message': '{currentQuota} / {maxQuota}',
  'projectUser.list.table.action': 'Actions',
  'projectUser.list.table.action.edit.quota': 'Set max quota',
  'projectUser.list.table.action.accept': 'Accept access',
  'projectUser.list.table.action.deny': 'Deny access',
  'projectUser.list.table.action.enable': 'Enable access',
  'projectUser.list.table.action.disable': 'Disable access',
  'projectUser.list.table.action.send.email': 'Send confirmation email',
  'projectUser.list.table.action.edit.tooltip': 'Edit',
  'projectUser.list.table.action.delete.tooltip': 'Remove',
  'projectUser.list.action.cancel': 'Cancel',
  'projectUser.list.all.action.create': 'Add',
  'projectUser.list.accept.all': 'Accept all',
  'projectUser.list.accept.all.tooltip': 'Grant access to all new users displayed in table',
  'projectUser.list.delete.message': 'Remove user {name}?',
  'projectUser.list.email.confirmation.message': 'Send confirmation email to {email} ?',
  'projectUser.list.edit.quota.dialog.title': 'Edit {name} max quota',
  'projectUser.list.edit.quota.dialog.max.quota.field': 'Max quota (-1: unlimited / positive or null integer: files count)',
  'projectUser.list.edit.quota.dialog.current.quota.field': 'Consumed quota',
  'projectUser.list.edit.quota.dialog.remaining.quota.field': 'Remaining quota',
  'projectUser.list.edit.quota.dialog.remaining.quota.unlimited': 'unlimited',
  'projectUser.list.edit.quota.dialog.cancel': 'Cancel',
  'projectUser.list.edit.quota.dialog.confirm': 'Confirm',
  'projectUser.list.table.filters.clear': 'Reset filters',
  'projectUser.list.info.nb.accounts': '{value} results',
  'projectUser.list.refresh': 'Refresh',
  'projectUser.list.filter': 'Filter',
  'projectUser.list.exportCSV.label': 'Summary',
  'projectUser.list.exportCSV.tooltip': 'Download summary file as CSV',

  'projectUser.edit.title': 'Edit the user {email}',
  'projectUser.edit.action.save': 'Save',
  'projectUser.create.using.existing.account': 'The user already has a REGARDS user account',
  'projectUser.create.title': 'Create a user',
  'projectUser.create.message': 'Create a user for the project. {passwordRules}',
  'projectUser.create.input.role': 'Role',
  'projectUser.create.input.role.default': 'Default Role',
  'projectUser.create.input.emails_confirmation': 'Emails to which confirmation mail will be send',
  'projectUser.create.input.emails_confirmation.add.warn': 'Confirm email add',
  'projectUser.create.input.emails_confirmation.add.error': 'Invalid email address',
  'projectUser.create.input.emails_confirmation.add.exist': 'Email already exist',
  'projectUser.create.input.emails_confirmation.add.floating.text': 'Insert email',
  'projectUser.create.input.email': 'E-mail (*)',
  'projectUser.create.input.firstName': 'First name (*)',
  'projectUser.create.input.lastName': 'Last name (*)',
  'projectUser.create.input.password': 'Password (*)',
  'projectUser.create.input.password.confirm': 'Confirm password (*)',
  'projectUser.create.input.status': 'Status',
  'projectUser.create.input.groups': 'Groups',
  'projectUser.create.input.max.quota': 'Max quota (*)',
  'projectUser.create.input.max.quota.help.message': `User max quota is the count of raw data files internally stored by REGARDS that he is allowed to download. 
  Possible values are -1, for unlimited, 0, for none, or any positive integer for a precise count`,
  'projectUser.create.input.rate.limit': 'Rate limit (*)',
  'projectUser.create.input.rate.limit.help.message': `User rate limit is the number of raw data files internally stored by REGARDS that he is allowed to download simultaneously. 
  Possible values are -1, for unlimited / 0, for none, or any positive integer for a precise count`,
  'projectUser.create.action.add': 'Add',
  'projectUser.create.action.create': 'Create',
  'projectUser.create.action.cancel': 'Cancel',

  'project.user.settings.title': 'User settings',
  'project.user.settings.subtitle': 'Manage common project user settings',
  'project.user.settings.mode.field': 'Validation mode',
  'project.user.settings.mode.MANUAL': 'Manual: each project user creation request must be acknowledged by the administrator',
  'project.user.settings.mode.AUTO': 'Automatic: project user creation requests are automatically acknowledged',
  'project.user.settings.role.PUBLIC': 'Public',
  'project.user.settings.role.REGISTERED_USER': 'Registered user',
  'project.user.settings.role.EXPLOIT': 'Operator',
  'project.user.settings.role.ADMIN': 'Administrator',
  'project.user.settings.role.PROJECT_ADMIN': 'Super Administrator',
  'project.user.settings.role.INSTANCE_ADMIN': 'Instance Administrator',
  'project.user.settings.max.quota.field': 'Default max quota',
  'project.user.settings.max.quota.help.message': `Default max quota is applied at new users creation. 
  User max quota is the count of raw data files internally stored by REGARDS that he is allowed to download. 
  Possible values are -1, for unlimited, 0, for none, or any positive integer for a precise count`,
  'project.user.settings.rate.limit.field': 'Default rate limit',
  'project.user.settings.rate.limit.help.message': `Default rate limit is applied at new users creation. 
  User rate limit is the number of raw data files internally stored by REGARDS that he is allowed to download simultaneously. 
  Possible values are -1, for unlimited / 0, for none, or any positive integer for a precise count`,
  'project.user.settings.action.confirm': 'Confirm',
  'project.user.settings.action.cancel': 'Cancel',

  ...Locales.en,
  ...MetadataLocales.en,
}

export default messages
