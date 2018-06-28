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
  'projectUser.list.table.no.content.title': 'Rien à afficher',
  'projectUser.list.table.lastupdate': 'Dernière mise à jour',
  'projectUser.list.table.role': 'Rôle',
  'projectUser.list.table.email': 'E-mail',
  'projectUser.list.table.status': 'Statut',
  'projectUser.list.table.status.label.WAITING_ACCOUNT_ACTIVE': 'En attente de validation d\'instance',
  'projectUser.list.table.status.label.WAITING_ACCESS': 'En attente d\'accès au projet',
  'projectUser.list.table.status.label.WAITING_EMAIL_VERIFICATION': 'En attente de vérification de l`email',
  'projectUser.list.table.status.label.ACCESS_GRANTED': 'Accès accordé',
  'projectUser.list.table.status.label.ACCESS_DENIED': 'Accès refusé',
  'projectUser.list.table.status.label.ACCESS_INACTIVE': 'Accès désactivé',
  'projectUser.list.table.lastConnection': 'Dernière connexion',
  'projectUser.list.table.action': 'Actions',
  'projectUser.list.table.action.edit.tooltip': 'Editer',
  'projectUser.list.table.action.accept.tooltip': 'Accorder l\'accès',
  'projectUser.list.table.action.deny.tooltip': 'Refuser l\'accès',
  'projectUser.list.table.action.active.tooltip': 'Ré-activer l\'accès',
  'projectUser.list.table.action.inactive.tooltip': 'Désactiver l\'accès',
  'projectUser.list.table.action.delete.tooltip': 'Supprimer',
  'projectUser.list.action.cancel': 'Annuler',
  'projectUser.list.all.tab': 'Tous les utilisateurs ({count})',
  'projectUser.list.all.subtitle': 'Tous les utilisateurs du projet',
  'projectUser.list.all.action.create': 'Ajouter',
  'projectUser.list.all.no.content.message': 'Pas d\'utilisateur enregistré pour ce projet',
  'projectUser.list.waiting.tab': 'Nouveaux utilisateurs ({count})',
  'projectUser.list.waiting.subtitle': 'Nouveaux utilisateurs du projet en attente de validation',
  'projectUser.list.waiting.accept.all': 'Tout accepter',
  'projectUser.list.waiting.no.content.message': 'Pas d\'utilisateur en attente d\' accès au projet. Vous pouvez consulter et éditer la liste des utilisateurs dans l\'onglet "Tous les utilisateurs"',
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

