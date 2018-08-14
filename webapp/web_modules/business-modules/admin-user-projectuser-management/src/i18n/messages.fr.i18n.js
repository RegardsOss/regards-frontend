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

const messages = {
  'projectUser.list.card.title': 'Utilisateurs',
  'projectUser.list.card.subtitle': 'Liste des utilisateurs créés pour le projet',
  'projectUser.list.users.count': `{count, plural, 
    =0 {Aucun utilisateur}
    one {# utilisateur}
    other {# utilisateurs}
  } {waitingUsersCount, plural,
    =0 {}
    one { (# nouveau compte)}
    other { (# nouveaux comptes)}
  }`,
  'projectUser.list.only.waiting.users': 'utilisateurs en attente',
  'projectUser.list.filter.label': 'Filtre: {groupFilter}',
  'projectUser.list.filter.none': 'aucun',
  'projectUser.list.filter.title': 'Filtrer les utilisateurs par groupe d\'accès',
  'projectUser.list.table.no.content.title': 'Pas d\'utilisateur',
  'projectUser.list.table.no.content.without.filter.message': 'Il n\'y a pas d\'utilisateur pour le projet courant',
  'projectUser.list.table.no.content.with.filter.message': 'Il n\'y a pas d\'utilisateur correspondant aux filtres sélectionnés dans le projet courant',
  'projectUser.list.table.lastupdate': 'Dernière mise à jour',
  'projectUser.list.table.role': 'Rôle',
  'projectUser.list.table.email': 'E-mail',
  'projectUser.list.table.status': 'Statut',
  'projectUser.list.table.status.label.WAITING_ACCOUNT_ACTIVE': 'En attente de validation d\'instance',
  'projectUser.list.table.status.label.WAITING_ACCESS': 'En attente d\'accès au projet',
  'projectUser.list.table.status.label.WAITING_EMAIL_VERIFICATION': 'En attente de vérification de l\'email',
  'projectUser.list.table.status.label.ACCESS_GRANTED': 'Accès accordé',
  'projectUser.list.table.status.label.ACCESS_DENIED': 'Accès refusé',
  'projectUser.list.table.status.label.ACCESS_INACTIVE': 'Accès désactivé',
  'projectUser.list.table.lastConnection': 'Dernière connexion',
  'projectUser.list.table.action': 'Actions',
  'projectUser.list.table.action.accept': 'Accorder l\'accès',
  'projectUser.list.table.action.deny': 'Refuser l\'accès',
  'projectUser.list.table.action.enable': 'Ré-activer l\'accès',
  'projectUser.list.table.action.disable': 'Désactiver l\'accès',
  'projectUser.list.table.action.edit.tooltip': 'Editer',
  'projectUser.list.table.action.delete.tooltip': 'Supprimer',
  'projectUser.list.action.cancel': 'Annuler',
  'projectUser.list.all.action.create': 'Ajouter',
  'projectUser.list.accept.all': 'Tout accepter',
  'projectUser.list.accept.all.tooltip': 'Accorder l\'accès à tous les nouveaux utilisateur affichés dans le tableau',
  'projectUser.list.delete.message': 'Supprimer l\'utilisateur {name} ?',

  'projectUser.edit.title': 'Éditer l\'utilisateur {email}',
  'projectUser.edit.action.save': 'Sauvegarder',
  'projectUser.create.using.existing.account': 'L\'utilisateur a déjà un compte utilisateur REGARDS',
  'projectUser.create.title': 'Créer un utilisateur',
  'projectUser.create.message': 'Créer un utilisateur pour le project. {passwordRules}',
  'projectUser.create.input.role': 'Rôle',
  'projectUser.create.input.email': 'E-mail',
  'projectUser.create.input.firstName': 'Prénom',
  'projectUser.create.input.lastName': 'Nom',
  'projectUser.create.input.password': 'Mot de passe',
  'projectUser.create.input.password.confirm': 'Confirmer le mot de passe',
  'projectUser.create.input.status': 'Statut',
  'projectUser.create.input.groups': 'Groupes',
  'projectUser.create.action.add': 'Ajouter',
  'projectUser.create.action.create': 'Créer',
  'projectUser.create.action.cancel': 'Annuler',

  'project.user.settings.title': 'Paramètres de utilisateurs',
  'project.user.settings.subtitle': 'Gérer les paramètres communs aux utilisateurs du projet',
  'project.user.settings.mode.field': 'Mode de validation',
  'project.user.settings.mode.MANUAL': 'Manuel: chaque demande de création d\'un utilistaeur projet doit être validée par l\'administrateur',
  'project.user.settings.mode.AUTO': 'Automatique: les demandes de création d\'un utilisateur projet sont automatiquement validées',
  'project.user.settings.action.confirm': 'Confirmer',
  'project.user.settings.action.cancel': 'Annuler',

  ...Locales.fr,
  ...MetadataLocales.fr,
}

export default messages

