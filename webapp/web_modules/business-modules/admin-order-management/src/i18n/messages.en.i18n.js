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
  'order.management.list.refresh': 'Refresh',
  'order.management.list.back': 'Back',
  'order.management.list.filter': 'Filter',
  'order.list.filters.creationDate.label': 'Creation date :',
  'order.list.filters.creationDate.after.label': 'From',
  'order.list.filters.creationDate.before.label': 'To',
  'order.list.filters.status.label.title': 'Status',
  'order.list.filters.status.label': 'Status :',
  'order.list.filter.by.email.label': 'User :',
  'order.list.filter.by.email.hint': 'User',
  'order.list.clear.filter.tooltip': 'Clear filter',
  'order.list.filters.status.PENDING': 'Pending',
  'order.list.filters.status.RUNNING': 'Running',
  'order.list.filters.status.PAUSED': 'Paused',
  'order.list.filters.status.EXPIRED': 'Expired',
  'order.list.filters.status.FAILED': 'Failed',
  'order.list.filters.status.DONE_WITH_WARNING': 'Done with warning',
  'order.list.filters.status.DONE': 'Done',
  'order.list.filters.status.DELETED': 'Deleted',
  'order.list.filters.status.WAITING_USER_DOWNLOAD': 'Waiting user download',
  'order.list.filters.status.UNKNOWN': 'Unknown',
  'order.list.filters.waiting.user.label.hint': 'Waiting user download',
  'order.list.filters.waiting.user.label': 'Waiting user download :',
  'order.list.filters.waiting.user.any': 'All',
  'order.list.filters.waiting.user.true': 'Yes',
  'order.list.filters.waiting.user.false': 'No',
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
