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
  'dashboard.selectedsession.delete': 'Supprimer',
  'dashboard.selectedsession.refresh': 'Rafraichir',
  'dashboard.selectedsession.dialog.delete.title': 'Supprimer la session {sessionName} ?',
  'dashboard.selectedsession.acquisition.title': 'Acquisition',
  'dashboard.selectedsession.acquisition.fem.in': 'Demandes d\'acquisition : {nbIn}',
  'dashboard.selectedsession.acquisition.fem.refused': 'Demandes refusées : {nbRefused}',
  'dashboard.selectedsession.acquisition.fem.error': 'Demandes en erreurs : {nbError}',
  'dashboard.selectedsession.acquisition.fem.acquired': 'Produits acquis : {nbAcquired}',
  'dashboard.selectedsession.acquisition.fem.button.see-errors': 'Voir les demandes en erreurs',
  'dashboard.selectedsession.acquisition.fem.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.acquisition.dp.in': 'Fichiers détectés : {nbIn}',
  'dashboard.selectedsession.acquisition.dp.incomplete': 'Produits incomplets: {nbIncomplete}',
  'dashboard.selectedsession.acquisition.dp.invalid': 'Produits invalides: {nbInvalid}',
  'dashboard.selectedsession.acquisition.dp.error': 'Erreurs: {nbError}',
  'dashboard.selectedsession.acquisition.dp.acquired': 'Produits acquis: {nbAcquired}',
  'dashboard.selectedsession.acquisition.dp.button.see-errors': 'Voir les erreurs',
  'dashboard.selectedsession.acquisition.dp.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.acquisition.dp.dialog.title': 'Produits',
  'dashboard.selectedsession.acquisition.dp.dialog.button.close': 'Fermer',
  'dashboard.selectedsession.acquisition.dp.dialog.table.column.name': 'Nom',
  'dashboard.selectedsession.acquisition.dp.dialog.table.column.error': 'Erreur',
  'dashboard.selectedsession.referencing.title': 'Référencement',
  'dashboard.selectedsession.referencing.fem.in': 'Demandes de référencement : {nbIn}',
  'dashboard.selectedsession.referencing.fem.suppress': 'Demandes de suppression : {nbSuppress}',
  'dashboard.selectedsession.referencing.fem.maj': 'Demandes de mise à jour : {nbMaj}',
  'dashboard.selectedsession.referencing.fem.error': 'Demandes en erreur : {nbError}',
  'dashboard.selectedsession.referencing.fem.refused': 'Demandes refusées : {nbRefused}',
  'dashboard.selectedsession.referencing.fem.referenced': 'Produits référencés : {nbReferenced}',
  'dashboard.selectedsession.referencing.fem.button.see-referenced': 'Voir les produits référencés',
  'dashboard.selectedsession.referencing.fem.button.see-errors': 'Voir les erreurs',
  'dashboard.selectedsession.referencing.fem.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.referencing.dp.in': 'Demandes de référencement : {nbIn}',
  'dashboard.selectedsession.referencing.dp.error': 'Demandes en erreur : {nbError}',
  'dashboard.selectedsession.referencing.dp.referenced': 'Produits référencés: {nbReferenced}',
  'dashboard.selectedsession.referencing.dp.version': 'Nouvelles versions : {nbVersion}',
  'dashboard.selectedsession.referencing.dp.replaced': 'Remplacés : {nbReplaced}',
  'dashboard.selectedsession.referencing.dp.ignore': 'Ignorés : {nbIgnored}',
  'dashboard.selectedsession.referencing.dp.wait': 'En attente administrateur : {nbWaiting}',
  'dashboard.selectedsession.referencing.dp.button.see-referenced': 'Voir les produits référencés',
  'dashboard.selectedsession.referencing.dp.button.see-waiting': 'Voir en attente',
  'dashboard.selectedsession.referencing.dp.button.see-errors': 'Voir les erreurs',
  'dashboard.selectedsession.referencing.dp.button.retry-errors': 'Relancer les erreurs',
  'dashboard.selectedsession.storage.title': 'Archivage',
  'dashboard.selectedsession.storage.dp.in': 'Demandes d\'archivage : {nbIn}',
  'dashboard.selectedsession.storage.dp.error': 'Demandes en erreur : {nbError}',
  'dashboard.selectedsession.storage.dp.stored': 'Produits archivés : {nbStored}',
  'dashboard.selectedsession.storage.dp.button.see-stockage': 'Visualiser les espaces de stockage',
  'dashboard.selectedsession.diffusion.title': 'Diffusion',
  'dashboard.selectedsession.diffusion.out': 'Produits diffusés : {nbOut}',
  'dashboard.selectedsession.diffusion.dp.error': 'Erreurs : {nbError}',
  'dashboard.selectedsession.diffusion.button.see-detail': 'Voir le détail',

  ...Locales.fr,
}

export default messages
