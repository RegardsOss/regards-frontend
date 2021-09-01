/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const messages = {
  'accounts.title': 'Comptes',
  'accounts.subtitle': 'Gérer les comptes utilisateurs',
  'account.list.table.firstname': 'Prénom',
  'account.list.table.lastname': 'Nom',
  'account.list.table.email': 'E-mail',
  'account.list.table.status': 'Statut',
  'account.list.table.origin': 'Origine',
  'account.list.table.project': 'Projet',
  'account.list.table.filters.firstname': 'Prénom',
  'account.list.table.filters.lastname': 'Nom',
  'account.list.table.filters.email': 'E-mail',
  'account.list.table.filters.status': 'Statut',
  'account.list.table.filters.status.any': 'Tout statut',
  'account.list.table.filters.status.PENDING': 'En attente',
  'account.list.table.filters.status.ACTIVE': 'Actif',
  'account.list.table.filters.status.LOCKED': 'Bloqué',
  'account.list.table.filters.status.INACTIVE': 'Inactif',
  'account.list.table.filters.origin': 'Origine',
  'account.list.table.filters.origin.any': 'Toutes origines',
  'account.list.table.filters.project': 'Projet',
  'account.list.table.filters.project.any': 'Tout projet',
  'account.list.table.filters.clear': 'Effacer les filtres',
  'account.list.table.status.label.PENDING': 'En attente validation administrateur',
  'account.list.table.status.label.ACTIVE': 'Actif',
  'account.list.table.status.label.LOCKED': 'Bloqué',
  'account.list.table.status.label.INACTIVE': 'Désactivé',
  'account.list.table.status.label.INACTIVE_PASSWORD': 'Mot de passe expiré',
  'account.list.table.action': 'Actions',
  'account.list.subtitle': 'Liste des comptes tous projets confondus',
  'account.list.table.no.content.title': 'Rien à afficher',
  'account.list.table.content.loading': 'Chargement...',
  'account.list.table.action.edit.tooltip': 'Éditer',
  'account.list.table.action.accept.tooltip': 'Accepter le compte',
  'account.list.table.action.refuse.tooltip': 'Refuser le compte',
  'account.list.table.action.enable.tooltip': 'Activer le compte',
  'account.list.table.action.delete.tooltip': 'Supprimer',
  'account.list.all.tab': 'Tous les comptes ({count})',
  'account.list.all.no.content.message': 'Pas de compte enregistré dans l\'application',
  'account.list.waiting.tab': 'Nouveaux comptes ({count})',
  'account.list.waiting.no.content.message': 'Pas de compte en attente de validation. Vous pouvez consulter et éditer la liste des comptes dans l\'onglet "Tous les comptes"',
  'account.list.delete.message': 'Supprimer le compte {name} ?',
  'account.list.refuse.message': 'Refuser la demande ?',
  'account.list.refuse.message.detail': 'Cela va supprimer le compte {name}',
  'account.list.info.why-cant-remove-account-having-project-user': 'Vous ne pouvez pas supprimer un compte s\'il est lié à un utilisateur projet',
  'account.list.info.nb.accounts': '{value} résultats',
  'account.list.refresh': 'Rafraîchir',
  'account.list.info.nb.waiting.accounts': '{value} utilisateurs en attente d\'acceptation',
  'account.list.info.nb.waiting.accounts.filter': 'Comptes en attente',
  'account.list.action.cancel': 'Annuler',

  'account.form.input.firstName': 'Prénom',
  'account.form.input.lastName': 'Nom',
  'account.form.input.email': 'E-mail',
  'account.form.edit.title': 'Éditer le compte de {firstName} {lastName}',
  'account.form.create.title': 'Créer un compte',
  'account.form.action.save': 'Sauvegarder',
  'account.form.action.cancel': 'Annuler',

  'account.settings.title': 'Paramètres des comptes',
  'account.settings.subtitle': 'Gérer les paramètres communs aux comptes utilisateurs',
  'account.settings.mode.field': 'Mode de validation',
  'account.settings.mode.MANUAL': 'Manuel: chaque demande de création d\'un compte doit être validée par l\'administrateur',
  'account.settings.mode.AUTO': 'Automatique: les demandes de création d\'un compte sont automatiquement validées',
  'account.settings.action.confirm': 'Confirmer',
  'account.settings.action.cancel': 'Annuler',

  'account.fetch.origin.error': 'Impossible de récupérer la liste des systèmes d\'authentification des comptes',
  ...Locales.fr,
}

export default messages
