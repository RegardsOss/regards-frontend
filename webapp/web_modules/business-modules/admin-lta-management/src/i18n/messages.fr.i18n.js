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

/**
 * @author Théo Lasserre
 */
const messages = {
  // Card
  'lta.card.title': 'LTA manager',
  'lta.card.action.cancel': 'Retour',
  'lta.card.action.filter': 'Filtrer',

  // Dialogs
  // 'lta.table.actions.delete.title': 'Supprimer la ou les requête(s) ?',
  // 'lta.table.actions.retry.title': 'Relancer la ou les requête(s) ?',

  // Table Header
  // 'lta.table.header.source': 'Source',
  // 'lta.table.header.session': 'Session',
  // 'lta.table.header.contentType': 'Content type',
  // 'lta.table.header.creationDate': 'Date de création',
  // 'lta.table.header.workerType': 'Worker',
  // 'lta.table.header.status': 'Statut',
  // 'lta.table.header.actions': 'Actions',

  // Table actions
  // 'lta.table.actions.delete.tooltip': 'Supprimer',
  // 'lta.table.actions.retry.tooltip': 'Relancer',

  // Global actions
  // 'lta.actions.refresh': 'Rafraichir',
  // 'lta.actions.retry.title': 'Relancer les requêtes sélectionnées',
  // 'lta.actions.retry.label': 'Relancer la sélection',
  // 'lta.actions.delete.title': 'Supprimer les requêtes sélectionnées',
  // 'lta.actions.delete.label': 'Supprimer la sélection',

  // Table Infos
  // 'lta.table.info.nb.requests': '{value} résultat(s)',
  // 'lta.table.no.content.title': 'Rien à afficher',
  // 'lta.table.no.content.message': 'Pas de requêtes',
  // 'lta.table.loading.content.title': 'Chargement...',

  // Filters
  // 'lta.filters.creationDate.label': 'Date de création :',
  // 'lta.filters.creationDate.after.label': 'Depuis',
  // 'lta.filters.creationDate.before.label': 'Jusqu\'à',
  // 'lta.filters.source.label': 'Source',
  // 'lta.filters.source.label.title': 'Source :',
  // 'lta.filters.session.label': 'Session',
  // 'lta.filters.session.label.title': 'Session :',
  // 'lta.filters.workerType.label': 'Type de worker',
  // 'lta.filters.workerType.label.title': 'Type de worker :',
  // 'lta.filters.contentTypes.label': 'Type de contenu (ex: type1, type2, ...)',
  // 'lta.filters.contentTypes.label.title': 'Type de contenu :',
  // 'lta.filters.status.label': 'Statuts',
  // 'lta.filters.status.label.title': 'Statuts :',

  // Dialogs
  // 'lta.dialogs.errors.title': 'Erreurs',
  // 'lta.dialogs.close': 'Fermer',

  // Settings
  'lta.settings.card.title': 'Paramètres du LTA manager',
  'lta.settings.card.subtitle': 'Gérer les paramètres de configuration du LTA manager',
  'lta.settings.field.storage': 'Nom de l\'espace de stockage',
  'lta.settings.field.successExpirationInHours': 'Durée de vie des requêtes réussies en heures',
  'lta.settings.field.datatypes.new': 'Nouveau type de produit',
  'lta.settings.field.datatypes': 'Types de produits',
  'lta.settings.field.datatypes.name': 'Label',
  'lta.settings.field.datatypes.model': 'Modèle de données',
  'lta.settings.field.datatypes.storePath': 'Espace de stockage',
  'lta.settings.action.confirm': 'Confirmer',
  'lta.settings.action.cancel': 'Annuler',

  ...Locales.fr,
}

export default messages
