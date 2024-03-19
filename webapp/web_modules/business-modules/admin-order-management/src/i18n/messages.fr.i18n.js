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
  'order.management.list.title': 'Commandes',
  'order.management.list.subtitle': 'Liste des commandes en cours et terminées du projet',
  'order.management.list.refresh': 'Rafraîchir',
  'order.management.list.back': 'Retour',
  'order.management.list.filter': 'Filtrer',
  'order.list.filters.creationDate.label': 'Date de création',
  'order.list.filters.creationDate.after.label': 'Depuis',
  'order.list.filters.creationDate.before.label': 'Jusqu\'à',
  'order.list.filters.statuses.label': 'Statuts',
  'order.list.filters.owner.label': 'Utilisateur',
  'order.list.clear.filter.tooltip': 'Effacer le filtre',
  'order.list.filters.statuses.PENDING': 'En attente',
  'order.list.filters.statuses.RUNNING': 'En cours',
  'order.list.filters.statuses.PAUSED': 'En pause',
  'order.list.filters.statuses.EXPIRED': 'Expirée',
  'order.list.filters.statuses.FAILED': 'Echec',
  'order.list.filters.statuses.DONE_WITH_WARNING': 'Terminée avec warning',
  'order.list.filters.statuses.DONE': 'Terminée',
  'order.list.filters.statuses.DELETED': 'Supprimée',
  'order.list.filters.statuses.WAITING_USER_DOWNLOAD': 'Attente téléchargement utilisateur',
  'order.list.filters.statuses.UNKNOWN': 'Inconnu',
  'order.list.filters.waitingForUser.label': 'Attente téléchargement',
  'order.list.filters.waitingForUser.any': 'Tous',
  'order.list.filters.waitingForUser.true': 'Oui',
  'order.list.filters.waitingForUser.false': 'Non',
  'order.settings.title': 'Paramètres des commandes',
  'order.settings.subtitle': 'Configurer les parametres',
  'order.settings.field.appSubOrderDuration': 'Durée d\'une sous commande applicative (en heure)',
  'order.settings.field.orderExpirationDuration': 'Durée maximale d\'une commande avant expiration (en heure)',
  'order.settings.fieldgroup.userOrderParameters': 'Paramètres des commandes utilisateurs',
  'order.settings.fieldgroup.userOrderParameters.subOrderDuration': 'Durée d\'une sous commande utilisateur (en heure)',
  'order.settings.fieldgroup.userOrderParameters.delayBeforeEmailNotification': 'Delai avant la notification par email lorsqu\'une sous commande est prête (en heure)',
  'order.settings.action.confirm': 'Confirmer',
  'order.settings.action.cancel': 'Retour',
  ...Locales.fr,
}

export default messages
