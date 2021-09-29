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

/**
 * Module message for FR local
 * @author Raphaël Mechali
 */
const messages = {
  // orders table
  'no.order.information.title': 'Aucune commande trouvée',
  'no.order.information.message': 'Vous n\'avez actuellement aucune commande enregistrée.',
  'not.logged.information.title': 'Utilisateur inconnu',
  'not.logged.information.message': 'Vous devez vous authentifier pour accéder à la liste de vos commandes',
  'order.list.download.summary.csv.label': 'Résumé',
  'order.list.download.summary.csv.tooltip': 'Télécharger le résumé en CSV',
  'order.list.admin.no.command.header.message': 'Aucune commande',
  'order.list.admin.commands.header.message': '{count} commande(s)',
  'order.list.user.no.command.header.message': 'Vous n\'avez pas de commande',
  'order.list.user.commands.header.message': 'Vous avez {count} commande(s)',
  'order.list.column.owner': 'Utilisateur',
  'order.list.column.label': 'Libellé',
  'order.list.column.creation.date': 'Créée le',
  'order.list.column.expiration.date': 'Expire le',
  'order.list.column.object.count': 'Nombre d\'objets',
  'order.list.column.files.count': 'Nombre de fichiers',
  'order.list.column.errors.count': 'Nombre d\'erreurs',
  'order.list.column.files.size': 'Taille totale',
  'order.list.column.progress': 'Progression',
  'order.list.column.status': 'Statut',
  'order.list.column.options': 'Options',
  'order.list.cell.status.PENDING.text': 'en attente',
  'order.list.cell.status.PENDING.tooltip': 'En attente',
  'order.list.cell.status.RUNNING.text': 'en cours',
  'order.list.cell.status.RUNNING.tooltip': 'En cours',
  'order.list.cell.status.PAUSED.text': 'en pause',
  'order.list.cell.status.PAUSED.tooltip': 'En pause',
  'order.list.cell.status.EXPIRED.text': 'expirée',
  'order.list.cell.status.EXPIRED.tooltip': 'Cette commande est expirée',
  'order.list.cell.status.FAILED.text': 'en erreur',
  'order.list.cell.status.FAILED.tooltip': 'Le traitement de cette commande a été suspendu à cause d\'erreurs',
  'order.list.cell.status.DONE_WITH_WARNING.text': 'terminée',
  'order.list.cell.status.DONE_WITH_WARNING.tooltip': 'Cette commande s\'est terminée correctement mais a des erreurs',
  'order.list.cell.status.DONE.text': 'terminée',
  'order.list.cell.status.DONE.tooltip': 'Terminée, sans erreur',
  'order.list.cell.status.DELETED.text': 'supprimée',
  'order.list.cell.status.DELETED.tooltip': 'Cette commande a été supprimée',
  'order.list.cell.status.REMOVED.text': 'supprimée',
  'order.list.cell.status.REMOVED.tooltip': 'Cette commande a été définitivement effacée',
  'order.list.cell.status.UNKNOWN.text': 'inconnu',
  'order.list.cell.status.UNKNOWN.tooltip': 'L\'état de cette commande est inconnu',
  'order.list.cell.status.WAITING_USER_DOWNLOAD.text': 'attente utilisateur',
  'order.list.cell.status.WAITING_USER_DOWNLOAD.tooltip': 'La commande est en attente. Veuillez télécharger les données pour qu\'elle puisse continuer',
  'order.list.option.cell.download.title': 'Télécharger...',
  'order.list.option.cell.download.zip.tooltip': 'Télécharger les fichiers disponibles de la commande en ZIP',
  'order.list.option.cell.download.metalink.tooltip': 'Télécharger le fichier metalink de la commande',
  'order.list.option.cell.delete.superficially.order.tooltip': 'Annuler la commande',
  'order.list.option.cell.delete.superficially.confirmation.title': 'Annuler la commande {name}',
  'order.list.option.cell.delete.superficially.confirmation.message': 'Etes-vous sûr de vouloir annuler la commande sélectionnée ?',
  'order.list.option.cell.delete.superficially.confirmation.button': 'Confirmer',
  'order.list.option.cell.delete.completely.order.tooltip': 'Effacer complètement la commande et les données liées',
  'order.list.option.cell.delete.completely.confirmation.title': 'Suppression complète de la commande {name}',
  'order.list.option.cell.delete.completely.confirmation.message': 'Cette commande et ses données seront intégralement supprimées. Voulez-vous continuer?',
  'order.list.option.cell.delete.completely.confirmation.button': 'Supprimer',
  'order.list.option.cell.pause.order.tooltip': 'Mettre la commande en pause',
  'order.list.option.cell.resume.order.tooltip': 'Reprendre la commande',
  'order.list.option.cell.retry.order.tooltip': 'Relancer la commande',
  'order.list.option.cell.retry.mode.selection.dialog.title': 'Relancer la commande - {name}',
  'order.list.option.cell.retry.mode.selection.dialog.retry.button.label': 'Relancer les erreurs',
  'order.list.option.cell.retry.mode.selection.dialog.restart.button.label': 'Relancer la commande complète',
  'order.list.option.cell.retry.mode.selection.dialog.restart.back.button.label': 'Retour',
  'order.list.option.cell.retry.mode.selection.dialog.close.button.label': 'Annuler',
  'order.list.option.cell.retry.mode.selection.dialog.restart.order.new.label.info': 'Veuillez saisir le nom de la nouvelle commande',
  'order.list.option.cell.retry.mode.selection.dialog.restart.error.unique.label': 'Une commande avec ce nom existe déjà',
  'order.list.option.cell.retry.mode.selection.dialog.restart.error.too.long.label': 'Le nom saisie pour la nouvelle commande est trop long',
  'order.list.option.cell.retry.mode.selection.dialog.restart.order.new.label.too.long': 'Taille maximum autorisée {size}',
  'order.list.option.cell.retry.mode.selection.dialog.restart.error': 'Erreur durant la relance de votre commande.',
  'order.list.option.cell.retry.mode.selection.dialog.ALL.info': 'La commande sélectionée contient des erreurs. Vous pouvez réaliser au choix les actions suivantes',
  'order.list.option.cell.retry.mode.selection.dialog.RETRY.info': 'Relancer la récupération des fichiers en erreurs sur la même commande.',
  'order.list.option.cell.retry.mode.selection.dialog.RESTART.info': 'Relancer la commande complète au travers de la création d\'une nouvelle commande.',
  'order.list.option.cell.retry.mode.selection.dialog.NONE.info': 'Désolé, mais la commande sélectionné ne peut pas être relancer pour l\'instant. Merci de patientier que la commande soit terminée.',
  'order.list.option.cell.detail.title': 'Détail',
  'order.list.options.error.title': 'Échec de la requête',
  'order.list.options.error.close.button.label': 'Fermer',
  'order.list.options.error.ORDER_MUST_BE_PAUSED_BEFORE_BEING_DELETED': 'Cette commande  ne peut pas être supprimée car elle n\'est pas en pause.',
  'order.list.options.error.ORDER_NOT_COMPLETELY_STOPPED': 'Cette commande n\'est pas complètement stoppée. Veuillez ré-essayer ultérieurement.',
  'order.list.options.error.ORDER_NOT_COMPLETELY_PAUSED': 'Cette commande n\'est pas complètement stoppée. Veuillez ré-essayer ultérieurement.',
  'order.list.options.error.ORDER_MUST_NOT_BE_RUNNING': 'Cette commande est en cours, elle ne peut pas être supprimée.',
  'order.list.options.error.ORDER_MUST_BE_PENDING_OR_RUNNING': 'Cette commande ne peut être mise en pause car elle n\'est pas en cours.',
  'order.list.options.error.ONLY_PAUSED_ORDER_CAN_BE_RESUMED': 'Cette commande ne peut pas être relancée car elle n\'est pas en pause.',
  'order.list.options.error.UNKNOWN': 'Une erreur inconnue est survenue.',
  'order.list.options.aynschronous.request.title': 'Requête en cours de traitement...',
  'order.list.options.aynschronous.request.message': 'Votre requête a été prise en compte et les changements sur la commande seront effectués au plus tôt.',
  'order.list.options.aynschronous.request.close.button.label': 'Fermer',

  // order datasets table
  'datasets.list.no.dataset.information.title': 'Aucun jeu de données',
  'datasets.list.no.dataset.information.message': 'Aucun jeu de données n\'a été résolu pour cette commande. Vous n\'avez plus les droits d\'accès aux données commandées.',
  'datasets.list.no.dataset.header.message': 'Aucun jeu de données',
  'datasets.list.datasets.header.message': '{count} jeu(x) de données',
  'datasets.list.column.label': 'Nom',
  'datasets.list.column.objects.count': 'Nombre d\'objets',
  'datasets.list.column.files.count': 'Nombre de fichiers',
  'datasets.list.column.files.size': 'Taille totale',
  'datasets.list.column.processing': 'Traitement',
  'datasets.list.column.processing.undefined': 'Non-défini',
  'datasets.list.column.options': 'Options',
  'datasets.list.option.cell.detail.title': 'Fichiers du jeu de données',

  // order dataset files table
  'files.list.no.file.information.title': 'Aucun fichier',
  'files.list.no.file.information.message': 'Il n\'y a aucun fichier associé au jeu de données sélectionné',
  'files.list.no.file.header.message': 'Aucun fichier',
  'files.list.files.header.message': '{count} fichier(s)',
  'files.list.column.name': 'Nom',
  'files.list.column.size': 'Taille',
  'files.list.column.type': 'Type MIME',
  'files.list.column.status': 'Statut',
  'files.list.column.source': 'Source',
  'files.list.column.options': 'Options',
  'files.list.cell.status.PENDING.text': 'en attente',
  'files.list.cell.status.PENDING.tooltip': 'Ce fichier n\'est pas encore téléchargeable',
  'files.list.cell.status.AVAILABLE.text': 'disponible',
  'files.list.cell.status.AVAILABLE.tooltip': 'Ce fichier est téléchargeable',
  'files.list.cell.status.ONLINE.text': 'disponible',
  'files.list.cell.status.ONLINE.tooltip': 'Ce fichier est téléchargeable',
  'files.list.cell.status.DOWNLOADED.text': 'téléchargé',
  'files.list.cell.status.DOWNLOADED.tooltip': 'Ce fichier a été téléchargé',
  'files.list.cell.status.DOWNLOAD_ERROR.text': 'erreur au téléchargement',
  'files.list.cell.status.DOWNLOAD_ERROR.tooltip': 'Une erreur est survenue lors du téléchargement',
  'files.list.cell.status.PROCESSING_ERROR.text': 'erreur de traitement',
  'files.list.cell.status.PROCESSING_ERROR.tooltip': 'Fichier non produit car le traitement a échoué',
  'files.list.cell.status.ERROR.text': 'erreur',
  'files.list.cell.status.ERROR.tooltip': 'Une erreur s\'est produite durant le téléchargement',
  'files.list.cell.status.UNKNOWN.text': 'inconnu',
  'files.list.cell.status.UNKNOWN.tooltip': 'L\'état du fichier est inconnu',
  'files.list.cell.options.download.tooltip': 'Télécharger le fichier',

}

export default messages
