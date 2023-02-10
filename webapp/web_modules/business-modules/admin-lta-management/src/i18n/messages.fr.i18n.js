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
  'lta.card.title': 'Demandes de pérennisation',
  'lta.card.action.cancel': 'Retour',
  'lta.card.action.filter': 'Filtrer',
  'lta.card.action.refresh': 'Rafraîchir',

  // Dialogs
  'lta.table.actions.delete.title': 'Supprimer la ou les requête(s) ?',
  'lta.table.actions.delete.message': 'Seules les requêtes qui ne sont pas en cours de traitement seront supprimées.',
  'lta.table.actions.view.message.tooltip': 'Voir le message',
  'lta.table.actions.view.product.tooltip': 'Voir le produit de la requête',
  'lta.table.actions.view.product.title': 'Produit de la requête',
  'lta.table.actions.dialog.close': 'Fermer',

  // Table Header
  'lta.table.header.requestId': 'ID',
  'lta.table.header.owner': 'Source',
  'lta.table.header.status': 'Status',
  'lta.table.header.session': 'Session',
  'lta.table.header.statusDate': 'Dernière mise à jour',
  'lta.table.header.datatype': 'Type de produit',
  'lta.table.header.creationDate': 'Date de création',
  'lta.table.header.message': 'Message',
  'lta.table.header.model': 'Modèle',
  'lta.table.header.product': 'Produit',
  'lta.table.header.actions': 'Actions',

  // Table actions
  'lta.table.actions.delete.tooltip': 'Supprimer',

  // Table columns
  'lta.table.column.status.VALIDATED': 'Validée',
  'lta.table.column.status.GENERATION_PENDING': 'En cours de génération',
  'lta.table.column.status.GENERATED': 'Générée',
  'lta.table.column.status.GENERATION_ERROR': 'Erreur de génération',
  'lta.table.column.status.INGESTION_PENDING': 'En cours d\'ingestion',
  'lta.table.column.status.DONE': 'Terminée',
  'lta.table.column.status.INGESTION_ERROR': 'Erreur d\'ingestion',

  // Global actions
  'lta.actions.delete.title': 'Supprimer les requêtes sélectionnées',
  'lta.actions.delete.label': 'Supprimer la sélection',

  // Table Infos
  'lta.table.info.nb.requests': '{value} résultat(s)',
  'lta.table.no.content.title': 'Rien à afficher',
  'lta.table.no.content.message': 'Pas de requêtes',
  'lta.table.loading.content.title': 'Chargement...',

  // Filters
  'lta.filters.session.label': 'Session',
  'lta.filters.owner.label': 'Source',
  'lta.filters.datatype.label': 'Type de produit',
  'lta.filters.creationDate.label': 'Date de création',
  'lta.filters.statusDate.label': 'Dernière mise à jour',
  'lta.filters.statuses.label': 'Statuts',

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
