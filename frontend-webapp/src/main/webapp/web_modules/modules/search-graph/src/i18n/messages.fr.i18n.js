/**
 * LICENSE_PLACEHOLDER
 **/
import { Locales } from '@regardsoss/form-utils'

const messages = {
  // admin
  'search.graph.configuration.tab': 'Recherche',
  'search.graph.results.tab': 'Resultats',
  'search.graph.levels.selection.none.selected.error': 'Il doit y avoir au moins un élément séléctionné pour la recherche par graphe',
  'search.graph.levels.selection.no.selection.hint': 'Aucune sélection. Vous pouvez sélectionner des niveaux via le button "Ajouter un niveau"',
  'search.graph.add.level': 'Ajouter un niveau',
  'search.graph.collection.model.label': '{name} - {description}',
  'search.graph.selected.levels.column.index': 'Niveau',
  'search.graph.selected.levels.column.name': 'Nom',
  'search.graph.selected.levels.column.description': 'Description',
  'search.graph.selected.levels.column.actions': 'Actions',
  // user
  'search.graph.title': 'Navigation par graphe',
  'search.graph.subtitle': 'Parcours des données par collections et affichage des objets contenu dans les jeux de données',
  'search.graph.level.fetch.model.failed': 'La récupération des collections et jeux de données a échoué',
  'search.graph.level.no.model': 'La collection est vide',

  ...Locales.fr,
}

export default messages
