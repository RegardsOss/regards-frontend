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
  'dashboard.title': 'Tableau de bord',
  'dashboard.refresh': 'Rafraichir',
  'dashboard.back': 'Retour',

  // Sources
  'dashboard.sources.table.column.sourceName': 'Nom',
  'dashboard.sources.table.column.referencedProducts': 'Produits référencés',
  'dashboard.sources.table.column.diffusedProducts': 'Produits diffusés',
  'dashboard.sources.title': 'Sources',
  'dashboard.sources.filter.name': 'Rechercher un nom...',
  'dashboard.sources.filter.status': 'Statut',
  'dashboard.sources.filter.status.all': 'Tous',
  'dashboard.sources.filter.status.ok': 'Ok',
  'dashboard.sources.filter.status.errors': 'Erreur',
  'dashboard.sources.filter.status.running': 'En cours',
  'dashboard.sources.filter.status.waiting': 'En attente',
  'dashboard.sources.table.empty': 'Aucune source trouvée',
  'dashboard.sources.table.option.select': 'Sélectionner la source',

  // Sessions
  'dashboard.sessions.table.empty': 'Aucune session trouvée',
  'dashboard.sessions.table.column.sessionName': 'Nom',
  'dashboard.sessions.table.column.referencedProducts': 'Produits référencés',
  'dashboard.sessions.table.column.diffusedProducts': 'Produits diffusés',
  'dashboard.sessions.title': 'Sessions',
  'dashboard.sessions.filter.name': 'Rechercher un nom...',
  'dashboard.sessions.filter.status': 'Statut',
  'dashboard.sessions.table.option.select': 'Sélectionner la session',

  // Selected Session
  'dashboard.selectedsession.title': '{source} / {session}',
  'dashboard.selectedsession.close': 'Fermer',
  'dashboard.selectedsession.delete': 'Supprimer les produits',
  'dashboard.selectedsession.refresh': 'Rafraichir',
  'dashboard.selectedsession.dialog.delete.title': 'Supprimer les produits de la session {sessionName} ?',
  'dashboard.selectedsession.dialog.retry.title': 'Voulez vous relancer les erreurs ?',
  'dashboard.selectedsession.acquisition.title': 'Acquisition',
  'dashboard.selectedsession.acquisition.fem.in': 'Demandes d\'acquisition : {nbIn}',
  'dashboard.selectedsession.acquisition.fem.totalRequests': 'Nombre de requêtes : {value}',
  'dashboard.selectedsession.acquisition.fem.requestsErrors': 'Demandes en erreurs : {value}',
  'dashboard.selectedsession.acquisition.fem.generatedProducts': 'Produits générés : {value}',
  'dashboard.selectedsession.acquisition.fem.requestsRefused': 'Requêtes refusées : {value}',
  'dashboard.selectedsession.acquisition.fem.acquired': 'Produits acquis : {nbAcquired}',
  'dashboard.selectedsession.acquisition.fem.button.see-errors': 'Voir les demandes en erreurs',
  'dashboard.selectedsession.acquisition.fem.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.acquisition.dp.in': 'Fichiers détectés : {nbIn}',
  'dashboard.selectedsession.acquisition.dp.filesAcquired': 'Fichiers acquis : {value}',
  'dashboard.selectedsession.acquisition.dp.generatedProducts': 'Produits générés : {value}',
  'dashboard.selectedsession.acquisition.dp.generationError': 'Erreurs générées: {value}',
  'dashboard.selectedsession.acquisition.dp.incomplete': 'Incomplet : {value}',
  'dashboard.selectedsession.acquisition.dp.invalid': 'Invalide : {value}',
  'dashboard.selectedsession.acquisition.dp.ingestionFailed': 'Erreurs d\'ingestion : {value}',
  'dashboard.selectedsession.acquisition.dp.complete': 'Complets : {value}',
  'dashboard.selectedsession.acquisition.dp.ingested': 'Ingérés : {value}',
  'dashboard.selectedsession.acquisition.dp.acquired': 'Produits acquis:  {nbAcquired}',
  'dashboard.selectedsession.acquisition.dp.button.see-errors': 'Voir les erreurs',
  'dashboard.selectedsession.acquisition.dp.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.acquisition.dp.dialog.title': 'Produits',
  'dashboard.selectedsession.acquisition.dp.dialog.button.close': 'Fermer',
  'dashboard.selectedsession.acquisition.dp.dialog.table.column.name': 'Nom',
  'dashboard.selectedsession.acquisition.dp.dialog.table.column.error': 'Erreur',
  'dashboard.selectedsession.referencing.title': 'Référencement',
  'dashboard.selectedsession.referencing.fem.in': 'Demandes de référencement : {nbIn}',
  'dashboard.selectedsession.referencing.fem.deleteRequests': 'Requêtes de suppression : {value}',
  'dashboard.selectedsession.referencing.fem.updateRequests': 'Requêtes de mise à jour : {value}',
  'dashboard.selectedsession.referencing.fem.notifyRequests': 'Requêtes de notification : {value}',
  'dashboard.selectedsession.referencing.fem.referencedProducts': 'Produits référencés : {value}',
  'dashboard.selectedsession.referencing.fem.deletedProducts': 'Produits supprimés : {value}',
  'dashboard.selectedsession.referencing.fem.updatedProducts': 'Produits mis à jour : {value}',
  'dashboard.selectedsession.referencing.fem.notifyProducts': 'Produits notifiés : {value}',
  'dashboard.selectedsession.referencing.fem.requestsErrors': 'Requêtes en erreur : {value}',
  'dashboard.selectedsession.referencing.fem.out': 'Générés : {nbOut}',
  'dashboard.selectedsession.referencing.fem.button.see-referenced': 'Voir les produits référencés',
  'dashboard.selectedsession.referencing.fem.button.see-errors': 'Voir les erreurs',
  'dashboard.selectedsession.referencing.fem.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.referencing.dp.totalRequests': 'Demandes de référencement : {value}',
  'dashboard.selectedsession.referencing.dp.requestsErrors': 'Demandes en erreur : {value}',
  'dashboard.selectedsession.referencing.dp.generatedProducts': 'Produits référencés: {value}',
  'dashboard.selectedsession.referencing.dp.newProductVersions': 'Nouvelles versions : {value}',
  'dashboard.selectedsession.referencing.dp.replacedProducts': 'Remplacés : {value}',
  'dashboard.selectedsession.referencing.dp.ignoredProducts': 'Ignorés : {value}',
  'dashboard.selectedsession.referencing.dp.productWaitVersionMode': 'En attente administrateur : {value}',
  'dashboard.selectedsession.referencing.dp.button.see-referenced': 'Voir les produits référencés',
  'dashboard.selectedsession.referencing.dp.button.see-waiting': 'Voir en attente',
  'dashboard.selectedsession.referencing.dp.button.see-errors': 'Voir les erreurs',
  'dashboard.selectedsession.referencing.dp.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.storage.title': 'Archivage',
  'dashboard.selectedsession.storage.dp.in': 'Demandes d\'archivage : {nbIn}',
  'dashboard.selectedsession.storage.dp.referenceRequests': 'Requêtes de références : {value}',
  'dashboard.selectedsession.storage.dp.storeRequests': 'Requêtes de stockage: {value}',
  'dashboard.selectedsession.storage.dp.copyRequests': 'Requêtes de copie : {value}',
  'dashboard.selectedsession.storage.dp.deleteRequests': 'Requêtes de suppression  : {value}',
  'dashboard.selectedsession.storage.dp.requestsRefused': 'Requêtes refusées : {value}',
  'dashboard.selectedsession.storage.dp.requestsErrors': 'Nombre de requêtes en erreur: {value}',
  'dashboard.selectedsession.storage.dp.storedFiles': 'Fichiers stockés : {value}',
  'dashboard.selectedsession.storage.dp.referencedFiles': 'Requêtes référencées : {value}',
  'dashboard.selectedsession.storage.dp.deletedFiles': 'Fichiers supprimées : {value}',
  'dashboard.selectedsession.storage.dp.button.see-stockage': 'Visualiser les espaces de stockage',
  'dashboard.selectedsession.diffusion.title': 'Diffusion',
  'dashboard.selectedsession.diffusion.out': 'Produits diffusés : {nbOut}',
  'dashboard.selectedsession.diffusion.dp.indexed': 'Indexés : {value}',
  'dashboard.selectedsession.diffusion.dp.indexedError': 'Erreur d\'indexation : {value}',
  'dashboard.selectedsession.diffusion.button.see-detail': 'Voir le détail',

  ...Locales.fr,
}

export default messages
