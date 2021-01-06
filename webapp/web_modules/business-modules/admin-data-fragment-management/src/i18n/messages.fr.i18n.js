/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'fragment.list.title': 'Fragments',
  'fragment.list.subtitle': 'Un fragment permet de regrouper plusieurs attributs dans un ensemble cohérent',
  'fragment.list.table.name': 'Nom',
  'fragment.list.table.description': 'Description',
  'fragment.list.table.actions': 'Actions',
  'fragment.list.action.add': 'Ajouter',
  'fragment.list.action.cancel': 'Annuler',
  'fragment.list.action.edit': 'Éditer',
  'fragment.list.action.delete': 'Supprimer',
  'fragment.list.action.export': 'Télécharger',
  'fragment.list.delete.title': 'Supprimer le regroupement d\'attribut {name} ?',
  'fragment.list.delete.conditions': 'Pour supprimer un fragment, assurez-vous qu\'il n\'est associé à aucun attribut en les supprimant depuis leur écran de configuration',

  'fragment.edit.title': 'Éditer le fragment {name}',
  'fragment.create.title': 'Créer un fragment',
  'fragment.form.name': 'Nom du fragment',
  'fragment.form.fragment': 'Fragment',
  'fragment.form.description': 'Description',
  'fragment.form.file': 'Ou envoyer un fichier XML contenant le fragment et ses attributs:',
  'fragment.form.action.cancel': 'Annuler',
  'fragment.form.action.submit': 'Sauvegarder',
  ...Locales.fr,
}

export default messages
