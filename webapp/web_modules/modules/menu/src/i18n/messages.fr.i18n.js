/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  // navigation
  'navigation.more.option': 'Plus...',
  // login and options
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
  'user.menu.navigate.to.home': 'Afficher la page d\'accueil du projet',
  'user.menu.displaycart.tooltip': 'Mon panier: {elementsCountTooltip}',
  'user.menu.displaycart.empty.tooltip': 'vide',
  'user.menu.displaycart.elements.count.tooltip': '{elementsCount} objet(s)',
  'user.menu.cart.max.count': '{maxCount}+',
  'menu.admin.project.title': 'REGARDS - panneau d\'administration de {project}',
  'menu.admin.instance.title': 'REGARDS - panneau d\'administration de l\'instance',
  // Module form : settings
  'user.menu.form.options.title': 'Configuration',
  'menu.form.contacts': 'Contacts',
  'menu.form.projectpage': 'Page "à propos" du projet',
  'menu.form.displayauthentication': 'Afficher l\'option d\'authentification',
  'menu.form.displaynotifications': 'Afficher le centre de notifications',
  'menu.form.displaycart': 'Afficher le lien vers le panier',
  'menu.form.displaylocale': 'Afficher le sélecteur de langues',
  'menu.form.displaytheme': 'Afficher le sélecteur de thèmes',
  // Module form : navigation
  'user.menu.form.navigation.home.title': 'Navigation: Lien vers la page d\'accueil',
  'menu.form.home.page.icon.type.label': 'Icone du lien vers la page d\'accueil',
  'menu.form.home.page.icon.type.none': 'Pas d\'icône',
  'menu.form.home.page.icon.type.default': 'Icône par défaut',
  'menu.form.home.page.icon.type.module': 'Icône configurée dans le le module par défaut',
  'menu.form.home.page.icon.type.custom': 'Icône personnalisée',
  'menu.form.home.page.icon.custom.url': 'URL de l\'icône personnalisée',
  'menu.form.home.page.title.en': 'Libellé de la page d\'accueil en anglais',
  'menu.form.home.page.title.fr': 'Libellé de la page d\'accueil en français',
  'user.menu.form.navigation.layout.title': 'Navigation: Mise en page des liens',
  'menu.form.navigation.no.module.message': 'Aucun module dynamique défini dans l\'application',
  'menu.form.navigation.table.column.type.label': 'Type',
  'menu.form.navigation.table.column.type.section.message': 'Section',
  'menu.form.navigation.table.column.type.module.message': 'Module {moduleType}',
  'menu.form.navigation.table.column.title.label': 'Titre',
  'menu.form.navigation.table.column.status.label': 'Statut',
  'menu.form.navigation.table.column.status.disabled.message': 'caché: module inactif',
  'menu.form.navigation.table.column.status.empty.section.message': 'caché: ne contient aucun module actif',
  'menu.form.navigation.table.column.status.visible.message': 'visible',
  'menu.form.navigation.create.section.button.label': 'Nouvelle section',
  'menu.form.navigation.create.section.dialog.title': 'Créer une section',
  'menu.form.navigation.edit.section.dialog.title': 'Editer la section',
  'menu.form.navigation.edit.module.dialog.title': 'Déplacer le module',
  'menu.form.navigation.edit.item.dialog.cancel': 'Annuler',
  'menu.form.navigation.edit.item.dialog.confirm': 'Confirmer',
  'menu.form.navigation.edit.item.dialog.icon.none': 'Cacher l\'icône de la section',
  'menu.form.navigation.edit.item.dialog.icon.default': 'Afficher l\'icône par default pour la section',
  'menu.form.navigation.edit.item.dialog.icon.custom': 'Afficher une icône personnalisée',
  'menu.form.navigation.edit.item.dialog.custom.icon.url': 'URL de l\'icône personnalisée',
  'menu.form.navigation.edit.item.dialog.title.en': 'Titre de la section en anglais',
  'menu.form.navigation.edit.item.dialog.title.fr': 'Titre de la section en français',
  'menu.form.navigation.edit.item.dialog.parent.section.field': 'Afficher dans',
  'menu.form.navigation.edit.item.dialog.parent.section.none': 'Barre principale',
  'menu.form.navigation.edit.item.dialog.insert.at.field': 'Position',
  'menu.form.navigation.edit.item.dialog.insert.at.first.position': 'En premier',
  'menu.form.navigation.edit.item.dialog.insert.after': 'Après {itemTitle}',
  // Module form : preview
  'user.menu.form.preview.title': 'Prévisualisation',
  // profile form
  'edit.profile.form.title': 'Edition du profil',
  'edit.profile.form.message': 'Vous pouvez mettre à jour ci-dessous les données de votre compte utilisateur',
  'edit.profile.form.mail': 'Adresse e-mail',
  'edit.profile.form.firstName': 'Prénom',
  'edit.profile.form.lastName': 'Nom',
  'edit.profile.form.save': 'Sauvegarder',
  'edit.profile.form.cancel': 'Annuler',

  'edit.profile.notification.form.frequencies.custom': 'Personnalisé',
  'edit.profile.notification.form.frequencies.monthly': 'Mensuelle',
  'edit.profile.notification.form.frequencies.weekly': 'Hebdomadaire',
  'edit.profile.notification.form.frequencies.daily': 'Journalière',
  'edit.profile.notification.form.frequencies': 'Frequence d\'envoie des emails',
  'edit.profile.notification.form.title': 'Gestion des notifications',
  'edit.profile.notification.form.message': 'Vous pouvez mettre à jour ci-dessous la fréquence à laquelle vous souhaitez recevoir des emails récapitulatifs des notifications que vous n\'avez pas lu',
  'edit.profile.notification.form.days': 'Jours',
  'edit.profile.notification.form.hours': 'Heures',
  'edit.profile.notification.form.save': 'Sauvegarder',

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
  'user.menu.notification.details.message': 'Message',
  'user.menu.notification.clearAll': 'Tout marquer comme lu',
  'user.menu.notification.action.close': 'Fermer',

  'user.menu.profile.leftbar.title': 'Options utilisateur',
  'user.menu.profile.leftbar.profile': 'Profil',
  'user.menu.profile.leftbar.notification': 'Notifications',
  'user.menu.profile.action.close': 'Fermer',
  ...Locales.fr,
  ...MetadataLocales.fr,
}

export default messages