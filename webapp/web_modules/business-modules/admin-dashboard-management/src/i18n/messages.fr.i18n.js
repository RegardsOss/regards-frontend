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
  'dashboard.selectedsession.dialog.retry.title': 'Voulez vous relancer les erreurs ?',
  'dashboard.selectedsession.acquisition.title': 'Acquisition {nbIn} -> {nbOut}',
  'dashboard.selectedsession.acquisition.fp.totalRequests': 'Demandes d\'acquisition : {value}',
  'dashboard.selectedsession.acquisition.fp.requestsErrors': 'Demandes en erreur : {value}',
  'dashboard.selectedsession.acquisition.fp.generatedProducts': 'Produits acquis : {value}',
  'dashboard.selectedsession.acquisition.fp.requestsRefused': 'Demandes refusées : {value}',
  'dashboard.selectedsession.acquisition.fp.button.see-referenced': 'Voir les produits référencés',
  'dashboard.selectedsession.acquisition.fp.button.see-errors': 'Voir les demandes en erreurs',
  'dashboard.selectedsession.acquisition.fp.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.acquisition.dp.filesAcquired': 'Fichiers détéctés : {value}',
  'dashboard.selectedsession.acquisition.dp.incomplete': 'Produits incomplets : {value}',
  'dashboard.selectedsession.acquisition.dp.invalid': 'Produits invalide : {value}',
  'dashboard.selectedsession.acquisition.dp.productsErrors': 'Produits en erreur : {value}',
  'dashboard.selectedsession.acquisition.dp.generatedProducts': 'Produits générés : {value}',
  'dashboard.selectedsession.acquisition.dp.button.see-errors': 'Voir les erreurs',
  'dashboard.selectedsession.acquisition.dp.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.acquisition.dp.dialog.title': 'Produits',
  'dashboard.selectedsession.acquisition.dp.dialog.button.close': 'Fermer',
  'dashboard.selectedsession.acquisition.dp.dialog.table.column.name': 'Nom',
  'dashboard.selectedsession.acquisition.dp.dialog.table.column.error': 'Erreur',
  'dashboard.selectedsession.referencing.title': 'Référencement {nbIn} -> {nbOut}',
  'dashboard.selectedsession.referencing.fem.referencingRequests': 'Demandes de référencement : {value}',
  'dashboard.selectedsession.referencing.fem.deleteRequests': 'Demandes de suppression : {value}',
  'dashboard.selectedsession.referencing.fem.updateRequests': 'Demandes de mise à jour : {value}',
  'dashboard.selectedsession.referencing.fem.notifyRequests': 'Demandes de notification : {value}',
  'dashboard.selectedsession.referencing.fem.referencedProducts': 'Produits référencés : {value}',
  'dashboard.selectedsession.referencing.fem.deletedProducts': 'Produits supprimés : {value}',
  'dashboard.selectedsession.referencing.fem.updatedProducts': 'Produits mis à jour : {value}',
  'dashboard.selectedsession.referencing.fem.notifyProducts': 'Produits notifiés : {value}',
  'dashboard.selectedsession.referencing.fem.requestsErrors': 'Demandes en erreur : {value}',
  'dashboard.selectedsession.referencing.fem.button.see-referenced': 'Voir les produits référencés',
  'dashboard.selectedsession.referencing.fem.button.see-errors': 'Voir les erreurs',
  'dashboard.selectedsession.referencing.fem.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.referencing.ingest.totalRequests': 'Demandes de référencement : {value}',
  'dashboard.selectedsession.referencing.ingest.requestsErrors': 'Demandes en erreur : {value}',
  'dashboard.selectedsession.referencing.ingest.referencedProducts': 'Produits référencés: {value}',
  'dashboard.selectedsession.referencing.ingest.newProductVersions': 'Nouvelles versions : {value}',
  'dashboard.selectedsession.referencing.ingest.replacedProducts': 'Remplacés : {value}',
  'dashboard.selectedsession.referencing.ingest.ignoredProducts': 'Ignorés : {value}',
  'dashboard.selectedsession.referencing.ingest.productWaitVersionMode': 'En attente administrateur : {value}',
  'dashboard.selectedsession.referencing.ingest.button.see-referenced': 'Voir les produits référencés',
  'dashboard.selectedsession.referencing.ingest.button.see-waiting': 'Voir en attente',
  'dashboard.selectedsession.referencing.ingest.button.see-errors': 'Voir les erreurs',
  'dashboard.selectedsession.referencing.ingest.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.storage.title': 'Archivage {nbIn} -> {nbOut}',
  'dashboard.selectedsession.storage.referenceRequests': 'Demandes de référencement : {value}',
  'dashboard.selectedsession.storage.storeRequests': 'Demandes d\'archivage : {value}',
  'dashboard.selectedsession.storage.copyRequests': 'Demandes de copie : {value}',
  'dashboard.selectedsession.storage.deleteRequests': 'Demandes de suppression : {value}',
  'dashboard.selectedsession.storage.requestsRefused': 'Demandes refusées : {value}',
  'dashboard.selectedsession.storage.requestsErrors': 'Demandes en erreur : {value}',
  'dashboard.selectedsession.storage.storedFiles': 'Fichiers archivés : {value}',
  'dashboard.selectedsession.storage.referencedFiles': 'Fichiers référencés : {value}',
  'dashboard.selectedsession.storage.deletedFiles': 'Fichiers supprimés : {value}',
  'dashboard.selectedsession.storage.button.see-stockage': 'Visualiser les espaces de stockage',
  'dashboard.selectedsession.diffusion.title': 'Diffusion {nbIn} -> {nbOut}',
  'dashboard.selectedsession.diffusion.indexed': 'Produits diffusés : {value}',
  'dashboard.selectedsession.diffusion.indexedError': 'Erreurs : {value}',
  'dashboard.selectedsession.diffusion.button.see-detail': 'Voir le détail',

  ...Locales.fr,
}

export default messages

// propriété  ->  si 0  ->  couleur grise  ->  OK
// aligner les boutons en bas  ->  OK
// propriété  ->  les en attentes = en jaune, les en erreurs = en rouge  ->  OK
// step ingest ajouter espace au dessus de nouvelle versions  ->  OK
// icone running en vert  ->  OK
// 1 seul bouton rafraichir qui rafraichi tout -> OK
// reduire taille tableau du dashboard -> OK
// juste icone running dans les steps -> OK
// flush les filtres lors du umount -> OK -> pas vraiment un problème

// AJOUTER RELANCER LES ERREURS DE STOCKAGE
// ... fin labels steps
// changer les couleurs
// step -> test regrouper properties
// sélection filtre session = session sélectionnée
// si le filtre de source change -> reset liste session (flush table session ?)

// tooltip icon (erreur, en cours, en attente)
// demande en attente + en erreur -> grisé si 0
