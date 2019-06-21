/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const messages = Object.assign({
  'aips.list.subtitle': 'Liste des AIPS pour la session sélectionnée',
  'aips.list.filters.data.storage.label': 'Stocké sur',
  'aips.list.filters.status.label': 'État',
  'aips.list.filters.providerId.label': 'Id fournisseur',
  'aips.list.filters.from.label': 'Depuis',
  'aips.list.filters.to.label': 'Jusqu\'à',
  'aips.list.filters.tag.label': 'Mot-clefs',
  'aips.list.remove-tag.button': 'Supprimer mot-clefs',
  'aips.list.add-tag.button': 'Ajouter mot-clefs',
  'aips.list.table.headers.providerId': 'Identifiant fournisseur',
  'aips.list.table.headers.type': 'Type',
  'aips.list.table.headers.state': 'Statut',
  'aips.list.table.headers.data.storages': 'Stocké sur',
  'aips.list.table.headers.lastUpdate': 'Modifié le',
  'aips.list.table.headers.nbFiles': 'Nombre de fichier',
  'aips.list.aip-details.title': 'Détails de l\'AIP',
  'aips.list.aip-history.title': 'Historique du AIP',
  'aips.list.aip-retry.title': 'Relancer le stockage de l\'AIP',
  'aips.list.delete.files.on.all.storages.label': 'Suppression complète',
  'aips.list.delete.files.on.all.storages.title': 'Supprimer les AIP sélectionnés et leurs fichiers sur tous les espaces de stockage',
  'aips.list.delete.files.on.some.storages.label': 'Suppression partielle',
  'aips.list.delete.files.on.some.storages.title': 'Supprimer les fichiers des AIP sélectionnés sur certains espaces de stockage...',
  'aips.list.empty.title': 'Aucune donnée trouvée',
  'aips.list.snackbar.job-remove-tag': 'Un job de suppression de tag a été lancé',
  'aips.list.snackbar.job-remove-tag-failed': 'Le job de suppression de tag n\'a pas pu être lancé',
  'aips.list.snackbar.job-add-tag': 'Un job d\'ajout de tag a été lancé',
  'aips.list.snackbar.job-add-tag-failed': 'Le job d\'ajout de tag n\'a pas pu être lancé',
  'aips.list.snackbar.job-failed': 'Erreur : un job du même type est déjà lancé',

  'aip.confirm.delete.title': 'Suppression d\'AIP',
  'aip.confirm.delete.message': 'Voulez-vous supprimer intégralement les AIP sélectionnés de tous les espaces de stockage ?',
  'aip.confirm.delete.aip': 'Supprimer',
  'aip.cancel.delete': 'Annuler',

  'aip.delete.on.storages.title': 'Suppression de fichiers des AIP sélectionnés',
  'aip.delete.on.storages.message': 'Sur quels espaces de stockage voulez-vous supprimer les fichiers des AIP sélectionnés ? Les AIP seront supprimés sur les espaces de stockage cochés uniquement s\'ils sont toujours présents sur un espace de stockage après l\'opération',
  'aip.delete.on.selected.storages.messages': 'Les fichiers des AIP sélectionnés seront supprimés des espaces de stockage suivants : {datastorages}. Veuillez confirmer cette opération.',
  'aip.delete.on.selected.storages.label.separator': ', ',
  'aip.confirm.delete.on.storages': 'Supprimer',
  'aip.cancel.delete.on.storages': 'Annuler',

  'aip.details.button.close': 'Fermer',

  'aips.session.title': 'Sessions',
  'aips.session.aips.title': 'Session {session}',
  'aips.session.subtitle': 'Visualisation des objets stockés par session d\'acquisition.',
  'aips.session.filter.name.label': 'Nom',
  'aips.session.filter.from.label': 'Début',
  'aips.session.filter.to.label': 'Fin',
  'aips.session.table.headers.id': 'Nom',
  'aips.session.table.headers.storedDataFilesCount': 'Fichiers stockés',
  'aips.session.table.headers.queued': 'En attente',
  'aips.session.table.headers.stored': 'AIPs Stockés',
  'aips.session.table.headers.errors': 'Nombre d\'erreurs',
  'aips.session.table.headers.date': 'Date',
  'aips.session.table.actions.errors': 'Lister les AIPS associés en erreur',
  'aips.session.table.actions.list': 'Lister les AIPs associés',
  'aips.session.button.back': 'Retour',
  'aips.session.refresh.button': 'Rafraîchir',
  'aips.session.clear.filters.button': 'Vider les filtres',
  'aips.session.apply.filters.button': 'Appliquer les filtres',
  'aips.session.delete.confirm.title': 'Supprimer les AIPs de la session {id} ?',
  'aips.session.delete.confirm.message': 'Une fois validée, la suppression sera réalisée dans un job asynchrone. Vous pourrez suivre l\'avancement en rafraîchissant la liste des sessions.',
  'aips.session.delete.tooltip': 'Supprimer les AIPs associés',

  VALID: 'VALID',
  PENDING: 'PENDING',
  STORING_METADATA: 'STORING_METADATA',
  STORED: 'STORED',
  STORAGE_ERROR: 'STORAGE_ERROR',
  UPDATED: 'UPDATED',
  DELETED: 'DELETED',

  'aips.files.modal.action.close': 'Fermer',
  'aips.files.modal.title': 'Trace ...',
  'aips.files.table.headers.name': 'Nom',
  'aips.files.table.headers.state': 'État',
  'aips.files.table.headers.type': 'Type',
  'aips.files.table.headers.filesize': 'Taille du fichier',
  'aips.files.table.empty.title': 'Aucun résultat',
  'aips.files.title': 'Fichiers',
  'aips.files.subtitle': 'Liste les fichiers associés à l\'AIP courant',
  'aips.files.actions.back': 'Retour',
  'aips.files.table.tooltip.show-stacktrace': 'Afficher la stacktrace',
  'aips.files.table.tooltip.show-error-files': 'Afficher les fichiers en erreur',

  'aip.remove-tag.title': 'Suppression d\'une liste de tag',
  'aip.remove-tag.available': 'Cliquez sur un des tags suivant pour l\'ajouter à la liste des tags à supprimer :',
  'aip.remove-tag.removing': 'Tags à supprimer :',
  'aip.remove-tag.action.cancel': 'Annuler',
  'aip.remove-tag.action.delete': 'Envoyer',
  'aip.add-tag.action.cancel': 'Annuler',
  'aip.add-tag.action.add': 'Ajouter',
  'aip.add-tag.title': 'Ajouter une liste de tag',
  'aip.add-tag.list': 'Liste des tags à ajouter :',
  'aip.add-tag.input': 'Nouveau tag',
  'aip.add-tag.input.action.add': 'Ajouter le tag',
}, Locales.fr)

export default messages
