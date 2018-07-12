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

const messages = {
  // admin
  'module.description.configuration.type.COLLECTION': 'Collections',
  'module.description.configuration.type.DATASET': 'Jeux de données',
  'module.description.configuration.type.DOCUMENT': 'Documents',
  'module.description.configuration.type.DATA': 'Données',
  'module.description.configuration.allow.tag.search': 'Proposer la recherche des données par mot-clés',

  'module.description.configuration.general': 'Configuration principale',
  'module.description.configuration.show.description': 'Proposer la description pour ce type d\'objets',
  'module.description.configuration.show.tags': 'Afficher les mot-clés liés',
  'module.description.configuration.show.linked.documents': 'Afficher les documents liés',
  'module.description.configuration.show.thumbnail': 'Afficher la vignette',
  'module.description.configuration.add.group': 'Ajouter un groupe d\'attributs',
  'module.description.configuration.group.title': 'Groupe n°{number}',
  'module.description.configuration.group.show.title': 'Afficher le titre du groupe',
  'module.description.configuration.group.title.en.field': 'Titre anglais',
  'module.description.configuration.group.title.fr.field': 'Titre français',
  'module.description.configuration.group.title.required.error': 'Le titre est requis car l\'option d\'affichage du titre est sélectionnée',
  'module.description.configuration.group.elements.hint': 'Ajoutez ici les attributs à afficher dans ce groupe',
  'module.description.configuration.group.move.action.label': 'Déplacer',
  'module.description.configuration.group.move.action.tooltip': 'Déplacer ce groupe',
  'module.description.configuration.group.move.group.first': 'En premier',
  'module.description.configuration.group.move.group.after': 'Après le groupe n°{number}',
  'module.description.configuration.group.remove.action.label': 'Supprimer',
  'module.description.configuration.group.remove.action.tooltip': 'Supprimer ce groupe',

  // Forms i18n messages for admin
  ...Locales.fr,
}

export default messages
