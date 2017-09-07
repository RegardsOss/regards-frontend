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
  logoutLabel: 'Logout',
  accountLabel: 'My profile',
  changeRole: 'Change role',
  resetRole: 'Default role',
  'menu.modules.list.button': 'Menu',
  'menu.form.title': 'Menu Title',
  'menu.form.displayauthentication.logged': 'My options',
  'menu.form.displayauthentication.not.logged': 'Authenticate',
  'menu.form.displaylocale': 'Change language',
  'menu.form.displaycart': 'My cart: {elementsCountTooltip}',
  'menu.form.displaycart.empty.tooltip': 'empty',
  'menu.form.displaycart.elements.count.tooltip': '{elementsCount} object(s)',
  'menu.form.cart.max.count': '{maxCount}+',
  'menu.form.displaytheme': 'Select theme',
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
