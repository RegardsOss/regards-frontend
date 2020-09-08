/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

  /* Processing Monitoring */
  'processing.monitoring.list.empty.title': 'Aucun traitement défini',
  'processing.monitoring.refresh.button' : 'Rafraichir',
  'processing.monitoring.list.header.name.label': 'Traitement',
  'processing.monitoring.list.header.created.label': 'Crée',
  'processing.monitoring.list.header.username.label': 'Utilisateur',
  'processing.monitoring.list.header.status': 'Statut',
  'processing.monitoring.list.header.option': 'Options',
  'processing.monitoring.list.tooltip.info.button': 'Détails',
  'processing.monitoring.list.tooltip.info.close': 'Fermer',
  'processing.monitoring.list.tooltip.info.title': 'Informations sur le traitement {name}',
  'processing.monitoring.list.tooltip.no.info.title': 'Pas d\'informations sur le traitement {name}',
  'processing.monitoring.list.tooltip.info.message.label': 'Message:',
  'processing.monitoring.filters.name-hint': 'Traitement',
  'processing.monitoring.filters.userName-hint': 'Utilisateur',
  'processing.monitoring.filters.from.label': 'From',
  'processing.monitoring.filters.to.label': 'To',
  'processing.monitoring.filters.reset': 'Vider Les Filters',
  'processing.monitoring.filters.apply': 'Appliquer les Filtres',
  'processing.monitoring.filters.all-status': 'Tous les Statuts',
  'processing.monitoring.filters.success-status': 'Success',
  'processing.monitoring.filters.failure-status': 'Failure',
  'processing.monitoring.filters.cancelled-status': 'Cancelled',
  'processing.monitoring.filters.timed-out-status': 'TimedOut',
  'processing.monitoring.filters.clean-up-status': 'CleanUp',
  'processing.monitoring.filters.running-status': 'Running',
  'processing.monitoring.filters.prepare-status': 'Prepare',
  'processing.monitoring.filters.registered-status': 'Registered',
  'processing.monitoring.filters.select.field': '',
  'processing.monitoring.table.clear.button': 'Effacer',
  'processing.monitoring.table.filter.button': 'Appliquer',
  'processing.monitoring.list.refresh.button': 'Rafraîchir',

  /* Processing Form */
  'processing.form.edit.title' : 'Configuration du traitements "{name}"',
  'processing.form.create.title' : 'Configuration d\'un nouveau traitement',
  'processing.form.submit.edit.button' : 'Modifier',
  'processing.form.submit.button' : 'Créer',
  'processing.form.subtitle' : 'Vous pouvez configurer votre traitement.',
  'processing.form.back.button' : 'Annuler',
  'processing.form.plugin.label': 'Plugin de traitement',
  'processing.form.invalid.id': 'ID Invalide',
  

  ...Locales.fr,
}

export default messages
