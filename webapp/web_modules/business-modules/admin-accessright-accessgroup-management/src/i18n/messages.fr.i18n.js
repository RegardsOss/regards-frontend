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
  'group.list.title': 'Groupes d\'accès',
  'group.list.subtitle': 'Un groupe d\'accès permet aux utilisateurs associés à ce groupe d\'accéder à des jeux de données, partiellement ou dans leur totalité',
  'group.list.table.name': 'Nom',
  'group.list.table.nbUser': 'Nombre d\'utilisateurs',
  'group.list.table.actions': 'Actions',
  'group.list.action.cancel': 'Annuler',
  'group.list.action.add': 'Créer',
  'group.list.delete.message': 'Supprimer le groupe d\'accès {name} ?',
  'group.list.table.all.users': 'Tous les utilisateurs',
  'group.list.table.actions.show.group.users': 'Afficher les utilisateurs du groupe',
  'group.list.table.actions.edit': 'Éditer',
  'group.list.table.actions.accessrights': 'Droits d\'accès',
  'group.list.table.actions.duplicate': 'Dupliquer',
  'group.list.table.actions.delete': 'Supprimer',

  'group.create.title': 'Création d\'un groupe d\'accès',
  'group.edit.title': 'Édition du groupe d\'accès {name}',
  'group.duplicate.title': 'Duplication du groupe d\'accès {name}',
  'group.form.invalid.group': 'Le groupe d\'accès demandé n\'existe pas',
  'group.form.name': 'Nom',
  'group.form.action.cancel': 'Annuler',
  'group.form.action.save': 'Sauvegarder',
  'group.form.public': 'Rattacher automatiquement ce groupe à tous les utilisateurs et visiteurs',
  'invalid.max_32_carac': 'Utilisez 32 caractères ou moins pour les noms de groupes d\'accès',
  ...Locales.fr,
}

export default messages
