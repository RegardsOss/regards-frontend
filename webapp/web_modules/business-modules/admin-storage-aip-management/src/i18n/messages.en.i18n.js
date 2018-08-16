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
  'aips.list.subtitle': 'List of AIPs for selected session',
  'aips.list.filters.status.label': 'Status',
  'aips.list.filters.from.label': 'From',
  'aips.list.filters.to.label': 'To',
  'aips.list.filters.tag.label': 'Tags',
  'aips.list.table.headers.type': 'Type',
  'aips.list.table.headers.providerId': 'Provider id',
  'aips.list.table.headers.state': 'State',
  'aips.list.table.headers.lastUpdate': 'Last updated',
  'aips.list.table.headers.nbFiles': 'Number of files',
  'aips.list.aip-details.title': 'AIP details',
  'aips.list.aip-history.title': 'AIP History',
  'aips.list.empty.title': 'No entities found',
  'aips.list.snackbar.job-remove-tag': 'Un job de suppression de tag a été lancé',
  'aips.list.snackbar.job-remove-tag-failed': 'Le job de suppression de tag n\'a pas pu être lancé',
  'aips.list.snackbar.job-add-tag': 'Un job d\'ajout de tag a été lancé',
  'aips.list.snackbar.job-add-tag-failed': 'Le job d\'ajout de tag n\'a pas pu être lancé',
  'aips.list.snackbar.job-failed': 'Erreur : un job du même type est déjà lancé',

  'aip.confirm.delete.title': 'Data deletion (AIP ID : {id})',
  'aip.confirm.delete.message': 'Do you want to delete only the selected data or all the data with the same AIP ID ?',
  'aip.confirm.delete.aips': 'Delete all',
  'aip.confirm.delete.aip': 'Delete only selected one',
  'aip.cancel.delete': 'Cancel',

  'aip.details.button.close': 'Close',

  'aip.delete.error.dialog.close': 'Close',
  'aip.delete.error.title': 'Error during AIP "{id}" deletion',

  'aips.session.title': 'Sessions',
  'aips.session.aips.title': 'Session {session}',
  'aips.session.subtitle': 'Select the session associated to the AIPs you want to view. A session is a group of data informational package (AIP).',
  'aips.session.filter.name.label': 'Name',
  'aips.session.filter.from.label': 'From',
  'aips.session.filter.to.label': 'To',
  'aips.session.table.headers.id': 'Name',
  'aips.session.table.headers.queued': 'Queued',
  'aips.session.table.headers.stored': 'Storage',
  'aips.session.table.headers.errors': 'Number of errors',
  'aips.session.table.headers.date': 'Date',
  'aips.session.table.actions.errors': 'Lister les AIPS associés en erreur',
  'aips.session.table.actions.list': 'Lister les AIPs associés',
  'aips.session.button.back': 'Back',
  'aips.session.refresh.button': 'Refresh',
  'aips.session.clear.filters.button': 'Clear filters',
  'aips.session.apply.filters.button': 'Apply filters',
  'aips.session.delete.confirm.title': 'Delete session {id}?',

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
  'aips.files.title': 'Files',
  'aips.files.subtitle': 'List files associated with the current AIP',
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
}, Locales.en)

export default messages
