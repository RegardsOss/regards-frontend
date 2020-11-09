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

/**
 * i18n messages english language
 * @author Sébastien binda
 */
const messages = {
  // navigation
  'navigation.more.option': 'More...',
  // login and options
  loginButtonLabel: 'Login',
  loginButtonTooltip: 'Login',
  loggedButtonLabel: '{login}',
  loggedButtonTooltip: 'Logged as {login}',
  logoutLabel: 'Logout',
  accountLabel: 'My profile',
  quotaInformation: 'Downloads',
  changeRole: 'Change role',
  'role.name.PUBLIC': 'Public',
  'role.name.REGISTERED_USER': 'Registered user',
  'role.name.EXPLOIT': 'Operator',
  'role.name.ADMIN': 'Administrator',
  'role.name.PROJECT_ADMIN': 'Super Administrator',
  resetRole: 'Default role',
  contactTooltip: 'Contact us...',
  AboutPageTooltip: 'About...',
  'user.menu.navigate.to.home': 'Display project home page',
  'user.menu.displaycart.tooltip': 'My cart: {elementsCountTooltip}',
  'user.menu.displaycart.empty.tooltip': 'empty',
  'user.menu.displaycart.elements.count.tooltip': '{elementsCount} object(s)',
  'user.menu.cart.max.count': '{maxCount}+',
  'menu.admin.project.title': 'REGARDS - {project} administration dashboard',
  'menu.admin.instance.title': 'REGARDS - Instance administration dashboard',
  // Module form : settings
  'user.menu.form.options.title': 'Settings',
  'menu.form.contacts': 'Contact',
  'menu.form.projectpage': 'Project about page',
  'menu.form.displayauthentication': 'Display authentication option',
  'menu.form.displaynotifications': 'Display notification center',
  'menu.form.displaycart': 'Display cart link',
  'menu.form.displaylocale': 'Display Locale selector',
  'menu.form.displaytheme': 'Display Theme selector',
  // Module form : navigation
  'user.menu.form.navigation.home.title': 'Browsing: Home page link',
  'menu.form.home.page.icon.type.label': 'Home page link icon',
  'menu.form.home.page.icon.type.none': 'None',
  'menu.form.home.page.icon.type.default': 'Default icon',
  'menu.form.home.page.icon.type.module': 'Icon from configured module page icon',
  'menu.form.home.page.icon.type.custom': 'Custom icon',
  'menu.form.home.page.icon.custom.url': 'Custom icon URL',
  'menu.form.home.page.title.en': 'English home page label',
  'menu.form.home.page.title.fr': 'French home page label',
  'user.menu.form.navigation.layout.title': 'Browsing: Links layout',
  'menu.form.navigation.no.module.message': 'No dynamic module defined in application',
  'menu.form.navigation.table.column.type.label': 'Type',
  'menu.form.navigation.table.column.type.section.message': 'Section',
  'menu.form.navigation.table.column.type.link.message': 'Link',
  'menu.form.navigation.table.column.type.module.message': 'Module {moduleType}',
  'menu.form.navigation.table.column.title.label': 'Title',
  'menu.form.navigation.table.column.visibility.label': 'Display',
  'menu.form.navigation.table.column.visibility.always.message': 'Always visible',
  'menu.form.navigation.table.column.visibility.never.message': 'Always hidden',
  'menu.form.navigation.table.column.visibility.for.profile.message': 'User role ≥ {role}',
  'menu.form.navigation.table.column.warnings.label': 'Status',
  'menu.form.navigation.table.column.warnings.disabled.message': 'hidden: disabled module',
  'menu.form.navigation.table.column.warnings.empty.section.message': 'hidden: contains no visible module',
  'menu.form.navigation.table.column.warnings.none.message': '-',
  'menu.form.navigation.create.section.button.label': 'New section',
  'menu.form.navigation.create.link.button.label': 'New link',
  'menu.form.navigation.create.section.dialog.title': 'New section',
  'menu.form.navigation.create.link.dialog.title': 'New link',
  'menu.form.navigation.edit.section.dialog.title': 'Edit section',
  'menu.form.navigation.edit.link.button.label': 'Edit link',
  'menu.form.navigation.edit.module.dialog.title': 'Move module',
  'menu.form.navigation.edit.item.dialog.cancel': 'Cancel',
  'menu.form.navigation.edit.item.dialog.confirm': 'Confirm',
  'menu.form.navigation.edit.item.dialog.icon.none': 'Hide section icon',
  'menu.form.navigation.edit.item.dialog.icon.link.none': 'Hide link icon',
  'menu.form.navigation.edit.item.dialog.icon.default': 'Display default section icon',
  'menu.form.navigation.edit.item.dialog.icon.link.default': 'Display default link icon',
  'menu.form.navigation.edit.item.dialog.icon.custom': 'Display custom section icon',
  'menu.form.navigation.edit.item.dialog.icon.link.custom': 'Display custom link icon',
  'menu.form.navigation.edit.item.dialog.custom.icon.url': 'Custom icon URL',
  'menu.form.navigation.edit.item.dialog.title.en': 'Section English title',
  'menu.form.navigation.edit.item.dialog.title.fr': 'Section French title',
  'menu.form.navigation.edit.item.dialog.parent.section.field': 'Display in',
  'menu.form.navigation.edit.item.dialog.parent.section.none': 'Main bar',
  'menu.form.navigation.edit.item.dialog.insert.at.field': 'Position',
  'menu.form.navigation.edit.item.dialog.insert.at.first.position': 'First',
  'menu.form.navigation.edit.item.dialog.insert.after': 'After {itemTitle}',
  'menu.form.navigation.edit.item.dialog.visibility.mode.field': 'Display',
  'menu.form.navigation.edit.item.dialog.visibility.mode.ALWAYS': 'Always',
  'menu.form.navigation.edit.item.dialog.visibility.mode.NEVER': 'Never',
  'menu.form.navigation.edit.item.dialog.visibility.mode.FOR_ROLE': 'User role greater than or equal to...',
  'menu.form.navigation.edit.item.dialog.visibility.visible.for.role.field': 'Role',
  'menu.form.navigation.edit.item.dialog.urlLink': 'URL',
  // Module form : preview
  'user.menu.form.preview.title': 'Preview',
  'user.menu.form.preview.role.field': 'Preview as...',
  // profile form
  'edit.profile.form.title': 'Profile edition',
  'edit.profile.form.message': 'You can update below your user account data',
  'edit.profile.form.mail': 'E-mail address',
  'edit.profile.form.firstName': 'First name',
  'edit.profile.form.lastName': 'Last name',
  'edit.profile.form.save': 'Save',
  'edit.profile.form.cancel': 'Cancel',

  'edit.profile.notification.form.frequencies.custom': 'Custom',
  'edit.profile.notification.form.frequencies.monthly': 'Monthly',
  'edit.profile.notification.form.frequencies.weekly': 'Weekly',
  'edit.profile.notification.form.frequencies.daily': 'Daily',
  'edit.profile.notification.form.frequencies': 'Email frequency',
  'edit.profile.notification.form.title': 'Notification settings',
  'edit.profile.notification.form.message': 'You can update below the frequency with which you want to receive summary emails notifications that you have not read',
  'edit.profile.notification.form.days': 'Days',
  'edit.profile.notification.form.hours': 'Hours',
  'edit.profile.notification.form.save': 'Save',

  // quota information (in user profile dialog)
  'user.profile.quota.info.title': 'Data downloads',
  'user.profile.quota.info.message.raw.data.download.definition': `Raw data file download can be performed by direct download (catalog, description, ...),
  or by order (ZIP file, metalink, ....). Other file type downloads are ignored for below indicators computing.`,
  'user.profile.quota.info.message.contact.notice': 'You can contact the project administrator to increase your data download capacities.',
  'user.profile.quota.info.title.current.status': 'Current status',
  'user.profile.quota.info.message.unlimited.download': 'Your downloads are not limited',
  'user.profile.quota.info.message.remaining.downloads': '{remainingQuota}/{maxQuota} allowed download(s)',
  'user.profile.quota.info.message.unlimited.rate': 'Your simultaneous downloads are not limited',
  'user.profile.quota.info.message.remaining.rate': '{currentRate}/{rateLimit} downloads in progress',

  // notifications
  'user.menu.notification.max.count': '{maxCount}+',
  'user.menu.notification.elements.count.tooltip': `You have {elementsCount, plural,
    =0 {no new notifications}
    one {a new notification}
    other {{elementsCount} new notifications}
  }`,
  'user.menu.notification.no-notification-for-instance': 'There is no notification for the instance user',
  'user.menu.notification.title': 'Old notifications ({count})',
  'user.menu.notification.unread.title': 'New notifications ({count})',
  'user.menu.notification.empty': 'No new notifications',
  'user.menu.notification.details.sentby': 'Sent by {sender}',
  'user.menu.notification.clearAll': 'Clear all new notifications',
  'user.menu.notification.action.close': 'Close',
  'user.menu.notification.action.delete.read': 'Delete all read notifications',

  'user.menu.profile.leftbar.title': 'User options',
  'user.menu.profile.leftbar.profile': 'Profile',
  'user.menu.profile.leftbar.notification': 'Notifications',
  'user.menu.profile.leftbar.quotaInformation': 'Downloads',
  'user.menu.profile.action.close': 'Close',
  ...Locales.en,
  ...MetadataLocales.en,
}

export default messages
