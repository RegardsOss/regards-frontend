/**
 * LICENSE_PLACEHOLDER
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
