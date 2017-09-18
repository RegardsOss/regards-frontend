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
  // admin
  'menu.form.title': 'Titre du menu',
  'menu.form.displayauthentication': 'Options d\'autentification',
  'menu.form.displaylocale': 'Option de changement de langue',
  'menu.form.displaycart': 'Option d\'accès rapide au panier',
  'menu.form.displaytheme': 'Option de changement de thème',
  // user
  loginFormTitle: 'Connexion à l\'interface projet',
  loginButtonLabel: 'Connexion',
  logoutLabel: 'Déconnexion',
  accountLabel: 'Mon compte',
  changeRole: 'Changer de rôle',
  resetRole: 'Rôle par défaut',
  'menu.modules.list.button': 'Menu',
  'user.menu.displayauthentication.logged': 'Mes options',
  'user.menu.displayauthentication.not.logged': 'S\'authentifier',
  'user.menu.displaylocale': 'Changer la langue',
  'user.menu.displaycart.tooltip': 'Mon panier: {elementsCountTooltip}',
  'user.menu.displaycart.empty.tooltip': 'vide',
  'user.menu.displaycart.elements.count.tooltip': '{elementsCount} objet(s)',
  'user.menu.cart.max.count': '{maxCount}+',
  'user.menu.displaytheme': 'Changer le thème',
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
