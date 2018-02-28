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

/**
 * i18n messages english language
 * @author Sébastien binda
 */
const messages = {
  // navigation
  'navigation.more.option': 'More...',
  // login and options
  loginFormTitle: 'Login to project interface',
  loginButtonLabel: 'Login',
  loginButtonTooltip: 'Login',
  loggedButtonLabel: '{login}',
  loggedButtonTooltip: 'Logged as {login}',
  logoutLabel: 'Logout',
  accountLabel: 'My profile',
  changeRole: 'Change role',
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
  'menu.form.title': 'Menu Title',
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
  'menu.form.navigation.table.column.type.module.message': 'Module {moduleType}',
  'menu.form.navigation.table.column.title.label': 'Title',
  'menu.form.navigation.table.column.status.label': 'Status',
  'menu.form.navigation.table.column.status.disabled.message': 'hidden: disabled module',
  'menu.form.navigation.table.column.status.empty.section.message': 'hidden: contains no visible module',
  'menu.form.navigation.table.column.status.visible.message': 'visible',
  'menu.form.navigation.create.section.button.label': 'New section',
  'menu.form.navigation.create.section.dialog.title': 'New section',
  'menu.form.navigation.edit.section.dialog.title': 'Edit section',
  'menu.form.navigation.edit.module.dialog.title': 'Move module',
  'menu.form.navigation.edit.item.dialog.cancel': 'Cancel',
  'menu.form.navigation.edit.item.dialog.confirm': 'Confirm',
  'menu.form.navigation.edit.item.dialog.icon.none': 'Hide section icon',
  'menu.form.navigation.edit.item.dialog.icon.default': 'Display default section icon',
  'menu.form.navigation.edit.item.dialog.icon.custom': 'Display custom section icon',
  'menu.form.navigation.edit.item.dialog.custom.icon.url': 'Custom icon URL',
  'menu.form.navigation.edit.item.dialog.title.en': 'Section english title',
  'menu.form.navigation.edit.item.dialog.title.fr': 'Section frensh title',
  'menu.form.navigation.edit.item.dialog.parent.section.field': 'Display in',
  'menu.form.navigation.edit.item.dialog.parent.section.none': 'Main bar',
  'menu.form.navigation.edit.item.dialog.insert.at.field': 'Position',
  'menu.form.navigation.edit.item.dialog.insert.at.first.position': 'First',
  'menu.form.navigation.edit.item.dialog.insert.after': 'After {itemTitle}',
  // Module form : preview
  'user.menu.form.preview.title': 'Preview',
  // profile form
  'edit.profile.form.title': 'Profile edition',
  'edit.profile.form.message': 'You can update below your user account data',
  'edit.profile.form.mail': 'E-mail address',
  'edit.profile.form.firstName': 'First name',
  'edit.profile.form.lastName': 'Last name',
  'edit.profile.form.confirm': 'Confirm',
  'edit.profile.form.cancel': 'Cancel',
  // notifications
  'user.menu.notification.max.count': '{maxCount}+',
  'user.menu.notification.elements.count.tooltip': `You have {elementsCount, plural,
    =0 {no new notifications}
    one {a new notification}
    other {{elementsCount} new notifications}
  }`,
  'user.menu.notification.title': 'Old notifications',
  'user.menu.notification.unread.title': 'New notifications',
  'user.menu.notification.empty': 'No new notifications',
  'user.menu.notification.details.sentby': 'Sent by {sender}',
  'user.menu.notification.details.message': 'Message',
  'user.menu.notification.clearAll': 'Clear all new notifications',

  ...Locales.en,
  ...MetadataLocales.en,
}

export default messages
