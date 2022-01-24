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
  'order.list.cancel.button': 'Annuler',
  'order.list.filters.label': 'Filtrer les résultats',
  'order.list.filter.by.email.hint': 'Utilisateur',
  'order.list.clear.filter.tooltip': 'Effacer le filtre',

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
