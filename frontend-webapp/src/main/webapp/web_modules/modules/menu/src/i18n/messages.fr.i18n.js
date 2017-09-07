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
  logoutLabel: 'Déconnexion',
  accountLabel: 'Mon compte',
  changeRole: 'Changer de rôle',
  resetRole: 'Rôle par défaut',
  'menu.modules.list.button': 'Menu',
  'menu.form.title': 'Titre du menu',
  'menu.form.displayauthentication.logged': 'Mes options',
  'menu.form.displayauthentication.not.logged': 'S\'authentifier',
  'menu.form.displaylocale': 'Changer la langue',
  'menu.form.displaycart': 'Mon panier: {elementsCountTooltip}',
  'menu.form.displaycart.empty.tooltip': 'vide',
  'menu.form.displaycart.elements.count.tooltip': '{elementsCount} objet(s)',
  'menu.form.cart.max.count': '{maxCount}+',
  'menu.form.displaytheme': 'Changer le thème',
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
