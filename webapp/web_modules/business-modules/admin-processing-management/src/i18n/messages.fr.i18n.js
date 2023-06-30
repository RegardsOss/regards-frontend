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

const messages = {

  /* Processing */
  'processing.management.list.title': 'Traitements',
  'processing.management.list.subtitle': 'Liste des traitements en cours et terminées du projet',
  'processing.management.list.cancel.button': 'Annuler',
  'processing.management.list.delete.title': 'Supprimer le traitement {name} ?',
  'processing.management.list.no.processing.subtitle': 'Créez votre premier traitement',
  'processing.management.list.no.processing.title': 'Pas de traitements',
  'processing.management.table.filter.processing.label': 'Traitements',
  'processing.management.table.filter.clear.button': 'Effacer',
  'processing.management.table.filter.button': 'Appliquer',
  'processing.management.table.refresh.button': 'Rafraîchir',
  'processing.management.list.add.button': 'Créer',
  'processing.management.list.edit.button': 'Editer',
  'processing.management.list.delete.button': 'Supprimer',
  'processing.management.list.delete.error': 'Erreur durant la suppression du traitement.',

  /* Processing Monitoring */
  'processing.monitoring.list.empty.title': 'Aucun traitement défini',
  'processing.monitoring.list.loading.title': 'Chargement...',
  'processing.monitoring.refresh.button': 'Rafraichir',
  'processing.monitoring.filter.button': 'Filtrer',
  'processing.monitoring.back.button': 'Retour',
  'processing.monitoring.list.header.name.label': 'Traitement',
  'processing.monitoring.list.header.userRole': 'Rôle',
  'processing.monitoring.list.header.created.label': 'Crée',
  'processing.monitoring.list.header.username.label': 'Utilisateur',
  'processing.monitoring.list.header.status': 'Statut',
  'processing.monitoring.list.header.option': 'Options',
  'processing.monitoring.list.tooltip.info.button': 'Détails',
  'processing.monitoring.list.tooltip.info.title': 'Informations sur le traitement {name}',
  'processing.monitoring.list.tooltip.no.info.title': 'Pas d\'informations sur le traitement {name}',
  'processing.monitoring.filters.processBusinessId.label': 'Traitement',
  'processing.monitoring.filters.creationDate.label': 'Date de création',
  'processing.monitoring.filters.userEmail.label': 'Utilisateur',
  'processing.monitoring.filters.userEmail.hint': 'Email',
  'processing.monitoring.filters.status.label': 'Statuts',
  'processing.monitoring.filters.status.SUCCESS': 'Success',
  'processing.monitoring.filters.status.FAILURE': 'Failure',
  'processing.monitoring.filters.status.CANCELLED': 'Cancelled',
  'processing.monitoring.filters.status.TIMED_OUT': 'TimedOut',
  'processing.monitoring.filters.status.CLEANUP': 'CleanUp',
  'processing.monitoring.filters.status.RUNNING': 'Running',
  'processing.monitoring.filters.status.PREPARE': 'Prepare',
  'processing.monitoring.filters.status.REGISTERED': 'Registered',

  /* Processing Form */
  'processing.form.edit.title': 'Configuration du traitement "{name}"',
  'processing.form.create.title': 'Configuration d\'un nouveau traitement',
  'processing.form.submit.edit.button': 'Modifier',
  'processing.form.submit.create.button': 'Créer',
  'processing.form.subtitle': 'Vous pouvez configurer votre traitement.',
  'processing.form.back.button': 'Annuler',
  'processing.form.plugin.label': 'Plugin de traitement',
  'processing.form.invalid.id': 'ID Invalide',
  'processing.form.select.role': 'Sélectionnez un rôle',
  'processing.form.select.isLinkedToAllDatasets': 'Associer à tous les jeux de données',
  'processing.form.select.role.help': 'Le rôle MINIMAL d\'utilisation du traitement peut être sélectionné. Par défaut : PUBLIC',
  'processing.form.list.tooltip.info.button': 'Détails',
  'processing.form.list.tooltip.info.close': 'Fermer',

  ...Locales.fr,
}

export default messages
