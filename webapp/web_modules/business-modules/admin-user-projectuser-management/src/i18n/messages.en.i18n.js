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
import { Locales as MetadataLocales } from '@regardsoss/user-metadata-common'

const messages = {
  'projectUser.list.card.title': 'Users',
  'projectUser.list.card.subtitle': 'Created project users list',
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
  'projectUser.list.table.no.content.without.filter.message': 'There is no user in current project',
  'projectUser.list.table.no.content.with.filter.message': 'There is no user matching current filters in project',
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
  'projectUser.list.table.quota': 'Quota',
  'projectUser.list.table.unlimited.quota.message': 'Unlimited',
  'projectUser.list.table.current.quota.message': '{currentQuota} / {maxQuota}',
  'projectUser.list.table.lastConnection': 'Last connection',
  'projectUser.list.table.action': 'Actions',
  'projectUser.list.table.action.edit.quota': 'Set max quota',
  'projectUser.list.table.action.accept': 'Accept access',
  'projectUser.list.table.action.deny': 'Deny access',
  'projectUser.list.table.action.enable': 'Enable access',
  'projectUser.list.table.action.disable': 'Disable access',
  'projectUser.list.table.action.edit.tooltip': 'Edit',
  'projectUser.list.table.action.delete.tooltip': 'Remove',
  'projectUser.list.action.cancel': 'Cancel',
  'projectUser.list.all.action.create': 'Add',
  'projectUser.list.accept.all': 'Accept all',
  'projectUser.list.accept.all.tooltip': 'Grant access to all new users displayed in table',
  'projectUser.list.delete.message': 'Remove user {name}?',
  'projectUser.list.edit.quota.dialog.title': 'Edit {name} max quota',
  'projectUser.list.edit.quota.dialog.max.quota.field': 'Max quota (-1: unlimited / positive or null integer: files count)',
  'projectUser.list.edit.quota.dialog.current.quota.field': 'Current quota',
  'projectUser.list.edit.quota.dialog.remaining.quota.field': 'Remaining quota',
  'projectUser.list.edit.quota.dialog.remaining.quota.unlimited': 'unlimited',
  'projectUser.list.edit.quota.dialog.cancel': 'Cancel',
  'projectUser.list.edit.quota.dialog.confirm': 'Confirm',

  'projectUser.edit.title': 'Edit the user {email}',
  'projectUser.edit.action.save': 'Save',
  'projectUser.create.using.existing.account': 'The user already has a REGARDS user account',
  'projectUser.create.title': 'Create a user',
  'projectUser.create.message': 'Create a user for the project. {passwordRules}',
  'projectUser.create.input.role': 'Role',
  'projectUser.create.input.email': 'E-mail',
  'projectUser.create.input.firstName': 'First name',
  'projectUser.create.input.lastName': 'Last name',
  'projectUser.create.input.password': 'Password',
  'projectUser.create.input.password.confirm': 'Confirm password',
  'projectUser.create.input.status': 'Status',
  'projectUser.create.input.groups': 'Groups',
  'projectUser.create.input.max.quota': 'Max quota',
  'projectUser.create.input.max.quota.help.message': `User max quota is the count of raw data files internally stored by REGARDS that he is allowed to download. 
  Possible values are -1, for unlimited, 0, for none, or any positive integer for a precise count`,
  'projectUser.create.input.rate.limit': 'Rate limit',
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

  'role.name.PUBLIC': 'Public',
  'role.name.REGISTERED_USER': 'Registered user',
  'role.name.EXPLOIT': 'Operator',
  'role.name.ADMIN': 'Administrator',
  'role.name.PROJECT_ADMIN': 'Super Administrator',
  'role.name.empty': ' - ',

  ...Locales.en,
  ...MetadataLocales.en,
}

export default messages
