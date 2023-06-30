/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'datapreparation.card.title': 'Supervision des workers',
  'datapreparation.card.action.cancel': 'Retour',
  'datapreparation.card.action.filter': 'Filtrer',

  // Dialogs
  'datapreparation.table.actions.delete.title': 'Supprimer la ou les requête(s) ?',
  'datapreparation.table.actions.retry.title': 'Relancer la ou les requête(s) ?',

  // Table Header
  'datapreparation.table.header.source': 'Source',
  'datapreparation.table.header.session': 'Session',
  'datapreparation.table.header.contentType': 'Type de contenu',
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
  'datapreparation.filters.creationDate.label': 'Date de création',
  'datapreparation.filters.creationDate.after.hint': 'Depuis',
  'datapreparation.filters.creationDate.before.hint': 'Jusqu\'à',
  'datapreparation.filters.source.label': 'Source',
  'datapreparation.filters.session.label': 'Session',
  'datapreparation.filters.dispatchedWorkerType.label': 'Type de worker',
  'datapreparation.filters.contentTypes.label.hint': 'Type de contenu (ex: type1, type2, ...)',
  'datapreparation.filters.contentTypes.label': 'Type de contenu',
  'datapreparation.filters.statuses.label': 'Statuts',
  'datapreparation.filters.statuses.DISPATCHED': 'Expédié',
  'datapreparation.filters.statuses.NO_WORKER_AVAILABLE': 'Pas de worker disponible',
  'datapreparation.filters.statuses.RUNNING': 'En cours',
  'datapreparation.filters.statuses.INVALID_CONTENT': 'Contenu invalide',
  'datapreparation.filters.statuses.SUCCESS': 'Succès',
  'datapreparation.filters.statuses.ERROR': 'Erreur',
  'datapreparation.filters.statuses.TO_DISPATCH': 'A Expédier',
  'datapreparation.filters.statuses.TO_DELETE': 'A Supprimer',

  // Dialogs
  'datapreparation.dialogs.errors.title': 'Erreurs',

  // Settings
  'datapreparation.settings.card.title': 'Paramètres du worker manager',
  'datapreparation.settings.card.subtitle': 'Gérer les paramètres de configuration du worker manager',
  'datapreparation.settings.contentTypes.title': 'Liste des types de contenu à ignorer par le worker manager',
  'datapreparation.settings.contentTypes.warn': 'Confirmer l\'ajout du type de contenu',
  'datapreparation.settings.contentTypes.exist': 'Ce type de contenu existe déjà',
  'datapreparation.settings.contentTypes.text': 'Entrez un type de contenu',
  'datapreparation.settings.action.confirm': 'Confirmer',
  'datapreparation.settings.action.cancel': 'Annuler',

  ...Locales.fr,
}

export default messages
