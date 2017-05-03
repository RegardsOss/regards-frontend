/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'
import { Locales as MetadataLocales } from '@regardsoss/user-metadata-common'

/**
 * i18n messages French language
 * @author Sébastien binda
 */
const messages = {
  loginFormTitle: 'Connexion à l\'interface projet',
  loginButtonLabel: 'Connexion',
  logoutLabel: 'Deconnexion',
  accountLabel: 'Mon compte',
  changeRole: 'Changer de rôle',
  resetRole: 'Rôle par défaut',
  'menu.modules.list.button': 'Menu',
  'menu.form.title': 'Titre du menu',
  'menu.form.displayauthentication': 'Afficher l\'option d\'authentification',
  'menu.form.displaylocale': 'Afficher le selecteur de langues',
  'menu.form.displaytheme': 'Afficher le selecteur de themes',
  // profile form
  'edit.profile.form.title': 'Edition du profil',
  'edit.profile.form.message': 'Vous pouvez mettre à jour ci-dessous les données de votre compte utilisateur',
  'edit.profile.form.mail': 'Adresse e-mail',
  'edit.profile.form.firstName': 'Prénom',
  'edit.profile.form.lastName': 'Nom',
  'edit.profile.form.confirm': 'Confirmer',
  'edit.profile.form.cancel': 'Annuler',

  ...Locales.fr,
  ...MetadataLocales.fr,
}

export default messages
