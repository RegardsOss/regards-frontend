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
  'menu.modules.list.button.label': 'Browse',
  'menu.modules.list.button.tooltip': 'Browse within the site pages',
  'menu.form.title': 'Menu Title',
  'menu.form.contacts': 'Contact',
  'menu.form.projectpage': 'Project about page',
  'menu.form.displayauthentication': 'Display authentication option',
  'menu.form.displaylocale': 'Display Locale selector',
  'menu.form.displaytheme': 'Display Theme selector',
  // profile form
  'edit.profile.form.title': 'Profile edition',
  'edit.profile.form.message': 'You can update below your user account data',
  'edit.profile.form.mail': 'E-mail address',
  'edit.profile.form.firstName': 'First name',
  'edit.profile.form.lastName': 'Last name',
  'edit.profile.form.confirm': 'Confirm',
  'edit.profile.form.cancel': 'Cancel',

  ...Locales.en,
  ...MetadataLocales.en,
}

export default messages
