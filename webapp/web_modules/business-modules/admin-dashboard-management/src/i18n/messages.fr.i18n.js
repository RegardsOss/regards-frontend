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
  'dashboard.table.icon.tooltip.running': 'En cours',
  'dashboard.table.icon.tooltip.waiting': 'En attente',
  'dashboard.table.icon.tooltip.errors': 'En erreur',

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
  'dashboard.selectedsession.dialog.delete.message': 'Vous êtes sur le point de demander la suppression de tous les produits pris en compte dans la session sélectionnée. Cette demande sera prise en compte par chaque composant de la session. La prise en compte de la demande de suppression peut prendre un certains temps. Vous pouvez rafraîchir l\'état de la session régulièrement pour visualiser sa prise en compte.',
  'dashboard.selectedsession.dialog.retry.title': 'Voulez vous relancer les erreurs ?',
  'dashboard.selectedsession.acquisition.title': 'Acquisition {nbIn} -> {nbOut}',
  'dashboard.selectedsession.acquisition.fp.totalRequests': 'Extractions : {value}',
  'dashboard.selectedsession.acquisition.fp.requestsErrors': 'Erreurs : {value}',
  'dashboard.selectedsession.acquisition.fp.generatedProducts': 'Générés : {value}',
  'dashboard.selectedsession.acquisition.fp.requestsRefused': 'Refusées : {value}',
  'dashboard.selectedsession.acquisition.fp.properties.requests.title': 'Demandes',
  'dashboard.selectedsession.acquisition.fp.properties.products.title': 'Produits',
  'dashboard.selectedsession.acquisition.fp.button.see-referenced': 'Voir les produits référencés',
  'dashboard.selectedsession.acquisition.fp.button.see-errors': 'Voir les demandes en erreurs',
  'dashboard.selectedsession.acquisition.fp.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.acquisition.dp.filesAcquired': 'Détectés : {value}',
  'dashboard.selectedsession.acquisition.dp.incomplete': 'Incomplets : {value}',
  'dashboard.selectedsession.acquisition.dp.invalid': 'Invalides : {value}',
  'dashboard.selectedsession.acquisition.dp.productsErrors': 'Erreurs : {value}',
  'dashboard.selectedsession.acquisition.dp.generatedProducts': 'Générés : {value}',
  'dashboard.selectedsession.acquisition.dp.button.see-errors': 'Voir les erreurs',
  'dashboard.selectedsession.acquisition.dp.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.acquisition.dp.dialog.title': 'Produits',
  'dashboard.selectedsession.acquisition.dp.properties.files.title': 'Fichiers',
  'dashboard.selectedsession.acquisition.dp.properties.products.title': 'Produits',
  'dashboard.selectedsession.acquisition.dp.dialog.button.close': 'Fermer',
  'dashboard.selectedsession.acquisition.dp.dialog.table.column.name': 'Nom',
  'dashboard.selectedsession.acquisition.dp.dialog.table.column.error': 'Erreur',
  'dashboard.selectedsession.referencing.title': 'Référencement {nbIn} -> {nbOut}',
  'dashboard.selectedsession.referencing.fem.referencingRequests': 'Référencements : {value}',
  'dashboard.selectedsession.referencing.fem.deleteRequests': 'Suppressions : {value}',
  'dashboard.selectedsession.referencing.fem.updateRequests': 'Mises à jour : {value}',
  'dashboard.selectedsession.referencing.fem.notifyRequests': 'Notifications : {value}',
  'dashboard.selectedsession.referencing.fem.referencedProducts': 'Référencés : {value}',
  'dashboard.selectedsession.referencing.fem.deletedProducts': 'Supprimés : {value}',
  'dashboard.selectedsession.referencing.fem.updatedProducts': 'Mis à jour : {value}',
  'dashboard.selectedsession.referencing.fem.notifyProducts': 'Notifiés : {value}',
  'dashboard.selectedsession.referencing.fem.requestsErrors': 'Erreurs : {value}',
  'dashboard.selectedsession.referencing.fem.properties.requests.title': 'Demandes',
  'dashboard.selectedsession.referencing.fem.properties.products.title': 'Produits',
  'dashboard.selectedsession.referencing.fem.button.see-referenced': 'Voir les produits référencés',
  'dashboard.selectedsession.referencing.fem.button.see-errors': 'Voir les erreurs',
  'dashboard.selectedsession.referencing.fem.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.referencing.ingest.totalRequests': 'Référencements : {value}',
  'dashboard.selectedsession.referencing.ingest.requestsErrors': 'Erreurs : {value}',
  'dashboard.selectedsession.referencing.ingest.referencedProducts': 'Référencés: {value}',
  'dashboard.selectedsession.referencing.ingest.deletedProducts': 'Supprimés: {value}',
  'dashboard.selectedsession.referencing.ingest.newProductVersions': 'Nouvelles versions : {value}',
  'dashboard.selectedsession.referencing.ingest.replacedProducts': 'Remplacés : {value}',
  'dashboard.selectedsession.referencing.ingest.ignoredProducts': 'Ignorés : {value}',
  'dashboard.selectedsession.referencing.ingest.productWaitVersionMode': 'En attente admin : {value}',
  'dashboard.selectedsession.referencing.ingest.properties.requests.title': 'Demandes',
  'dashboard.selectedsession.referencing.ingest.properties.products.title': 'Produits',
  'dashboard.selectedsession.referencing.ingest.button.see-referenced': 'Voir les produits référencés',
  'dashboard.selectedsession.referencing.ingest.button.see-waiting': 'Voir en attente',
  'dashboard.selectedsession.referencing.ingest.button.see-errors': 'Voir les erreurs',
  'dashboard.selectedsession.referencing.ingest.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.storage.title': 'Archivage {nbIn} -> {nbOut}',
  'dashboard.selectedsession.storage.referenceRequests': 'Référencements : {value}',
  'dashboard.selectedsession.storage.storeRequests': 'Archivages : {value}',
  'dashboard.selectedsession.storage.copyRequests': 'Copies : {value}',
  'dashboard.selectedsession.storage.deleteRequests': 'Suppressions : {value}',
  'dashboard.selectedsession.storage.requestsRefused': 'Refusées : {value}',
  'dashboard.selectedsession.storage.requestsErrors': 'Erreurs : {value}',
  'dashboard.selectedsession.storage.storedFiles': 'Archivés : {value}',
  'dashboard.selectedsession.storage.referencedFiles': 'Référencés : {value}',
  'dashboard.selectedsession.storage.deletedFiles': 'Supprimés : {value}',
  'dashboard.selectedsession.storage.properties.requests.title': 'Demandes',
  'dashboard.selectedsession.storage.properties.files.title': 'Fichiers',
  'dashboard.selectedsession.storage.button.see-stockage': 'Visualiser les espaces de stockage',
  'dashboard.selectedsession.storage.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.diffusion.title': 'Diffusion {nbIn} -> {nbOut}',
  'dashboard.selectedsession.diffusion.indexed': 'Diffusés : {value}',
  'dashboard.selectedsession.diffusion.indexedError': 'Erreurs : {value}',
  'dashboard.selectedsession.diffusion.properties.products.title': 'Produits',
  'dashboard.selectedsession.diffusion.button.see-detail': 'Voir le détail',

  ...Locales.fr,
}

export default messages
