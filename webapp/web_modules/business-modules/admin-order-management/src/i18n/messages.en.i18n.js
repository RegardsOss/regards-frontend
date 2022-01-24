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
  'order.management.list.title': 'Orders',
  'order.management.list.subtitle': 'List of current and done project orders',
  'order.list.cancel.button': 'Cancel',
  'order.list.filters.label': 'Filter results',
  'order.list.filter.by.email.hint': 'User',
  'order.list.clear.filter.tooltip': 'Clear filter',

  'order.settings.title': 'Order settings',
  'order.settings.subtitle': 'Configure settings',
  'order.settings.clear': 'Clear',
  'order.settings.field.appSubOrderDuration': 'Sub order applicative duration (in hour)',
  'order.settings.fieldgroup.userOrderParameters': 'User order settings',
  'order.settings.fieldgroup.userOrderParameters.subOrderDuration': 'Sub order user duration (in hour)',
  'order.settings.fieldgroup.userOrderParameters.delayBeforeEmailNotification': 'Delay before email notification when an order is ready (in hour)',
  'order.settings.action.confirm': 'Confirm',
  'order.settings.action.cancel': 'Back',
  ...Locales.en,
}

export default messages
