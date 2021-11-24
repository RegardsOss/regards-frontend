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

/**
 * @author Théo Lasserre
 */
const messages = {
  // Card
  'datapreparation.card.title': 'Préparation des produits',
  'datapreparation.card.action.cancel': 'Retour',

  // Dialogs
  'datapreparation.table.actions.delete.title': 'Supprimer la ou les requête(s) ?',
  'datapreparation.table.actions.retry.title': 'Relancer la ou les requête(s) ?',

  // Table Header
  'datapreparation.table.header.source': 'Source',
  'datapreparation.table.header.session': 'Session',
  'datapreparation.table.header.contentType': 'Content type',
  'datapreparation.table.header.creationDate': 'Date de création',
  'datapreparation.table.header.workerType': 'Worker',
  'datapreparation.table.header.status': 'Statut',
  'datapreparation.table.header.actions': 'Actions',

  // Table actions
  'datapreparation.table.actions.delete.tooltip': 'Supprimer',
  'datapreparation.table.actions.retry.tooltip': 'Relancer',

  // Global actions
  'datapreparation.actions.refresh': 'Rafraichir',
  'datapreparation.actions.retry.title': 'Relancer les requêtes sélectionnées',
  'datapreparation.actions.retry.label': 'Relancer la sélection',
  'datapreparation.actions.delete.title': 'Supprimer les requêtes sélectionnées',
  'datapreparation.actions.delete.label': 'Supprimer la sélection',

  // Table Infos
  'datapreparation.table.info.nb.requests': '{value} résultat(s)',
  'datapreparation.table.no.content.title': 'Rien à afficher',
  'datapreparation.table.no.content.message': 'Pas de requêtes',
  'datapreparation.table.loading.content.title': 'Chargement...',

  // Filters
  'datapreparation.filters.creationDate.label': 'Date de création :',
  'datapreparation.filters.creationDate.after.label': 'Depuis',
  'datapreparation.filters.creationDate.before.label': 'Jusqu\'à',
  'datapreparation.filters.source.label': 'Source',
  'datapreparation.filters.session.label': 'Session',
  'datapreparation.filters.workerType.label': 'Type de worker',
  'datapreparation.filters.contentTypes.label': 'Type de contenu',
  'datapreparation.filters.status.label.title': 'Statuts',
  'datapreparation.filters.clear': 'Effacer filtres',

  // Dialogs
  'datapreparation.dialogs.errors.title': 'Erreurs',
  'datapreparation.dialogs.close': 'Fermer',

  ...Locales.fr,
}

export default messages
