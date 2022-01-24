/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  // 1 - admin
  'search.graph.results.tab': 'Résultats',
  'search.graph.configuration.tab': 'Graphe',
  // 1.a - Graph levels
  'search.graph.configuration.levels.message': 'Niveaux de navigation du graphe',
  'search.graph.levels.selection.none.selected.error': 'Aucun niveau d\'affichage sélectionné',
  'search.graph.levels.selection.header.message': `{count, plural, 
    =0 {Aucun niveau de navigation défini}
    one {# niveau de navigation défini}
    other {# niveaux de navigation définis}
  }`,
  'search.graph.levels.selection.no.selection.hint': 'Ajouter ici les niveaux de navigation du graphe',
  'search.graph.add.level': 'Ajouter',
  'search.graph.collection.model.label': '{name} - {description}',
  'search.graph.selected.levels.column.name': 'Nom',
  'search.graph.selected.levels.column.description': 'Description',
  'search.graph.selected.levels.column.options.remove.tooltip': 'Supprimer ce niveau',
  // 1.b - Graph dataset attributes
  'search.graph.configuration.attributes.message': 'Attributs des jeux de données affichés',
  'search.graph.configuration.dataset.attributes.hint': 'Ajouter ici les attributs à afficher pour les jeux de données du graphe, quand l\'option détail est active',
  'form.attributes.standard.section.title': 'Attributs communs',
  'form.attributes.section.title': 'Attributs dynamiques ',
  'form.attributes.section.clear.filters.tooltip': 'Effacer le filtre courant',
  'form.attributes.order': 'ordre d\'affichage',
  'form.attributes.initialSort.label': 'Trier les résultats sur cet attribut',
  'form.attributes.visibility.label': 'Afficher',
  'form.attributes.filter.label': 'Filtrer',
  'form.attributes.facetable.label': 'Activer le filtrage sur cet attribut',
  // user
  'search.graph.title': 'Navigation par graphe',
  'search.graph.show.details': 'Détails',
  'search.graph.entity.detail.tooltip': 'Détail',
  'search.graph.level.fetch.model.failed': 'La récupération des collections et jeux de données a échoué',
  'search.graph.level.no.model': 'La collection est vide',
  'search.graph.dataset.attribute.no.value': '-',
  'search.graph.results.title': 'Résultats',

  ...Locales.fr,
}

export default messages
