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
 * @author Sébastien Binda
 */
const messages = {
  'dashboard.title': 'Tableau de board',
  'dashboard.refresh': 'Rafraichir',
  'dashboard.back': 'Retour',

  // Sources
  'dashboard.sources.table.column.sourceName': 'Nom',
  'dashboard.sources.table.column.referencedProducts': 'Produits référencés',
  'dashboard.sources.table.column.diffusedProducts': 'Produits diffusés',
  'dashboard.sources.title': 'Sources',
  'dashboard.sources.filter.name': 'Rechercher un nom...',
  'dashboard.sources.filter.status': 'Statut',

  // Feature Manager
  // References
  'feature.references.switch-to.references.label': 'Produits ({productsNb})',
  'feature.references.switch-to.references.title': 'Voir les produits',
  'feature.references.switch-to.extraction.label': 'Extractions ({productsNb})',
  'feature.references.switch-to.extraction.title': 'Voir les extractions',
  'feature.references.switch-to.creation.label': 'Creations ({productsNb})',
  'feature.references.switch-to.creation.title': 'Voir les creations',
  'feature.references.switch-to.update.label': 'Mises à jour ({productsNb})',
  'feature.references.switch-to.update.title': 'Voir les mises à jour',
  'feature.references.switch-to.delete.label': 'Suppressions ({productsNb})',
  'feature.references.switch-to.delete.title': 'Voir les suppressions',
  'feature.references.switch-to.notification.label': 'Notifications ({productsNb})',
  'feature.references.switch-to.notification.title': 'Voir les notifications',
  'feature.references.list.table.headers.providerId': 'ID fournisseur',
  'feature.references.list.table.headers.lastUpdate': 'Modifié le',
  'feature.references.list.table.headers.version': 'Version',
  'feature.references.tooltip.selection.delete': 'Supprimer les produits sélectionnés',
  'feature.references.list.filters.buttons.delete': 'Supprimer la sélection',
  'feature.references.title': 'Références',
  'feature.button.back': 'Retour',
  'feature.close': 'Fermer',
  'feature.references.list.filters.source': 'Source',
  'feature.references.list.filters.session': 'Session',
  'feature.references.tooltip.providerId': 'Saisir une partie de l\'identifiant fournisseur',
  'feature.references.list.filters.providerId': 'ID fournisseur',
  'feature.references.list.filters.from.label': 'Depuis',
  'feature.references.list.filters.to.label': 'Jusqu\'à',
  'feature.references.tooltip.details': 'Voir les détails du produit',
  'feature.references.tooltip.delete': 'Supprimer le produit',
  'feature.references.tooltip.notify': 'Notifier le produit',
  'feature.references.list.filters.actions': 'Actions',
  'feature.references.empty.results': 'Aucun produit trouvé',
  'feature.references.delete.title': 'Supprimer les produits sélectionnés et leurs fichiers sur le stockage',
  'feature.references.delete': 'Supprimer',
  'feature.references.confirm.delete.message': 'Voulez-vous supprimer le/les produits sélectionné(s)',
  'feature.references.tooltip.selection.notify': 'Notifier les produits sélectionnés',
  'feature.references.list.filters.buttons.notify': 'Notifier la sélection',
  'feature.references.notify.title': 'Notifier les références sélectionnées',
  'feature.references.notify': 'Notifier',
  'feature.references.notify.message': 'Voulez vous notifier les références sélectionnées',

  // Requests
  'feature.requests.empty.results': 'Aucune requete trouvée',
  'feature.requests.list.filters.state': 'Etat',
  'feature.requests.tooltip.selection.retry': 'Relancer les requêtes sélectionnées',
  'feature.requests.list.filters.buttons.retry': 'Relancer la sélection',
  'feature.requests.tooltip.selection.delete': 'Supprimer les requêtes sélectionnées',
  'feature.requests.list.filters.buttons.delete': 'Supprimer la sélection',
  'feature.requests.list.filters.providerId': 'ID fournisseur',
  'feature.requests.list.filters.id': 'Id',
  'feature.requests.list.filters.lastSubmission': 'Date',
  'feature.requests.list.filters.actions': 'Actions',
  'feature.requests.retry.title': 'Relancer le traitement',
  'feature.requests.delete.title': 'Supprimer la requête',
  'feature.requests.retry': 'Relancer',
  'feature.request.retry.title': 'Relancer',
  'feature.requests.confirm.retry.message': 'Voulez-vous relancer le/les requêtes sélectionnée(s)',
  'feature.requests.status.any': 'Tout statut',
  'feature.requests.status.GRANTED': 'ACCEPTE',
  'feature.requests.status.DENIED': 'REFUSE',
  'feature.requests.status.ERROR': 'ERREUR',
  'feature.requests.confirmDeleteDialog.title': 'Demande de suppression effectuée',
  'feature.requests.confirmDeleteDialog.message.ok': 'Suppression des requêtes sélectionnées réalisé avec succès.',
  'feature.requests.confirmDeleteDialog.message.not-ok': 'Le nombre maximum de requêtes à supprimer a été dépassé. {totalHandled} requête(s) supprimée(s). Relancez la suppression des requêtes restantes',
  'feature.requests.confirmRetryDialog.title': 'Demande de relance effectuée',
  'feature.requests.confirmRetryDialog.message.ok': 'Relance des requêtes sélectionnées réalisée avec succès',
  'feature.requests.confirmRetryDialog.message.not-ok': 'Le nombre maximum de requêtes à relancer a été dépassé. {totalHandled} requête(s) relancée(s). Relancez les requêtes restantes.',
  'feature.request.error.title': 'Erreurs',

  ...Locales.fr,
}

export default messages
