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

const messages = Object.assign({
  'account.list.table.firstName': 'Prénom',
  'account.list.table.lastName': 'Nom',
  'account.list.table.email': 'E-mail',
  'account.list.table.status': 'Statut',
  'account.list.table.status.label.PENDING': 'En attente validation administrateur',
  'account.list.table.status.label.ACTIVE': 'Actif',
  'account.list.table.status.label.LOCKED': 'Bloqué',
  'account.list.table.status.label.INACTIVE': 'Désactivé',
  'account.list.table.action': 'Actions',
  'account.list.subtitle': 'Liste des comptes tous projets confondus',
  'account.list.table.no.content.title': 'Rien à afficher',
  'account.list.table.action.edit.tooltip': 'Editer',
  'account.list.table.action.accept.tooltip': 'Valider',
  'account.list.table.action.refuse.tooltip': 'Refuser',
  'account.list.table.action.delete.tooltip': 'Supprimer',
  'account.list.all.tab': 'Tous les comptes ({count})',
  'account.list.all.subtitle': 'Tous les comptes de l\'application',
  'account.list.all.no.content.message': 'Pas de compte enregistré dans l\'application',
  'account.list.waiting.tab': 'Nouveaux comptes ({count})',
  'account.list.waiting.subtitle': 'Nouveaux comptes de l\'application en attente de validation',
  'account.list.waiting.no.content.message': 'Pas de compte en attente de validation. Vous pouvez consulter et éditer la liste des comptes dans l\'onglet "Tous les comptes"',
  'account.list.delete.message': 'Supprimer le compte {name} ?',
  'account.list.refuse.message': 'Refuser la demande ?',
  'account.list.refuse.message.detail': 'Cela va supprimer le compte {name}',
  'account.list.info.why-cant-remove-account-having-project-user': 'Vous ne pouvez pas supprimer un compte s\'il est lié à un utilisateur projet',

  'account.form.input.firstName': 'Prénom',
  'account.form.input.lastName': 'Nom',
  'account.form.input.email': 'E-mail',
  'account.form.edit.title': 'Editer le compte de {firstName} {lastName}',
  'account.form.create.title': 'Créer un compte',
  'account.form.action.save': 'Sauvegarder',
  'account.form.action.cancel': 'Annuler',
}, Locales.fr)

export default messages
