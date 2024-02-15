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
  // Feature Manager
  // References
  'feature.references.switch-to.REFERENCES.label': 'Produits ({productsNb})',
  'feature.references.switch-to.REFERENCES.label.loading': 'Produits',
  'feature.references.switch-to.REFERENCES.title': 'Voir les produits',
  'feature.references.switch-to.CREATION.label': 'Creations ({productsNb})',
  'feature.references.switch-to.CREATION.label.loading': 'Creations',
  'feature.references.switch-to.CREATION.title': 'Voir les creations',
  'feature.references.switch-to.UPDATE.label': 'Mises à jour ({productsNb})',
  'feature.references.switch-to.UPDATE.label.loading': 'Mises à jour',
  'feature.references.switch-to.UPDATE.title': 'Voir les mises à jour',
  'feature.references.switch-to.DELETION.label': 'Suppressions ({productsNb})',
  'feature.references.switch-to.DELETION.label.loading': 'Suppressions',
  'feature.references.switch-to.DELETION.title': 'Voir les suppressions',
  'feature.references.switch-to.NOTIFICATION.label': 'Notifications ({productsNb})',
  'feature.references.switch-to.NOTIFICATION.label.loading': 'Notifications',
  'feature.references.switch-to.NOTIFICATION.title': 'Voir les notifications',
  'feature.references.list.table.headers.providerId': 'ID fournisseur',
  'feature.references.list.table.headers.lastUpdate': 'Modifié le',
  'feature.references.list.table.headers.version': 'Version',
  'feature.references.list.table.headers.dissemination': 'Dissémination',
  'feature.references.tooltip.selection.delete': 'Supprimer les produits sélectionnés',
  'feature.references.list.filters.buttons.delete': 'Supprimer la sélection',
  'feature.references.title': 'Produits (GeoJson)',
  'feature.button.refresh': 'Rafraîchir',
  'feature.button.filter': 'Filtrer',
  'feature.button.back': 'Retour',
  'feature.close': 'Fermer',
  'feature.list.filters.source.label': 'Source',
  'feature.list.filters.session.label': 'Session',
  'feature.references.tooltip.providerId': 'Saisir une partie de l\'identifiant fournisseur',
  'feature.list.filters.providerId.label': 'ID fournisseur',
  'feature.list.filters.lastUpdate.label': 'Dernière modification',
  'feature.references.tooltip.details': 'Voir les détails du produit',
  'feature.references.tooltip.delete': 'Supprimer le produit',
  'feature.references.tooltip.notify': 'Notifier le produit',
  'feature.references.list.filters.actions': 'Actions',
  'feature.references.empty.results': 'Aucun produit trouvé',
  'feature.references.loading.results': 'Chargement des produits ...',
  'feature.references.delete.title': 'Supprimer les produits sélectionnés et leurs fichiers sur le stockage',
  'feature.references.delete': 'Supprimer',
  'feature.references.confirm.delete.message': 'Ce traitement est asynchrone, il sera effectif après un certain délai. Une fois démarré, ce traitement créera des requêtes de suppression que vous pourrez suivre dans l\'onglet Suppression. Voulez-vous supprimer le/les produits sélectionné(s)',
  'feature.references.tooltip.selection.notify': 'Notifier les produits sélectionnés',
  'feature.references.list.filters.buttons.notify': 'Notifier la sélection',
  'feature.references.notify.message': 'Voulez vous notifier les produits sélectionnés vers tous les destinataires configurés. Ces destinataires sont configurés sur le service rs-notifier dont vous pouvez récupérer la configuration depuis la fonction Microservice de cet IHM.',
  'feature.references.detail.title': 'Détail',

  'feature.title': 'Notifier les produits sélectionnés',

  // Requests
  'feature.requests.empty.results': 'Aucune requête trouvée',
  'feature.requests.loading.results': 'Chargement des requêtes ...',
  'feature.list.filters.state.label': 'Etat',
  'feature.list.filters.disseminationStatus.label': 'Dissémination',
  'feature.requests.list.filters.clear': 'Effacer les filtres',
  'feature.requests.tooltip.button.dissemination': 'En cours',
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
  'feature.list.filters.state.GRANTED': 'Accepté',
  'feature.list.filters.state.DENIED': 'Refusé',
  'feature.list.filters.state.ERROR': 'Erreur',
  'feature.list.filters.disseminationStatus.NONE': 'Non diffusé',
  'feature.list.filters.disseminationStatus.PENDING': 'En cours',
  'feature.list.filters.disseminationStatus.DONE': 'Terminé',
  'feature.requests.confirmDeleteDialog.title': 'Demande de suppression effectuée',
  'feature.requests.confirmDeleteDialog.message.ok': 'Demande de suppression des requêtes sélectionnées réalisée avec succès. Les requêtes vont prochainement être supprimées.',
  'feature.requests.confirmDeleteDialog.message.not-ok': 'Le nombre maximum de requêtes à supprimer a été dépassé. {totalHandled} requête(s) supprimée(s). Relancez la suppression des requêtes restantes',
  'feature.requests.confirmRetryDialog.title': 'Demande de relance effectuée',
  'feature.requests.confirmRetryDialog.message.ok': 'Demande de relance des requêtes sélectionnées réalisée avec succès. Les requêtes vont prochainement être relancées.',
  'feature.requests.confirmRetryDialog.message.not-ok': 'Le nombre maximum de requêtes à relancer a été dépassé. {totalHandled} requête(s) relancée(s). Relancez les requêtes restantes.',
  'feature.request.error.title': 'Erreurs',
  'feature.request.state.GRANTED': 'Acceptée',
  'feature.request.state.DENIED': 'Refusée',
  'feature.request.state.SUCCESS': 'Terminée',
  'feature.request.state.ERROR': 'En erreur',
  'feature.request.step.LOCAL_DENIED': 'Refusée',
  'feature.request.step.LOCAL_DELAYED': 'Différée',
  'feature.request.step.LOCAL_SCHEDULED': 'En cours',
  'feature.request.step.LOCAL_ERROR': 'Erreur locale',
  'feature.request.step.LOCAL_NOTIFICATION_ERROR': 'Erreur de notification: la feature n\'existe plus',
  'feature.request.step.REMOTE_STORAGE_DELETION_REQUESTED': 'En attente stockage',
  'feature.request.step.REMOTE_STORAGE_REQUESTED': 'En attente stockage',
  'feature.request.step.LOCAL_TO_BE_NOTIFIED': 'En attente de notification',
  'feature.request.step.REMOTE_NOTIFICATION_REQUESTED': 'En attente de notification',
  'feature.request.step.REMOTE_NOTIFICATION_SUCCESS': 'Notification succès',
  'feature.request.step.REMOTE_NOTIFICATION_ERROR': 'Erreur de notification',
  'feature.request.step.REMOTE_CREATION_REQUESTED': 'Requête de création soumise',
  'feature.request.step.REMOTE_CREATION_ERROR': 'Erreur de création',
  'feature.request.step.REMOTE_STORAGE_ERROR': 'Erreur de stockage',
  'feature.request.step.WAITING_BLOCKING_DISSEMINATION': 'Bloqué par une diffusion en cours',

  // Settings
  'feature.settings.title': 'Paramètres du gestionnaire de produit GeoJson',
  'feature.settings.subtitle': 'Configurer les parametres',
  'feature.settings.field.activeNotifications': 'Activer les notifications',
  'feature.settings.fieldgroup.dumpParameters': 'Paramètres de dump',
  'feature.settings.fieldgroup.dumpParameters.isActiveModule': 'Activer le module',
  'feature.settings.fieldgroup.dumpParameters.cronTrigger': 'Cron trigger',
  'feature.settings.fieldgroup.dumpParameters.dumpLocation': 'Emplacement du dump',
  'feature.settings.field.lastDumpReqDate': 'Dernière requête de dump effectuée',
  'feature.settings.action.confirm': 'Confirmer',
  'feature.settings.action.cancel': 'Retour',
  'feature.settings.field.cron.help.message':
    'Le pattern est une liste de six champs séparés par des espaces : représentant la seconde, la minute, l\'heure, le jour, le mois et le jour de la semaine. Les noms de mois et de jours de la semaine peuvent être donnés par les trois premières lettres des noms anglais. Exemples de patterns :',
  'feature.settings.field.cron.help.message.example': '<ul>'
    + '<li> "0 0 * * * *" = le top de chaque heure de chaque jour.</li>'
    + '<li> "*/10 * * * * *" = toutes les 10 secondes.</li>'
    + '<li> "0 0 8-10 * * *" = 8, 9 et 10 heures tous les jours.</li>'
    + '<li> "0 0 6,19 * * *" = 6h00 et 19h00 tous les jours.</li>'
    + '<li> "0 0/30 8-10 * * *" = 8h00, 8h30, 9h00, 9h30, 10h00 and 10h30 tous les jours.</li>'
    + '<li> "0 0 9-17 * * MON-FRI" = de 9h à 17h les jours ouvrés.</li>'
    + '<li> "0 0 0 25 12 ?" = tous les Noël à minuit.</li>'
    + '</ul>',
  'feature.settings.dialog.title': 'A propros de ce champ',
  'feature.settings.dialog.close': 'Fermer',

  ...Locales.fr,
}

export default messages
