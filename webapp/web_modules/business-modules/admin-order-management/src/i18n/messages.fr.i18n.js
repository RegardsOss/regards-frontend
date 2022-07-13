/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  'order.list.filters.creationDate.label': 'Date de création :',
  'order.list.filters.creationDate.after.label': 'Depuis',
  'order.list.filters.creationDate.before.label': 'Jusqu\'à',
  'order.list.filters.status.label.title': 'Statut',
  'order.list.filters.status.label': 'Statut :',
  'order.list.filter.by.email.label': 'Utilisateur :',
  'order.list.filter.by.email.hint': 'Utilisateur',
  'order.list.clear.filter.tooltip': 'Effacer le filtre',
  'order.list.filters.status.PENDING': 'En attente',
  'order.list.filters.status.RUNNING': 'En cours',
  'order.list.filters.status.PAUSED': 'En pause',
  'order.list.filters.status.EXPIRED': 'Expirée',
  'order.list.filters.status.FAILED': 'Echec',
  'order.list.filters.status.DONE_WITH_WARNING': 'Terminée avec warning',
  'order.list.filters.status.DONE': 'Terminée',
  'order.list.filters.status.DELETED': 'Supprimée',
  'order.list.filters.status.WAITING_USER_DOWNLOAD': 'Attente téléchargement utilisateur',
  'order.list.filters.status.UNKNOWN': 'Inconnu',
  'order.list.filters.waiting.user.label.hint': 'Attente téléchargement',
  'order.list.filters.waiting.user.label': 'Attente téléchargement :',
  'order.list.filters.waiting.user.any': 'Tous',
  'order.list.filters.waiting.user.true': 'Oui',
  'order.list.filters.waiting.user.false': 'Non',
  'order.settings.title': 'Paramètres des commandes',
  'order.settings.subtitle': 'Configurer les parametres',
  'order.settings.clear': 'Réinitialiser',
  'order.settings.field.appSubOrderDuration': 'Durée d\'une sous commande applicative (en heure)',
  'order.settings.fieldgroup.userOrderParameters': 'Paramètres des commandes utilisateurs',
  'order.settings.fieldgroup.userOrderParameters.subOrderDuration': 'Durée d\'une sous commande utilisateur (en heure)',
  'order.settings.fieldgroup.userOrderParameters.delayBeforeEmailNotification': 'Delai avant la notification par email lorsqu\'une sous commande est prête (en heure)',
  'order.settings.action.confirm': 'Confirmer',
  'order.settings.action.cancel': 'Retour',
  ...Locales.fr,
}

export default messages
