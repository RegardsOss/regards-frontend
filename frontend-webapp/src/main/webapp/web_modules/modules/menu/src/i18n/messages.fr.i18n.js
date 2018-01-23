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
 * i18n messages French language
 * @author Sébastien binda
 */
const messages = {
  loginFormTitle: 'Connexion à l\'interface projet',
  loginButtonLabel: 'Connexion',
  loginButtonTooltip: 'Connexion',
  loggedButtonLabel: '{login}',
  loggedButtonTooltip: 'Logged as {login}',
  logoutLabel: 'Déconnexion',
  accountLabel: 'Mon compte',
  changeRole: 'Changer de rôle',
  resetRole: 'Rôle par défaut',
  contactTooltip: 'Nous contacter...',
  AboutPageTooltip: 'A propos...',
  'user.menu.displaycart.tooltip': 'Mon panier: {elementsCountTooltip}',
  'user.menu.displaycart.empty.tooltip': 'vide',
  'user.menu.displaycart.elements.count.tooltip': '{elementsCount} objet(s)',
  'user.menu.cart.max.count': '{maxCount}+',
  'menu.modules.list.button.label': 'Navigation',
  'menu.modules.list.button.tooltip': 'Naviguer dans les pages du site',
  'menu.form.title': 'Titre du menu',
  'menu.form.contacts': 'Contacts',
  'menu.form.projectpage': 'Page "à propos" du projet',
  'menu.form.displayauthentication': 'Afficher l\'option d\'authentification',
  'menu.form.displaynotifications': 'Afficher le centre de notifications',
  'menu.form.displaycart': 'Afficher le lien vers le panier',
  'menu.form.displaylocale': 'Afficher le sélecteur de langues',
  'menu.form.displaytheme': 'Afficher le sélecteur de thèmes',
  // profile form
  'edit.profile.form.title': 'Edition du profil',
  'edit.profile.form.message': 'Vous pouvez mettre à jour ci-dessous les données de votre compte utilisateur',
  'edit.profile.form.mail': 'Adresse e-mail',
  'edit.profile.form.firstName': 'Prénom',
  'edit.profile.form.lastName': 'Nom',
  'edit.profile.form.confirm': 'Confirmer',
  'edit.profile.form.cancel': 'Annuler',
  // notifications
  'user.menu.notification.max.count': '{maxCount}+',
  'user.menu.notification.elements.count.tooltip': `{elementsCount, plural,
    =0 {Vous n'avez aucune nouvelle notification}
    one {Vous avez une nouvelle notification}
    other {Vous avez {elementsCount} nouvelles notifications}
  }`,
  'user.menu.notification.title': 'Notifications lues',
  'user.menu.notification.unread.title': 'Notifications non lues',
  'user.menu.notification.empty': 'Pas de nouvelles notifications',
  'user.menu.notification.details.sentby': 'Envoyé par {sender}',
  'user.menu.notification.clearAll': 'Tout marquer comme lu',

  ...Locales.fr,
  ...MetadataLocales.fr,
}

export default messages
