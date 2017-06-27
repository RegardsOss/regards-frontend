/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

const messages = {
  // 1 - admin
  'search.graph.results.tab': 'Résultats',
  'search.graph.configuration.tab': 'Graphe',
  // 1.a - Graph levels
  'search.graph.configuration.levels.title': 'Niveaux de navigation',
  'search.graph.configuration.levels.subtitle': 'Vous pouvez sélectionner ci-dessous les niveaux de navigation visibles dans le graphe',
  'search.graph.levels.selection.none.selected.error': 'Sélectionnez au moins 1 élément pour la recherche par graphe',
  'search.graph.levels.selection.no.selection.hint': 'Aucune sélection. Vous pouvez sélectionner des niveaux en cliquant sur "Ajouter un niveau"',
  'search.graph.add.level': 'Ajouter un niveau',
  'search.graph.collection.model.label': '{name} - {description}',
  'search.graph.selected.levels.column.index': 'Niveau',
  'search.graph.selected.levels.column.name': 'Nom',
  'search.graph.selected.levels.column.description': 'Description',
  'search.graph.selected.levels.column.actions': 'Actions',
  // 1.b - Graph dataset attributes
  'search.graph.configuration.attributes.title': 'Attributs visibles',
  'search.graph.configuration.attributes.subtitle': 'Vous pouvez sélectionner ci-dessous les attributs des jeux de données qui seront visibles dans le graphe',
  'form.attributes.standard.section.title': 'Attributs communs',
  'form.attributes.section.title': 'Attributs dynamiques ',
  'form.attributes.order': 'ordre d\'affichage',
  'form.attributes.initialSort.label': 'Trier les résultats sur cet attribut',
  'form.attributes.visibility.label': 'Afficher',
  'form.attributes.filter.label': 'Filtrer',
  // user
  'search.graph.title': 'Navigation par graphe',
  'search.graph.subtitle': 'Parcours des données par collections et affichage des objets contenus dans les jeux de données',
  'search.graph.show.details': 'Détails',
  'search.graph.level.fetch.model.failed': 'La récupération des collections et jeux de données a échoué',
  'search.graph.level.no.model': 'La collection est vide',
  'search.graph.dataset.attribute.no.value': '-',

  ...Locales.fr,
}

export default messages
