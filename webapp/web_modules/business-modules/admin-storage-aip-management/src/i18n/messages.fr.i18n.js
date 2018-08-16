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
  'aips.list.filters.status.label': 'Etat',
  'aips.list.filters.from.label': 'Depuis',
  'aips.list.filters.to.label': 'Jusqu\'à',
  'aips.list.filters.tag.label': 'Tags',
  'aips.list.remove-tag.button': 'Remove tag',
  'aips.list.add-tag.button': 'Add tag',
  'aips.list.table.headers.providerId': 'Provider ID',
  'aips.list.table.headers.type': 'Type',
  'aips.list.table.headers.state': 'Statut',
  'aips.list.table.headers.lastUpdate': 'Modifié le',
  'aips.list.table.headers.nbFiles': 'Nombre de fichier',
  'aips.list.aip-details.title': 'Détails du AIP',
  'aips.list.aip-history.title': 'Historique du AIP',
  'aips.list.empty.title': 'Aucune donnée trouvée',
  'aips.list.snackbar.job-remove-tag': 'Un job de suppression de tag a été lancé',
  'aips.list.snackbar.job-remove-tag-failed': 'Le job de suppression de tag n\'a pas pu être lancé',
  'aips.list.snackbar.job-add-tag': 'Un job d\'ajout de tag a été lancé',
  'aips.list.snackbar.job-add-tag-failed': 'Le job d\'ajout de tag n\'a pas pu être lancé',
  'aips.list.snackbar.job-failed': 'Erreur : un job du même type est déjà lancé',

  'aip.confirm.delete.title': 'Suppression de données (identifiant producteur : {id})',
  'aip.confirm.delete.message': 'Voulez-vous supprimer uniquement la donnée sélectionée ou toutes les données de même identifiant producteur (AIP ID) ?',
  'aip.confirm.delete.aips': 'Tout supprimer',
  'aip.confirm.delete.aip': 'Supprimer',
  'aip.cancel.delete': 'Annuler',

  'aip.details.button.close': 'Fermer',

  'aip.delete.error.dialog.close': 'Fermer',
  'aip.delete.error.title': 'Erreur durant la suppression du AIP "{id}"',

  'aips.session.title': 'Sessions',
  'aips.session.aips.title': 'Session {session}',
  'aips.session.subtitle': 'Visualisation des objets stockés par session d\'acquisition.',
  'aips.session.filter.name.label': 'Nom',
  'aips.session.filter.from.label': 'Début',
  'aips.session.filter.to.label': 'Fin',
  'aips.session.table.headers.id': 'Nom',
  'aips.session.table.headers.queued': 'En attente',
  'aips.session.table.headers.stored': 'Stockés',
  'aips.session.table.headers.errors': 'Nombre d\'erreurs',
  'aips.session.table.headers.date': 'Date',
  'aips.session.table.actions.errors': 'Lister les AIPS associés en erreur',
  'aips.session.table.actions.list': 'Lister les AIPs associés',
  'aips.session.button.back': 'Retour',
  'aips.session.refresh.button': 'Rafraîchir',
  'aips.session.clear.filters.button': 'Vider les filtres',
  'aips.session.apply.filters.button': 'Appliquer les filtres',
  'aips.session.delete.confirm.title': 'Supprimer les AIPs de la session {id} ?',

  VALID: 'VALID',
  PENDING: 'PENDING',
  STORING_METADATA: 'STORING_METADATA',
  STORED: 'STORED',
  STORAGE_ERROR: 'STORAGE_ERROR',
  UPDATED: 'UPDATED',
  DELETED: 'DELETED',

  'aips.files.modal.action.close': 'Close',
  'aips.files.modal.title': 'Trace ..',
  'aips.files.table.headers.name': 'Name',
  'aips.files.table.headers.state': 'State',
  'aips.files.table.headers.type': 'Type',
  'aips.files.table.headers.filesize': 'File size',
  'aips.files.table.empty.title': 'No result',
  'aips.files.title': 'Fichiers',
  'aips.files.subtitle': 'Liste les fichiers associés à l\'AIP courrant',
  'aips.files.actions.back': 'Back',
  'aips.files.table.tooltip.show-stacktrace': 'Afficher la stacktrace',

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
