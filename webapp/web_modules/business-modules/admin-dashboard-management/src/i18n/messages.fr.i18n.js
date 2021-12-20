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
  'dashboard.sessions.fetch.error': 'Impossible de récupérer la session {selectedSessionId}',
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
  'dashboard.selectedsession.ACQUISITION.title': 'Acquisition',
  'dashboard.selectedsession.ACQUISITION.scan.title': 'Data Provider',
  'dashboard.selectedsession.ACQUISITION.workers.title': 'Worker Manager',
  'dashboard.selectedsession.ACQUISITION.subtitle': '{nbIn} -> {nbOut}',
  'dashboard.selectedsession.ACQUISITION.dp.filesAcquired': 'Détectés : {value}',
  'dashboard.selectedsession.ACQUISITION.dp.filesInvalid': 'Invalides : {value}',
  'dashboard.selectedsession.ACQUISITION.dp.incomplete': 'Incomplets : {value}',
  'dashboard.selectedsession.ACQUISITION.dp.invalid': 'Invalides : {value}',
  'dashboard.selectedsession.ACQUISITION.dp.productsErrors': 'Erreurs : {value}',
  'dashboard.selectedsession.ACQUISITION.dp.generatedProducts': 'Générés : {value}',
  'dashboard.selectedsession.ACQUISITION.dp.filesAcquired.tooltip': '{value} fichier(s) détecté(s)',
  'dashboard.selectedsession.ACQUISITION.dp.filesInvalid.tooltip': '{value} fichier(s) invalide(s)',
  'dashboard.selectedsession.ACQUISITION.dp.incomplete.tooltip': '{value} produit(s) incomplet(s)',
  'dashboard.selectedsession.ACQUISITION.dp.invalid.tooltip': '{value} produit(s) invalide(s)',
  'dashboard.selectedsession.ACQUISITION.dp.productsErrors.tooltip': '{value} produit(s) érroné(s)',
  'dashboard.selectedsession.ACQUISITION.dp.generatedProducts.tooltip': '{value} produit(s) généré(s)',
  'dashboard.selectedsession.ACQUISITION.dp.button.see-errors': 'Voir les erreurs',
  'dashboard.selectedsession.ACQUISITION.dp.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.ACQUISITION.dp.button.see-waiting': 'Voir en attente',
  'dashboard.selectedsession.ACQUISITION.dp.dialog.title': 'Produits en erreurs',
  'dashboard.selectedsession.ACQUISITION.dp.properties.input.title': 'Fichiers',
  'dashboard.selectedsession.ACQUISITION.dp.properties.output.title': 'Produits',
  'dashboard.selectedsession.ACQUISITION.dp.dialog.button.close': 'Fermer',
  'dashboard.selectedsession.ACQUISITION.dp.dialog.table.column.name': 'Nom',
  'dashboard.selectedsession.ACQUISITION.dp.dialog.table.column.error': 'Erreur',
  'dashboard.selectedsession.ACQUISITION.dp.dialog.retry.title': 'Voulez vous relancer les erreurs ?',
  'dashboard.selectedsession.ACQUISITION.dp.dialog.retry.message': 'Vous êtes sur le point de relancer la génération des produits en erreur. Cette action peut prendre un certain temps, vous pourrez voir l\'avancement de cette relance en rafraîchissant régulièrement cette page.',
  'dashboard.selectedsession.ACQUISITION.workers.requests': 'Total : {value}',
  'dashboard.selectedsession.ACQUISITION.workers.no_worker_available': 'En attente : {value}',
  'dashboard.selectedsession.ACQUISITION.workers.running': 'En cours : {value}',
  'dashboard.selectedsession.ACQUISITION.workers.error': 'En erreur: {value}',
  'dashboard.selectedsession.ACQUISITION.workers.done': 'Traitées : {value}',
  'dashboard.selectedsession.ACQUISITION.workers.running.tooltip': '{value} demande(s) en cours',
  'dashboard.selectedsession.ACQUISITION.workers.error.tooltip': '{value} demande(s) en erreur',
  'dashboard.selectedsession.ACQUISITION.workers.done.tooltip': '{value} demande(s) traitées',
  'dashboard.selectedsession.ACQUISITION.workers.requests.tooltip': '{value} demande(s) de traitements reçue',
  'dashboard.selectedsession.ACQUISITION.workers.no_worker_available.tooltip': '{value} demande(s) en attente',
  'dashboard.selectedsession.ACQUISITION.workers.button.see-waiting': 'Voir les demandes en attente',
  'dashboard.selectedsession.ACQUISITION.workers.button.see-errors': 'Voir les demandes en erreur',
  'dashboard.selectedsession.ACQUISITION.workers.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.ACQUISITION.workers.dialog.retry.title': 'Voulez vous relancer les erreurs ?',
  'dashboard.selectedsession.ACQUISITION.workers.dialog.retry.message': 'Vous êtes sur le point de relancer toutes les demandes en erreur. Cette action peut prendre un certain temps, vous pourez voir l\'avancement de cette relance en rafraîchissant régulièrement cette page.',
  'dashboard.selectedsession.ACQUISITION.workers.properties.input.title': 'Demandes',
  'dashboard.selectedsession.ACQUISITION.workers.properties.workers.title': '{value} (Demandes)',
  'dashboard.selectedsession.REFERENCING.title': 'Référencement',
  'dashboard.selectedsession.REFERENCING.oais.title': 'Ingest',
  'dashboard.selectedsession.REFERENCING.feature.title': 'Feature Manager',
  'dashboard.selectedsession.REFERENCING.subtitle': '{nbIn} -> {nbOut}',
  'dashboard.selectedsession.REFERENCING.fem.referencingRequests': 'Référencements : {value}',
  'dashboard.selectedsession.REFERENCING.fem.deleteRequests': 'Suppressions : {value}',
  'dashboard.selectedsession.REFERENCING.fem.deniedReferencingRequests': 'Refusés : {value}',
  'dashboard.selectedsession.REFERENCING.fem.updateRequests': 'Mises à jour : {value}',
  'dashboard.selectedsession.REFERENCING.fem.notifyRequests': 'Notifications : {value}',
  'dashboard.selectedsession.REFERENCING.fem.referencedProducts': 'Référencés : {value}',
  'dashboard.selectedsession.REFERENCING.fem.deletedProducts': 'Supprimés : {value}',
  'dashboard.selectedsession.REFERENCING.fem.updatedProducts': 'Mis à jour : {value}',
  'dashboard.selectedsession.REFERENCING.fem.notifyProducts': 'Notifiés : {value}',
  'dashboard.selectedsession.REFERENCING.fem.requestsErrors': 'Erreurs : {value}',
  'dashboard.selectedsession.REFERENCING.fem.referencingRequests.tooltip': '{value} demande(s) de référencement reçue',
  'dashboard.selectedsession.REFERENCING.fem.deleteRequests.tooltip': '{value} demande(s) de suppressions reçue',
  'dashboard.selectedsession.REFERENCING.fem.deniedReferencingRequests.tooltip': '{value} demande(s) refusées',
  'dashboard.selectedsession.REFERENCING.fem.updateRequests.tooltip': '{value} demande(s) de mises à jour reçue',
  'dashboard.selectedsession.REFERENCING.fem.notifyRequests.tooltip': '{value} demande(s) de notifications reçue',
  'dashboard.selectedsession.REFERENCING.fem.referencedProducts.tooltip': '{value} produit(s) référencé(s)',
  'dashboard.selectedsession.REFERENCING.fem.deletedProducts.tooltip': '{value} produit(s) supprimé(s)',
  'dashboard.selectedsession.REFERENCING.fem.updatedProducts.tooltip': '{value} produit(s) mis à jour',
  'dashboard.selectedsession.REFERENCING.fem.notifyProducts.tooltip': '{value} produit(s) notifié(s)',
  'dashboard.selectedsession.REFERENCING.fem.requestsErrors.tooltip': '{value} demande(s) en erreur',
  'dashboard.selectedsession.REFERENCING.fem.properties.input.title': 'Demandes',
  'dashboard.selectedsession.REFERENCING.fem.properties.output.title': 'Produits',
  'dashboard.selectedsession.REFERENCING.fem.button.see-referenced': 'Voir les produits référencés',
  'dashboard.selectedsession.REFERENCING.fem.button.see-errors': 'Voir les erreurs',
  'dashboard.selectedsession.REFERENCING.fem.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.REFERENCING.fem.dialog.retry.title': 'Voulez vous relancer les erreurs ?',
  'dashboard.selectedsession.REFERENCING.fem.dialog.retry.message': 'Vous êtes sur le point de relancer toutes les demandes en erreur (référencent/Suppressions/mise à jour et notification). Cette action peut prendre un certain temps, vous pourez voir l\'avancement de cette relance en rafraîchissant régulièrement cette page.',
  'dashboard.selectedsession.REFERENCING.ingest.totalRequests': 'Référencements : {value}',
  'dashboard.selectedsession.REFERENCING.ingest.requestsErrors': 'Erreurs : {value}',
  'dashboard.selectedsession.REFERENCING.ingest.referencedProducts': 'Référencés: {value}',
  'dashboard.selectedsession.REFERENCING.ingest.deletedProducts': 'Supprimés: {value}',
  'dashboard.selectedsession.REFERENCING.ingest.newProductVersions': 'Nouvelles versions : {value}',
  'dashboard.selectedsession.REFERENCING.ingest.replacedProducts': 'Remplacés : {value}',
  'dashboard.selectedsession.REFERENCING.ingest.ignoredProducts': 'Ignorés : {value}',
  'dashboard.selectedsession.REFERENCING.ingest.productWaitVersionMode': 'En attente admin : {value}',
  'dashboard.selectedsession.REFERENCING.ingest.totalRequests.tooltip': '{value} demande(s) de référencement reçue',
  'dashboard.selectedsession.REFERENCING.ingest.requestsErrors.tooltip': '{value} demande(s) de référencement en erreur',
  'dashboard.selectedsession.REFERENCING.ingest.referencedProducts.tooltip': '{value} produit(s) référencé(s)',
  'dashboard.selectedsession.REFERENCING.ingest.deletedProducts.tooltip': '{value} produit(s) supprimé(s)',
  'dashboard.selectedsession.REFERENCING.ingest.newProductVersions.tooltip': '{value} produit(s) avec une nouvelle version',
  'dashboard.selectedsession.REFERENCING.ingest.replacedProducts.tooltip': '{value} produit(s) remplacé(s)',
  'dashboard.selectedsession.REFERENCING.ingest.ignoredProducts.tooltip': '{value} produit(s) ignoré(s)',
  'dashboard.selectedsession.REFERENCING.ingest.productWaitVersionMode.tooltip': '{value} produit(s) en attente admin',
  'dashboard.selectedsession.REFERENCING.ingest.properties.input.title': 'Demandes',
  'dashboard.selectedsession.REFERENCING.ingest.properties.output.title': 'Produits',
  'dashboard.selectedsession.REFERENCING.ingest.button.see-referenced': 'Voir les produits référencés',
  'dashboard.selectedsession.REFERENCING.ingest.button.see-waiting': 'Voir en attente',
  'dashboard.selectedsession.REFERENCING.ingest.button.see-errors': 'Voir les erreurs',
  'dashboard.selectedsession.REFERENCING.ingest.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.REFERENCING.ingest.dialog.retry.title': 'Voulez vous relancer les erreurs ?',
  'dashboard.selectedsession.REFERENCING.ingest.dialog.retry.message': 'Vous êtes sur le point de relancer la générations des produits en erreurs et/ou le stockage/référencent des fichiers associés. Cette action peut prendre un certain temps, vous pourrez voir l\'avancement de cette relance en rafraîchissant régulièrement cette page.',
  'dashboard.selectedsession.STORAGE.title': 'Archivage',
  'dashboard.selectedsession.STORAGE.storage.title': 'Storage',
  'dashboard.selectedsession.STORAGE.subtitle': '{nbIn} -> {nbOut}',
  'dashboard.selectedsession.STORAGE.archival.referenceRequests': 'Référencements : {value}',
  'dashboard.selectedsession.STORAGE.archival.storeRequests': 'Archivages : {value}',
  'dashboard.selectedsession.STORAGE.archival.copyRequests': 'Copies : {value}',
  'dashboard.selectedsession.STORAGE.archival.deleteRequests': 'Suppressions : {value}',
  'dashboard.selectedsession.STORAGE.archival.requestsRefused': 'Refusées : {value}',
  'dashboard.selectedsession.STORAGE.archival.requestsErrors': 'Erreurs : {value}',
  'dashboard.selectedsession.STORAGE.archival.storedFiles': 'Archivés : {value}',
  'dashboard.selectedsession.STORAGE.archival.referencedFiles': 'Référencés : {value}',
  'dashboard.selectedsession.STORAGE.archival.deletedFiles': 'Supprimés : {value}',
  'dashboard.selectedsession.STORAGE.archival.referenceRequests.tooltip': '{value} demande(s) de référencement',
  'dashboard.selectedsession.STORAGE.archival.storeRequests.tooltip': '{value} demande(s) d\'archivage',
  'dashboard.selectedsession.STORAGE.archival.copyRequests.tooltip': '{value} demande(s) de copies',
  'dashboard.selectedsession.STORAGE.archival.deleteRequests.tooltip': '{value} demande(s) de suppression',
  'dashboard.selectedsession.STORAGE.archival.requestsRefused.tooltip': '{value} demande(s) refusée(s)',
  'dashboard.selectedsession.STORAGE.archival.requestsErrors.tooltip': '{value} demande(s) en erreur',
  'dashboard.selectedsession.STORAGE.archival.storedFiles.tooltip': '{value} fichier(s) archivé(s) dans l\'archivage',
  'dashboard.selectedsession.STORAGE.archival.referencedFiles.tooltip': '{value} fichier(s) référencé(s) dans l\'archivage',
  'dashboard.selectedsession.STORAGE.archival.deletedFiles.tooltip': '{value} fichier(s) supprimé(s) de l\'archivage',
  'dashboard.selectedsession.STORAGE.archival.properties.input.title': 'Demandes',
  'dashboard.selectedsession.STORAGE.archival.properties.output.title': 'Fichiers',
  'dashboard.selectedsession.STORAGE.archival.button.see-stockage': 'Visualiser les espaces de stockage',
  'dashboard.selectedsession.STORAGE.archival.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.STORAGE.archival.dialog.retry.title': 'Voulez vous relancer les erreurs ?',
  'dashboard.selectedsession.STORAGE.archival.dialog.retry.message': 'Vous êtes sur le point de relancer toutes les demandes en erreur (stockage/référencent/suppressions et copies). Cette action peut prendre un certain temps, vous pourrez voir l\'avancement de cette relance en rafraîchissant régulièrement cette page.',
  'dashboard.selectedsession.DISSEMINATION.title': 'Diffusion',
  'dashboard.selectedsession.DISSEMINATION.catalog.title': 'Interne',
  'dashboard.selectedsession.DISSEMINATION.subtitle': '{nbIn} -> {nbOut}',
  'dashboard.selectedsession.DISSEMINATION.diffusion.indexed': 'Catalogués : {value}',
  'dashboard.selectedsession.DISSEMINATION.diffusion.indexedError': 'Erreurs : {value}',
  'dashboard.selectedsession.DISSEMINATION.diffusion.indexed.tooltip': '{value} produit(s) diffusé(s)',
  'dashboard.selectedsession.DISSEMINATION.diffusion.indexedError.tooltip': '{value} produit(s) n\'ont pas pu être diffusé',
  'dashboard.selectedsession.DISSEMINATION.fem_dissemination.properties.input.title': 'Demandes',
  'dashboard.selectedsession.DISSEMINATION.diffusion.properties.output.title': 'Produits',
  'dashboard.selectedsession.DISSEMINATION.diffusion.button.see-detail': 'Voir le détail',
  'dashboard.selectedsession.DISSEMINATION.fem_dissemination.title': 'Externe',
  'dashboard.selectedsession.DISSEMINATION.fem_dissemination.table.column.name': 'Destinataire',
  'dashboard.selectedsession.DISSEMINATION.fem_dissemination.table.column.pending': 'Attente',
  'dashboard.selectedsession.DISSEMINATION.fem_dissemination.table.column.done': 'Terminée',

  ...Locales.fr,
}

export default messages
